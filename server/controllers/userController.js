const { asyncWrapper } = require("../helpers/asyncWrapper");

//get the pending userList
const pendingUserController=asyncWrapper(
    async (req, res, next) => {
        console.log("hitt successful");
    }
)

module.exports={pendingUserController}