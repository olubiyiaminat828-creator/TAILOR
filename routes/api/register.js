const express = require("express");
const router = express.Router();
const loginAuthController = require("../../controllers/registerController")
router.route("/")
.post(loginAuthController);
module.exports = router