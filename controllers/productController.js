const Product = require("../models/Product");
const productService = require("../services/productService");

const createProduct = async (req, res) => {
  try {
    // if (req.user.isAdmin) {
    //   return res
    //     .status(401)
    //     .json({ message: "You have no right for product module" });
    // }
    const product = await productService.createProduct(req.body);
    res.status(201).json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// const getProducts = async (req, res) => {
//   try {
   
//     // if (req.user.isAdmin) {
//     //   return res
//     //     .status(401)
//     //     .json({ message: "You have no right for product module" });
//     // }
//     const products = await productService.getProducts(req.query);
//     res.status(200).json(products);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Server error" });
//   }
// };


const getProducts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const sortBy = req.query.sortBy || { createdAt: -1 };
    const name = req.query.name || '';
    const color = req.query.color || '';
    const minPrice = req.query.minPrice || 0;
    const maxPrice = req.query.maxPrice || Infinity;
    const minQuantity = req.query.minQuantity || 0;
    const maxQuantity = req.query.maxQuantity || Infinity;

    const products = await productService.getProducts(page, limit, sortBy, name, color, minPrice, maxPrice, minQuantity, maxQuantity);
    res.status(200).json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};


const getProductById = async (req, res) => {
  try {
    // if (req.user.isAdmin) {
    //   return res
    //     .status(401)
    //     .json({ message: "You have no right for product module" });
    // }
    const product = await productService.getProductById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const updateProduct = async (req, res) => {
  try {
    // if (req.user.isAdmin) {
    //   return res
    //     .status(401)
    //     .json({ message: "You have no right for product module" });
    // }
    const product = await productService.updateProduct(req.params.id, req.body);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const deleteProduct = async (req, res) => {
  try {
    // if (req.user.isAdmin) {
    //   return res
    //     .status(401)
    //     .json({ message: "You have no right for product module" });
    // }
    const product = await productService.deleteProduct(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const updateProductImage = async (req, res) => {
  try {
    // if (!req.user.isAdmin) {
    //   return res
    //     .status(401)
    //     .json({ message: "You are not admin so you can not update images" });
    // }

    const imagePaths = req.files.map(file => file.path);
    await productService.updateProductImage(req.params.id, imagePaths);
    res.status(200).json({ message: "Product images updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  updateProductImage,
};
