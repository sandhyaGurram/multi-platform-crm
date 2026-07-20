import Product from "../models/Product.js";

// GET ALL PRODUCTS

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch products",
      error: error.message,
    });
  }
};

// GET SINGLE PRODUCT

export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch product",
      error: error.message,
    });
  }
};

// CREATE PRODUCT

export const createProduct = async (req, res) => {
  try {
    const {
      name,
      sku,
      category,
      price,
      stock,
      status,
    } = req.body;

    // Validation
    if (!name || !sku || !category || price === undefined || stock === undefined) {
      return res.status(400).json({
        message: "Please fill all required fields.",
      });
    }

    const existingProduct = await Product.findOne({ sku });

    if (existingProduct) {
      return res.status(400).json({
        message: "SKU already exists.",
      });
    }

    const product = await Product.create({
      name,
      sku,
      category,
      price,
      stock,
      status,
    });

    res.status(201).json({
      message: "Product created successfully.",
      product,
    });

  } catch (error) {
    res.status(500).json({
      message: "Failed to create product.",
      error: error.message,
    });
  }
};