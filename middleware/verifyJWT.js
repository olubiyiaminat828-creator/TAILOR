const jwt = require("jsonwebtoken");
const users = require("../models/users.json")
const verifyJWT = (req, res, next) => {
    const cookies = req.cookies;
    if(!cookies?.jwt) return res.sendStatus(401)
    const refreshToken = cookies.jwt;
    let foundUser = users.find(user => user.refreshToken === refreshToken)
    if(!foundUser) return res.sendStatus(401)
    const authorization = req.headers["authorization"];
    if(!authorization) return res.status(401).json({"msg":"Unauhtorised access strongly dissalowed"})
    const token = authorization.split(" ")[1]
let roles = Object.values(foundUser.roles)
if(!roles) return res.sendStatus(401)
    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (err, decoded) => {
            if(err) return res.sendStatus(401)
            req.roles = roles
        }
    )
    next()
}
module.exports = verifyJWT