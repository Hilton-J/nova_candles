import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const customerSchema = mongoose.Schema({
  fullName: {
    type: String,
    required: true
  },
  emailAddress: {
    type: String,
    required: true
  },
  cellPhone: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
}, {
  timestamps: true
})