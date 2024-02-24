const mongoose=require("mongoose")


const connectDb=async (url)=>{
    await mongoose.connect(url,{})
    .then(data=>console.log("connected to Dbase : ",data.connection.host))
    
}

module.exports={connectDb}