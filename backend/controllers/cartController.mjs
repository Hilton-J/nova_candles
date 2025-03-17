import Cart from '../models/cartModel.mjs';
import Product from '../models/productModel.mjs';
import asyncHandler from 'express-async-handler';

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

// @desc    GET User's Cart
// route    Get /api/cart
// @access  Private
export const getUserCart = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  const userCart = await Cart.findOne({ user: userId })
    .populate({ path: 'items.productId', select: 'productName images' });

  if (userCart) {
    res.status(201).json(userCart);
  } else {
    res.status(404);
    throw Error('No cart for this user')
  }
});

// @desc    DELETE User's Cart
// route    DELETE /api/cart
// @access  Private
export const removeCart = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  const cart = await Cart.findOneAndDelete({ user: userId });

  if (cart) {
    res.status(201).json(userCart);
  } else {
    res.status(404);
    throw Error('No cart for this user')
  }
});

// @desc    DELETE Item in cart Cart
// route    DELETE /api/cart/:productId
// @access  Private
export const removeCartItem = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const { productId } = req.params;

  const cart = await Cart.findOne({ user: userId });
  if (!cart) {
    res.status(404);
    throw new Error("Cart not found");
  }

  cart.items = cart.items.filter(item => item.productId.toString() !== productId);

  // Recalculate total price
  cart.totalPrice = cart.items.reduce(
    (acc, item) => acc + (item.price || 0) * item.quantity,
    0
  );

  await cart.save();
  res.status(200).json({ success: true, message: "Item removed", results: cart });
});

// @desc    UPDATE Item quantity
// route    PATCH /api/cart/update
// @access  Private
export const updateItemQuantity = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const { productId, quantity } = req.body;

  const cart = await Cart.findOne({ user: userId });
  if (!cart) {
    res.status(404);
    throw new Error("Cart not found");
  }

  const existingItem = cart.items.find(item => item.productId.toString() === productId);

  if (!existingItem) {
    res.status(404);
    throw new Error('Item not found');
  }

  existingItem.quantity = quantity;
  // Recalculate totalPrice
  cart.totalPrice = cart.items.reduce((acc, item) => acc + item.quantity * item.price, 0);
  await cart.save();

  return res.status(200).json({ success: true, message: "Quamtity updated", cart });
});
