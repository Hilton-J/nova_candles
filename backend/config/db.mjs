import mongoose from 'mongoose'
import { MONGO_URI } from '../constants/env.const.mjs'

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1); //1 code mean exit with failure, 0 means success
  }
};