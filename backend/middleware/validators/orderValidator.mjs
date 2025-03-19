import { orderSchema } from "../../schemas/orderSchema.mjs";
import validator from "./functionValidator.mjs";

const validateOrderPlacement = validator(orderSchema);
export default validateOrderPlacement;