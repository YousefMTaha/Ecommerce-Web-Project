import productModel from "../../../../DB/model/Product.model.js";
import { asyncHandler } from "../../../utils/errorHandling.js";
import * as validation from "../product.validation.js";

export const addProduct = asyncHandler(async (req, res, next) => {
    req.body.createdBy = await validation.validateUser(req);
    req.body.category = await validation.validateCategory(req);
    req.body.quantity = await validation.validateNumber('quantity', req);
    req.body.price = await validation.validateNumber('price', req);
    const product = await productModel.create(req.body);
    return res.json({ message: "Product Added Successfully", product: product });
});

export const updateProduct = asyncHandler(async (req, res, next) => {
    req.body.createdBy = await validation.validateUser(req);
    req.body.category = await validation.validateCategory(req);
    req.body.quantity = await validation.validateNumber('quantity', req);
    req.body.price = await validation.validateNumber('price', req);
    const product = await req.product.updateOne(req.body);
    return res.json({ message: "Product Updated Successfully", product });
});

export const removeProduct = asyncHandler(async (req, res, next) => {
    await req.product.deleteOne(req.body);
    return res.json({ message: "Product Deleted Successfully" });
});

export const removeAllProducts = asyncHandler(async (req, res, next) => {
    await productModel.deleteMany({})
    return res.json({ message: "All Products Deleted Successfully" });
});

export const getProduct = asyncHandler(async (req, res, next) => {
    const product = await productModel.findById(req.params.id).populate('category').populate('createdBy')
    const modifiedProduct = product.toObject()
    modifiedProduct.createdBy = product.createdBy.name
    modifiedProduct.category = product.category.name
    return res.json({ message: "Product Returned Successfully", product: modifiedProduct })
});

export const getAllProducts = asyncHandler(async (req, res, next) => {
    const products = await productModel.find().populate('category').populate('createdBy')
    const modifiedProducts = products.map(product => ({
        ...product.toObject(),
        createdBy: product.createdBy.name,
        category: product.category.name
    }));
    return res.json({ message: "All Products Returned Successfully", products: modifiedProducts });
});