import asyncHandler from 'express-async-handler';
import HttpError from '../utils/httpError.mjs';
import { NOT_FOUND, OK } from '../constants/http.codes.mjs';

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

  res.status(OK).json({ success: true, message: "Item removed", results: cart });
});

export const cartUpdateQuantityHandler = (Model) => asyncHandler(async (req, res, next) => {
  const document = await Model.findOneAndUpdate(
    { userId: req.user._id, 'items.productId': req.body.productId },
    { $set: { 'items.$.quantity': req.body.quantity } },
    { new: true, runValidators: true, timestamps: true }
  );

  if (!document) {
    return next(new HttpError('Cart not found', NOT_FOUND))
  }

  document.totalPrice = document.items.reduce((acc, item) => acc + Number(item.quantity * item.price), 0);

  await document.save();

  return res.status(OK).json({ success: true, message: "Quantity updated", document });
});