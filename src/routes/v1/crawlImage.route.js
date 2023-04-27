const router = require("express").Router();
const crawlImageController = require("../../controllers/crawlImage.controller");
router.post("/", crawlImageController.get);

module.exports = router;
