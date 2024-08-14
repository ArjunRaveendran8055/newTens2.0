const { AppError } = require("../AppError");
const { asyncWrapper } = require("../helpers/asyncWrapper");
const { leadBankModel } = require("../models/leadBankModel");
const fs = require("fs");
const path = require("path");
const submitLeadController = asyncWrapper(async (req, res, next) => {
  const formData = req.body;
  if (
    !formData.name ||
    !formData.phone ||
    !formData.class ||
    !formData.division ||
    !formData.syllabus
  ) {
    throw new AppError(400, "Incomplete Data!");
  }

  console.log("formData is", formData);
  const newLead = new leadBankModel(formData);
  const addedLead = await newLead.save();
  console.log("added lead is:", addedLead);
  if (!addedLead) {
    throw new AppError(400, "Something Went Wrong!");
  }
  return res.status(200).json({ addedLead, success: true });
});

const getAllLeadsController = asyncWrapper(async (req, res, next) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 2;
  const skip = (page - 1) * limit;
  //console.log("pages:", page, limit);
  const leads= await leadBankModel.find().sort({createdAt:-1}).skip(skip).limit(limit)
  console.log("leads are :",leads)
  const totalLeads=await leadBankModel.countDocuments()
  if(leads.length===0){
    throw new AppError(404,"Something Went Wrong")
  }
  return res.status(200).json({leads,totalLeads,totalPages:Math.ceil(totalLeads/limit),currentPage:page})
});
  

module.exports = {
  submitLeadController,
  getAllLeadsController,
};
