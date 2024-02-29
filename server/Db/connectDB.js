const mongoose=require("mongoose")
const connectMongoDb=async ()=>{
    await mongoose.connect(process.env.MONGO_URL,{})
    .then((data)=>{
        console.log((`server connected to : ${data.connection.host}`));
    })
}

module.exports={
    connectMongoDb
}