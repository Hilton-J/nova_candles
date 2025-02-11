import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const addressSchema = mongoose.Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
  recipientName: { type: String },
  recipientCellNumber: { type: String },
  streetAddress: { type: String },
  complex: { type: String },
  suburb: { type: String },
  city: { type: String },
  province: { type: String },
  postalCode: { type: String },
});

const userSchema = mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  cellPhoneNo: { type: Number, required: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ['customer', 'admin'],
    default: 'customer',
    required: true
  },
  shipToAddress: [addressSchema],
  isActive: { type: Boolean, default: true }
}, {
  timestamps: true
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  try {
    //bcrypt.genSalt(10): Generates a salt (a random string) with 10 rounds of complexity.
    //await: Since genSalt() returns a Promise, await ensures the function waits for it to complete.
    //✅ Why? Salt ensures that even if two users have the same password, their hashes will be different.
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema);

export default User;