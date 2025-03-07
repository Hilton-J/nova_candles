import User from '../models/userModel.mjs';
import HttpError from '../utils/httpError.mjs';
import { UNAUTHORIZED, CONFLICT } from '../constants/http.code.mjs';
import crypto from 'crypto';

/**
 * Logs in a user.
 * @param {Object} credentials - The login credentials.
 * @returns {Promise<Object>} - The logged-in user object.
 */
export const loginUser = async (credentials) => {
  const { email, password } = credentials;

  const user = await User.findOne({ email });

  if (!user || !(await user.matchPassword(password)))
    return next(new HttpError('Invalid email or password', UNAUTHORIZED));

  return user;
}

