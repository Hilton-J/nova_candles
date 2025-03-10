import asyncHandler from "express-async-handler";
import HttpError from "../utils/httpError.mjs";
import { NOT_FOUND, OK, NO_CONTENT } from "../constants/http.code.mjs";
import { model } from "mongoose";

//works
const deleteOneDoc = (Model) =>
  asyncHandler(async (req, res, next) => {
    const document = await Model.findByIdAndDelete(req.params.id);

    if (!document) {
      return next(new HttpError("No document found with that ID", NOT_FOUND));
    }

    res.status(OK).json({
      status: "doc deleted successfully",
    });
  });

//to be finished.
const updateOneDoc = (Model) =>
  asyncHandler(async (req, res, next) => {
    const document = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!document) {
      return next(new HttpError("No document found with that ID", NOT_FOUND));
    }

    res.status(OK).json({
      status: "doc updated successfully",
      data: {
        data: document,
      },
    });
  });

//works
const getOneDoc = (Model) =>
  asyncHandler(async (req, res, next) => {
    const doc = await Model.findById(req.params.id);

    if (!doc) {
      return next(new HttpError("No document found with that ID", NOT_FOUND));
    }

    res.status(OK).json({
      status: "success",
      id: req.params.id,
      data: doc,
    });
  });

//works
const getAllDocs = (Model) =>
  asyncHandler(async (req, res, next) => {
    const page = Number(req.query.page) || 1;
    const limit = 20;
    const skip = (page - 1) * limit;

    let query = Model.find().skip(skip).limit(limit);
    if (Model.modelName === "User") {
      query = query.select("-password -jwt_secrete"); // Exclude fields using Mongoose's select()
    }

    const doc = await query;

    const totalResults = await Model.countDocuments();

    if (!doc.length) {
      return next(new HttpError('No data found', NOT_FOUND));
    }

    res.status(OK).json({
      page,
      results: doc,
      totalPages: Math.ceil(totalResults / limit),
      totalResults
    });
  });

export { getAllDocs, updateOneDoc, deleteOneDoc, getOneDoc };
