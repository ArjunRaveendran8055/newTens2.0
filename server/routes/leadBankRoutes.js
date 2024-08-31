const { submitLeadController, getAllLeadsController, exportLeadController,uploadLeadsController } = require("../controllers/leadBankController");
const express = require("express");
const { authorizeGenuinity } = require("../middleware/authorizeGenuinity");
const leadBankRouter = express.Router();

leadBankRouter.post("/submitLead",authorizeGenuinity(), submitLeadController);

leadBankRouter.get("/getAllLeads",authorizeGenuinity(),getAllLeadsController)

leadBankRouter.post("/exportleads",authorizeGenuinity(),exportLeadController)
leadBankRouter.post("/bulkUploadLead",authorizeGenuinity(),uploadLeadsController)

module.exports = {
  leadBankRouter,
};
