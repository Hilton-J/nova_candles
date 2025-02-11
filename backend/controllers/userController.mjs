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
    res.status(201).json({ success: true, message: `Welcome, ${firstName} ${lastName}!` });
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

  const totalResults = await User.countDocuments();

  if (users.length > 0) {
    res.status(201).json({
      page,
      results: users,
      totalPages: Math.ceil(totalResults / limit),
      totalResults
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
// route    GET /api/users/:id
// @access  Private
export const getUserById = asyncHandler(async (req, res) => {
  const user = {
    _id: req.user._id,
    fistName: req.user.firstName,
    lastName: req.user.lastName,
    email: req.user.email,
    role: req.user.role
  };

  res.status(201).json(user);
});

// @dsc     Update user
// route    POST /api/users/profile
// @access  Private
export const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.firstName = req.body.firstName || user.firstName;
    user.lastName = req.body.lastName || user.lastName;
    user.email = req.body.email || user.email;
    user.cellPhoneNo = req.body.cellPhoneNo || user.cellPhoneNo;
    user.shipToAddress = req.body.shipToAddress || user.shipToAddress;
    user.isActive = req.body.isActive || user.isActive;
    user.role = req.body.role || user.role;

    if (req.body.password) user.password = req.body.password

    const updatedUser = await user.save();

    res.status(200).json({ success: true, message: `User updated successfully` });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// @desc    Delete user
// route    DELETE /api/users/:id
// @access  Private
export const deleteUser = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const user = await User.findByIdAndDelete(id);

  if (user) {
    res.status(200).json({
      success: true,
      message: `${user.firstName} ${user.lastName} deleted successfully!`
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});
