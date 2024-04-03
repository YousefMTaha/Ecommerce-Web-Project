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
        category: {
            type: mongo.Types.ObjectId,
            ref: "Category",
            required: [true, "Category is required"],
        },
        createdAt: { type: Date, default: Date.now() },
        createdBy: { type: mongo.Types.ObjectId, ref: "User", required: true },
        updatedAt: { type: Date, default: Date.now(), },
        updatedBy: { type: mongo.Types.ObjectId, ref: "User" },
        brand: String,
        image: Object,
    }
);

const productModel = mongo.model("Product", productSchema);
export default productModel


