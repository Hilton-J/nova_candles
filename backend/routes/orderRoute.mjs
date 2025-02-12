import express from 'express'
import { deleteOrder, getAllOrders, getOrdersByCustomer, placeOder } from '../controllers/orderController.mjs'
import { authorizeRoles, protect } from '../middleware/authMiddleware.mjs';

const router = express.Router();

router.route('/')
  .post(protect, authorizeRoles('customer'), placeOder)
  .get(protect, authorizeRoles('admin'), getAllOrders);
router.route('/:id')
  .get(protect, getOrdersByCustomer)
  .delete(protect, authorizeRoles('admin'), deleteOrder);

export default router;