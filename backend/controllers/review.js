const Review = require("../models/ReviewsSchema");
const Course = require('../models/CoursesSchema');

// This function creates a new review for a specific course
const createNewReview = (req, res) => {
  const id = req.params.id;
  const { review , reviewerName } = req.body;
  const reviewer = req.token.userId;

  Course.findById(id)
    .then((result) => {
      if (!result) {
        return res.status(404).json({
          success: false,
          course: 'course not found',
        });
      }

      const newReview = new Review({
        review,
        reviewer,
        reviewerName,
      });

      newReview.save()
        .then((resultReview) => {
          result.reviews.push(resultReview._id);
          result.save()
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

module.exports = { createNewReview
 };
