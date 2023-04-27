const router = require("express").Router();
const devController = require("../../controllers/dev.controller");
router.get("/", devController.index);

module.exports = router;
