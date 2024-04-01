import categoryModel from "../../../DB/model/Category.model.js";
import { asyncHandler } from "../../utils/errorHandling.js";

export const add = asyncHandler(async (req, res, next) => {
  // add userId into body
  req.body.createdBy = req.user._id;

  // create category collection
  const category = await categoryModel.create(req.body);
  return res.json({ message: "done", category });
});

export const update = asyncHandler(async (req, res, next) => {
  // update category
  await req.category.updateOne(req.body);
  return res.json({ message: "done" });
});

export const remove = asyncHandler(async (req, res, next) => {
  // remove category
  await req.category.deleteOne();
  return res.json({ message: "done" });
});

export const getData = asyncHandler(async (req, res, next) => {
  const category = await categoryModel.findById(req.parmas.id);
  return res.json({ message: "done", category });
});

export const getAllData = asyncHandler(async (req, res, next) => {
  const categories = await categoryModel.find();
  return res.json({ message: "done", categories });
});
