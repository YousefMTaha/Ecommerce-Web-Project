import { Schema, Types, model } from "mongoose";
import { orderStatus } from "../../src/utils/systemConstants.js";
const orderSchema = new Schema(
  {
    address: {
      type: String,
      unique: true,
      required: true,
      lowercase: true,
    },
    createdBy: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
    },
    products: [
      {
        id: {
          type: Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
        price: {
          type: Number,
          required: true,
        },
      },
    ],
    status: {
      type: String,
      enum: Object.values(orderStatus),
      default: orderStatus.watting_for_payment,
    },

  },
  {
    timestamps: true,
  }
);

const orderModel = model("Order", orderSchema);
export default orderModel;
