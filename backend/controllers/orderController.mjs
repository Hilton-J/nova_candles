import Order from '../models/orderModel.mjs';
import asyncHandler from 'express-async-handler';
import { CREATED, OK } from '../constants/http.codes.mjs';
import { deleteOneDoc, getAllDocs } from '../services/crudHandlerFactory.mjs';
import { getOrdersByCustomer, createOrder } from '../services/orderService.mjs';

export const getAllOrdersHandler = getAllDocs(Order);
export const deleteOrderHandler = deleteOneDoc(Order);

export const placeOrderHandler = asyncHandler(async (req, res) => {
  await createOrder({ ...req.body, userId: req.user._id })

  res.status(CREATED).json({
    success: true,
    message: 'Order placed successfully'
  });
});

export const getOrdersByCustomerHandler = asyncHandler(async (req, res) => {
  const page = Number(req.query.page) || 1;

  const { document, totalResults } = await getOrdersByCustomer(page, req.user._id);

  res.status(OK).json({
    page,
    results: document,
    totalPages: Math.ceil(totalResults / limit),
    totalResults
  });
});