import User from "../models/userModel.mjs";
import { NOT_FOUND } from "../constants/http.codes.mjs";

export const updateUserHandler = async (user, userData) => {
  const document = await User.findByIdAndUpdate(user, userData, {
    new: true,
    runValidators: true,
    timestamps: true
  });

  if (!document) {
    throw new HttpError(`No user found with that ID`, NOT_FOUND);
  }

  return document;
};

//TODO: Zod validate required
export const addAddress = async (user, addressData) => {
  const document = await User.findByIdAndUpdate(
    user,
    { $push: { shipToAddress: addressData } },
    { new: true, runValidators: true, timestamps: true }
  );

  if (!document) {
    throw new HttpError("Please login!", NOT_FOUND);
  }

  return document;
}