import Payment from '../models/paymentModel.mjs';
import asyncHandler from 'express-async-handler';
import { CREATED } from '../constants/http.codes.mjs';
import { addPayment } from '../services/paymentService.mjs';
import { getAllDocs } from '../services/crudHandlerFactory.mjs';

export const getAllPaymentsHandler = getAllDocs(Payment);
export const addPaymentHandler = asyncHandler(async (req, res) => {
  await addPayment(req.user._id, req.body);

  res.status(CREATED).json({
    success: true,
    message: 'Payment processed'
  });
}) 