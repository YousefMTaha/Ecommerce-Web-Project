import { Router } from "express";
import auth from "../../middleware/auth.js";
import { isNotExist } from "../../middleware/isNotExist.js";
import productModel from "../../../DB/model/Product.model.js";
import * as productController from "./controller/product.js";
import { isExist } from "../../middleware/isExist.js";
import { isOwner } from "../../middleware/isOwner.js";
import subcategoryModel from "../../../DB/model/Subcategory.model.js";
import {
  fileValidation,
  reqDataForms,
  uniqueFields,
} from "../../utils/systemConstants.js";
import brandModel from "../../../DB/model/Brand.model.js";
import { fileUpload } from "../../utils/multer.js";
import {
  deleteImage,
  updateImage,
  uploadImage,
} from "../../middleware/uploadImage.js";

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
  fileUpload(fileValidation.image).array("imgs", 5),
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
  isNotExist({ model: productModel, searchData: uniqueFields.name }),
  productController.addProduct,
  uploadImage(productModel, true)
);

// router.delete("/", auth(), productController.removeAllProducts);

router.delete(
  "/:_id",
  auth(),
  isExist({ model: productModel }),
  isOwner(productModel),
  deleteImage(productModel, true),
  productController.removeProduct
);

router.put(
  "/:_id",
  auth(),
  fileUpload(fileValidation.image).array("imgs", 5),
  isExist({ model: productModel }),
  isOwner(productModel),
  isNotExist({ model: productModel, searchData: uniqueFields.name }),
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
  updateImage(productModel, true),
  productController.updateProduct
);

export default router;
