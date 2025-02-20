const express = require("express")
const {usermodel,todomodel} = require("./db")
const mongoose = require("mongoose")
const jwt = require("jsonwebtoken")
const JWT_SECRET = "kjsvnjsbvvbe"
const app = express()
app.use(express.json())
mongoose.connect("mongodb+srv://hunny:EKcZB1K9@cluster0.3vulh.mongodb.net/userdata-todo-app")

app.post("/signup",async(req,res)=>{
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;

    await usermodel.create({
        name:name,
        email:email,
        password:password
    })
    res.json({
        msg:"you are signed up"
    })
})

app.post("/signin",async(req,res)=>{
    const email = req.body.email;
    const password = req.body.password;

    const response = await usermodel.findOne({
        email,password
    })
    if(response){
        const token = jwt.sign({
            id:response._id

        },JWT_SECRET)
        res.json({
            token:token
        })
    }else{
        res.json({
            msg:"invalid credential"
        })
    }

})
function auth(req,res,next){
    const token = req.headers.token
    const decodedinfo = jwt.verify(token,JWT_SECRET);

    if(decodedinfo){
        req.userId = decodedinfo.id
        next()
    }
    else{
        res.json({
            msg:"invalid token"
        })
    }

}
app.post("/todo",auth,(req,res)=>{
    
})
app.get("/todos",(req,res)=>{
    
})

app.listen(8080)