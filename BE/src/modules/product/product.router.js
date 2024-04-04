import { Router } from "express";
import auth from "../../middleware/auth.js";
import { isNotExist } from "../../middleware/isNotExist.js";
import productModel from "../../../DB/model/Product.model.js";
import * as productController from "./controller/product.js";
import { isExist } from "../../middleware/isExist.js";
import { isOwner } from "../../middleware/isOwner.js";

const router = Router();

router.get("/", auth(), productController.getAllProducts)

router.get("/:id", auth(), isExist(productModel), isOwner(productModel), productController.getProduct)

router.post("/", auth(), isNotExist({ model: productModel, searchData: "name" }), productController.addProduct)

router.delete("/", auth(), productController.removeAllProducts)

router.delete("/:id", auth(), isExist(productModel), isOwner(productModel), productController.removeProduct)

router.put("/:id", auth(), isExist(productModel), isOwner(productModel), productController.updateProduct)


export default router;
