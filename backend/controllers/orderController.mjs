import asyncHandler from 'express-async-handler';
import Order from '../models/orderModel.mjs';
import { getAllDocs } from '../services/crudHandlerFactory.mjs';
import { BAD_REQUEST, CREATED, NOT_FOUND, OK } from '../constants/http.codes.mjs';

//@desc    Purchase
//route    POST /api/orders
//@access  Private
export const placeOrder = asyncHandler(async (req, res) => {
  const { items, totalPrice, deliveryAddress, billingAddress } = req.body;

  const userId = req.user._id;
  const order = await Order.create({
    items,
    totalPrice,
    userId,
    deliveryAddress,
    billingAddress
  });

  if (order) {
    res.status(CREATED).json({
      success: true,
      message: 'Order placed successfully'
    })
  } else {
    res.status(BAD_REQUEST);
    throw new Error('Invalid order data')
  }
});

//@desc    Get All orders
//route    GET /api/orders
//@access  Private
export const getAllOrders = getAllDocs(Order);

//@desc    Get orders by Customer
//route    GET /api/orders
//@access  Private
export const getOrdersByCustomer = asyncHandler(async (req, res) => {
  const { _id } = req.user;

  const page = Number(req.query.page) || 1;
  const limit = 20;
  const skip = (page - 1) * limit;

  const orders = await Order.find({ userId: _id })
    .populate({ path: 'items', select: 'productName description price size' })
    .populate({ path: 'userId', select: 'firstName LastName email' })
    // .populate({ path: 'deliveryAddress', select: 'recipientName recipientCellNumber streetAddress complex suburb city province pastalCode' })
    .skip(skip).
    limit(limit);

  const totalResults = await Order.countDocuments({ userId: _id });

  if (orders.length > 0) {
    res.status(OK).json({
      page,
      results: orders,
      totalPages: Math.ceil(totalResults / limit),
      totalResults
    });
  } else {
    res.status(NOT_FOUND);
    throw new Error('No orders found');
  }
});

//@desc    Delete Order
//route    DELETE /api/orders/:id
//@access  Private
export const deleteOrder = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const order = await Order.findByIdAndDelete(id);

  if (order) {
    res.status(OK).json({
      success: true,
      message: 'Order deleted successfully'
    })
  } else {
    res.status(NOT_FOUND);
    throw new Error('Order not found');
  }
});