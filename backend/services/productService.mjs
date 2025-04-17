import HttpError from '../utils/httpError.mjs';
import Product from '../models/productModel.mjs';
import { BAD_REQUEST, CONFLICT, NOT_FOUND } from '../constants/http.codes.mjs';

export const createProduct = async (productData) => {
  const existingProduct = await Product.findOne({ productName: productData.productName, size: productData.size });

  if (existingProduct) {
    throw new HttpError('Product already exists', CONFLICT);
  }

  const document = await Product.create(productData);

  if (!document) {
    return next(new HttpError('Invalid product data', BAD_REQUEST));
  }

  return document;
};

export const getByNameAndSize = async (name, size) => {

  const document = await Product.findOne({ productName: name, size });

  if (!document) {
    throw new HttpError('Product not found', NOT_FOUND);
  }

  return document;
};

export const addReview = async (productId, reviewData) => {
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

export const addImage = async (productId, images) => {
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