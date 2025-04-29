import asyncHandler from 'express-async-handler';
import { OK } from '../constants/http.codes.mjs';
import { getUserCartHandler, cartRemoveHandler, cartRemoveItemHandler, cartUpdateQuantityHandler, addCartHandler } from '../services/cartService.mjs';

export const getUserCart = asyncHandler(async (req, res) => {
console.log(req.user);

  const userCart = await getUserCartHandler(req.user?._id);

  res.status(OK).json(userCart);
});

export const removeCart = asyncHandler(async (req, res) => {
  const document = await cartRemoveHandler(req.user._id);
  res.status(OK).json(document);
});

export const addToCart = asyncHandler(async (req, res) => {
  const { document, statusCode } = await addCartHandler(req.body, req.user._id);

  res.status(statusCode).json({
    success: true,
    message: "Cart created/updated",
    results: document,
  })
});

export const removeCartItem = asyncHandler(async (req, res, next) => {
  const document = await cartRemoveItemHandler(req.params.productId, req.user._id);

  res.status(OK).json({
    success: true,
    message: "Item removed",
    results: document
  });
});

export const updateItemQuantity = asyncHandler(async (req, res) => {
  const cart = await cartUpdateQuantityHandler(req.body, req.user._id);

  return res.status(OK).json({
    success: true,
    message: "Quantity updated",
    results: cart
  });
});