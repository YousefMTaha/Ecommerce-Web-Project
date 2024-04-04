import { Router } from "express";
import auth from "../../middleware/auth.js";
import { isNotExist } from "../../middleware/isNotExist.js";
import productModel from "../../../DB/model/Product.model.js";
import * as productController from "./controller/product.js";
import { isExist } from "../../middleware/isExist.js";
import { isOwner } from "../../middleware/isOwner.js";
import subcategoryModel from "../../../DB/model/Subcategory.model.js";
import { reqDataForms, uniqueFields } from "../../utils/systemConstants.js";
import brandModel from "../../../DB/model/Brand.model.js";

const router = Router();

router.get("/", auth(), productController.getAllProducts);

router.get(
  "/:_id",
  auth(),
  isExist({ model: productModel }),
  // isOwner(productModel),
  productController.getProduct
);

router.post(
  "/",
  auth(),
  isExist({
    model: subcategoryModel,
    dataFrom: reqDataForms.body,
    searchData: uniqueFields.subcategoryId,
  }),
  isExist({
    model: brandModel,
    dataFrom: reqDataForms.body,
    searchData: uniqueFields.brandId,
  }),
  isNotExist({ model: productModel, searchData: "name" }),
  productController.addProduct
);

// router.delete("/", auth(), productController.removeAllProducts);

router.delete(
  "/:_id",
  auth(),
  isExist({ model: productModel }),
  isOwner(productModel),
  productController.removeProduct
);

router.put(
  "/:_id",
  auth(),
  isExist({ model: productModel }),
  isOwner(productModel),
  isNotExist({ model: productModel, searchData: "name" }),
  isExist({
    model: subcategoryModel,
    dataFrom: reqDataForms.body,
    searchData: uniqueFields.subcategoryId,
  }),
  isExist({
    model: brandModel,
    dataFrom: reqDataForms.body,
    searchData: uniqueFields.brandId,
  }),
  productController.updateProduct
);

export default router;
