import jwt from 'jsonwebtoken';
import { NODE_ENV } from '../constants/env.const.mjs';
import { after30Days, after90Days } from '../constants/date.const.mjs';
import generateAccessToken from './generateAccessToken.mjs';
import generateRefreshToken from './generateRefreshToken.mjs';

const generateToken = async (res, user) => {
  try {
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    user.refreshToken = refreshToken;
    await user.save();

    if (!res.headersSent) {
      res.cookie('jwt_token', accessToken, accessCookieOptions);
      res.cookie('refreshToken', refreshToken, refreshCookieOptions);
    }
    else {
      console.error("Headers already sent; cannot set cookies.");
    }

    return { accessToken, refreshToken };
  } catch (error) {
    console.error("Error generating tokens", error);
    throw new Error(`Failed to generate tokens ${error}`);
  }
};

/**
 * Creates options for the JWT access cookie.
 *
 * @returns {Object} The cookie options.
 */
const accessCookieOptions = () => ({
  httpOnly: true,
  secure: NODE_ENV === 'production',
  sameSite: 'strict', //This prevents CSRF (Cross Site ERequest Forgery) attachs
  maxAge: after30Days(), //Will expire after 30 day
  path: '/api'
});

/**
 * Creates options for the JWT access cookie.
 *
 * @returns {Object} The cookie options.
 */
const refreshCookieOptions = () => ({
  httpOnly: true,
  sameSite: "strict",
  secure: NODE_ENV === "production", // Use secure cookies only in production
  expires: after90Days(), // Long-lived refresh token
  path: "/api/refresh", // Adjust as needed, separate endpoint for refresh
});

export default generateToken;