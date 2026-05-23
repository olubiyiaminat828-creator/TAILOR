const users = require("../models/users.json");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")
const loginAuthController = async (req, res) => {
    const {username, password} = req.body;
    if(!username || !password) return res.status(400).json({"msg": "Your fields cannot be empty"});
    let foundUser = users.find(user => user.username === username);
    if(!foundUser) return res.status(403).json({"msg": "User does not exists!"});
    let passVal = await bcrypt.compare(password, foundUser.password);
    if(!passVal) return res.status(403).json({"msg": "Password is incorrect!"})
        const access_token = jwt.sign(
    {"username": foundUser.username},
    process.env.ACCESS_TOKEN_SECRET,
    {expiresIn: "15m"}
    )
    const refeshToken = jwt.sign(
        {"username": foundUser.username},
        process.env.REFRESH_TOKEN_SECRET,
        {expiresIn: "1d"}
    )
    foundUser.refreshToken = refeshToken
    res.cookie("jwt", refeshToken, {httpOnly: true})
    res.json({foundUser, access_token})
}
module.exports = loginAuthController