import Order from '../models/orderModel.mjs';
import HttpError from '../utils/httpError.mjs';
import { BAD_REQUEST, NOT_FOUND } from '../constants/http.codes.mjs';

export const getOrdersByCustomer = async (page, userId, limit) => {
  const skip = (page - 1) * limit;

  const document = await Order.find({ userId })
    .populate({
      path: 'items',
      select: 'productName description price size'
    })
    .populate({
      path: 'userId',
      select: 'firstName LastName email'
    })
    .skip(skip).
    limit(limit);

  if (!document) {
    throw new HttpError(`No orders found for this user`, NOT_FOUND);
  }

  const totalResults = await Order.countDocuments({ userId });

  return { document, totalResults };
};

export const createOrder = async (orderData) => {
  const document = await Order.create(orderData);

  if (!document) {
    throw new HttpError(`Invalid order data`, BAD_REQUEST);
  }

  return document;
};