import { itemSchema } from "../../schemas/cartSchema.mjs";
import validator from "./functionValidator.mjs";

const validateCart = validator(itemSchema);
export default validateCart;