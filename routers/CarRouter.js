const controller = require("../controller/CarController")
const express = require("express")
const router = express.Router();

router.get("/", controller.gettAll)

module.exports = router