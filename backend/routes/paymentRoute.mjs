import express from 'express';
import { authorizeRoles, protect } from '../middleware/authMiddleware.mjs';
import validatePayment from '../middleware/validators/paymentValidation.mjs';
import { addPaymentHandler, getAllPaymentsHandler } from '../controllers/paymentController.mjs';

const router = express.Router();

router.post('/', protect, authorizeRoles('customer'), validatePayment, addPaymentHandler);
router.get('/', protect, authorizeRoles('admin'), getAllPaymentsHandler);

export default router;