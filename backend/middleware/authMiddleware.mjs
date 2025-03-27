import asynchandler from 'express-async-handler';
import HttpError from '../utils/httpError.mjs';
import User from '../models/userModel.mjs';
import {
  NOT_FOUND,
  FORBIDDEN,
  UNAUTHORIZED,
  INTERNAL_SERVER_ERROR,
} from '../constants/http.codes.mjs';
import jwt from 'jsonwebtoken';

export const protect = asynchandler(async (req, res, next) => {
  const accessToken = req.cookies.jwt_token;

  if (!accessToken)
    return next(new HttpError('Not Authorized, invalid accessToken', UNAUTHORIZED));

  const decoded = jwt.decode(accessToken);
  if (!decoded || !decoded.id) {
    return next(new HttpError('Not authorized, invalid token structure', UNAUTHORIZED));
  }

  const user = await User.findById(decoded.id).select('-password');
  if (!user) {
    return next(new HttpError('Not authorized, user not found', NOT_FOUND));
  }

  const currentJwtSecret = user.jwt_secret;
  if (!currentJwtSecret) {
    next(new HttpError("Server error: User jwt_secret missing", INTERNAL_SERVER_ERROR));
  }

  try {
    jwt.verify(accessToken, currentJwtSecret);
    req.user = user.omitField('jwt_secret');
    next();
  } catch (error) {
    next(new HttpError(`Not Authorized, invalid token ====== ${error}`, UNAUTHORIZED));
  }
});

export const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (req.user && roles.includes(req.user.role)) {
      next();
    } else {
      next(new HttpError('Not authorized', FORBIDDEN));
    }
  }
};