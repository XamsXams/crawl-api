import express from "express";
const router = express.Router();

import * as crawlImageController from "../../controllers/crawlImage.controller.js";
router.post("/", crawlImageController.get);

export default router;
