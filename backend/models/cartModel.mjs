import mongoose from 'mongoose'

const itemsSchema = {
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
  quantity: { type: Number, required: true, min: 1 }
}

const cartSchema = mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  items: { itemsSchema },
  total: { type: Number, required: true }
}, { timestamps: true }

)