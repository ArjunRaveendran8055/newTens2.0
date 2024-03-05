const studentRoutes = require("express").Router();
const {
  getAllStudentsController,
} = require("../controllers/studentControllers");

studentRoutes.get("/getAllStudents", getAllStudentsController);

module.exports = {
  studentRoutes,
};
