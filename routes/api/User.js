const express = require("express");
const router = express.Router();
const users = require("../../models/users.json")
const verifyJWT = require("../../middleware/verifyJWT");
const verifyRole = require("../../middleware/verifyRole");
const ROLES_LIST = require("../../config/ROLES_LIST")
router.route("/")
.get(verifyJWT,verifyRole(ROLES_LIST.user),(req, res) => {
    let cookies = req.cookies;
    if(!cookies.jwt) return res.status(401).json({"msg": "Fuck off! You have no access to this shit man"})
    let refreshToken = cookies.jwt;
    const foundUser = users.find(user => user.refreshToken === refreshToken)
    res.json({"msg": "User jave sucessfully logged in"})
})
module.exports = router