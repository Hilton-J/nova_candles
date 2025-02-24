//Custom Error handler
//This will handle any error that will occur in our routes custom

export const notFound = (req, res, next) => { // For routes that don't exist
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

export const errorHandler = (err, req, res, next) => { // For errors in our routes
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  let message = err.message;

  if (err.name === 'CastError' && err.kind === 'ObjectId') {
    statusCode = 404;
    message = 'Invalid ID format';
  }

  res.status(statusCode).json({
    statusCode,
    message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack
  });
};