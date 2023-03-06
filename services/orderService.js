const Order = require("../models/Order");
const { ObjectId } = require("mongodb");

// Create a new order
async function createOrder(orderData) {
  const newOrder = new Order(orderData);

  const order_code = newOrder.order_code;
  const orderCheck = await Order.find({ order_code: order_code });

  if (orderCheck.length > 0) {
    throw new Error("orderCode already exists");
  }

  const order = await newOrder.save();
  return order;
}

async function getAllOrders(sortBy, search, user) {
  const id = user._id.toString();
  const sort = sortBy ? { [sortBy]: 1 } : {};
  const uId = new ObjectId(id);
  const searchFilter = search
    ? {
        $and: [{ user_id: uId }, { name: { $regex: search, $options: "i" } }],
      }
    : { user_id: uId };

  const orders = await Order.find(searchFilter).sort(sort);

  console.log(orders);

  return orders;
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
