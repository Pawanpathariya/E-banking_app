const mongoose=require("mongoose")
const accountSchema=new mongoose.Schema({
    coustoID:{type:mongoose.Schema.Types.ObjectId,ref:"costomer"},
    accountNumber:{type:String,required:true},
    balance:{type:String,default:"0.00"},
    transactionID:[{type:mongoose.Schema.Types.ObjectId,ref:"transaction"}]
})
module.exports=mongoose.model("account",accountSchema)