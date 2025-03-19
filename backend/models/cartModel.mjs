import mongoose from 'mongoose'

export const itemsSchema = {
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
  quantity: { type: Number, required: true, min: 1 },
  price: { type: Number, required: true }
}

const cartSchema = mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  items: [itemsSchema],
  totalPrice: { type: Number, required: true, default: 0 }
},
  { timestamps: true });

cartSchema.index({ userId: 1, 'items.productId': 1 });

const cart = mongoose.model('Cart', cartSchema);

export default cart;