const express = require('express');

const recovery = express.Router()
const {resetPassword,passwordREcovery} = require("../controllers/recovery")
recovery.post("/password-recovery",passwordREcovery)
recovery.post("/reset-password",resetPassword)


module.exports = recovery