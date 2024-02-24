const { asyncWrapper } = require("../helpers/asyncWrapper");
const { bookModel } = require("../models/BookModel");

const getAllBookController= asyncWrapper(
    async (req,res,next)=>{
        const {sort,category,pageSize}=req.query
        
        //sorting logic
        let queryObj={}
        let filterObj={}
        if(sort==="price"){
            queryObj.price=1
        }
        if(sort==="-price"){
            queryObj.price=-1
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

        //original query
         const result=await bookModel.find(filterObj).sort(queryObj)
         res.status(200).json({data:result,status:"success"})
    }
)

module.exports={
    getAllBookController
}