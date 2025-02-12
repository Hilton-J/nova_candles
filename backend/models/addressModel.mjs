import mongoose from 'mongoose';

const addressSchema = mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  recipientName: { type: String },
  recipientCellNumber: { type: String },
  streetAddress: { type: String },
  complex: { type: String },
  suburb: { type: String },
  city: { type: String },
  province: { type: String },
  postalCode: { type: String },
  defaultAddress: { type: Boolean, default: false }
});

const address = mongoose.model('Address', addressSchema);

export default address;