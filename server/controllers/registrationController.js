const { AppError } = require("../AppError");
const { asyncWrapper } = require("../helpers/asyncWrapper");
const { SchoolModel } = require("../models/SchoolModel");
const mongoose = require("mongoose");

const getSchoolList = asyncWrapper(async (req, res, next) => {
    const { search, syllabus, abroad } = req.body;
    const regex = new RegExp(search, 'i');

    let pipeline = [
        {
            $match: { "name": { $regex: regex } }
        }
    ];

    if (syllabus) {
        pipeline.push({
            $match: { "syllabus": syllabus }
        });
    }

    pipeline.push({
        $project: {
            _id: 0,
            name: 1,
        }
    });

    const result = await SchoolModel.aggregate(pipeline);
    
    if (result.length === 0) {
        throw new AppError(404, "No results found!");
    } else {
        res.status(200).json({ success: true, data: result });
    }
});


module.exports = {
    getSchoolList
  };