const mongoose=require("mongoose")

const bookSchema= new mongoose.Schema(
    {
        title:{
            type:String,
            required:[true,"Book title required"]
        },
        author:{
            type:String,
            required:[true,"Author name required"]
        },
        publication_year:{
            type:Number,
            required:[true,"Publication year required"]
        },
        publisher:{
            type:String,
            required:[true,"Publisher name required"]
        },
        isbn:{
            type:String,
            required:[true,"Publisher name required"]
        },
        description:{
            type:String,
            required:[true,"Publisher name required"]
        },
        image_url:{
            type:String,
            required:[true,"Publisher name required"]
        },
        rating:{
            type:Number,
            required:[true,"Publisher name required"]
        },
        pageSize:{
            type:Number,
            required:[true,"Publisher name required"]
        },
        reviews:{
            type:Array,
    
        },
        category:{
            type:String,
            required:[true,"Publisher name required"]
        }
    }
)

const bookModel=mongoose.model("books",bookSchema)


module.exports={bookModel}