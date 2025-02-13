import Payment from '../models/paymentModel.mjs';
import asyncHandler from 'express-async-handler';

//@desc    Add payment
//route    POST /api/payments
//@access  Private
export const addPayment = asyncHandler(async (req, res) => {
  const { paymentMethod, cardBrand, orderId, last4Digits, status, amount } = req.body;
  const userId = req.user._id;

  const payment = await Payment.create({
    orderId,
    userId,
    paymentMethod,
    cardBrand,
    last4Digits,
    status,
    amount
  });

  if (payment) {
    res.status(201).json({
      success: true,
      message: 'Payment proccessed'
    })
  } else {

  }
});

