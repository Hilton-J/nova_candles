import mongoose from 'mongoose'

const productSchema = new mongoose.Schema({
  productName: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Double, required: true },
  size: { type: String, required: true },
  stock: { type: Number, required: true },
  type: { type: String, required: true },
  gallery: [{
    photo: { type: String },
    main: { type: Boolean, default: false }
  }],
}, {
  timestamps: true
});

const Product = mongoose.model('Product', productSchema);

export default Product;