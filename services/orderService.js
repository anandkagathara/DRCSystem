const Order = require('../models/Order');

// Create a new order
async function createOrder(orderData) {
  const newOrder = new Order(orderData);

  const order_code = newOrder.order_code;
  const orderCheck = await Order.find({ order_code });

  if (orderCheck.length > 0) {
    throw new Error("orderCode already exists");
  }

  const order = await newOrder.save();
  return order;
}


// Get all orders with pagination and sorting
async function getAllOrders(page, limit, sortBy, search) {
  const skip = (page - 1) * limit;
  const sort = sortBy ? { [sortBy]: 1 } : {};
  const searchFilter = search ? { name: { $regex: search, $options: "i" } } : {};
  const orders = await Order.find(searchFilter)
    .sort(sort)
    .skip(skip)
    .limit(limit);
  const count = await Order.countDocuments(searchFilter);
  const totalPages = Math.ceil(count / limit);
  return { orders, totalPages };
}

// Get an order by id
async function getOrderById(orderId) {
  const order = await Order.findById(orderId);
  return order;
}

// Update an order by id
async function updateOrder(orderId, orderData) {
  const order = await Order.findByIdAndUpdate(
    orderId,
    { $set: orderData },
    { new: true }
  );
  return order;
}


// Delete an order by id
async function deleteOrder(orderId) {
  const order = await Order.findByIdAndDelete(orderId);
  return order;
}

module.exports = {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrder,
  deleteOrder,
};
