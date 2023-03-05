const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  order_code: { type: String, required: true, unique: true },
  order_date: { type: Date, required: true },
  required_date: { type: Date, required: true },
  shipped_date: { type: Date },
  order_status: { type: String, enum: ['Pending', 'Shipped', 'Delivered'], default: 'Pending', required: true },
});

const Order = mongoose.model('Order', OrderSchema);

module.exports = Order;
