const studentRoutes = require("express").Router();
const {
  getAllStudentsController,
  getStudentDetailsController,
  addReportController,
  fetchStudentReportsController,
} = require("../controllers/studentControllers");

studentRoutes.get("/getAllStudents", getAllStudentsController);

studentRoutes.get("/getStudentDetails/:id", getStudentDetailsController);

studentRoutes.post("/addReport", addReportController);

studentRoutes.get("/fetchStudentReports/:id", fetchStudentReportsController);

module.exports = {
  studentRoutes,
};
