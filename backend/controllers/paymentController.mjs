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
    res.status(400);
  }
});


//@desc    Add payment
//route    GET /api/payments
//@access  Private
export const getPayments = asyncHandler(async (req, res) => {
  const page = Number(req.query.page);
  const limit = 20;
  const skip = (page - 1) * limit;

  const payments = await Payment.find({})
    .skip(skip)
    .limit(limit);

  const totalResults = await Payment.countDocuments();

  if (payments > 0) {
    res.status(201).json({
      page,
      results: payments,
      totalPages: Math.ceil(totalResults / limit),
      totalResults
    });
  } else {
    res.status(404);
    throw new Error('No payments found');
  }
})