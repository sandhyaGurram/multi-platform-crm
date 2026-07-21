import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    productName: {
      type: String,
      required: true,
      trim: true,
    },

    sku: {
      type: String,
      required: true,
      unique: true,
    },

    category: {
      type: String,
      required: true,
    },

    vendor: {
      type: String,
      required: true,
    },

    price: {
      type: Number,
      required: true,
    },

    comparePrice: {
      type: Number,
      default: 0,
    },

    warehouseStock: {
      shopify: {
        type: Number,
        default: 0,
      },
      hyderabad: {
        type: Number,
        default: 0,
      },
      nalgonda: {
        type: Number,
        default: 0,
      },
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);

export default Product;