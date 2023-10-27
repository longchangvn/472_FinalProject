const controller = require("../controller/CarController")
const express = require("express")
const router = express.Router();


router.get("/", controller.gettAll)
router.get("/:vin", controller.getByVin)
router.post("/", controller.addCar);
router.delete("/:vin", controller.deleteCar);
router.put("/:vin", controller.updateCar)

module.exports = router