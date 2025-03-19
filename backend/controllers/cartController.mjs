import Cart from '../models/cartModel.mjs';
import Product from '../models/productModel.mjs';
import asyncHandler from 'express-async-handler';
import { cartGetHandler, cartRemoveHandler, cartRemoveItemHandler, cartUpdateQuantityHandler } from '../services/cartService.mjs';

export const getUserCart = cartGetHandler(Cart);
export const removeCart = cartRemoveHandler(Cart);
export const removeCartItem = cartRemoveItemHandler(Cart);
export const updateItemQuantity = cartUpdateQuantityHandler(Cart);

// @desc    Add to Cart
// route    POST /api/cart/add
// @access  Private
export const addToCart = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.body.productId);
  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }

  const cart = await Cart.findOne({ user: req.user._id });

  if (cart) {
    // Check if the product already exists in the cart
    const existingItem = cart.items.find(item => item.productId.toString() === req.body.productId);

    if (existingItem) {
      // Update the quantity and recalculate totalPrice
      existingItem.quantity += Number(req.body.quantity);
    } else {
      // Add new product with price
      cart.items.push({
        productId: req.body.productId,
        quantity: req.body.quantity,
        price: product.price
      });
    }

    // Recalculate totalPrice
    cart.totalPrice = cart.items.reduce((acc, item) => acc + item.quantity * item.price, 0);
    await cart.save();

    return res.status(200).json({ success: true, message: "Cart updated", cart });
  } else {
    // Create a new cart
    const newCart = await Cart.create({
      user: req.user._id,
      items: [{
        productId: req.body.productId,
        quantity: req.body.quantity,
        price: product.price
      }],
      totalPrice: product.price * req.body.quantity
    });

    return res.status(201).json({ success: true, message: "Cart created", cart: newCart });
  }
});
