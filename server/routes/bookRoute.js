const { getAllBookController } = require("../controllers/bookController")


const bookRoute=require("express").Router()

bookRoute.get("/getAllBooks",getAllBookController)


module.exports={
    bookRoute
}