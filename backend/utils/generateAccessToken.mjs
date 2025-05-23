import jwt from 'jsonwebtoken';

/**
 * Generates a short-lived access token.
 * @param {Object} user - The user object containing user details.
 */
const generateAccessToken = (user) => {
  const jwtOptions = {
    expiresIn: '24h', // the cookie will expire after 24 Hours
    issuer: "novacandles.com",
    audience: "API V1",
  };

  return jwt.sign(
    {
      id: user._id,
    },
    user.jwt_secret,
    jwtOptions
  );
};

export default generateAccessToken;