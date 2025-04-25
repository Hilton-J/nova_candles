import Cart from '../models/cartModel.mjs';
import HttpError from '../utils/httpError.mjs';
import asyncHandler from 'express-async-handler';
import Product from '../models/productModel.mjs';
import { CREATED, NOT_FOUND, OK } from '../constants/http.codes.mjs';

export const getUserCartHandler = async (userId) => {
  const document = await Cart.findOne({ userId })
    .populate({ path: 'items.productId', select: 'productName images' });

  if (!document) {
    throw new HttpError('Cart not found', NOT_FOUND);
  }

  return document;
};

export const cartRemoveHandler = async (userId) => {
  const document = await Cart.findOneAndDelete({ userId });

  if (!document) {
    throw new HttpError('Cart not found', NOT_FOUND);
  }

  return document
};

export const cartRemoveItemHandler = async (productId, userId) => {
  const document = await Cart.findOneAndUpdate(
    { userId, 'items.productId': productId },
    { $pull: { items: { productId } } },
    { new: true, runValidators: true, timestamps: true }
  );

  if (!document) {
    throw new HttpError('Cart not found', NOT_FOUND);
  }

  // Recalculate totalPrice
  document.totalPrice = document.items.reduce(
    (acc, item) => acc + item.quantity * item.price, 0);

  await document.save();

  return document;
};

export const cartUpdateQuantityHandler = async (data, user) => {
  const cart = await Cart.findOneAndUpdate(
    { user, 'items.productId': data.productId },
    { $set: { 'items.$.quantity': data.quantity } },
    { new: true, runValidators: true, timestamps: true }
  );

  if (!cart) {
    throw new HttpError('Cart not found', NOT_FOUND);
  }

  cart.totalPrice = cart.items.reduce((acc, item) =>
    acc + Number(item.quantity * item.price), 0
  );

  await cart.save();

  return cart;
};

export const addCartHandler = async (itemData, userId) => asyncHandler(async (req, res, next) => {
  let statusCode;

  const product = await Product.findById(itemData.productId);
  if (!product) {
    throw new HttpError('Product not found', NOT_FOUND);
  }

  const document = await Cart.findOne({ userId });

  if (document) {
    // Check if the product already exists in the cart
    const existingItem = document.items.find(item => item.productId.toString() === itemData.productId);

    if (existingItem) {
      // Update the quantity and recalculate totalPrice
      existingItem.quantity += Number(itemData.quantity);
    } else {
      // Add new product with price
      document.items.push({
        productId: itemData.productId,
        quantity: itemData.quantity,
        price: itemData.price,
        size: itemData.size,
        productName: itemData.productName | product.productName,
        fragrance: itemData.fragrance | product.fragrance,
        image: itemData.image | product.images[0],
      });
    }

    // Recalculate totalPrice
    document.totalPrice = document.items.reduce((acc, item) => acc + item.quantity * item.price, 0);
    await document.save();
    statusCode = OK;

    return { document, statusCode }
  } else {
    // Create a new cart
    await Cart.create({
      userId,
      items: [{
        productId: itemData.productId,
        quantity: itemData.quantity,
        price: itemData.price,
        size: itemData.size,
        productName: itemData.productName | product.productName,
        fragrance: itemData.fragrance | product.fragrance,
        image: itemData.image | product.images[0]
      }],
      totalPrice: itemData.price * itemData.quantity
    });
    statusCode = CREATED;

    return { document, statusCode }
  }
});