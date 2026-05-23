const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;
const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require("path");
const rootRouter = require("./routes/root");
const registerApi = require("./routes/api/register");
const loginAuthAPi = require("./routes/api/loginAuth");
const userDashboard = require("./routes/api/User");
require("dotenv").config()
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/css", express.static(path.join(__dirname, "public", "css")));
app.use("/images", express.static(path.join(__dirname, "public", "images")));
app.use(
  cors({
    origin: ["http://localhost:5000"],
    credentials: true,
  }),
);
app.use(cookieParser());
app.use("/", rootRouter);
app.use("/loginAuth", loginAuthAPi)
app.use("/register", registerApi);
app.use("/user", userDashboard)
app.use((req, res) => {
    res.end("Error 404 page not found")
})
app.listen(PORT, () => {
  console.log(`Server running at port ${PORT}`);
});
