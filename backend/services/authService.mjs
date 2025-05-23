import crypto from 'crypto';
import User from '../models/userModel.mjs';
import HttpError from '../utils/httpError.mjs';
import { UNAUTHORIZED, CONFLICT } from '../constants/http.codes.mjs';

export const loginUser = async (credentials) => {
  const { email, password } = credentials;

  const user = await User.findOne({ email });

  if (!user || !(await user.matchPassword(password)))
    throw new HttpError('Invalid email or password', UNAUTHORIZED);

  return user;
};

export const registerUser = async (userData) => {
  const { firstName, lastName, email, cellPhoneNo, role, password, confirmPassword } = userData;

  const userExists = await User.findOne({ email });

  if (userExists)
    throw new HttpError('Email already exists', CONFLICT);

  if (confirmPassword !== password)
    throw new HttpError("Passwords don't match", UNAUTHORIZED);

  const jwt_secret = crypto.randomBytes(32).toString('hex');

  const user = await User.create({
    firstName,
    lastName,
    email,
    cellPhoneNo,
    role,
    password,
    jwt_secret
  });

  return user;
};