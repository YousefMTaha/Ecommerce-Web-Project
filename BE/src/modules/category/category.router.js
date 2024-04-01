import { Router } from "express";
import * as categoryController from "./category.controller.js";
import auth from "../../middleware/auth.js";
import categoryModel from "../../../DB/model/Category.model.js";
import { isNotExist } from "../../middleware/isNotExist.js";
import { isOwner } from "../../middleware/isOwner.js";
import { isExist } from "../../middleware/isExist.js";
const router = Router();
router
  .route("/")
  .get(categoryController.getAllData)
  .post(
    auth(),
    isNotExist({ model: categoryModel, searchData: "name" }),
    categoryController.add
  );
router
  .route("/:id")
  .get(categoryController.getData)
  .put(
    auth(),
    isExist(categoryModel),
    isOwner(categoryModel),
    isNotExist({ model: categoryModel, searchData: "name" }),
    categoryController.update
  )
  .delete(
    auth(),
    isExist(categoryModel),
    isOwner(categoryModel),
    categoryController.remove
  );
export default router;
