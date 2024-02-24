const multer = require("multer");
const path=require("path")

const proPicStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/profilePic/");
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "_" + Date.now() + ".png");
  },
});

const proPicUpload=multer({
    storage:proPicStorage
})


module.exports={
    proPicUpload
}