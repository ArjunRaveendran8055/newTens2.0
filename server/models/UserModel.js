const mongoose=require("mongoose")

const userSchema= new mongoose.Schema({
    email:{
        type:String,
        required:[true,"email is required"],
        unique:true
    },
    password:{
        type:String,
        required:[true,"password is required"],
        minLength:[4,"password must be atleast 4 characters"]
    },
    username:{
      type:String,
      required:[true,"name is required"],
      minLength:[3,"name must me atleast 3 characers"]
    },
    address:[
            {
              country: {
                type: String,
              },
              city: {
                type: String,
              },
              address1: {
                type: String,
              },
              address2: {
                type: String,
              },
              zipCode: {
                type: Number,
              },
              addressType: {
                type: String,
              },
            },
          ],
    role:{
        type:String,
        required:[true,"role is required"]
    },
    cartItems:Array,
    active:{
      type:Boolean,
      default:false
    },
    avatar:{
        type:String,
        required:false
    },
    passwordreSetKey:{
      type:String,
      required:false
    },
    passwordResetDate:{
      type:String,
      required:false
    }
  })

  const UserModel=mongoose.model("users",userSchema)

  module.exports={UserModel}