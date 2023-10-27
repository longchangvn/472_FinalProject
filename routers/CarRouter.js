const controller = require("../controller/CarController")
const express = require("express")
const router = express.Router();


router.get("/", controller.gettAll)
router.get("/:vin", controller.getByVin)
router.post("/", controller.addCar);

module.exports = router