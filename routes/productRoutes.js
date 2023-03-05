const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const authMiddleware = require('../middlewares/authMiddleware');

// Create a new product
router.post('/', authMiddleware, productController.createProduct);

// Get all products with sorting, pagination and search functionality
router.get('/', authMiddleware, productController.getProducts);

// Get a product by id
router.get('/:id', authMiddleware, productController.getProductById);

// Update a product by id
router.put('/:id', authMiddleware, productController.updateProduct);

// Delete a product by id
router.delete('/:id', authMiddleware, productController.deleteProduct);

module.exports = router;
