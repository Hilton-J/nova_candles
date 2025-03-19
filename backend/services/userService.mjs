import { NOT_FOUND, OK } from "../constants/http.codes.mjs";
import asyncHandler from 'express-async-handler';

export const updateUserHandler = (Model) => asyncHandler(async (req, res, next) => {
  const document = await Model.findByIdAndUpdate(req.user._id, req.body, {
    new: true,
    runValidators: true,
    timestamps: true
  });

  if (!document) {
    return next(new HttpError(`No ${Model.modelName} found with that ID`, NOT_FOUND));
  }

  const doc = document.omitField(['jwt_secrete', 'password']);

  res.status(OK).json({
    success: true,
    message: `${Model.modelName} updated successfully`,
    results: doc
  });
});

export const getProfileHandler = () => asyncHandler(async (req, res) => {
  res.status(OK).json(req.user);
});