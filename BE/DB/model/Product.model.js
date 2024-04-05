import * as mongo from "mongoose";

const productSchema = new mongo.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      unique: [true, "Name must be unique"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      min: [1, "Min length is 1 char"],
      max: [500, "Max length is 500 char"],
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
    },
    subcategoryId: {
      type: mongo.Types.ObjectId,
      ref: "Subcategory",
      required: [true, "subCategory is required"],
    },
    quantity: { type: Number, default: 0 },
    createdBy: { type: mongo.Types.ObjectId, ref: "User", required: true },
    brandId: {
      type: mongo.Types.ObjectId,
      ref: "Brand",
      required: [true, "Brand is required"],
    },
    noRating: {
      type: Number,
      default: 0,
    },
    totalRating: {
      type: Number,
      default: 0,
    },

    image: [Object],
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

productSchema.virtual("avgRating").get(function () {
  // console.log(this);
  if (this.noRating == 0)
    return 0
  return this.totalRating / this.noRating
})

const productModel = mongo.model("Product", productSchema);
export default productModel;
