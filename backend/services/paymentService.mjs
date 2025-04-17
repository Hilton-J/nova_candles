import HttpError from '../utils/httpError.mjs';
import Payment from '../models/paymentModel.mjs';
import { BAD_REQUEST, CONFLICT } from '../constants/http.codes.mjs';

export const addPayment = async (userId, paymentData) => {
  const alreadyPaid = await Payment.find({ userId, orderId: paymentData.orderId });

  if (alreadyPaid) {
    throw new HttpError('Payment already processed', CONFLICT);
  }

  const document = await Payment.create({ ...paymentData, userId });

  if (!document) {
    throw new HttpError(`Payment data`, BAD_REQUEST);
  }

  return document;
};