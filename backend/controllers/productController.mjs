import Product from '../models/productModel.mjs';
import asyncHandler from 'express-async-handler';
import { CREATED, OK } from '../constants/http.codes.mjs';
import { deleteOneDoc, getAllDocs, updateOneDoc } from "../services/crudHandlerFactory.mjs";
import { addReview, createProduct, getByNameAndSize, addImage } from "../services/productService.mjs";

export const getAllProductsHandler = getAllDocs(Product);
export const deleteProductHandler = deleteOneDoc(Product);
export const updateProductHandler = updateOneDoc(Product);

export const AddImageHandler = asyncHandler(async (req, res) => {
  const product = await addImage(req.params.id, req.body.images);

  res.status(OK).json({
    success: true,
    message: `Image added successfully`,
    results: product
  });
});

export const reviewProductHandler = asyncHandler(async (req, res) => {
  const { _id } = req.user;

  const product = await addReview(req.params.id, { ...req.body, userId: _id });

  res.status(OK).json({
    success: true,
    message: `Review added successfully`,
    results: product
  });
});

export const createProductHandler = asyncHandler(async (req, res) => {
  await createProduct(req.body);

  res.status(CREATED).json({
    success: true,
    message: `Product created successfully`,
  });
});

export const getProductByNameAndSizeHandler = asyncHandler(async (req, res) => {
  const product = await getByNameAndSize(req.params.name, req.query.size);

  res.status(OK).json(product);
}) 