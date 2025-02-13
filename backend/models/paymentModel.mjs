import mongoose from 'mongoose';

const paymentSchema = new mongoose.Schema({
  orderId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Order' },
  userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
  paymentMethod: { type: String, required: true },
  cardBrand: { type: String, required: true },
  last4Digits: { type: String, required: true },
  status: { type: String, required: true },
  amount: { type: String, required: true },
}, { timestamps: true });

const payment = mongoose.model('Payment', paymentSchema);

export default payment;