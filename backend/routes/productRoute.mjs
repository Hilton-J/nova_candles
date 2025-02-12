import express from 'express';
import { createProduct, deactivateProduct, deleteProduct, getAllProducts, getProductById, reviewProduct, updateProduct } from '../controllers/productController.mjs';
import { authorizeRoles, protect } from '../middleware/authMiddleware.mjs';

const router = express.Router();

router.get('/', getAllProducts);
router.post('/add', protect, authorizeRoles('admin'), createProduct);
router.patch('/review/:id', protect, authorizeRoles('customer'), reviewProduct)
router.route('/:id')
  .get(getProductById)
  .put(protect, authorizeRoles('admin'), updateProduct)
  .delete(protect, authorizeRoles('admin'), deleteProduct)
  .patch(protect, authorizeRoles('admin'), deactivateProduct);

export default router;
