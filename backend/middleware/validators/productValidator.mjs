import asyncHandler from "express-async-handler";
import { productSchema, updateProductSchema } from "../../schemas/productSchema.mjs";

/**
 * Middleware to validate the product request body.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 */
export const validateCreateProduct = asyncHandler(async (req, res, next) => {
  const result = productSchema.safeParse(req.body);

  if (!result.success) {
    return next(result.error);
  }

  req.body = result.data;
  next();
});

export const validateUpdateProduct = asyncHandler(async (req, res, next) => {
  const result = updateProductSchema.safeParse(req.body);

  if (!result.success) {
    return next(result.error);
  }

  req.body = result.data;
  next();
});

