import mongoose from 'mongoose';

export const itemsSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
  quantity: { type: Number, required: true, min: 1, default: 1 },
  price: { type: Number, required: true },
  fragrance: { type: String, required: true },
  productName: { type: String, required: true },
  size: { type: String, required: true, enum: ['small', 'medium', 'large'] },
  image: { type: String, required: true },
});

const cartSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: [itemsSchema],
  totalPrice: { type: Number, required: true }
},
  { timestamps: true });

cartSchema.index({ userId: 1, 'items.productId': 1 });

const Cart = mongoose.model('Cart', cartSchema);

export default Cart;