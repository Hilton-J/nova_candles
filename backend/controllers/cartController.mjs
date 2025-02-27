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
    throw new Error('Product not founda')
  }

  const cart = await Cart.findOne({ user: userId });

  //Check if the user has an existing cart
  if (cart) {
    const existingItem = cart.items.find(
      item => item.productId.toString() === productId
    );

    //Check if the item existing in the cart. If not, add into the cart
    if (existingItem) {
      existingItem.quantity += Number(quantity);
    } else {
      cart.items.push({
        productId,
        quantity
      })
    }

    cart.totalPrice = cart.items.reduce((acc, item) => {
      return acc + (product.price * item.quantity);
    }, 0);

    await cart.save();

    res.status(200).json({
      success: true,
      message: 'Cart updated',
      results: cart
    })
  } else {
    const totalPrice = product.price * quantity;
    const createCart = await Cart.create({
      user: userId,
      items: [{ productId, quantity }],
      totalPrice
    });

    if (createCart) {
      res.status(201).json({
        success: true,
        message: 'Cart Created',
        results: createCart
      })
    } else {
      res.status(500);
      throw new Error('Error creating cart');
    }
  }
});

// @desc    GET User's Cart
// route    Get /api/cart
// @access  Private
export const getUserCart = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  const userCart = Cart.findOne({ user: userId })
    .populate({ path: 'items.productId', select: 'productName price' });

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

