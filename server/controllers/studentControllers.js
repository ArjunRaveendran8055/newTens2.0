const { AppError } = require("../AppError");
const { asyncWrapper } = require("../helpers/asyncWrapper");
const { ApproveStudentModel } = require("../models/ApproveStudentModel");
const { StudentModel } = require("../models/StudentModel");
const mongoose = require("mongoose");
const XLSX = require("xlsx");
const { Transform } = require("stream");
const { Parser } = require("json2csv");
const { fetchAAbasedClasses } = require("../helpers/FetchRoleBasedClassess");

//fetch all students
const getAllStudentsController = asyncWrapper(async (req, res, next) => {
  const { roll, name, phno } = req.query;
  const { id, role } = res.user;
  const pipeline = [];

  const matchStage = {};
  if (role === "AA") {
    const classes = await fetchAAbasedClasses(id);
    console.log("classes", classes);
    if (classes.length === 0) {
      console.log("kudum");
      throw new AppError(400, "No match F!");
    }
    const exactClasses = classes.map((item) => ({
      centre: item.centre,
      level: item.level,
      class: String(item.class),
      batch: item.batch,
    }));
    //match for fetching the student that only matches the batch assinged to that perticulat AA
    pipeline.push({
      $match: {
        $or: exactClasses,
      },
    });
  } else if (role === "MENTOR") {
    const classes = await fetchAAbasedClasses(id);
    if (classes.length === 0) {
      console.log("kudum");
      throw new AppError(400, "No match Found!");
    }
    const exactClasses = classes.map((item) => ({
      centre: item.centre,
      level: item.level,
      class: String(item.class),
      batch: item.batch,
    }));
    //match for fetching the student that only matches the batch assinged to that perticulat MENTOR
    pipeline.push({
      $match: {
        $or: exactClasses,
      },
    });
  }

  if (roll) {
    matchStage.roll_no = { $regex: `^${roll}`, $options: "i" };
  }
  if (name) {
    matchStage.student_name = { $regex: `^${name}`, $options: "i" };
  }
  if (phno) {
    matchStage.whatsapp_no = { $regex: `^${phno}`, $options: "i" };
  }

  pipeline.push({ $match: matchStage });

  pipeline.push({
    $project: {
      student_name: 1,
      roll_no: 1,
      _id: 1,
      father_no: 1,
    },
  });

  const result = await ApproveStudentModel.aggregate(pipeline);

  console.log("result is:", result);
  if (result.length === 0) {
    throw new AppError(400, "No Match Found!.");
  }
  console.log("result is:", result);
  res.status(200).json({ data: result, success: true });
});

const getAllStudentsDetailedController = asyncWrapper(
  async (req, res, next) => {
    // Destructure query parameters and pagination parameters
    const {
      syllabus,
      classs,
      centre,
      school_name,
      school_location,
      district,
      medium,
      page = 1,
      limit = 10,
      id = false,
    } = req.body;

    // Build a filter object dynamically
    let filter = {};

    // Add each present query parameter to the filter object
    if (syllabus) filter.syllabus = syllabus;
    if (classs) filter.class = classs;
    if (centre) filter.centre = centre;
    if (school_name) filter.school_name = school_name;
    if (school_location) filter.school_location = school_location;
    if (district) filter.district = district;
    if (medium) filter.medium = medium;

    let val = id ? 1 : 0;

    // Specify the fields you want to retrieve from the database
    const projection = {
      roll_no: 1,
      student_name: 1,
      gender: 1,
      address: 1,
      class: 1,
      syllabus: 1,
      batch :1,
      student_status: 1,
      medium: 1,
      school_name: 1,
      school_location: 1,
      district: 1,
      pin_code: 1,
      mother: 1,
      father: 1,
      father_no: 1,
      mother_no: 1,
      centre: 1,
      whatsapp: 1,
      _id: val,
    };

    // Calculate the number of documents to skip based on the current page
    const skip = (page - 1) * limit;

    // Fetch data from the MongoDB model based on the filter, pagination, and only the required fields
    const students = await ApproveStudentModel.find(filter, projection)
      .skip(skip)
      .limit(parseInt(limit));

    // Check if no matching records are found
    if (students.length === 0) {
      throw new AppError(400, "No Match Found.");
    }

    // Get the total count of documents matching the filter (for pagination)
    const totalDocuments = await ApproveStudentModel.countDocuments(filter);

    // Calculate the total number of pages
    const totalPages = Math.ceil(totalDocuments / limit);

    // Return the filtered data along with pagination info
    res.json({
      currentPage: parseInt(page),
      totalPages,
      limit: parseInt(limit),
      totalDocuments,
      students,
    });
  }
);

