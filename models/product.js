const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  size: { type: String, required: true },
  color: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  images:{type:String,require:false,default:null}
});

const Product = mongoose.model('Product', ProductSchema);

module.exports = Product;