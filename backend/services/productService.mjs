import { BAD_REQUEST, CONFLICT, CREATED, NOT_FOUND, OK } from '../constants/http.codes.mjs';
import asyncHandler from 'express-async-handler';
import HttpError from '../utils/httpError.mjs';

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

export const addReviewHandler = (Model) => asyncHandler(async (req, res, next) => {
  const document = await Model.findOne({ _id: req.params.id, 'reviews.userId': req.user._id });

  if (document) {
    throw new HttpError('Product already reviewed by this user', CONFLICT);
  }

  const updateDocument = await Model.findByIdAndUpdate(
    req.params.id,
    {
      $push: {
        reviews: {
          userId: req.user._id,
          rating: req.body.rating,
          comment: req.body.comment
        }
      }
    },
    { new: true, runValidators: true }
  );

  if (!updateDocument) {
    return next(new HttpError('Product not found', NOT_FOUND));
  }

  res.status(OK).json({
    success: true,
    message: `Review added successfully`,
    results: updateDocument
  });
});

export const addImageHandler = (Model) => asyncHandler(async (req, res, next) => {
  const document = await Model.findByIdAndUpdate(
    req.params.id,
    {
      $push: {
        images: req.body.images
      }
    },
    { new: true, runValidators: true, timestamps: true }
  );

  if (!document) {
    return next(new HttpError('Product not found', NOT_FOUND));
  }

  res.status(OK).json({
    success: true,
    message: `Image added successfully`,
    results: document
  });
});