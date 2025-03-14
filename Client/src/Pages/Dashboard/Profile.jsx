import axios from "axios";
import BASE_URL from "../../config";
import { useState,useEffect } from "react"
const Profile=()=>{

const [profile,setProfile]=useState({});
const [accNum,setaccNum]=useState("");
const loadProfile=async()=>{
    let api=`${BASE_URL}/customer/profile`;
    try {
        const response = await axios.post(api,{id:localStorage.getItem("id")});
        setProfile(response.data);
        setaccNum(response.data.accountID.accountNumber);
    }
    catch (error) {
        toast.error(error.response.data);
    }
    }
    useEffect(()=>{
        loadProfile();
    },[])
    return(
        <>
        <div id="profile">
        <h1>Profile Detail</h1>
     <h4>Name : {profile.name}</h4>
     <h6>Account Number : {accNum} </h6>
     <h6>Address : {profile.address} </h6>
     <h6>Phone : {profile.mobile} </h6>
     <h6>Email : {profile.email} </h6>
     <h6>City : {profile.city} </h6>
     <h6>Pincode :{profile.pincode} </h6>
     <h6>Account Type : {profile.accountType} </h6>

        </div>
        </>
    )
}
export default Profile