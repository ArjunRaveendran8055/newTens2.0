const { AppError } = require("../AppError");
const { asyncWrapper } = require("../helpers/asyncWrapper");


const addSchoolController = asyncWrapper(async (req, res, next) => {
  console.log("tumtudum")
});

module.exports = {
  addSchoolController
};
