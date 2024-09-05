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

const getLocationController = asyncWrapper(async (req, res, next) => {
  try {
    const searchQuery = req.query.q;

    const locations = await SchoolModel.aggregate([
      {
        $match: { location: { $regex: searchQuery, $options: "i" } } // Case-insensitive search
      },
      {
        $group: {
          _id: "$location" // Group by location to ensure uniqueness
        }
      },
      {
        $limit: 10 // Limit to 10 suggestions
      }
    ]);

    // Extract location from the grouped result
    const uniqueLocations = locations.map(loc => loc._id);

    res.json(uniqueLocations);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch locations" });
  }
});

module.exports = {
  addSchoolController,
  getLocationController
};
