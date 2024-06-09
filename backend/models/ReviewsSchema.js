const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
    review: { type: String, required: true },
    reviewer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },

    reviewerName: {  type: String, required: true },

    created_at: { type: Date, default: Date.now }
  });

  module.exports = mongoose.model('Review', reviewSchema);