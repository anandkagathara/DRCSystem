const Product = require("../models/Product");

async function createProduct(productData) {
  const newProduct = new Product(productData);
  const product = await newProduct.save();
  return product;
}

// async function getProducts(page, limit, sortBy) {
//   const products = await Product.find({})
//     .sort(sortBy)
//     .skip((page - 1) * limit)
//     .limit(limit);
//   const count = await Product.countDocuments();
//   return { products, totalPages: Math.ceil(count / limit) };
// }

const getProducts = async (page, limit, sortBy, name, color, minPrice, maxPrice, minQuantity, maxQuantity) => {
  try {
    const filter = {
      name: { $regex: name, $options: "i" },
      color: { $regex: color, $options: "i" },
      price: { $gte: minPrice, $lte: maxPrice },
      quantity: { $gte: minQuantity, $lte: maxQuantity },
    };

    const options = {
      sort: sortBy,
      skip: (page - 1) * limit,
      limit: limit,
    };

    const products = await Product.find(filter, null, options).exec();
    const count = await Product.countDocuments(filter);

    return { products, count };
  } catch (error) {
    console.error(error);
    throw new Error("Error fetching products");
  }
};


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
