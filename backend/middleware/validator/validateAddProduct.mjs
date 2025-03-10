import asyncHandler from "express-async-handler";
import productSchema from "../../schemas/insertProductSchema.mjs";

/**
 * Middleware to validate the product request body.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 */
const validateCreateProduct = asyncHandler(async (req, res, next) => {
  const result = productSchema.safeParse(req.body);

  console.log('====== Result ====== ', result)
  if (!result.success) {
    return next(result.error);
  }

  req.body = result.data;

  next();
});

export default validateCreateProduct;