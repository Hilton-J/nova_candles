import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.mjs';
import cookieParser from 'cookie-parser';
import { errorHandler, notFound } from './middleware/errorMiddleware.mjs';
import userRoutes from './routes/userRoute.mjs';
import productRoutes from './routes/productRoute.mjs';
import orderRoutes from './routes/orderRoute.mjs';
import paymentRoutes from './routes/paymentRoute.mjs';
import cartRoutes from './routes/cartRoute.mjs';

dotenv.config();
const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/cart', cartRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
  connectDB();
  console.log(`Server running on http://localhost:${port}`)
})

//6MNxxYy_