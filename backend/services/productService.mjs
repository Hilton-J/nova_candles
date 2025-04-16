import { BAD_REQUEST, CONFLICT, CREATED, NOT_FOUND, OK } from '../constants/http.codes.mjs';
import asyncHandler from 'express-async-handler';
import HttpError from '../utils/httpError.mjs';
import Product from '../models/productModel.mjs';

export const productCreateHandler = (Model) => asyncHandler(async (req, res, next) => {
  const existingProduct = await Model.findOne({ productName: req.body.productName, size: req.body.size });

  if (existingProduct) {
    return next(new HttpError('Product already exists', CONFLICT))
  }

  const document = await Model.create(req.body);

  if (!document) {
    return next(new HttpError('Invalid product data', BAD_REQUEST));
  }

  res.status(CREATED).json({
    success: true,
    message: 'Product added successfully'
  });
});

export const getByNameAndSizeHandler = (Model) => asyncHandler(async (req, res, next) => {

  const document = await Model.findOne({ productName: req.params.id, size: req.query.size });

  if (!document) {
    return next(new HttpError('Product not found', NOT_FOUND));
  }

  res.status(OK).json(document);
});

export const addReviewHandler = async (productId, reviewData) => {
  const document = await Product.findOne({ _id: productId, 'reviews.userId': reviewData.userId });

  if (document) {
    throw new HttpError('Product already reviewed by this user', CONFLICT);
  }

  const updateDocument = await Product.findByIdAndUpdate(
    productId,
    {
      $push: {
        reviews: {
          userId: reviewData.userId,
          rating: reviewData.rating,
          comment: reviewData.comment
        }
      }
    },
    { new: true, runValidators: true }
  );

  if (!updateDocument) {
    throw new HttpError('Product not found', NOT_FOUND);
  }

  return updateDocument;
};

export const addImageHandler = async (productId, images) => {
  const document = await Product.findByIdAndUpdate(
    productId,
    { $push: { images } },
    { new: true, runValidators: true, timestamps: true }
  );

  if (!document) {
    throw new HttpError('Product not found', NOT_FOUND);
  }

  return document;
};