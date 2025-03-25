import { useState,useEffect} from "react";
import BASE_URL from "../config";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom"
import {auth,provider} from "../utils/firebase"
import { signInWithPopup } from "firebase/auth";

const Login=()=>{
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const navigate=useNavigate();


useEffect(()=>{
   if(localStorage.getItem("token")){
    navigate("/dashboard")
   } 
},[])


const googleLogin=async()=>{
    try {
const response=await signInWithPopup(auth,provider);
const user=response.user;
const userData={name:user.displayName,email:user.email,mobile:user.phoneNumber}
let api=`${BASE_URL}/customer/googlelogin`;
let resp=await axios.post(api,{name:user.displayName,email:user.email,mobile:user.phoneNumber});
console.log(resp.data);
    }
catch(error){
    console.log(error);
}
}

    const handleSubmit=async(e)=>{
        e.preventDefault();
        try {
            let response=await axios.post(`${BASE_URL}/customer/login`,{
                email,password
            })
            toast.success("Login Successfully")
           console.log(response.data);
           localStorage.setItem("token",response.data.token);
           setTimeout(() => {
            navigate("/dashboard")
           }, 2000);

        } catch (error) {
           console.log(error.response);
        }
    }
    return(
 <>
 

 <h1 id="head">Customer Login</h1>

 <div id="login">

 Enter Email Id:<input type="text" value={email} onChange={(e)=>setEmail(e.target.value)}/><br/>
 Enter Password:<input type="password" value={password} onChange={(e)=>setPassword(e.target.value)}/><br/>
 <button onClick={handleSubmit}>Submit</button>
<p> If You Don't Have account <Link to="/register">Click Here!</Link> </p>

<br />
<p> <Link to="/forgot">Forgot Password</Link></p>



<button onClick={googleLogin}>Sign in with google</button>
 </div>

<ToastContainer/>
    </>

    )
}

export default Login
