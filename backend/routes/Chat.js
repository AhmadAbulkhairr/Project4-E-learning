const express = require('express');
const ChatRouter = express.Router();
const {getAllHistory} = require("../controllers/Chat")

ChatRouter.get('/history/:room',getAllHistory );

module.exports = ChatRouter;