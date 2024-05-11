const { AppError } = require("../AppError");
const { asyncWrapper } = require("../helpers/asyncWrapper");
const { CentreModel } = require("../models/CentreModel");

const getAllCentresController = asyncWrapper(async (req, res) => {
  const result = await CentreModel.find({});
  if (result.length === 0) {
    throw new AppError(500, "Something Went Wrong");
  }
  res.status(200).json({ result, success: true });
});

module.exports = {
  getAllCentresController,
};
