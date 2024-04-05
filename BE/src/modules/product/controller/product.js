import productModel from "../../../../DB/model/Product.model.js";
import { asyncHandler } from "../../../utils/errorHandling.js";
import * as validation from "../product.validation.js";

export const addProduct = asyncHandler(async (req, res, next) => {
  req.body.createdBy = req.user._id;
  req.body.subcategoryId = req.subcategory._id;
  req.body.brandId = req.brand._id;
  req.body.quantity = await validation.validateNumber(
    "quantity",
    req.body.quantity
  );
  req.body.price = await validation.validateNumber("price", req.body.price);
  const product = await productModel.create(req.body);
  return res.json({ message: "Product Added Successfully", product: product });
});

export const updateProduct = asyncHandler(async (req, res, next) => {
  req.body.subcategoryId = !req.subcategory?._id
    ? req.product.subcategoryId
    : req.subcategory._id;

  req.body.brandId = req.brand?._id ? req.brand._id : req.product.brandId;
  req.body.quantity = await validation.validateNumber(
    "quantity",
    req.body.quantity
  );
  // productModel.findOneAndUpdate({},{},{new:true})
  req.body.price = await validation.validateNumber("price", req.body.price);
  const product = await req.product.updateOne(req.body);
  return res.json({
    message: "Product Updated Successfully",
    modificationData: {
      acknowledged: product.acknowledged,
      productsFound: product.matchedCount,
      productsUpdated: product.modifiedCount,
    },
  });
});

export const removeProduct = asyncHandler(async (req, res, next) => {
  await req.product.deleteOne();
  return res.json({ message: "Product Deleted Successfully" });
});

// export const removeAllProducts = asyncHandler(async (req, res, next) => {
//   await productModel.deleteMany({});
//   return res.json({ message: "All Products Deleted Successfully" });
// });

export const getProduct = asyncHandler(async (req, res, next) => {
  const product = await productModel
    .findById(req.params._id)
    .populate("subcategoryId")
    .populate("createdBy");
  // const modifiedProduct = product.toObject();
  // modifiedProduct.createdById = product.createdById.name;
  // modifiedProduct.subcategoryId = product.subcategoryId.name;
  return res.json({
    message: "Product Returned Successfully",
    product: product,
  });
});

export const getAllProducts = asyncHandler(async (req, res, next) => {
  const products = await productModel
    .find()
    .populate("subcategoryId")
    .populate("createdById");
  const modifiedProducts = products.map((product) => ({
    ...product.toObject(),
    createdBy: product.createdById.name,
    category: product.subcategoryId.name,
  }));
  return res.json({
    message: "All Products Returned Successfully",
    products: modifiedProducts,
  });
});
