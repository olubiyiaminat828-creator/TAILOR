const users = require("../models/users.json");
const fsPromises = require("fs/promises");
const path = require("path");
const bcrypt = require("bcrypt");
const loginAuthController = async (req, res) => {
  const { username, email, password } = req.body;
  const duplicate = users.find((user) => user.username === username);
  if (duplicate) return res.status(409).json({ msg: "User already exits" });
  let hashPwd = await bcrypt.hash(password, 10)
  const newUser = {
    username,
    email,
    password: hashPwd,
    refreshToken: "",
    roles: {user: 2000}
  };
  users.push(newUser)
  try{
     await fsPromises.writeFile(path.join(__dirname, "..", "models", "users.json"), JSON.stringify(users))
  }catch(err){
      console.log(err)
  }
  res.json({"msg": "New User successfully created"}, )
}
module.exports = loginAuthController