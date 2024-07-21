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


const createClassController = asyncWrapper(async (req,res)=>{
  const centreId = req.params.id;
  const { class: classStandard, stream } = req.body;
  try {
    const updatedCentre = await CentreModel.findByIdAndUpdate(
      centreId,
      { $push: { classes: { class: classStandard, stream } } },
      { new: true }
    );
    if (!updatedCentre) {
      return res.status(404).json({ message: 'Centre not found' });
    }

    res.json(updatedCentre);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
})

module.exports = {
  getAllCentresController,
  createCentreController,
  deleteCentreController,
  createClassController
};
