import asyncHandler from "express-async-handler";
import { orderSchema } from "../../schemas/orderSchema.mjs";

/**
 * Middleware to validate the product request body.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 */
const validateOrderPlacement = asyncHandler(async (req, res, next) => {
  const result = orderSchema.safeParse(req.body);

  if (!result.success) {
    return next(result.error);
  }

  req.body = result.data;

  next();
});

export default validateOrderPlacement;