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

// const addBatchController = asyncWrapper(async (req,res)=>{
//   try{
//   const { id, className2, stream, batch } = req.body;
//   const document = await CentreModel.findById(id);
//   if (!document) {
//     return res.status(404).json({ message: 'Document not found' });
//   }
//   const classToUpdate = document.classes.find(c => c.class === className2 && c.stream === stream);
//   if (classToUpdate) {
//     if (!classToUpdate.batches) {
//       classToUpdate.batches = [];
//     }

//     // Add the batch to the array if it does not already exist
//     if (!classToUpdate.batches.includes(batch)) {
//       classToUpdate.batches.push(batch);
//     }
//     document.markModified('classes');
//     // Save the updated document
    
//     return res.status(200).json({ message: 'Batch added successfully', document });
//   } else {
//     return res.status(404).json({ message: 'Class not found' });
//   }
// }
//   catch (error) {
//     console.error('Error:', error);
//     return res.status(500).json({ message: 'Server error' });
//   }
// })

const addBatchController = asyncWrapper(async (req, res) => {
  try {
    const { id, className2, stream, batch } = req.body;

    // Find the document by _id
    const document = await CentreModel.findById(id);

    if (!document) {
      return res.status(404).json({ message: 'Document not found' });
    }

    // Find the class to update
    const classToUpdate = document.classes.find(c => c.class === className2 && c.stream === stream);

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



module.exports = {
  getAllCentresController,
  createCentreController,
  deleteCentreController,
  createClassController,
  getAllClassController,
  deleteClassController,
  addBatchController
};
