import mongoose from 'mongoose'

export const itemsSchema = {
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
  quantity: { type: Number, required: true, min: 1 },
  price: { type: Number, required: true }
}

const cartSchema = mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  items: [itemsSchema],
  totalPrice: { type: Number, required: true }
},
  { timestamps: true })

const cart = mongoose.model('Cart', cartSchema);

export default cart;