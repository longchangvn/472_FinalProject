const express = require("express");
const router = express.Router();
const controller = require("../controller/customerCarReservationController");

//seach
router.get("/reserves", controller.findAvailabeCars);
//view detail
router.get("/reserves/:vin", controller.getCarByVin);
//rent a car (reserve)
router.post("/reserves", controller.reserveACar);//POST with json body

module.exports = router;