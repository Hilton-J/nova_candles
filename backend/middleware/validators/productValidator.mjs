import { imageScheme, productSchema, reviewProductSchema, updateProductSchema } from "../../schemas/productSchema.mjs";
import validator from "./functionValidator.mjs";

export const validateUpdateProduct = validator(updateProductSchema);
export const validateReviewProduct = validator(reviewProductSchema);
export const validateCreateProduct = validator(productSchema);
export const validateImage = validator(imageScheme);