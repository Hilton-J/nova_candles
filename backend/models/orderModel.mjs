import mongoose from 'mongoose';
import { itemsSchema } from './cartModel.mjs';

const orderSchema = new mongoose.Schema({
  orderNumber: { type: String, unique: true },
  orderDate: { type: Date, default: Date.now },
  items: [itemsSchema],
  totalPrice: { type: Number, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  deliveryAddress: { type: mongoose.Schema.Types.ObjectId, ref: 'Address', required: true },
  billingAddress: {
    type: mongoose.Schema.Types.ObjectId, ref: 'Address', required: true
  }
}, {
  timestamps: true
});

orderSchema.pre('save', async function (next) {
  if (!this.orderNumber) {
    //Checks if orderNumber already set
    const currentYear = new Date().getFullYear(); //Get the current year
    const lastOrder = await mongoose.model('Order').findOne({ orderNumber: new RegExp(`^${currentYear}_`) })
      .sort({ orderNumber: -1 }) // Sort in descending order
      .exec();

    let increment = 1;
    if (lastOrder) {
      const lastOrderNumber = lastOrder.orderNumber;
      const lastIncrement = parseInt(lastOrderNumber.split('_')[1], 10);
      increment = lastIncrement + 1;
    }

    this.orderNumber = `${currentYear}_${increment}`;
  }

  next();
});

const Order = mongoose.model('Order', orderSchema);

export default Order;