import { useState,useEffect } from "react";
import axios from "axios";
import BASE_URL from "../../config";
const Balance=()=>{
const [bal,setBal]=useState("");
const loadBal=()=>{
let api=`${BASE_URL}/customer/balance`;
try {
  axios.post(api,{id:localStorage.getItem("id")}).then((response)=>{
    setBal(response.data.accountID.balance);
  });
}
catch (error) {
  console.log(error);
}
}

useEffect(()=>{
  loadBal();
},[])
    return(
  <div className="balance-display">
    <h1 className="heading" >Balance Inquiry</h1>
    <h2>Account Balance: {bal}</h2>
  </div>
    )
}


export default Balance;