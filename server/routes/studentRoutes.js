const studentRoutes = require("express").Router();
const {
  getAllStudentsController, getStudentDetailsController, addReportController,
} = require("../controllers/studentControllers");

studentRoutes.get("/getAllStudents", getAllStudentsController);

studentRoutes.get("/getStudentDetails/:id",getStudentDetailsController)

studentRoutes.post("/addReport",addReportController)

module.exports = {
  studentRoutes,
};
