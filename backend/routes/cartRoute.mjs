import express from 'express';
import { addToCart, getUserCart, removeCart, removeCartItem } from '../controllers/cartController.mjs';
import { authorizeRoles, protect } from '../middleware/authMiddleware.mjs';


const router = express.Router();

router.route('/')
  .get(protect, authorizeRoles('customer'), getUserCart)
  .delete(protect, removeCart);
router.post('/add', protect, authorizeRoles('customer'), addToCart);
router.delete('/:id', protect, authorizeRoles('customer'), removeCartItem);

export default router;