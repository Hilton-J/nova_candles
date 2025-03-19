import paymentSchema from '../../schemas/paymentSchema.mjs';
import validator from './functionValidator.mjs';

const validatePayment = validator(paymentSchema);
export default validatePayment;