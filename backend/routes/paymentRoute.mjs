import express from 'express';
import { addPayment, getPayments } from '../controllers/paymentController.mjs';
import { authorizeRoles, protect } from '../middleware/authMiddleware.mjs';
import validatePayment from '../middleware/validators/paymentValidation.mjs';

const router = express.Router();

router.post('/', protect, authorizeRoles('customer'), validatePayment, addPayment);
router.get('/', protect, authorizeRoles('admin'), getPayments);

export default router;