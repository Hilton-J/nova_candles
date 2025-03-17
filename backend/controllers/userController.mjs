import asyncHandler from "express-async-handler";
import User from '../models/userModel.mjs'
import generateToken from '../utils/generateToken.mjs'
import { loginUser, registerUser } from "../services/authService.mjs";
import { CREATED, OK } from "../constants/http.codes.mjs";
import { clearAuthCookies } from "../utils/authCookie.mjs";
import { deleteOneDoc, getAllDocs } from "../services/crudHandlerFactory.mjs";


export const deleteUser = deleteOneDoc(User);
export const getAllUsers = getAllDocs(User);

// @dsc     Auth user/set token
// route    POST /api/users/login
// @access  Public
export const login = asyncHandler(async (req, res) => {
  const user = await loginUser(req.body);
  await generateToken(res, user);
  const data = new User(user).omitField(['jwt_secrete', 'password']);
  res.status(OK).json(data);
});

// @dsc     Register a new user
// route    POST /api/users/register
// @access  Public
export const registerHandler = asyncHandler(async (req, res, next) => {
  const user = await registerUser(req.body);
  await generateToken(res, user);
  const data = new User(user).omitField(["jwt_secrete", "password"]);
  res.status(CREATED).json({ status: 'User successfullyregitered', data })
});

// @dsc     User logout
// route    POST /api/users/logout
// @access  Public
export const logout = asyncHandler(async (req, res) => {
  clearAuthCookies(res);
  res.status(OK).json({ success: true, message: 'User logged out' });
});

// @dsc     Get User
// route    GET /api/users/:id
// @access  Private
export const getUserById = asyncHandler(async (req, res) => {
  const user = req.user
  res.status(201).json(user);
});


// @dsc     Update user
// route    PUT /api/users/profile
// @access  Private
export const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).select('-password');

  if (user) {
    user.firstName = req.body.firstName || user.firstName;
    user.lastName = req.body.lastName || user.lastName;
    user.email = req.body.email || user.email;
    user.phoneNumber = req.body.phoneNumber || user.phoneNumber;
    user.shipToAddress = req.body.shipToAddress || user.shipToAddress;

    if (req.body.password || req.body.confirmPassword === req.body.password) {
      user.password = req.body.password
    }

    const updatedUser = await user.save();

    res.status(200).json({
      success: true,
      message: `User updated successfully`,
      results: updatedUser
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

