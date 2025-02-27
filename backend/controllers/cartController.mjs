import Cart from '../models/cartModel.mjs';
import Product from '../models/productModel.mjs';
import asyncHandler from 'express-async-handler';

// @desc    Add to Cart
// route    POST /api/cart/add
// @access  Private
export const addToCart = asyncHandler(async (req, res) => {
  const { productId, quantity } = req.body;
  const userId = req.user._id;

  const cart = await Cart.findOne({ user: userId });
  const product = await Product.findById(productId);


  //Check if the user has an existing cart
  if (cart) {
    const existingItem = await cart.items.find(
      item => item.productId.toString() === productId
    );

    //Check if the item existing in the cart. If not, add into the cart
    if (existingItem) {
      existingItem.quantity += Number(quantity);
    } else {
      await cart.items.push({
        productId,
        quantity
      })
    }

    cart.totalPrice = cart.items.reduce((acc, item) => {
      return acc + (product.price * item.quantity);
    }, 0);

    await cart.save();
  } else {
    const totalPrice = product.price * quantity;
    const createCart = await Cart.create({
      user: userId,
      items: { productId, quantity },
      totalPrice
    });
  }
});

// @desc    GET User's Cart
// route    Get /api/cart
// @access  Private
export const getUserCart = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  const userCart = await Cart.findOne({ user: userId })
    .populate({ path: 'items.productId', select: 'productName price' });

  if (userCart) {
    res.status(201).json(userCart);
  } else {
    res.status(404);
    throw Error('No cart for this user')
  }
});

