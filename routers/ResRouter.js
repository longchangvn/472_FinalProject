const express = require("express")
const router = express.Router();
const controller = require("../controller/ResController")

router.post("/:id/cancel", controller.cancel)
router.get("/", controller.search)
router.get("/:id", controller.getById)
router.post("/", controller.add)
router.put("/", controller.update)
router.delete("/", controller.delete)


module.exports = router