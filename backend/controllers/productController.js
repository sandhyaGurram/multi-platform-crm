import Product from "../models/Product.js";
import Notification from "../models/Notification.js";

// GET ALL PRODUCTS




export const getProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });

    console.log("Total products:", products.length);

    products.forEach((p) => {
      console.log(p.productName);
    });

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
      productName,
      sku,
      category,
      vendor,
      price,
      comparePrice,
      warehouseStock,
    } = req.body;

    if (
      !productName ||
      !sku ||
      !category ||
      !vendor ||
      price === undefined
    ) {
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
      productName,
      sku,
      category,
      vendor,
      price,
      comparePrice,
      warehouseStock,
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







export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;

    // Get existing product first
    const oldProduct = await Product.findById(id);

    if (!oldProduct) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    // Update product
    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      req.body,
      {
        returnDocument: "after",
        runValidators: true,
      }
    );

    // Example: warehouse changes
    const warehouses = [
      "shopify",
      "hyderabad",
      "nalgonda",
    ];

    for (const warehouse of warehouses) {
      const oldQuantity =
        oldProduct.warehouseStock?.[warehouse] ?? 0;

      const newQuantity =
        updatedProduct.warehouseStock?.[warehouse] ?? 0;

      if (oldQuantity !== newQuantity) {

        await Notification.create({
          type: "inventory",

          action: "WAREHOUSE_STOCK_UPDATED",

          message: `${warehouse} stock for ${updatedProduct.productName} changed from ${oldQuantity} to ${newQuantity}`,

          userId: req.user?._id,

          userEmail: req.user?.email || "Unknown",

          productId: updatedProduct._id,

          productName: updatedProduct.productName,

          warehouse: warehouse,

          oldValue: oldQuantity,

          newValue: newQuantity,
        });
      }
    }

    res.status(200).json(updatedProduct);

  } catch (error) {
    console.error("Update product error:", error);

    res.status(500).json({
      message: "Failed to update product",
      error: error.message,
    });
  }
};
// export const updateProduct = async (req, res) => {
//   try {
//     const product = await Product.findByIdAndUpdate(
//       req.params.id,
//       req.body,
//       {
//         new: true,
//         runValidators: true,
//       }
//     );

//     if (!product) {
//       return res.status(404).json({
//         message: "Product not found",
//       });
//     }

//     res.status(200).json({
//       message: "Product updated successfully.",
//       product,
//     });
//   } catch (error) {
//     res.status(500).json({
//       message: "Failed to update product.",
//       error: error.message,
//     });
//   }
// };




export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      return res.status(404).json({
        message: "Product not found.",
      });
    }

    res.status(200).json({
      message: "Product deleted successfully.",
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete product.",
      error: error.message,
    });
  }
};

