const { AppError } = require("../AppError");
const { asyncWrapper } = require("../helpers/asyncWrapper");
const { leadBankModel } = require("../models/leadBankModel");
const fs=require("fs")
const path=require("path")
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
  const filename="file-1722969351132.png"
  const filePath = path.join(__dirname+"/../uploads", 'students', filename);
  if (fs.existsSync(filePath)) {
    // Set the MIME type to image/png
    res.setHeader('Content-Type', 'image/png');

    // Send the file for download
    res.download(filePath, filename, (err) => {
        if (err) {
            console.error('Error downloading the file:', err.message);
            res.status(500).send('Error downloading the file');
        }
    });
}

});

module.exports = {
  submitLeadController,
};
