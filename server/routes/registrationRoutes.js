const {getSchoolList, SubmitStudentController} = require('../controllers/registrationController');
const upload = require('../utils/multer');
const registrationRoutes = require("express").Router();

registrationRoutes.post("/getschool", getSchoolList);

registrationRoutes.post("/submitStudent",upload.single('image') , SubmitStudentController )

module.exports={
    registrationRoutes,
}