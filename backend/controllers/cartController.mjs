import asyncHandler from 'express-async-handler';
import Cart from '../models/cartModel.mjs';
import Product from '../models/productModel.mjs';
import { cartAddHandler, cartGetHandler, cartRemoveHandler, cartRemoveItemHandler, cartUpdateQuantityHandler } from '../services/cartService.mjs';
import { OK } from '../constants/http.codes.mjs';

export const getUserCart = cartGetHandler(Cart);
export const removeCart = cartRemoveHandler(Cart);
export const addToCart = cartAddHandler(Cart, Product);
export const removeCartItem = cartRemoveItemHandler(Cart);


export const updateItemQuantity = asyncHandler(async (req, res) => {
  const cart = await cartUpdateQuantityHandler(req.body, req.user);

  // Recalculate totalPrice
  cart.totalPrice = cart.items.reduce((acc, item) =>
    acc + Number(item.quantity * item.price), 0
  );
  await cart.save();

  return res.status(OK).json({
    success: true,
    message: "Quantity updated",
    results: cart
  });
});