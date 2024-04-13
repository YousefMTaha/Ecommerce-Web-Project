import { Router } from "express";
import * as subcategoryContoller from "./subcategory.controller.js";
import { isExist } from "../../middleware/isExist.js";
import categoryModel from "../../../DB/model/Category.model.js";
import { fileValidation, uniqueFields } from "../../utils/systemConstants.js";
import { isNotExist } from "../../middleware/isNotExist.js";
import subcategoryModel from "../../../DB/model/Subcategory.model.js";
import auth from "../../middleware/auth.js";
import { deleteImage, updateImage, uploadImage } from "../../middleware/uploadImage.js";
import { fileUpload } from "../../utils/multer.js";
import { isOwner } from "../../middleware/isOwner.js";
const router = Router();

router.get("/", (req, res) =>
  res.status(200).json({ mesasge: `${req.originalUrl} Page` })
);

router.post(
  "/:categoryId",
  auth(),
  fileUpload(fileValidation.image).single("img"),
  isExist({ model: categoryModel, searchData: uniqueFields.categoryId }),
  isNotExist({ model: subcategoryModel, searchData: uniqueFields.name }),
  subcategoryContoller.add,
  uploadImage(subcategoryModel)
);

router.put(
  "/_id",
  auth(),
  fileUpload(fileValidation.image).single("img"),
  isExist({ model: subcategoryModel }),
  isNotExist({model:subcategoryModel,searchData:uniqueFields.name}),
  updateImage(subcategoryModel),
  subcategoryContoller.update
);

router.delete(
  "/:_id",
  auth(),
  isExist({ model: subcategoryModel }),
  isOwner(subcategoryModel),
  deleteImage(subcategoryModel),
  subcategoryContoller.remove
);

export default router;
