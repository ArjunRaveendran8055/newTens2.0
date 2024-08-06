const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Multer configuration
const studentStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    const dir = "uploads/students";
    //check if directory exists
    if (!fs.existsSync(dir)) {
      //create directory
      fs.mkdirSync(dir, { recursive: true });
    }
    cb(null, dir); // Specify the directory where uploaded files will be stored
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now() + ".png"); // Specify the filename format
  },
});

const userStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    const dir = "uploads/users";
    //check if directory exists
    if (!fs.existsSync(dir)) {
      //create directory
      fs.mkdirSync(dir, { recursive: true });
    }
    cb(null, dir); // Specify the directory where uploaded files will be stored
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now() + ".png"); // Specify the filename format
  },
});

const studentUpload = multer({ storage: studentStorage });

const userUpload = multer({ storage: userStorage });

module.exports = { studentUpload,userStorage };
