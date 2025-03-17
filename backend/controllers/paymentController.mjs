import Payment from '../models/paymentModel.mjs';
import { getAllDocs } from '../services/crudHandlerFactory.mjs';
import { paymentAddHandler } from '../services/paymentService.mjs';

export const addPayment = paymentAddHandler(Payment); //TODO: Testing && Validation
export const getPayments = getAllDocs(Payment);