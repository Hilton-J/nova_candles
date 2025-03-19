import Cart from '../models/cartModel.mjs';
import Product from '../models/productModel.mjs';
import { cartAddHandler, cartGetHandler, cartRemoveHandler, cartRemoveItemHandler, cartUpdateQuantityHandler } from '../services/cartService.mjs';

export const getUserCart = cartGetHandler(Cart);
export const removeCart = cartRemoveHandler(Cart);
export const addToCart = cartAddHandler(Cart, Product);
export const removeCartItem = cartRemoveItemHandler(Cart);
export const updateItemQuantity = cartUpdateQuantityHandler(Cart);