import validator from "./functionValidator.mjs";
import { loginSchema } from "../../schemas/authSchema.mjs";

const validateLogin = validator(loginSchema);
export default validateLogin;
