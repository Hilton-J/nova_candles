import asyncHandler from 'express-async-handler';
import HttpError from '../utils/httpError.mjs';
import { BAD_REQUEST, CREATED, NOT_FOUND, OK } from '../constants/http.codes.mjs';

export const getByCustomerHandler = (Model) => asyncHandler(async (req, res, next) => {
  const page = Number(req.query.page) || 1;
  const limit = 20;
  const skip = (page - 1) * limit;

  const documents = await Model.find({ userId: _id })
    .populate({ path: 'items', select: 'productName description price size' })
    .populate({ path: 'userId', select: 'firstName LastName email' })
    .skip(skip).
    limit(limit);

  const totalResults = await Model.countDocuments({ userId: _id });

  if (!documents) {
    return next(new HttpError(`No ${Model.modelName} found`, NOT_FOUND));
  }

  res.status(OK).json({
    page,
    results: documents,
    totalPages: Math.ceil(totalResults / limit),
    totalResults
  });
});

export const orderCreateHandler = (Model) => asyncHandler(async (req, res, next) => {
  const document = await Model.create({ ...req.body, userId: req.user._id });

  if (!document) {
    return next(new HttpError(`Invalid ${Model.modelName} data`, BAD_REQUEST));
  }

  res.status(CREATED).json({
    success: true,
    message: `${Model.modelName} placed successfully`
  });
});