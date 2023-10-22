const controller = require("../controller/UserController")
const express = require("express")
const router = express.Router();

router.get("/", controller.getAll)

module.exports = router