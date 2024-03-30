import { Router } from "express";
import * as usercontroller from "./user.controller.js";
import auth from "../../middleware/auth.js";
const router = Router();

router.get("/", (req, res) => res.json({ mesasge: `${req.originalUrl} Page` }));
router.put("/update", auth(), usercontroller.update);
router.delete("/delete", auth(), usercontroller.remove);
export default router;
