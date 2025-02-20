const mongoose = require("mongoose")
const Schema = mongoose.Schema
const ObjectId = mongoose.ObjectId

const user = new Schema({
    name:String,
    email:String,
    password:String
})

const todo = new Schema({
    userId: ObjectId,
    title:String,
    done:Boolean
})

const usermodel = mongoose.model("userss",user)
const todomodel= mongoose.model("todoss",todo)

module.exports={
    usermodel,
    todomodel
}