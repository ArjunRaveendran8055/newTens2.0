const mongoose = require("mongoose");

const tutorSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true, "Name is required!"]
    }
})

const TutorModel = mongoose.model("teachers",tutorSchema)

module.exports = {TutorModel}