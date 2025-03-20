import { CREATED, NOT_FOUND, OK } from '../constants/http.codes.mjs';
import asyncHandler from 'express-async-handler';
import HttpError from '../utils/httpError.mjs';
import Cart from '../models/cartModel.mjs';

export const cartGetHandler = (Model) => asyncHandler(async (req, res, next) => {
  const document = await Model.findOne({ userId: req.user._id })
    .populate({ path: 'items.productId', select: 'productName images' });

  if (!document) {
    return next(new HttpError('Cart not found', NOT_FOUND));
  }

  res.status(OK).json(document);
});



export const cartRemoveHandler = (Model) => asyncHandler(async (req, res, next) => {
  const document = await Model.findOneAndDelete({ userId: req.user._id });

  if (!document) {
    return next(new HttpError('Cart not found', NOT_FOUND));
  }

  res.status(OK).json(document);
});

export const cartRemoveItemHandler = (Model) => asyncHandler(async (req, res, next) => {
  const document = await Model.findOneAndUpdate(
    { userId: req.user._id, 'items.productId': req.params.productId },
    { $pull: { items: { productId: req.params.productId } } },
    { new: true, runValidators: true, timestamps: true }
  );

  if (!document) {
    return next(new HttpError('Cart not found', NOT_FOUND));
  }

  // Recalculate totalPrice
  document.totalPrice = document.items.reduce(
    (acc, item) => acc + item.quantity * item.price, 0);

  await document.save();

  res.status(OK).json({ success: true, message: "Item removed", results: document });
});

export const cartUpdateQuantityHandler = async (data, user) => {
  const cart = await Cart.findOneAndUpdate(
    { userId: user._id, 'items.productId': data.productId },
    { $set: { 'items.$.quantity': data.quantity } },
    { new: true, runValidators: true, timestamps: true }
  );

  if (!cart) {
    return next(new HttpError('Cart not found', NOT_FOUND))
  }

  return cart;
};

export const cartAddHandler = (Model, ProductModel) => asyncHandler(async (req, res, next) => {
  const { _id } = req.user;

  const product = await ProductModel.findById(req.body.productId);
  if (!product) {
    return next(new HttpError('Product not found', NOT_FOUND))
  }

  const document = await Model.findOne({ userId: _id });

  if (document) {
    // Check if the product already exists in the cart
    const existingItem = document.items.find(item => item.productId.toString() === req.body.productId);

    if (existingItem) {
      // Update the quantity and recalculate totalPrice
      existingItem.quantity += Number(req.body.quantity);
    } else {
      // Add new product with price
      document.items.push({
        productId: req.body.productId,
        quantity: req.body.quantity,
        price: product.price
      });
    }

    // Recalculate totalPrice
    document.totalPrice = document.items.reduce((acc, item) => acc + item.quantity * item.price, 0);
    await document.save();

    return res.status(OK).json({
      success: true,
      message: "Cart updated",
      results: document
    });
  } else {
    // Create a new cart
    const newCart = await Model.create({
      userId: _id,
      items: [{
        productId: req.body.productId,
        quantity: req.body.quantity,
        price: product.price
      }],
      totalPrice: product.price * req.body.quantity
    });

    return res.status(CREATED).json({
      success: true,
      message: "Cart added successfully"
    });
  }
});