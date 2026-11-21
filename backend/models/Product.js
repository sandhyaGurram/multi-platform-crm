
import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    productName: {
      type: String,
      required: true,
      trim: true,
    },

    // SKU is no longer globally unique.
    // Different Shopify variants or gift products can share an SKU.
    sku: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },

    category: {
      type: String,
      required: true,
      default: "Uncategorized",
    },

    vendor: {
      type: String,
      required: true,
      default: "",
    },

    status: {
      type: String,
      enum: ["active", "draft", "archived", "unlisted"],
      default: "active",
    },

    price: {
      type: Number,
      required: true,
      default: 0,
    },

    comparePrice: {
      type: Number,
      default: 0,
    },

    // Shopify identifiers
    shopifyProductId: {
      type: String,
      default: undefined,
    },

    shopifyVariantId: {
      type: String,
      default: undefined,
    },

    variantTitle: {
      type: String,
      default: "",
    },

    source: {
      type: String,
      default: "",
    },

    // Existing warehouse inventory fields preserved
    warehouseStock: {
      shopify: {
        type: Number,
        default: 0,
      },
      hyderabad: {
        type: Number,
        default: 0,
      },
      warehouseOne: {
        type: Number,
        default: 0,
      },
      warehouseTwo: {
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

// Each Shopify variant can have only one CRM record.
// Other marketplace records without Shopify IDs are unaffected.
productSchema.index(
  { shopifyVariantId: 1 },
  {
    unique: true,
    partialFilterExpression: {
      shopifyVariantId: { $type: "string" },
    },
    name: "shopifyVariantId_1",
  }
);

const Product = mongoose.model("Product", productSchema);

export default Product;





















// import mongoose from "mongoose";

// const productSchema = new mongoose.Schema(
//   {
//     productName: {
//       type: String,
//       required: true,
//       trim: true,
//     },

//     sku: {
//       type: String,
//       required: true,
//       unique: true,
//     },

//     category: {
//       type: String,
//       required: true,
//       default: "Uncategorized",
//     },

//     vendor: {
//       type: String,
//       required: true,
//     },



//     status: {
//       type: String,
//       enum: ["active", "draft", "archived", "unlisted"],
//       default: "active",
//     },


//     price: {
//       type: Number,
//       required: true,
//     },

//     comparePrice: {
//       type: Number,
//       default: 0,
//     },

//     warehouseStock: {
//       shopify: {
//         type: Number,
//         default: 0,
//       },
//       hyderabad: {
//         type: Number,
//         default: 0,
//       },
//       warehouseOne: {
//         type: Number,
//         default: 0,
//       },
//       warehouseTwo: {
//         type: Number,
//         default: 0,
//       },
//       nalgonda: {
//         type: Number,
//         default: 0,
//       },
//     },
//   },
//   {
//     timestamps: true,
//   }
// );

// const Product = mongoose.model("Product", productSchema);

// export default Product;