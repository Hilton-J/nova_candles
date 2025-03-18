import Cart from '../models/cartModel.mjs';
import Product from '../models/productModel.mjs';
import asyncHandler from 'express-async-handler';
import { cartGetHandler, cartRemoveHandler, cartRemoveItemHandler, cartUpdateQauntity } from '../services/cartService.mjs';

export const getUserCart = cartGetHandler(Cart);
export const removeCart = cartRemoveHandler(Cart);
export const removeCartItem = cartRemoveItemHandler(Cart);
export const updateItemQuantity = cartUpdateQauntity(Cart); //BUG: It overwrites the items array 

// @desc    Add to Cart
// route    POST /api/cart/add
// @access  Private
export const addToCart = asyncHandler(async (req, res) => {
  const { productId, quantity } = req.body;
  const userId = req.user._id;

  const product = await Product.findById(productId);
  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }

  const cart = await Cart.findOne({ user: userId });

  if (cart) {
    // Check if the product already exists in the cart
    const existingItem = cart.items.find(item => item.productId.toString() === productId);

    if (existingItem) {
      // Update the quantity and recalculate totalPrice
      existingItem.quantity += Number(quantity);
    } else {
      // Add new product with price
      cart.items.push({ productId, quantity, price: product.price });
    }

    // Recalculate totalPrice
    cart.totalPrice = cart.items.reduce((acc, item) => acc + item.quantity * item.price, 0);
    await cart.save();

    return res.status(200).json({ success: true, message: "Cart updated", cart });
  } else {
    // Create a new cart
    const newCart = await Cart.create({
      user: userId,
      items: [{ productId, quantity, price: product.price }],
      totalPrice: product.price * quantity
    });

    return res.status(201).json({ success: true, message: "Cart created", cart: newCart });
  }
});
