import jwt from 'jsonwebtoken'
import asynchandler from 'express-async-handler'
import User from '../models/userModel.mjs'
import { JWT_SECRET } from '../constants/env.const.mjs';
import {
  FORBIDDEN,
  INTERNAL_SERVER_ERROR,
  NOT_FOUND,
  UNAUTHORIZED,
} from '../constants/http.codes.mjs'
import HttpError from '../utils/httpError.mjs';

const protect = asynchandler(async (req, res, next) => {
  const accessToken = req.cookies.jwt_token;
  if (!accessToken)
    return next(new HttpError('Not Authorized, invalid accessToken', UNAUTHORIZED));

  const decoded = jwt.decode(accessToken);
  if (!decoded || !decoded.id)
    return next(new HttpError('Not authorized, invalid token structure', UNAUTHORIZED));

  const user = await User.findById(decoded.id).select('-password');
  if (!user)
    return next(new HttpError('Not authorized, user not found', NOT_FOUND))

  const currentJwtSecret = user.jwt_secrete;

  if (!currentJwtSecret) {
    next(new HttpError("Server error: User jwt_secret missing", INTERNAL_SERVER_ERROR));
  }

  try {
    jwt.verify(accessToken, currentJwtSecret);
    req.user = user.omitField('jwt_secrete');
    next();
  } catch (error) {
    next(new HttpError('Not Authorized, invalid token', UNAUTHORIZED));
  }
});

const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (req.user && roles.includes(req.user.role)) {
      next();
    } else {
      next(new HttpError('Not authorized', FORBIDDEN));
    }
  }
};

export { protect, authorizeRoles }
