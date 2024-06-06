
const express = require("express");

const { register, login } = require("../controllers/users");
const { check, validationResult } = require("express-validator");


const usersRouter = express.Router();

usersRouter.post("/register", register);
usersRouter.post("/login", login);




module.exports = usersRouter;
