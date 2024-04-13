import { Router } from "express";
import auth from "../../middleware/auth.js";
import { isNotExist } from "../../middleware/isNotExist.js";
import brandModel from "../../../DB/model/Brand.model.js";
import {
  fileValidation,
  reqDataForms,
  uniqueFields,
} from "../../utils/systemConstants.js";
import * as brandController from "./brand.controller.js";
import {
  deleteImage,
  updateImage,
  uploadImage,
} from "../../middleware/uploadImage.js";
import { fileUpload } from "../../utils/multer.js";
import { isExist } from "../../middleware/isExist.js";
import { isOwner } from "../../middleware/isOwner.js";
const router = Router();

router
  .route("/")
  .get((req, res) =>
    res.status(200).json({ mesasge: `${req.originalUrl} Page` })
  )
  .post(
    auth(),
    fileUpload(fileValidation.image).single("img"),
    isNotExist({ model: brandModel, searchData: uniqueFields.name }),
    brandController.add,
    uploadImage(brandModel)
  );

router
  .route("/:_id")
  .put(
    auth(),
    fileUpload(fileValidation.image).single("img"),
    isExist({
      model: brandModel,
    }),
    isOwner(brandModel),
    isNotExist({ model: brandModel, searchData: uniqueFields.name }),
    updateImage(brandModel),
    brandController.update
  )
  .delete(
    auth(),
    isExist({ model: brandModel }),
    isOwner(brandModel),
    deleteImage(brandModel),
    brandController.remove
  );

// router.delete("/:_id/img");
export default router;
