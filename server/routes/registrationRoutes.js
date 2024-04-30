const {getSchoolList} = require('../controllers/registrationController')
const registrationRoutes = require("express").Router();

registrationRoutes.get("/getschool", getSchoolList);

module.exports={
    registrationRoutes,
}