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
localStorage.setItem("token",resp.data.token);
toast.success("Login Successfully with google")
setTimeout(() => {
    navigate("/dashboard")
}, 2000);
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



<button style={{backgroundColor:"#DB4437", color:"white", borderRadius:"5px", padding:"10px", display:"flex", alignItems:"center", justifyContent:"center", gap:"10px"}} onClick={googleLogin}>
    <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google logo" style={{width: "20px", height: "20px"}} />
    Sign in with Google
</button>


 </div>

<ToastContainer/>
    </>

    )
}

export default Login
