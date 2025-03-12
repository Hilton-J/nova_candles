import express from 'express';
import { createProduct, deactivateProduct, deleteProduct, getAllProducts, getProductById, getProductByNameAndSize, reviewProduct, updateProduct } from '../controllers/productController.mjs';
import { authorizeRoles, protect } from '../middleware/authMiddleware.mjs';
import { validateCreateProduct, validateReviewProduct, validateUpdateProduct } from '../middleware/validators/productValidator.mjs';

const router = express.Router();

router.get('/', getAllProducts);
router.post('/add', protect, authorizeRoles('admin'), validateCreateProduct, createProduct);
router.patch('/review/:id', protect, authorizeRoles('customer'), validateReviewProduct, reviewProduct);
router.route('/:id')
  .get(getProductById)
  .put(protect, authorizeRoles('admin'), validateUpdateProduct, updateProduct)
  .delete(protect, authorizeRoles('admin'), deleteProduct)
  .patch(protect, authorizeRoles('admin'), deactivateProduct);
// router.get('/:name/:size', getProductByNameAndSize);

export default router;
