const { asyncWrapper } = require("../helpers/asyncWrapper");
const { UserModel } = require("../models/UserModel");

//get the pending userList
const pendingUserController = asyncWrapper(async (req, res, next) => {
  const pendingData = await UserModel.find({ activestatus: false });

  if (pendingData.length < 1) {
    res.status(200).json({ message: "no pending users!" });
  } else {
    res.status(200).json({ count: pendingData.length, data: pendingData });
  }
});

module.exports = { pendingUserController };
