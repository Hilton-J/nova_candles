import Product from '../models/productModel.mjs';
import { deleteOneDoc, getAllDocs, updateOneDoc } from "../services/crudHandlerFactory.mjs";
import { addReviewHandler, productCreateHandler, getByNameAndSizeHandler, addImageHandler } from "../services/productService.mjs";

export const AddImage = addImageHandler(Product);
export const getAllProducts = getAllDocs(Product);
export const deleteProduct = deleteOneDoc(Product);
export const updateProduct = updateOneDoc(Product);
export const reviewProduct = addReviewHandler(Product);
export const createProduct = productCreateHandler(Product);
export const getProductByNameAndSize = getByNameAndSizeHandler(Product);