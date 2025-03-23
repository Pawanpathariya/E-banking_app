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
        setaccNum(response.data.accountID);
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
        <div className="heading">
            <h1>Profile Detail</h1>
        </div>
        <div className="p1">
     <h4>Name : {profile.name}</h4></div>
     <div className="p1">  <h5>Father Name : {profile.fathername}</h5> </div>
     <div className="p1">
     <h6>Account Number : {accNum.accountNumber} </h6>
     <h6>IFSC : {accNum.IFSC} </h6>
     </div>
     <div className="p1">
     <h6>Bank Code : {accNum.bankcode} </h6>
     <h6>Account Type : {profile.accountType} </h6>
     </div>
     <div className="p1">
     <h6>Address : {profile.address} </h6>
     <h6>City : {profile.city} </h6>
     <h6>Pincode :{profile.pincode} </h6>
     </div>
     <div className="p1">
     <h6>Phone : {profile.mobile} </h6>
     <h6>Email : {profile.email} </h6>
    </div>
        </div>
        </>
    )
}
export default Profile