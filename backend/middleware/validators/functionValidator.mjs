import asyncHandler from "express-async-handler";

const validator = (schema) => asyncHandler(async (req, res, next) => {
  const result = schema.safeParse(req.body);

  if (!result.success) {
    return next(result.error);
  }

  req.body = result.data;
  next();
});

export default validator;