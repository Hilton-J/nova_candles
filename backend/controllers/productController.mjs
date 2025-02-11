import asyncHandler from "express-async-handler";
import Product from '../models/productModel.mjs'

// @dsc     Add Product
// route    POST /api/products
// @access  Private
export const createProduct = asyncHandler(async (req, res) => {
  const { productName, description, price, size, stock, type } = req.body;

  const product = await Product.create({
    productName,
    description,
    price,
    size,
    stock,
    type
  });

  if (product) {
    res.status(201).json({
      success: true,
      message: 'Product added successfully!'
    })
  } else {
    res.status(400);
    throw new Error('Invalid procuct data')
  }
});

// @dsc     Get product
// route    GET /api/products
// @access  Public
export const getAllProducts = asyncHandler(async (req, res) => {
  const page = Number(req.query.page) || 1;
  const limit = 20;
  const skip = (page - 1) * limit;

  const products = await Product.find({})
    .skip(skip)
    .limit(limit);

  const totalResults = await Product.countDocuments();

  if (products.length > 0) {
    res.status(201).json({
      page,
      results: products,
      totalPages: Math.ceil(totalResults / limit),
      totalResults
    });
  } else {
    res.status(400);
    throw new Error('No products found');
  }
});

// @dsc     Get Product by ID
// route    GET /api/products/:id
// @access  Public
export const registerUser = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const product = await Product.findById({ _id: id })

  if (product) {
    res.status(201).json(product);
  } else {
    res.status(400);
    throw new Error('Error fetching product');
  }
});

