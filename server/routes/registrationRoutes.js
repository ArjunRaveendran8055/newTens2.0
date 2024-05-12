const {getSchoolList} = require('../controllers/registrationController')
const registrationRoutes = require("express").Router();

registrationRoutes.post("/getschool", getSchoolList);

module.exports={
    registrationRoutes,
}