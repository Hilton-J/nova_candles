import asyncHandler from "express-async-handler";
import user from '../models/userModel.mjs'
import generateToken from '../utils/generateToken.mjs'

export const login = asyncHandler(async (req,res) => {
  const {email, password} = req.body;

  const user = await User.findOne({email})
})