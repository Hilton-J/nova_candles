import mongoose from 'mongoose'

const productSchema = new mongoose.Schema({
  productName: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  size: { type: String, required: true },
  stock: { type: Number, required: true },
  type: { type: String, required: true },
  gallery: [{
    photo: { type: String },
    main: { type: Boolean, default: false }
  }],
  isActive: { type: Boolean, default: true }
}, {
  timestamps: true
});

const Product = mongoose.model('Product', productSchema);

export default Product;