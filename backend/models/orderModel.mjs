import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  orderNumber: { type: String, required: true, unique: true },
  orderDate: { type: Date, default: Date.now },
  qty: { type: Number, required: true },
  items: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true }],
  price: { type: Number, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  deliveryAddress: { type: mongoose.Schema.Types.ObjectId, ref: 'Address', required: true }
}, {
  timestamp: true
});

const order = mongoose.model('Order', orderSchema);

export default order;