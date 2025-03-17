import asyncHandler from 'express-async-handler';
import paymentSchema from '../../schemas/paymentSchema.mjs';

const validatePayment = asyncHandler(async (req, res, next) => {
  const result = paymentSchema.safeParse(req.body);

  if (!result.success) {
    return next(result.error);
  }

  req.body = result.data;
  next();
});

export default validatePayment;