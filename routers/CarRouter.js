const controller = require("../controller/CarController")
const express = require("express")
const router = express.Router();

router.get("/", controller.gettAll)
router.get("/:vin", controller.getByVin)

module.exports = router