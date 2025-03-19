import { loginSchema } from "../../schemas/authSchema.mjs";
import validator from "./functionValidator.mjs";

const validateLogin = validator(loginSchema);
export default validateLogin;
