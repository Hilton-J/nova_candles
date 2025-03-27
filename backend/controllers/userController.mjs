import User from '../models/userModel.mjs';
import asyncHandler from "express-async-handler";
import generateToken from '../utils/generateToken.mjs';
import { CREATED, OK } from "../constants/http.codes.mjs";
import { clearAuthCookies } from "../utils/authCookie.mjs";
import { loginUser, registerUser } from "../services/authService.mjs";
import { deleteOneDoc, getAllDocs } from "../services/crudHandlerFactory.mjs";
import { getProfileHandler, updateUserHandler } from "../services/userService.mjs";

export const getAllUsers = getAllDocs(User);
export const deleteUser = deleteOneDoc(User);
export const getUserById = getProfileHandler();
export const updateUser = updateUserHandler(User);

export const login = asyncHandler(async (req, res) => {
  const user = await loginUser(req.body);
  await generateToken(res, user);
  const data = new User(user).omitField(['jwt_secret', 'password']);
  res.status(OK).json(data);
});

export const logout = asyncHandler(async (req, res) => {
  clearAuthCookies(res);
  res.status(OK).json({ success: true, message: 'User logged out' });
});

export const registerHandler = asyncHandler(async (req, res, next) => {
  const user = await registerUser(req.body);
  await generateToken(res, user);
  const data = new User(user).omitField(["jwt_secret", "password"]);
  res.status(CREATED).json({ status: 'User successfullyregitered', data })
});