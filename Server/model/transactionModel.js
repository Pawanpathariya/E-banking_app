const mongoose=require("mongoose")
const transactionSchema=new mongoose.Schema({
    accountID:{type:mongoose.Schema.Types.ObjectId,ref:"account"},
    amount:{type:String,required:true},
    transactionType:{type:String,required:true},
    createdAt: { type: Date, default: Date.now}
})
module.exports=mongoose.model("transaction",transactionSchema)