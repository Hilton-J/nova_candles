import express from 'express';
import { addToCart, getUserCart } from '../controllers/cartController.mjs';
import { authorizeRoles, protect } from '../middleware/authMiddleware.mjs';


const router = express.Router();

router.get('/', protect, authorizeRoles('customer'), getUserCart);
router.post('/add', protect, authorizeRoles('customer'), addToCart);

export default router;