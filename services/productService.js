const Product = require("../models/Product");

async function createProduct(productData) {
  const newProduct = new Product(productData);
  const product = await newProduct.save();
  return product;
}

async function getProducts(page, limit, sortBy) {
  const products = await Product.find({})
    .sort(sortBy)
    .skip((page - 1) * limit)
    .limit(limit);
  const count = await Product.countDocuments();
  return { products, totalPages: Math.ceil(count / limit) };
}

async function getProductById(productId) {
  const product = await Product.findById(productId);
  return product;
}

async function updateProduct(productId, productData) {
  const product = await Product.findByIdAndUpdate(
    productId,
    { $set: productData },
    { new: true }
  );
  return product;
}

async function deleteProduct(productId) {
  const product = await Product.findByIdAndDelete(productId);
  return product;
}


async function updateProductImage (productId, imagePathArray)  {
  const product = await Product.findById(productId);
  const images = imagePathArray.join(','); 
  product.images = images;
  return product.save();
};

module.exports = {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  updateProductImage
};
