import mongoose, { model, Schema, Types } from "mongoose";

const brandSchema = new Schema(
  {
    name: { type: String, required: true, unique: true, lowercase: true },
    createdBy: { type: Types.ObjectId, ref: "User", required: true },
    logo: Object,
  },
  { timestamps: true }
);

const brandModel = mongoose.models.Brand || model("Brand", brandSchema);

export default brandModel;
