import { ZodError } from "zod";
import { NODE_ENV } from "../constants/env.const.mjs";
import { INTERNAL_SERVER_ERROR, NOT_FOUND, BAD_REQUEST } from "../constants/http.code.mjs";
import HttpError from "../utils/httpError.mjs";


export const notFound = (req, res, next) => { // For routes that don't exist
  // const error = new Error(`Not Found - ${req.originalUrl}`);
  // res.status(NOT_FOUND);

  const error = new HttpError(`Not Found - ${req.originalUrl}`, NOT_FOUND);
  next(error);
};

// export const errorHandler = (err, req, res, next) => { // For errors in our routes
//   // console.error(err);
//   let statusCode = res.statusCode === 200 ? err.statusCode : res.statusCode;
//   let message = err.message;

//   if (err.name === 'CastError' && err.kind === 'ObjectId') {
//     statusCode = 404;
//     message = 'Invalid ID format';
//   }

//   res.status(statusCode).json({
//     statusCode,
//     message,
//     stack: NODE_ENV === 'production' ? null : err.stack
//   });
// };
const handleZodError = (err) => {
  const errors = err.issues.map((issue) => ({
    path: issue.path.join("."),
    message: issue.message,
  }));

  return {
    statusCode: BAD_REQUEST,
    body: {
      errors,
      message: "Validation Error", // Generic message, individual messages are in the errors array
    },
  };
};

export const errorHandler = (err, req, res, next) => { // For errors in our routes
  console.error("Error =========", err);

  if (err instanceof HttpError) {
    return res.status(err.statusCode).json({
      message: err.message,
      stack: NODE_ENV === 'production' ? undefined : err.stack
    });
  }

  if (err instanceof ZodError) {
    const { statusCode, body } = handleZodError(err);
    return res.status(statusCode).json(body);
  }

  if (err.name === 'CastError' && err.kind === 'ObjectId') {
    statusCode = NOT_FOUND;
    message = 'Invalid ID format';
  }0

  res.status(INTERNAL_SERVER_ERROR).json({
    message: 'Internal Server Error',
    stack: NODE_ENV === 'production' ? null : err.stack
  });
};

