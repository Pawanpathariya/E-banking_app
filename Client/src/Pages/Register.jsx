import { useState ,useEffect} from "react";
import BASE_URL from "../config";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
const Registration = () => {
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [email, setEmail] = useState("");
    const [city, setCity] = useState("");
    const [mobile, setMobile] = useState("");
    const [pincode, setPincode] = useState("");
    const [accountType, setAccountType] = useState("");
    const navigate=useNavigate();
    const handleSubmit = async(e) => {
        e.preventDefault();

        try {
            let response=await axios.post(`${BASE_URL}/customer/register`,{
                name,address,email,city,mobile,pincode,accountType    
                })
                toast.success(response.data)
            setTimeout(() => {
               navigate("/login") 
            },2000)
            
        } catch (error) {
            toast.error(error.response.data);
        }
 
    };


    const UserAuth=async()=>{
        const token=localStorage.getItem("token");
        if (token)
        {
            let api=`${BASE_URL}/customer/userauthenticate`;
            try {
                const response = await axios.post(api, null, { headers: { "x-auth-token": token } });
                console.log(response.data);
                localStorage.setItem("name", response.data.name);
                localStorage.setItem("email", response.data.email);
                localStorage.setItem("id", response.data._id);
                 navigate("/dashboard");
        }
        catch (error) {
            console.log(error);
        }
    }
    }
    
    
    
        useEffect(() => {
          UserAuth();   
        }, []);
    

    return (
        <>
            <h1 id="head">Customer Registration</h1>

            <div id="register">
                <form>
                    <label>
                        Name:
                        <input
                            type="text"
                            name="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </label>
                    <br />
                    <label>
                        Address:
                        <input
                            type="text"
                            name="address"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            required
                        />
                    </label>
                    <br />

                    <label>
                        Email:
                        <input
                            type="email"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </label>
                    <br />
                    Enter City :<input
                        type="text"
                        name="city"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        required
                    />
                    <br />
                    Enter Mobile No :<input
                        type="text"
                        name="mobile"
                        value={mobile}
                        onChange={(e) => setMobile(e.target.value)}
                        required
                    />
                    <br />
                    Enter Pincode :<input
                        type="text"
                        name="pincode"
                        value={pincode}
                        onChange={(e) => setPincode(e.target.value)}
                        required
                    />
                    <br />

                    <label>
                        Account Type:
                        <select
                            name="accountType"
                            value={accountType}
                            onChange={(e) => setAccountType(e.target.value)}
                            required
                        >
                            <option value="">Select</option>
                            <option value="savings">Savings</option>
                            <option value="current">Current</option>
                        </select>
                    </label>
                    <br />
                    <button onClick={handleSubmit}>Register</button>
                </form>
            </div>
            <ToastContainer />
        </>
    );
};

export default Registration;