//student details using student id as params
const getStudentDetailsController = asyncWrapper(async (req, res, next) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new AppError(400, "Invalid StudentID.");
  }
  const result = await ApproveStudentModel.findById(id);
  if (!result) {
    throw new AppError(400, "SomeThing wrong with StudentID.");
  }
  res.status(200).json({
    data: result,
    success: true,
    message: "student details fetched Successfully.",
  });
});

//controller to add a student report
const addReportController = asyncWrapper(async (req, res, next) => {
  const { id, callType, reason, response, handledBy } = req.body;

  const reportObj = {
    callType,
    reason,
    response,
    handledBy,
    time: new Date(Date.now()),
  };
  const result = await ApproveStudentModel.findByIdAndUpdate(id, {
    $push: { report: reportObj },
  });
  if (!result) {
    throw new AppError(400, "Report Insertion Failed!");
  }
  res.status(200).json({
    data: result,
    success: true,
    message: "Report Added SuccessFully.",
  });
});

// to download students details as csv format

const downloadStudentsCSVController = asyncWrapper(async (req, res, next) => {
  // Destructure filtering criteria from req.body
  const {
    syllabus,
    classs,
    centre,
    school_name,
    school_location,
    district,
    medium,
    id = false,
  } = req.body;

  // Build a match stage dynamically for filtering
  let matchStage = {};

  if (syllabus) matchStage.syllabus = syllabus;
  if (classs) matchStage.class = classs;
  if (centre) matchStage.centre = centre;
  if (school_name) matchStage.school_name = school_name;
  if (school_location) matchStage.school_location = school_location;
  if (district) matchStage.district = district;
  if (medium) matchStage.medium = medium;

  let val = id ? 1 : 0;

  // Build the aggregation pipeline
  const pipeline = [
    { $match: matchStage },
    {
      $project: {
        roll_no: 1,
        student_name: 1,
        gender: 1,
        address: 1,
        class: 1,
        syllabus: 1,
        batch: 1,
        student_status: 1,
        medium: 1,
        school_name: 1,
        school_location: 1,
        district: 1,
        pin_code: 1,
        mother: 1,
        father: 1,
        father_no: 1,
        mother_no: 1,
        centre: 1,
        whatsapp: 1,
        _id: val,
      },
    },
  ];

  // Fetch data from the database
  const cursor = ApproveStudentModel.aggregate(pipeline).cursor();

  // Create a CSV parser without automatically including headers
  const parser = new Parser({ header: false });
  
  // Boolean to track if headers have been written
  let headersWritten = false;

  // Create a transform stream
  const transformStream = new Transform({
    objectMode: true,
    transform: (chunk, encoding, callback) => {
      let csvChunk = '';
      
      // Add headers only for the first chunk
      if (!headersWritten) {
        csvChunk += parser.parse(chunk, { header: true }) + '\n';
        headersWritten = true;
      } else {
        csvChunk += parser.parse(chunk) + '\n';
      }

      callback(null, csvChunk);
    },
  });

  // Set response headers for downloading the CSV file
  res.setHeader("Content-Disposition", 'attachment; filename="students.csv"');
  res.setHeader("Content-Type", "text/csv");

  // Pipe the cursor to the transform stream and then to the response
  cursor.pipe(transformStream).pipe(res);
});

module.exports = downloadStudentsCSVController;


//getSsrReport of a student using id as params
const fetchStudentReportsController = asyncWrapper(async (req, res, next) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new AppError(400, "Invalid StudentID.");
  }
  const result = await ApproveStudentModel.findById(id);
  console.log("result is", result);
  if (!result) {
    throw new AppError(400, "SomeThing wrong with StudentID.");
  }

  res.status(200).json({
    data: result.report,
    success: true,
    message: "Reports sent successfully.",
  });
});

module.exports = {
  getAllStudentsController,
  getStudentDetailsController,
  addReportController,
  fetchStudentReportsController,
  getAllStudentsDetailedController,
  downloadStudentsCSVController,
};
