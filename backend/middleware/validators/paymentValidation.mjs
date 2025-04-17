import validator from './functionValidator.mjs';
import paymentSchema from '../../schemas/paymentSchema.mjs';

const validatePayment = validator(paymentSchema);
export default validatePayment;