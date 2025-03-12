const passGen=require("../utility/passGen")
const custoModel=require('../model/costumerModel')
var nodemailer = require('nodemailer');
const jwt=require('jsonwebtoken')
require('dotenv').config();
const bcrypt=require('bcryptjs');
const CustomerRegi=async(req,res)=>{

    try {
        const {name,address,email,city,mobile,pincode,accountType}=req.body
        const password=passGen.GenPass();
        
         const User= await custoModel.find({email:email});
         if (User.length>0)
         {
          return res.status(400).send("Email Already exist!!!");
         }

        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: 'pawanpathariys@gmail.com',
              pass: 'qsfu fszj qtym hhtc'
            }
          });
          
          var mailOptions = {
            from: 'pawanpathariys@gmail.com',
            to: email,
            subject: 'Your secret Password', 
            text: `Welcome to CBI Bank ${name} \n
            Your Account is created Successfully \n Your password is ${password} `
          };
          
          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
            }
          });
          const salt = await bcrypt.genSalt(10);
          const hashPassword = await bcrypt.hash(password, salt);
      
     await custoModel.create({name,address,email,city,mobile,pincode,accountType,password:hashPassword});
    res.status(200).send("Registerd successfully");
    } catch (error) {
        res.status(500).send("Something went wrong")
    }
  
}

const Customerlogin=async(req,res)=>{

    try {
        const {email, password} = req.body;
    const User= await custoModel.findOne({email:email});
     
    if (!User)
    {
        res.status(400).send("Invalid Email!!!");
    }

    const passwordMatch =  await bcrypt.compare(password, User.password);
   
    if (!passwordMatch)
    {
      return res.status(400).send("Invalid Password!")
    }

    const token = await jwt.sign({id:User._id}, process.env.SECRETE_KEY, { expiresIn: '7 days' })
   res.status(200).send({token:token});
    } catch (error) {
        res.status(500).send("Something went wrong")
    }
    
}

const userAuthenticate=async(req, res)=>{
  const token = req.header("x-auth-token");
  const verify= await jwt.verify(token, process.env.SECRETE_KEY);

  const User= await custoModel.findById(verify.id).select("-password");
  res.send(User);

}


module.exports={CustomerRegi,Customerlogin,userAuthenticate}
