import express from "express";
const router = express.Router();
import * as homeController from "../../controllers/home.controller.js";
router.get("/", homeController.index);

export default router;
