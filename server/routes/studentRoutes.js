const studentRoutes = require("express").Router();
const {
  getAllStudentsController,
  getStudentDetailsController,
  addReportController,
  fetchStudentReportsController,
  getAllStudentsDetailedController,
  downloadStudentsCSVController,
} = require("../controllers/studentControllers");

const { authorizeGenuinity }=require("../middleware/authorizeGenuinity")

studentRoutes.get("/getAllStudents",authorizeGenuinity ,getAllStudentsController);

studentRoutes.get("/getStudentDetails/:id",authorizeGenuinity, getStudentDetailsController);

studentRoutes.post("/addReport",authorizeGenuinity, addReportController);

studentRoutes.get("/fetchStudentReports/:id",authorizeGenuinity, fetchStudentReportsController);

studentRoutes.post("/getAllStudentsDetailed", authorizeGenuinity , getAllStudentsDetailedController )

studentRoutes.post("/downloadStudentsExcel", authorizeGenuinity , downloadStudentsCSVController )

module.exports = {
  studentRoutes,
};
