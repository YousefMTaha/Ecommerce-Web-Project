import { Router } from "express";
import * as subcategoryContoller from "./subcategory.controller.js";
import { isExist } from "../../middleware/isExist.js";
import categoryModel from "../../../DB/model/Category.model.js";
import { uniqueFields } from "../../utils/systemConstants.js";
import { isNotExist } from "../../middleware/isNotExist.js";
import subcategoryModel from "../../../DB/model/Subcategory.model.js";
import auth from "../../middleware/auth.js";
const router = Router();

router.get("/", (req, res) => res.json({ mesasge: `${req.originalUrl} Page` }));

router.post(
  "/:categoryId",
  auth(),
  isExist({ model: categoryModel, searchData: uniqueFields.categoryId }),
  isNotExist({ model: subcategoryModel, searchData: uniqueFields.name }),
  subcategoryContoller.add
);

export default router;
