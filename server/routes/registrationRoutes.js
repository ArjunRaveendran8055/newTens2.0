const {getSchoolList, SubmitStudentController} = require('../controllers/registrationController');
const { studentUpload } = require('../utils/multer');

const registrationRoutes = require("express").Router();

registrationRoutes.post("/getschool", getSchoolList);

registrationRoutes.post("/submitStudent",studentUpload.single('image') , SubmitStudentController )

module.exports={
    registrationRoutes,
}