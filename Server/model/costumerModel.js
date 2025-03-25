const mongoose=require("mongoose")
const costumerSchema=new mongoose.Schema({
    name:{type:String,required:true},
    fathername:{type:String},
    address:{type:String},
    email:{type:String,required:true,unique:true},
    city:{type:String},
    mobile:{type:String,required:true},
    pincode:{type:String},
    accountType:{type:String,required:true},
    password:{type:String},
    createdAt: { type: Date, default: Date.now},
    accountID:{type:mongoose.Schema.Types.ObjectId,ref:"account"}
})
module.exports=mongoose.model("costumer",costumerSchema)