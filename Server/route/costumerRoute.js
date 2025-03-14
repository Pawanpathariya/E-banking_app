const express=require("express")
const router=express.Router()
const costumerController=require("../controller/costumerController")
router.post("/register",costumerController.CustomerRegi)
router.post("/login",costumerController.Customerlogin)
router.post('/userauthenticate',costumerController.userAuthenticate)
router.post('/resetpassword',costumerController.resetPassword)
router.post('/profile',costumerController.profile)
module.exports=router