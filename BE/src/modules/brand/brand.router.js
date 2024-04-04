import { Router } from "express";
import auth from "../../middleware/auth.js";
import { isNotExist } from "../../middleware/isNotExist.js";
import brandModel from "../../../DB/model/Brand.model.js";
import { uniqueFields } from "../../utils/systemConstants.js";
import * as brandController from './brand.controller.js'
const router = Router();

router
  .route("/")
  .get((req, res) => res.json({ mesasge: `${req.originalUrl} Page` }))
  .post(
    auth(),
    isNotExist({ model: brandModel, searchData: uniqueFields.name }),
    brandController.add
  );
export default router;
