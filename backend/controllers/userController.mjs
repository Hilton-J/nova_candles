import asyncHandler from "express-async-handler";
import User from '../models/userModel.mjs'
import generateToken from '../utils/generateToken.mjs'
import { loginUser, registerUser } from "../services/authService.mjs";
import { CREATED, OK } from "../constants/http.codes.mjs";
import { clearAuthCookies } from "../utils/authCookie.mjs";
import { deleteOneDoc, getAllDocs } from "../services/crudHandlerFactory.mjs";
import { getProfileHandler, updateUserHandler } from "../services/userService.mjs";

export const deleteUser = deleteOneDoc(User);
export const getAllUsers = getAllDocs(User);
export const updateUser = updateUserHandler(User);
export const getUserById = getProfileHandler();

export const login = asyncHandler(async (req, res) => {
  const user = await loginUser(req.body);
  await generateToken(res, user);
  const data = new User(user).omitField(['jwt_secrete', 'password']);
  res.status(OK).json(data);
});

export const registerHandler = asyncHandler(async (req, res, next) => {
  const user = await registerUser(req.body);
  await generateToken(res, user);
  const data = new User(user).omitField(["jwt_secrete", "password"]);
  res.status(CREATED).json({ status: 'User successfullyregitered', data })
});

export const logout = asyncHandler(async (req, res) => {
  clearAuthCookies(res);
  res.status(OK).json({ success: true, message: 'User logged out' });
});

