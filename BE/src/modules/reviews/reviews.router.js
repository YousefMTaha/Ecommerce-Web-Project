import { Router } from "express";
import * as reviewsController from "./controller/review.js"
import auth from "../../middleware/auth.js";
import { isExist } from "../../middleware/isExist.js";
import productModel from "../../../DB/model/Product.model.js";
import { reqDataForms, uniqueFields } from "../../utils/systemConstants.js";
import { isNotExist } from "../../middleware/isNotExist.js";
import { model } from "mongoose";
import reviewModel from "../../../DB/model/Review.model.js";
import { isOwner } from "../../middleware/isOwner.js";

const router = Router();

// router.get("/", (req, res) => res.json({ mesasge: `${req.originalUrl} Page` }));

// should be the id of the product
router.get(
    "/:_id",
    auth(),
    isExist({
        model: productModel,
        dataFrom: reqDataForms.body,
        searchData: uniqueFields.productId,
    }),
    reviewsController.getReviewsOfProduct
);

router.post(
    "/",
    auth(),
    isNotExist({
        model: reviewModel,
        searchData: "createdBy"
    }),
    isExist({
        model: productModel,
        dataFrom: reqDataForms.body,
        searchData: uniqueFields.productId,
    }),
    reviewsController.addReview
);

router.put(
    "/:_id",
    auth(),
    isExist({
        model: reviewModel,
        dataFrom: reqDataForms.parmas,
        searchData: uniqueFields.id
    }),
    isOwner(reviewModel),
    isExist({
        model: productModel,
        dataFrom: reqDataForms.body,
        searchData: uniqueFields.productId,
    }),
    reviewsController.updateReview
)

router.delete(
    "/:_id",
    auth(),
    isExist({
        model: reviewModel,
        dataFrom: reqDataForms.parmas,
        searchData: uniqueFields.id
    }),
    isOwner(reviewModel),
    isExist({
        model: productModel,
        dataFrom: reqDataForms.body,
        searchData: uniqueFields.productId,
    }),
    reviewsController.deleteReview
)


export default router;

