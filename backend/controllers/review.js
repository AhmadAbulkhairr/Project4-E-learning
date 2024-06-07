const Review = require("../models/ReviewsSchema");
const Material = require('../models/MaterialSchema');

// This function creates a new review for a specific material
const createNewReview = (req, res) => {
  const id = req.params.id;
  const { review } = req.body;
  const reviewer = req.token.userId;
  const reviewerName = req.token.user;

  Material.findById(id)
    .then((material) => {
      if (!material) {
        return res.status(404).json({
          success: false,
          message: 'Material not found',
        });
      }

      const newReview = new Review({
        review,
        reviewer,
        reviewerName,
      });

      newReview.save()
        .then((result) => {
          material.reviews.push(result._id);
          material.save()
            .then(() => {
              res.status(201).json({
                success: true,
                message: 'Review added',
                review: result,
              });
            })
            .catch((err) => {
              res.status(500).json({
                success: false,
                message: 'Server Error',
                err: err.message,
              });
            });
        })
        .catch((err) => {
          res.status(500).json({
            success: false,
            message: 'Server Error',
            err: err.message,
          });
        });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: 'Server Error',
        err: err.message,
      });
    });
};

module.exports = { createNewReview };
