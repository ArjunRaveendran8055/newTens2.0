const { AppError } = require("../AppError");
const { asyncWrapper } = require("../helpers/asyncWrapper");
const { CentreModel } = require("../models/CentreModel");

const getAllCentresController = asyncWrapper(async (req, res) => {
  const result = await CentreModel.find({});
  if (result.length === 0) {
    throw new AppError(500, "Something Went Wrong");
  }
  res.status(200).json({ result, success: true });
});

//get centre tag of all the available centres
const getCentreTagsController=asyncWrapper(
  async(req,res,next)=>{
    
    const pipeLine=[
      {
        $project:{
          _id:0,
          "tag":"$tag",
          "centre":"$centrename"
        }
      }
    ]
    const result=await CentreModel.aggregate(pipeLine)
    res.status(200).json({data:result})
  }
)

const createCentreController = asyncWrapper(async (req,res)=>{
  console.log(req.body);
  const {
    centrename,
    tag,
    incharge,
  } = req.body;

  if (!centrename || !tag) {
    return res.status(400).json({ message: "centreName and Tag are required" });
  }

  const newCentre = new CentreModel({
    centrename,
    tag,
    incharge,
  });

  const savedCentre = await newCentre.save();
  res.status(201).json(savedCentre);
  
})

const deleteCentreController = asyncWrapper(async (req,res)=>{
  const centre = await CentreModel.findByIdAndDelete(req.params.id);
    if (!centre) {
      return res.status(404).json({ message: 'Centre not found' });
    }
    res.json({ message: 'Centre deleted successfully' });
})

// class actions here

const createClassController = asyncWrapper(async (req,res)=>{
  const centreId = req.params.id;
  const { class: classStandard, stream } = req.body;
  try {
    const updatedCentre = await CentreModel.findByIdAndUpdate(
      centreId,
      { $push: { classes: { class: classStandard, stream } } },
      { new: true }
    );
    if (!updatedCentre) {
      return res.status(404).json({ message: 'Centre not found' });
    }

    res.json(updatedCentre);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
})

const getAllClassController = asyncWrapper(async (req,res)=>{
  const centreId = req.params.id;
  const centre = await CentreModel.findById(centreId);
  if (!centre) {
    return res.status(404).json({ message: 'Centre not found' });
  }
  res.json(centre.classes);
})

//to delete a specific class from a centre
const deleteClassController = asyncWrapper(async (req,res)=>{
  const centreId = req.params.id;
  const { class: classStandard, stream } = req.body;

  const updatedCentre = await CentreModel.findByIdAndUpdate(
    centreId,
    { $pull: { classes: { class: classStandard, stream: stream } } },
    { new: true }
  );

    if (!updatedCentre) {
      return res.status(404).json({ message: 'Centre not found' });
    }
    res.json(updatedCentre.classes);
})


// to add a batch inside a selected class

const addBatchController = asyncWrapper(async (req, res) => {
  try {
    const { id, className2, stream, batch } = req.body;
    console.log(stream,"stream");
    
    
    // Find the document by _id
    const document = await CentreModel.findById(id);

    if (!document) {
      return res.status(404).json({ message: 'Document not found' });
    }
    console.log(document);

    // Find the class to update
    const classToUpdate = document.classes.find(c => c.class === parseInt(className2,10) && c.stream === stream);

    if (classToUpdate) {
      if (!classToUpdate.batches) {
        classToUpdate.batches = [];
      }

      // Check if the batch already exists
      const batchExists = classToUpdate.batches.some(b => b.name === batch);

      if (batchExists) {
        return res.status(400).json({ message: 'Batch already exists' });
      }

      // Add the new batch
      classToUpdate.batches.push({ name: batch });
      document.markModified('classes');
      await document.save();
      // Save the updated document
      await document.save();
      return res.status(200).json({ message: 'Batch added successfully', document });
    } else {
      return res.status(404).json({ message: 'Class not found' });
    }
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ message: 'Server error' });
  }
});


const getBatchController = asyncWrapper(async (req, res) => {
  console.log(req.body);
  const { id, class: className, stream } = req.body;
  try {
    // Find the centre by ID
    const centre = await CentreModel.findById(id);

    if (!centre) {
      return res.status(404).json({ message: "Centre not found" });
    }

    // Find the matching class within the classes array
    const matchingClass = centre.classes.find(
      (cls) => cls.class === parseInt(className,10) && cls.stream === stream
    );

    if (!matchingClass) {
      return res.status(404).json({ message: "Class not found" });
    }

    // Return the batches array
    return res.json({ batches: matchingClass.batches });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
})

const addAAcontroller = asyncWrapper(async (req, res) => {
  const { id, className2, stream, aaNames } = req.body;
  console.log(req.body);

  try {
    // Find the document by ID
    const centre = await CentreModel.findById(id);

    if (!centre) {
      return res.status(404).json({ message: 'Centre not found' });
    }

    // Find the class object matching the class and stream
    const classObj = centre.classes.find(c => c.class === parseInt(className2,10) && c.stream === stream);

    if (!classObj) {
      return res.status(404).json({ message: 'Class not found' });
    }

    // Update the AANames
    classObj.AANames = aaNames;

    // Mark the classes array as modified
    centre.markModified('classes');

    // Save the updated document
    await centre.save();

    res.send('Update successful.');
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

const getAAcontroller = asyncWrapper(async (req, res) => {
  const { id, class: className, stream } = req.body;
  try {
    const centre = await CentreModel.findById(id);
    if (!centre) {
      return res.status(404).send({ error: 'Centre not found' });
    }

    const classInfo = centre.classes.find(
      (c) => c.class === parseInt(className,10) && c.stream === stream
    );

    if (!classInfo) {
      return res.status(404).send({ error: 'Class or Stream not found' });
    }

    res.send({ AANames: classInfo.AANames });
  } catch (error) {
    res.status(500).send({ error: 'Server error' });
  }
})

const updateMentorController = asyncWrapper(async (req, res) => {
  const { id, class: className2, stream, batch, selectedMentor } = req.body;
  try {
    // Find the document by ID
    const centre = await CentreModel.findById(id);

    if (!centre) {
      return res.status(404).json({ message: 'Centre not found' });
    }

    // Find the class object matching the class and stream
    const classObj = centre.classes.find(c => c.class === parseInt(className2,10) && c.stream === stream);

    if (!classObj) {
      return res.status(404).json({ message: 'Class not found' });
    }

    // Find the batch object to update
    const batchObj = classObj.batches.find(b => b.name === batch);

    if (!batchObj) {
      return res.status(404).json({ message: 'Batch not found' });
    }

    // Initialize mentors array if it does not exist or replace existing mentor with the new one
    batchObj.mentors = [selectedMentor];

    // Mark classes as modified
    centre.markModified('classes');
    
    // Save the updated document
    await centre.save();

    res.status(200).json({ message: 'Mentor added successfully', centre });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});


module.exports = {
  getAllCentresController,
  createCentreController,
  deleteCentreController,
  createClassController,
  getAllClassController,
  deleteClassController,
  addBatchController,
  getBatchController,
  addAAcontroller,
  getAAcontroller,
  getCentreTagsController,
  updateMentorController
};
