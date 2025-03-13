import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import { string } from 'zod';

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
  phoneNumber: { type: String }
});

const userSchema = mongoose.Schema({
  firstName: { type: String, required: [true, 'Please enter name'] },
  lastName: { type: String, required: [true, 'Please enter last name'] },
  email: { type: String, required: [true, 'Please enter email'], unique: true, trim: true, lowercase: true },
  phoneNumber: { type: Number, required: [true, 'Please enter cellphone number'] },
  password: { type: String, required: [true, 'Enter Password'] },
  role: {
    type: String,
    enum: ['customer', 'admin'],
    default: 'customer',
  },
  shipToAddress: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Address' }],
  isActive: { type: Boolean, default: true },
  jwt_secrete: { type: String, required: true },
  refreshToken: { type: String, default: null }
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

// Function to 
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.methods.omitField = function (fields) {
  const user = this.toObject();
  const fieldsToOmit = Array.isArray(fields) ? fields : [fields];

  fieldsToOmit.forEach((field) => { delete user[field]; });

  return user;
}

const User = mongoose.model('User', userSchema);

export default User;