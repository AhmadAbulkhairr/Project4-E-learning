const Review = require("../models/ReviewsSchema")
const Material = require('../models/MaterialSchema');




// This function creates a new comment for a specific article
const createNewReview = (req, res) => {
    const id = req.params.id;
    const { review } = req.body;
    const reviewer = req.token.userId;
    const reviewerName = req.token.user
    const newReview = new Review({
        review,
        reviewer,
        reviewerName
    });
    newReview
      .save()
      .then((result) => {
        Material
          .findByIdAndUpdate(
            { _id: id },
            { $push: { reviews: result._id } },
            { new: true }
          )
          .then(() => {
            res.status(201).json({
              success: true,
              message: `review added`,
              review: result,
            });
          })
          .catch((err) => {
            res.status(500).json({
              success: false,
              message: `Server Error`,
              err: err.message,
            });
          });
      })
      .catch((err) => {
        res.status(500).json({
          success: false,
          message: `Server Error`,
          err: err.message,
        });
      });
  };

  module.exports = {createNewReview} 