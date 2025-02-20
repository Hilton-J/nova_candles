import express from 'express'
import { deleteOrder, getAllOrders, getOrdersByCustomer, placeOrder } from '../controllers/orderController.mjs'
import { authorizeRoles, protect } from '../middleware/authMiddleware.mjs';

const router = express.Router();

router.route('/')
  .post(protect, authorizeRoles('customer'), placeOrder)
  .get(protect, authorizeRoles('admin'), getAllOrders);
router.delete('/:id', protect, authorizeRoles('admin'), deleteOrder);
router.get('/customer', protect, getOrdersByCustomer);

export default router;