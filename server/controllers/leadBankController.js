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

const uploadLeadsController = async (req, res) => {
  try {
    const leadsData = req.body.leads; // Assuming the frontend sends data as { leads: [...] }

    if (!Array.isArray(leadsData) || leadsData.length === 0) {
      return res.status(400).json({ error: "No lead data provided" });
    }

    // Insertion without required field validation
    const validLeads = leadsData.map((lead) => {
      const { NAME, PHONE, WHATSAPP, CLASS, DIVISION, SYLLABUS, LOCATION, DISTRICT, SCHOOL } = lead;

      return {
        name: NAME || "", // Default to an empty string if not provided
        phone: PHONE || "",
        whatsapp: WHATSAPP || "",
        class: CLASS || "",
        division: DIVISION || "",
        syllabus: SYLLABUS || "",
        district: DISTRICT || "",
        school: SCHOOL || "",
        location: LOCATION || "",
        // addedByUserId: req.user.id, // Assuming you're using authentication
        // addByUserName: req.user.name, // Assuming you're using authentication
      };
    });

    // Insert leads into the collection
    if (validLeads.length > 0) {
      await leadBankModel.insertMany(validLeads);
    }

    // Send back a response with the count of inserted leads
    return res.status(200).json({
      message: "Upload completed",
      inserted: validLeads.length,
    });
  } catch (error) {
    console.error("Error uploading leads: ", error);
    return res.status(500).json({ error: "Server error occurred during upload" });
  }
};
  

module.exports = {
  uploadLeadsController,
  submitLeadController,
  getAllLeadsController,
};
