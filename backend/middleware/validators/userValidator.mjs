import validator from "./functionValidator.mjs";
import addressSchema from "../../schemas/addressSchema.mjs";
import updateUserSchema from "../../schemas/updateUserSchema.mjs";

export const validateUpdateUser = validator(updateUserSchema);
export const validateShippingAddress = validator(addressSchema);
