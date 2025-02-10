import asyncHandler from "express-async-handler";
import User from '../models/userModel.mjs'
import generateToken from '../utils/generateToken.mjs'

// @dsc     Auth user/set token
// route    POST /api/users/login
// @access  Public
export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    generateToken(res, user._id);
    res.status(201).json({
      _id: user._id,
      fistName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role
    })
  } else {
    res.status(400);
    throw new Error('Invalid email or password');
  }
});

// @dsc     Register a new user
// route    POST /api/users/register
// @access  Public
export const registerUser = asyncHandler(async (req, res) => {
  const { firstName, lastName, email, cellPhoneNo, role, password } = req.body;
  const userExist = await User.findOne({ email });

  if (userExist) {
    res.status(400);
    throw new Error('User already exists')
  }

  const user = await User.create({
    firstName,
    lastName,
    email,
    cellPhoneNo,
    role,
    password
  });

  if (user) {
    generateToken(res, user._id);
    res.status(201).json(
      user
    );
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});

// @dsc     Get all users
// route    POST /api/users
// @access  Private
export const getAllUsers = asyncHandler(async (req, res) => {
  const page = Number(req.query.page) || 1;
  const limit = 20;
  const skip = (page - 1) * limit;

  const users = await User.find({})
    .skip(skip)
    .limit(limit);

  const total = await User.countDocuments();

  if (users.length > 0) {
    res.status(201).json({
      data: users,
      page,
      limit,
      total
    });
  } else {
    res.status(400);
    throw new Error('No users found');
  }
});

// @dsc     User logout
// route    POST /api/users
// @access  Public
export const logout = asyncHandler(async (req, res) => {
  res.cookie('jwt', ' ', {
    httpOnly: true,
    expires: new Date(0)
  });

  res.status(200).json({ success: true, message: 'User logged out' });
});

// @dsc     Get User
// route    POST /api/users/:id
// @access  Private
export const getUserById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const user = await User.findById({ _id: id });

  if (user) {
    res.status(201).json({
      data: user,
    });
  } else {
    res.status(400);
    throw new Error('');
  }
});