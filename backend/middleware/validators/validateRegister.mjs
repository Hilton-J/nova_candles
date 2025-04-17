import validator from "./functionValidator.mjs";
import { registerSchema } from "../../schemas/authSchema.mjs";

const validateRegister = validator(registerSchema);
export default validateRegister;
