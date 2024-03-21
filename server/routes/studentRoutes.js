const studentRoutes = require("express").Router();
const {
  getAllStudentsController, getStudentDetailsController,
} = require("../controllers/studentControllers");

studentRoutes.get("/getAllStudents", getAllStudentsController);

studentRoutes.get("/getStudentDetails/:id",getStudentDetailsController)

module.exports = {
  studentRoutes,
};
