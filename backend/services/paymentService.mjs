import { BAD_REQUEST, CONFLICT, CREATED } from '../constants/http.codes.mjs';
import asyncHandler from 'express-async-handler';
import HttpError from '../utils/httpError.mjs';

export const paymentAddHandler = (Model) => asyncHandler(async (req, res, next) => {
  const alreadyPaid = await Model.find({ userId: req.user._id, orderId: req.body.orderId });

  if (alreadyPaid) {
    return next(new HttpError('Payment already processed', CONFLICT));
  }

  const document = await Model.create({ ...req.body, userId: req.user._id });

  if (!document) {
    return next(new HttpError(`Payment data`, BAD_REQUEST));
  }

  res.status(CREATED).json({
    success: true,
    message: 'Payment processed'
  });
});