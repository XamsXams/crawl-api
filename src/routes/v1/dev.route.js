import express from "express";
const router = express.Router();

import * as devController from "../../controllers/dev.controller.js";
router.get("/", devController.index);

export default router;
