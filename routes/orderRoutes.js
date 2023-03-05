const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const authMiddleware = require('../middlewares/authMiddleware');

// Create a new order
router.post('/', authMiddleware, orderController.createOrder);

// Get all orders with pagination and sorting
router.get('/', authMiddleware, orderController.getOrders);

// Get an order by id
router.get('/:id', authMiddleware, orderController.getOrderById);

// Update an order by id
router.put('/:id', authMiddleware, orderController.updateOrder);

// Delete an order by id
router.delete('/:id', authMiddleware, orderController.deleteOrder);

module.exports = router;
