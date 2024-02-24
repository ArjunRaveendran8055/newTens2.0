const mongoose=require("mongoose")

const courseSchema= new mongoose.Schema(
    {
        title:{
            type:String,
            required:[true,"Course title required"]
        },
        provider:{
            type:String,
            required:[true,"Provider name required"]
        },
        instructor:{
            type:String,
            required:[true,"instructor name required"]
        },
        duration:{
            type:String,
            required:[true,"duration  required"]
        },
        description:{
            type:String,
            required:[true,"description is required"]
        },
        image:{
            type:String,
            required:[true,"image is required"]
        },
        rating:{
            type:Number,
            required:[true,"Publisher name required"]
        },
        enrollment_fee:{
            type:Number,
            required:[true,"fee is required"]
        },
        start_date:{
            type:String,
        },
        category:{
            type:String,
            required:[true,"category  required"]
        },
        reviews:{
            type:Array,
    
        }
    }
)

const CourseModel=mongoose.model("courses",courseSchema)


module.exports={CourseModel}