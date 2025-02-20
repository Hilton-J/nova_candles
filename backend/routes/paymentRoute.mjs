import express from 'express';
import { addPayment, getPayments } from '../controllers/paymentController.mjs';
import { authorizeRoles, protect } from '../middleware/authMiddleware.mjs';

const router = express.Router();

router.post('/', protect, addPayment);
router.get('/', protect, authorizeRoles('admin'), getPayments);

export default router;