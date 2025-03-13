import { useState } from "react";
import axios from "axios";
const Reset=()=>{
    const [oldPassword,setOldPassword]=useState("");
    const [newPassword,setNewPassword]=useState("");
    const handleSubmit=async(e)=>{
        e.preventDefault();
        console.log(oldPassword,newPassword);
    }
    return(
        <>
        <div id="reset">
        <h1>Reset Password</h1>
        <form >
            <label>Old Password:</label><br/>
            <input type="password" value={oldPassword} onChange={(e)=>setOldPassword(e.target.value)}/><br/>
            <label>New Password:</label><br/>
            <input type="password" value={newPassword} onChange={(e)=>setNewPassword(e.target.value)}/><br/>
            <button className="btn btn-primary" onClick={handleSubmit}>Submit</button>
        </form>
        </div>
        </>
    )
}

export default Reset;
