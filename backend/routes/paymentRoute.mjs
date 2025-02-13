import express from 'express';
import { addPayment } from '../controllers/paymentController.mjs';
import { protect } from '../middleware/authMiddleware.mjs';

const router = express.Router();

router.post('/', protect, addPayment);

export default router;