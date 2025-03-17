import asyncHandler from 'express-async-handler';
import { BAD_REQUEST, CREATED } from '../constants/http.codes.mjs';

export const paymentAddHandler = (Model) => asyncHandler(async (req, res, next) => {
  const document = await Model.create({ ...req.body, userId: req.user._id });

  if (!document) {
    return next(new HttpError(`Invalid ${Model.modelName} data`, BAD_REQUEST));
  }

  res.status(CREATED).json({
    success: true,
    message: `${Model.modelName} processed`
  });
});