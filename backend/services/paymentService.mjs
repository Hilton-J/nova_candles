import asyncHandler from 'express-async-handler';
import { BAD_REQUEST, CONFLICT, CREATED } from '../constants/http.codes.mjs';
import HttpError from '../utils/httpError.mjs';

export const paymentAddHandler = (Model) => asyncHandler(async (req, res, next) => {
  const document = await Model.create({ ...req.body, userId: req.user._id });

  //BUG: it add payment even though payment exist and it throws an error even if it doesn't exist
  const alreadyPaid = await Model.find({ userId: req.user._id, orderId: req.body.orderId });


  if (alreadyPaid) {
    return next(new HttpError(`Payment already processed`, CONFLICT));
  }

  if (!document) {
    return next(new HttpError(`Invalid ${Model.modelName} data`, BAD_REQUEST));
  }

  res.status(CREATED).json({
    success: true,
    message: `${Model.modelName} processed`
  });
});