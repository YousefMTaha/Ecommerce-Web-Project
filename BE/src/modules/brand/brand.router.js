import { Router } from "express";
import auth from "../../middleware/auth.js";
import { isNotExist } from "../../middleware/isNotExist.js";
import brandModel from "../../../DB/model/Brand.model.js";
import { fileValidation, uniqueFields } from "../../utils/systemConstants.js";
import * as brandController from "./brand.controller.js";
import * as validator from "./brand.validation.js";
import {
  deleteImage,
  updateImage,
  uploadImage,
} from "../../middleware/uploadImage.js";
import { fileUpload } from "../../utils/multer.js";
import { isExist } from "../../middleware/isExist.js";
import { isOwner } from "../../middleware/isOwner.js";
import { IdValidator, validation } from "../../middleware/validation.js";
import getAllData, { getDataById } from "../../middleware/getData.js";
const router = Router();

router
  .route("/")
  .get(getAllData())
  .post(
    auth(),
    fileUpload(fileValidation.image).single("img"),
    validation(validator.add),
    isNotExist({ model: brandModel, searchData: uniqueFields.name }),
    brandController.add,
    uploadImage({model:brandModel})
  );

router
  .route("/:_id")
  .put(
    auth(),
    fileUpload(fileValidation.image).single("img"),
    validation(validator.update),
    isExist({
      model: brandModel,
    }),
    isOwner(brandModel),
    isNotExist({ model: brandModel, searchData: uniqueFields.name }),
    updateImage({model:brandModel}),
    brandController.update
  )
  .delete(
    auth(),
    validation(IdValidator),
    isExist({ model: brandModel }),
    isOwner(brandModel),
    deleteImage(brandModel),
    brandController.remove
  )
  .get(validation(IdValidator), getDataById);

export default router;
