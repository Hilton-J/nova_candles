import express from 'express';
import {
  AddImage,
  createProduct,
  deleteProduct,
  reviewProduct,
  updateProduct,
  getAllProducts,
  getProductByNameAndSize
} from '../controllers/productController.mjs';
import { authorizeRoles, protect } from '../middleware/authMiddleware.mjs';
import { validateCreateProduct, validateImage, validateReviewProduct, validateUpdateProduct } from '../middleware/validators/productValidator.mjs';

const router = express.Router();

router.get('/', getAllProducts);
router.post('/add', protect, authorizeRoles('admin'), validateCreateProduct, createProduct);
router.patch('/review/:id', protect, authorizeRoles('customer'), validateReviewProduct, reviewProduct);
router.route('/:id')
  .get(getProductByNameAndSize)
  .put(protect, authorizeRoles('admin'), validateUpdateProduct, updateProduct)
  .delete(protect, authorizeRoles('admin'), deleteProduct)
  .patch(protect, authorizeRoles('admin'), validateImage, AddImage);

export default router;