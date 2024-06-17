const express = require('express');

const recovery = express.Router()
const {resetPassword,passwordREcovery} = require("../controllers/recovery")
recovery.post("/password-recovery",passwordREcovery)
recovery.post("/password-recovery",resetPassword)


module.exports = recovery