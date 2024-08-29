const { CentreModel } = require("../models/CentreModel");

const fetchAAbasedClasses = async (id) => {
  const pipeline = [
    {
      $unwind: {
        path: "$classes",
      },
    },
    {
      $unwind: {
        path: "$classes.AANames",
      },
    },
    {
      $match: {
        "classes.AANames.id": {
          $regex: id,
        },
      },
    },
    {
      $unwind: {
        path: "$classes.batches",
      },
    },
    {
      $project: {
        _id: 0,
        aa: "$classes.AANames.name",
        centre: "$centrename",
        class: "$classes.class",
        batch: "$classes.batches.name",
        level: "$classes.stream",
      },
    },
  ];

  try {
    const result = await CentreModel.aggregate(pipeline);
    // console.log("result form Fetch is:", result);
    return result;
  } catch (error) {
    console.log(error.message);
    return [];
  }
};

const fetchMentorBasedClasses = async (id) => {
  const pipeline = [
    {
      $unwind: {
        path: "$classes",
      },
    },
    {
      $unwind: {
        path: "$classes.batches",
      },
    },
    {
      $unwind: {
        path: "$classes.batches.mentors",
      },
    },
    {
      $match: {
        "classes.batches.mentors.id": {
          $regex: id,
        },
      },
    },

    {
      $project: {
        _id: 0,
        aa: "$classes.batches.mentors.name",
        centre: "$centrename",
        class: "$classes.class",
        batch: "$classes.batches.name",
        level: "$classes.stream",
      },
    },
  ];
  try {
    const result = await CentreModel.aggregate(pipeline);
    // console.log("result form Fetch is:", result);
    return result;
  } catch (error) {
    console.log(error.message);
    return [];
  }
};

module.exports = {
  fetchAAbasedClasses,
  fetchMentorBasedClasses,
};
