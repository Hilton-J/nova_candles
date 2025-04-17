import validator from "./functionValidator.mjs";
import { itemSchema } from "../../schemas/cartSchema.mjs";

const validateCart = validator(itemSchema);
export default validateCart;