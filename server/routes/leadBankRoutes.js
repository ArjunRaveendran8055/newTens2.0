const { submitLeadController, getAllLeadsController } = require("../controllers/leadBankController");

const express = require("express");
const leadBankRouter = express.Router();

leadBankRouter.post("/submitLead", submitLeadController);

leadBankRouter.get("/getAllLeads",getAllLeadsController)

module.exports = {
  leadBankRouter,
};
