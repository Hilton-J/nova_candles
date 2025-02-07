import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config();

const mongoURI = process.env.MONGO_URI;

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(mongoURI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1); //1 code mean exit with failure, 0 means success
  }
};