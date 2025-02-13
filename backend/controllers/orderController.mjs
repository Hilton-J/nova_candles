import asyncHandler from 'express-async-handler';
import Order from '../models/orderModel.mjs';

//@desc    Purchase
//route    POST /api/orders
//@access  Private
export const placeOder = asyncHandler(async (req, res) => {
  const { orderNumber, qty, items, totalAmount, deliveryAddress } = req.body;

  const userId = req.user._id;
  const order = await Order.create({
    orderNumber,
    qty,
    items,
    totalAmount,
    userId,
    deliveryAddress
  });

  if (order) {
    res.status(201).json({
      success: true,
      message: 'Order placed successfully'
    })
  } else {
    res.status(404);
    throw new Error('Invalid order data')
  }
});

//@desc    Get All orders
//route    GET /api/orders
//@access  Private
export const getAllOrders = asyncHandler(async (req, res) => {
  const page = Number(req.query.page) || 1;
  const limit = 20;
  const skip = (page - 1) * limit;

  const orders = await Order.find({})
    .populate({ path: 'items', select: 'productName description price size' })
    // .populate({ path: 'userId', select: 'firstName LastName email' })
    // .populate({ path: 'deliveryAddress', select: 'recipientName recipientCellNumber streetAddress complex suburb city province pastalCode' })
    .skip(skip).
    limit(limit);

  const totalResults = await Order.countDocuments();

  if (orders.length > 0) {
    res.status(201).json({
      page,
      results: orders,
      totalPages: Math.ceil(totalResults / limit),
      totalResults
    });
  } else {
    res.status(404);
    throw new Error('No orders found');
  }
});

//@desc    Get orders by Customer
//route    GET /api/orders/:id
//@access  Private
export const getOrdersByCustomer = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const page = Number(req.query.page) || 1;
  const limit = 20;
  const skip = (page - 1) * limit;

  const orders = await Order.find({ userId: id })
    .populate({ path: 'items', select: 'productName description price size' })
    .populate({ path: 'userId', select: 'firstName LastName email' })
    // .populate({ path: 'deliveryAddress', select: 'recipientName recipientCellNumber streetAddress complex suburb city province pastalCode' })
    .skip(skip).
    limit(limit);

  const totalResults = await Order.countDocuments({ userId: id });

  if (orders.length > 0) {
    res.status(201).json({
      page,
      results: orders,
      totalPages: Math.ceil(totalResults / limit),
      totalResults
    });
  } else {
    res.status(404);
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
    res.status(201).json({
      success: true,
      message: 'Order deleted successfully'
    })
  } else {
    res.status(404);
    throw new Error('Order not found');
  }
});