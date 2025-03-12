const express=require("express")
const app=express()
const cors=require("cors")
const mongoose=require("mongoose")
const bodyparser = require("body-parser")
require("dotenv").config()
const coustoRoute=require("./route/costumerRoute")


const port=process.env.PORT||8080

mongoose.connect(process.env.DBCONNECT).then(()=>{
    console.log("db connected")
})

app.use(bodyparser.urlencoded({extended:true}))
app.use(bodyparser.json())
app.use(cors())


app.use('/customer',coustoRoute)

app.listen(port,()=>{
    console.log("server started")
})