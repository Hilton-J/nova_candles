import mongoose from 'mongoose'

const productSchema = new mongoose.Schema({
  productName: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  size: { type: String, required: true },
  stock: { type: Number, required: true },
  type: { type: String, required: true },
  images: [String],
  reviews: [{
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    rating: { type: Number, enum: [1, 2, 3, 4, 5], required: true },
    comment: String,
    date: { type: Date, default: Date.now }
  }],
  isActive: { type: Boolean, default: true }
}, {
  timestamps: true
});

const Product = mongoose.model('Product', productSchema);

export default Product;