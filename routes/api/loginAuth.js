console.time("Start")
const express = require("express");
const router = express.Router();
const loginAuthController = require("../../controllers/loginAuthController")
router.route("/")
.post(loginAuthController)
module.exports = router
console.timeEnd("End")