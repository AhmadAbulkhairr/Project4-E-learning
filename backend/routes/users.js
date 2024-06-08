
const express = require("express");

const { register, login ,userInfo} = require("../controllers/users");


const usersRouter = express.Router();
const authentication = require("../middleware/authen");

usersRouter.post("/register", register);
usersRouter.post("/login", login);
usersRouter.get("/userinfo", authentication,userInfo);




module.exports = usersRouter;
