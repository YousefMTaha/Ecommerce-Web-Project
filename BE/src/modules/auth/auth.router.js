import { Router } from "express";
import * as userController from "./auth.controller.js";
const router = Router();

router.get("/", (req, res) => res.json({ mesasge: `${req.originalUrl} Page` }));

router.post("/signup", userController.signup);
router.post("/login", userController.login);
export default router;
