import asyncHandler from "express-async-handler";
import { loginSchema } from "../../schemas/authSchema.js";

/**
 * Middleware to validate the login request body.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 */

const validateLogin = asyncHandler(async (req, res, next) => {
  // Parse and validate the request body against the schema
  const result = loginSchema.safeParse(req.body);

  if (!result.success) {
    return next(result.error); // Pass error to the error handler
  }

  // If validation passes, attach validated data to req.body
  req.body = result.data;

  next(); // Proceed to the next middleware/handler if validation passes
});

export default validateLogin;
