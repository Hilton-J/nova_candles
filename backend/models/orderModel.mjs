import mongoose from 'mongoose';

const addressSchema = mongoose.Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
  recipientName: { type: String },
  recipientCellNumber: { type: String },
  streetAddress: { type: String },
  complex: { type: String },
  suburb: { type: String },
  city: { type: String },
  province: { type: String },
  postalCode: { type: String },
});

const orderSchema = new mongoose.Schema({
  orderNumber: { type: String, required: true },
  orderDate: { type: Date, required: true, default: new Date() },
  qty: { type: Number, required: true },
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  price: { type: Number, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  deliveryAdress: addressSchema
}, {
  timestamp: true
});

const order = mongoose.model('Order', orderSchema);

export default order;