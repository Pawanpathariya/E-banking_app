import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import BASE_URL from "../../config";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from 'react-toastify';

const Deposite=()=>{
    const [amount, setAmount] = useState(0);
    const navigate=useNavigate();

    const handleSubmit=async(e)=>{
        e.preventDefault();
        let api=`${BASE_URL}/customer/deposite`;
        try {
            const response = await axios.post(api, {amount,id:localStorage.getItem("id")});
            toast.success(response.data);
            setTimeout(() => {
                navigate("/dashboard/balance")
            },2000);
        }
        catch (error) {
            toast.error(error.response.data);
        }
    }

    return(
        <>

        <div id="deposite">
        <h1>Deposite</h1>

        <form >
            <label>Amount:</label>
            <input type="number" value={amount} onChange={(e)=>setAmount(e.target.value)} required/>
            <br/>
            <button onClick={handleSubmit} >Deposite</button>
        </form>


        </div>
        <ToastContainer/>

        </>
    )
}

export default Deposite

