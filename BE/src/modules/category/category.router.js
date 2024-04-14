import { Router } from "express";
import * as categoryController from "./category.controller.js";
import auth from "../../middleware/auth.js";
import categoryModel from "../../../DB/model/Category.model.js";
import { isNotExist } from "../../middleware/isNotExist.js";
import { isOwner } from "../../middleware/isOwner.js";
import { isExist } from "../../middleware/isExist.js";
import { fileUpload } from "../../utils/multer.js";
import {
  deleteImage,
  updateImage,
  uploadImage,
} from "../../middleware/uploadImage.js";
import { fileValidation, uniqueFields } from "../../utils/systemConstants.js";
const router = Router();
router
  .route("/")
  .get(categoryController.getAllData)
  .post(
    auth(),
    fileUpload(fileValidation.image).single("img"),
    isNotExist({ model: categoryModel, searchData: uniqueFields.name }),
    categoryController.add,
    uploadImage(categoryModel)
  );

router
  .route("/:_id")
  .get(categoryController.getData)
  .put(
    auth(),
    fileUpload(fileValidation.image).single("img"),
    isExist({ model: categoryModel }),
    isOwner(categoryModel),
    isNotExist({ model: categoryModel, searchData: uniqueFields.name }),
    updateImage(categoryModel),
    categoryController.update
  )
  .delete(
    auth(),
    isExist({ model: categoryModel }),
    isOwner(categoryModel),
    deleteImage(categoryModel),
    categoryController.remove
  );
export default router;
