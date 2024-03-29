import { Router } from "express";

const router = Router();

router.get("/", (req, res) => res.json({ mesasge: `${req.originalUrl} Page` }));

export default router;
