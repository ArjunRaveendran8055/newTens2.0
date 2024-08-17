const { AppError } = require("../AppError");
const { asyncWrapper } = require("../helpers/asyncWrapper");
const { leadBankModel } = require("../models/leadBankModel");
const fs = require("fs");
const path = require("path");
const XLSX = require("xlsx");
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
  const limit = parseInt(req.query.limit) || 15;
  const { dateFrom, dateTo } = req.query;
  const skip = (page - 1) * limit;
  console.log("dates are :", dateFrom, dateTo);
  let obj = {};
  if (dateFrom) {
    console.log("dum");
    obj.createdAt = obj.createdAt || {};
    obj.createdAt.$gte = new Date(dateFrom);
  }
  if (dateTo) {
    obj.createdAt = obj.createdAt || {};
    obj.createdAt.$lte = new Date(dateTo);
  }

  console.log("query object is:", obj);

  const leads = await leadBankModel
    .find(obj)
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);
  //console.log("leads are :", leads);
  const totalLeads = await leadBankModel.countDocuments(obj);
  if (leads.length === 0) {
    throw new AppError(404, "Something Went Wrong");
  }
  return res.status(200).json({
    leads,
    totalLeads,
    totalPages: Math.ceil(totalLeads / limit),
    currentPage: page,
  });
});

const exportLeadController = asyncWrapper(async (req, res, next) => {
  const { fields } = req.body;
  const { dateFrom, dateTo } = req.query;
  console.log("fields are:", fields);
  const projectionObj = {
    $project: {
      _id: 0,
      ...fields,
    },
  };
  console.log("dates are", dateFrom, dateTo);
  let obj = {};
  if (dateFrom) {
    console.log("dum");
    obj.createdAt = obj.createdAt || {};
    obj.createdAt.$gte = new Date(dateFrom);
  }
  if (dateTo) {
    obj.createdAt = obj.createdAt || {};
    obj.createdAt.$lte = new Date(dateTo);
  }
  const exportData = await leadBankModel.aggregate([
    {
      $match: obj,
    },
    {
      $sort: {
        createdAt: -1,
      },
    },
    projectionObj,
  ]);
  console.log("export data is :", exportData);

  // Create a new workbook and worksheet
  const ws = XLSX.utils.json_to_sheet(exportData);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Leads");
  
  // Generate the Excel file
  const excelFilePath = path.join(__dirname + "/../public", "leads.xlsx");
  XLSX.writeFile(wb, excelFilePath);
  // Send the file as a response
  res.download(excelFilePath, "leads.xlsx", (err) => {
    if (err) {
      console.error("Error downloading the file", err);
      res.status(500).send("Error downloading the file");
    }

    // // Clean up the file after sending it
     fs.unlinkSync(excelFilePath);
  });
});

const uploadLeadsController = asyncWrapper(async (req, res) => {
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
});

module.exports = {
  uploadLeadsController,
  submitLeadController,
  getAllLeadsController,
  exportLeadController,
};
