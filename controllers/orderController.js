const orderService = require('../services/orderService');
const orderValidator = require('../validators/orderValidator')

// Create a new order
const createOrder = async (req, res) => {
  try {
  
    await orderValidator(req.body)
    const order = await orderService.createOrder(req.body);
    res.status(201).json(order);
  } catch (error) {
    if (error.message === "orderCode already exists") {
      return res.status(400).json({ message: error.message });
    }
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

const getOrders = async (req, res) => {
  try {
  
    const { page, limit, sortBy, search } = req.query;
    console.log(req.query);
    const orders = await orderService.getAllOrders(
      parseInt(page),
      parseInt(limit),
      sortBy,
      search
    );
    res.status(200).json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};


// Get an order by id
const getOrderById = async (req, res) => {
  try {
  
    const order = await orderService.getOrderById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.status(200).json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update an order by id
const updateOrder = async (req, res) => {
  try {
   
    const order = await orderService.updateOrder(req.params.id, req.body);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.status(200).json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete an order by id
const deleteOrder = async (req, res) => {
  try {
   
    const order = await orderService.deleteOrder(req.params.id);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.status(200).json({ message: "Order deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  createOrder,
  getOrders,
  getOrderById,
  updateOrder,
  deleteOrder,
};
