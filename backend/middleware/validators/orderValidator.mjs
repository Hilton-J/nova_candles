import validator from "./functionValidator.mjs";
import { orderSchema } from "../../schemas/orderSchema.mjs";

const validateOrderPlacement = validator(orderSchema);
export default validateOrderPlacement;