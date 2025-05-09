import mongoose from 'mongoose';

const orderedItems = {
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  productName: { type: String, required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true }
}

const addressSchema = {
  recipientName: { type: String },
  recipientLastName: { type: String },
  recipientPhoneNumber: { type: String },
  streetAddress: { type: String },
  apartment: { type: String },
  city: { type: String },
  province: { type: String },
  postalCode: { type: String },
}

const orderSchema = new mongoose.Schema({
  orderNumber: { type: String, unique: true },
  orderDate: { type: Date, default: Date.now },
  items: [orderedItems],
  totalPrice: { type: Number, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  deliveryAddress: addressSchema,
  billingAddress: addressSchema,
  status: { type: String, enum: ['processing', 'shipped', 'completed', 'refunded', 'cancelled'], default: 'processing' }
}, {
  timestamps: true
});

orderSchema.pre('save', async function (next) {
  if (!this.orderNumber) {
    //Checks if orderNumber already set
    const currentYear = new Date().getFullYear(); //Get the current year
    const lastOrder = await mongoose.model('Order').findOne({ orderNumber: new RegExp(`^${currentYear}-`) })
      .sort({ orderNumber: -1 }) // Sort in descending order
      .exec();

    let increment = 1;
    if (lastOrder) {
      const lastOrderNumber = lastOrder.orderNumber;
      const lastIncrement = parseInt(lastOrderNumber.split('-')[2], 10);
      increment = lastIncrement + 1;
    }

    this.orderNumber = `ord-${currentYear}-${increment}`;
  }

  next();
});

const Order = mongoose.model('Order', orderSchema);

export default Order;