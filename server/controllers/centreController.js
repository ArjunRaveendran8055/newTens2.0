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

const createCentreController = asyncWrapper(async (req,res)=>{
  console.log(req.body);
  const {
    centrename,
    tag,
    incharge,
  } = req.body;

  if (!centrename || !tag) {
    return res.status(400).json({ message: "centreName and Tag are required" });
  }

  const newCentre = new CentreModel({
    centrename,
    tag,
    incharge,
  });

  const savedCentre = await newCentre.save();
  res.status(201).json(savedCentre);
  

})

const deleteCentreController = asyncWrapper(async (req,res)=>{
  const centre = await CentreModel.findByIdAndDelete(req.params.id);
    if (!centre) {
      return res.status(404).json({ message: 'Centre not found' });
    }
    res.json({ message: 'Centre deleted successfully' });
})

module.exports = {
  getAllCentresController,
  createCentreController,
  deleteCentreController
};
