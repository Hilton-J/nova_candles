import mongoose from 'mongoose';

const paymentSchema = new mongoose.Schema({
  orderId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Order' },
  userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
  paymentMethod: { type: String, required: true },
  cardBrand: { type: String, required: true },
  last4Digits: { type: String, required: true },
  status: { type: String, required: true },
  amount: { type: Number, required: true },
}, { timestamps: true });

const Payment = mongoose.model('Payment', paymentSchema);

export default Payment;