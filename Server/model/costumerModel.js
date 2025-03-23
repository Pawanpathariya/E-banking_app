const mongoose=require("mongoose")
const costumerSchema=new mongoose.Schema({
    name:{type:String,required:true},
    fathername:{type:String,required:true},
    address:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    city:{type:String,required:true},
    mobile:{type:String,required:true},
    pincode:{type:String,required:true},
    accountType:{type:String,required:true},
    password:{type:String,required:true},
    createdAt: { type: Date, default: Date.now},
    accountID:{type:mongoose.Schema.Types.ObjectId,ref:"account"}
})
module.exports=mongoose.model("costumer",costumerSchema)