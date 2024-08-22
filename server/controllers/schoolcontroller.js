const { AppError } = require("../AppError");
const { asyncWrapper } = require("../helpers/asyncWrapper");
const { SchoolModel } = require("../models/SchoolModel");

const addSchoolController = asyncWrapper(async (req, res, next) => {
  const { schoolData } = req.body;

  if (!schoolData.title || !schoolData.syllabus || !schoolData.location) {
    throw new AppError(400, "Incomplete Data");
  }

  // Create a new object with the "title" key replaced by "name"
  const updatedSchoolData = {
    ...schoolData, // Spread the original object
    name: schoolData.title, // Add the new "name" key with the value of "title"
  };
  delete updatedSchoolData.title;

  console.log("schooldata is:", updatedSchoolData);
  const newSchool = new SchoolModel(updatedSchoolData);
  const addedSchool = await newSchool.save();
  console.log("added school is:", addedSchool);
  if(!addedSchool){
    throw new AppError(500,"Something Unusual Happened!")
  }
  return res.status(200).json({addedSchool,success:true})
});

module.exports = {
  addSchoolController,
};
