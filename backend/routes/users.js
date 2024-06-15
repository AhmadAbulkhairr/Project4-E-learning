
const express = require("express");

const { register, login ,userInfo,googleLogin} = require("../controllers/users");


const usersRouter = express.Router();
const authentication = require("../middleware/authen");

usersRouter.post("/register", register);
usersRouter.post("/login", login);
usersRouter.post('/google-login', googleLogin);




module.exports = usersRouter;
