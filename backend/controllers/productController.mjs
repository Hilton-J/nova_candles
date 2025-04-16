import Product from '../models/productModel.mjs';
import asyncHandler from 'express-async-handler';
import { deleteOneDoc, getAllDocs, updateOneDoc } from "../services/crudHandlerFactory.mjs";
import { addReviewHandler, productCreateHandler, getByNameAndSizeHandler, addImageHandler } from "../services/productService.mjs";
import { OK } from '../constants/http.codes.mjs';

export const getAllProducts = getAllDocs(Product);
export const deleteProduct = deleteOneDoc(Product);
export const updateProduct = updateOneDoc(Product);

export const AddImage = asyncHandler(async (req, res) => {
  const product = await addImageHandler(req.params.id, req.body.images);

  res.status(OK).json({
    success: true,
    message: `Image added successfully`,
    results: product
  });
});

export const reviewProduct = asyncHandler(async (req, res) => {
  const { _id } = req.user;

  const product = await addReviewHandler(req.params.id, { ...req.body, userId: _id });

  res.status(OK).json({
    success: true,
    message: `Review added successfully`,
    results: product
  });
});

export const createProduct = productCreateHandler(Product);
export const getProductByNameAndSize = getByNameAndSizeHandler(Product);