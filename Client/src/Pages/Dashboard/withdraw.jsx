import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import BASE_URL from "../../config";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from 'react-toastify';
import money from '../../images/money.gif'
import audio from '../../audio/countingSound.mp3'
const Withdraw=()=>{
    const [amount, setAmount] = useState(0);
    const [btns,setbtns]=useState(true);
    const navigate=useNavigate();

    const handleSubmit=async(e)=>{
        e.preventDefault()
        let api=`${BASE_URL}/customer/withdraw`;
        document.getElementById("loading").style.display="block";
        try {
            const response = await axios.post(api, {amount,id:localStorage.getItem("id")});
            toast.success(response.data);
            setAmount(0);
            setbtns(false);
            setTimeout(() => {
               setbtns(true);
               document.getElementById("loading").style.display="none";
            },3000);
        }
        catch (error) {
           toast.error(error.response.data);
        }
    }

    return(
        <>

        <div id="Withdraw">
        <h1  className="heading">Withdraw</h1>

        <form >
            <label>Amount:</label>
            <input type="number" value={amount} onChange={(e)=>setAmount(e.target.value)} required/>
            <br/>
            <button onClick={handleSubmit} >Withdraw</button>
        </form>
        </div>

      <div id="loading" style={{display:"none"}}>
      {btns ? "" : <img src={money}/> }
      {btns ? "" :  <audio autoPlay>
          <source src={audio} type="audio/mp3"/>
        </audio> }

      </div>
        <ToastContainer/>

        </>
    )
}

export default Withdraw

