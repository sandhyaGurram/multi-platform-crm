import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      required: true,
      default: "inventory",
    },

    action: {
      type: String,
      required: true,
    },

    message: {
      type: String,
      required: true,
    },

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    userEmail: {
      type: String,
      required: true,
    },

    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },

    productName: String,

    warehouse: String,

    oldValue: mongoose.Schema.Types.Mixed,

    newValue: mongoose.Schema.Types.Mixed,

    isRead: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Notification", notificationSchema);





















// import mongoose from "mongoose";

// const notificationSchema = new mongoose.Schema(
//   {
//     title: {
//       type: String,
//       required: true,
//     },

//     message: {
//       type: String,
//       required: true,
//     },

//     type: {
//       type: String,
//       enum: [
//         "order",
//         "product",
//         "customer",
//         "deposit",
//         "system",
//       ],
//       default: "system",
//     },

//     isRead: {
//       type: Boolean,
//       default: false,
//     },
//   },
//   {
//     timestamps: true,
//   }
// );

// const Notification = mongoose.model(
//   "Notification",
//   notificationSchema
// );

// export default Notification;