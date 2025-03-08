import asyncHandler from "express-async-handler";
import HttpError from "../utils/httpError.js";
import { NOT_FOUND, OK, NO_CONTENT } from "../constants/http.codes.js";

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
    const doc = await Model.find();

    res.status(OK).json({
      status: "success",
      result: doc.length,
      data: {
        data: doc,
      },
    });
  });

export { getAllDocs, updateOneDoc, deleteOneDoc, getOneDoc };
