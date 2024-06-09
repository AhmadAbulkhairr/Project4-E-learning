const express = require('express');
const materialRouter = express.Router();

const {
  addMaterial,
  updateMaterial,
  deleteMaterial,getAllMaterialsByTeacherId
} = require('../controllers/materials');
const {createNewReview} = require("../controllers/review")

const authentication = require('../middleware/authen');
const authorization = require('../middleware/author');

materialRouter.post('/addMaterial', authentication, authorization('Teacher'), addMaterial);
materialRouter.get('/allMaterials/:id', getAllMaterialsByTeacherId);

//materialRouter.get('/subject/:id/materials', authentication, getAllMaterialsBySubjectId);

//materialRouter.get('/material/:id', authentication, getMaterialById);
materialRouter.put('/updateMaterial/:id', authentication, authorization('Teacher'), updateMaterial);
materialRouter.delete('/deleteMaterial/:id', authentication, authorization('Admin'), deleteMaterial);

materialRouter.post(
    "/:id/reviews",authentication,
    
  );

module.exports = materialRouter;
