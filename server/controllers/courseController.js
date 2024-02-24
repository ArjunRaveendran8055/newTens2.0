const { asyncWrapper } = require("../helpers/asyncWrapper");
const { CourseModel } = require("../models/CourseModel");


const getAllCourseController=asyncWrapper(

    async (req,res,next)=>{
        const {sort,category}=req.query
        //sorting logic
        let queryObj={}
        let filterObj={}
        if(sort==="price"){
            queryObj.enrollment_fee=1
        }
        if(sort==="-price"){
            queryObj.enrollment_fee=-1
        }
        if(sort==="rating"){
            queryObj.rating=-1;
        }
        //filter logic
        if(category){
            console.log("category",category);
           catArray=category.split(",")
            filterObj.category=catArray
        }

        console.log(filterObj,"filter obj from line 29")

        //original query
         const result=await CourseModel.find(filterObj).sort(queryObj)
         res.status(200).json({data:result,status:"success"})
    }
)

module.exports={getAllCourseController}