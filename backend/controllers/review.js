const Review = require("../models/ReviewsSchema");
const Course = require('../models/CoursesSchema');
const { findById } = require("../models/UserSchema");

// This function creates a new review for a specific course
const createNewReview = (req, res) => {
  const id = req.params.id;
  const { review , reviewerName } = req.body;
  const reviewer = req.token.userId;
console.log(review);
console.log(reviewerName);

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
const deleteReview = async (req,res) => {
  const {id} = req.params
  const {review} = req.body
try {

  await Review.findByIdAndDelete(review)

  const course = await Course.findById (id)
const indexId = course.reviews.indexOf(review)

if (indexId !== -1 ){
  course.reviews.splice(indexId,1)
await course.save()
res.status(200).json({
  success: true,
  message: 'review removed from user',
  
});
}
else {
  res.status(400).json({
    success: false,
    message: 'review not found in user courses'
  });
}
}

catch(err){
  res.status(500).json({
    success: false,
    message: 'Server Error',
    error: err.message
  });
}
}
module.exports = { createNewReview,deleteReview
 };
