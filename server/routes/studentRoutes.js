const studentRoutes = require("express").Router();
const {
  getAllStudentsController,
  getStudentDetailsController,
  addReportController,
  fetchStudentReportsController,
} = require("../controllers/studentControllers");

const { authorizeGenuinity }=require("../middleware/authorizeGenuinity")

studentRoutes.get("/getAllStudents",authorizeGenuinity ,getAllStudentsController);

studentRoutes.get("/getStudentDetails/:id",authorizeGenuinity, getStudentDetailsController);

studentRoutes.post("/addReport",authorizeGenuinity, addReportController);

studentRoutes.get("/fetchStudentReports/:id",authorizeGenuinity, fetchStudentReportsController);

module.exports = {
  studentRoutes,
};
