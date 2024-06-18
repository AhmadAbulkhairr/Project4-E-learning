const express = require('express');
const stripeRouter = express.Router();
const createStripe = require('../controllers/stripe')
stripeRouter.post('/create-payment-intent',createStripe);

module.exports = stripeRouter;
