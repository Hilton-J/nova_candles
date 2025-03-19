import { registerSchema } from "../../schemas/authSchema.mjs";
import validator from "./functionValidator.mjs";

const validateRegister = validator(registerSchema);
export default validateRegister;
