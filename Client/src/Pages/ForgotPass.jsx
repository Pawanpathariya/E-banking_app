import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import BASE_URL from '../config';
const ForgotPass = () => {
    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${BASE_URL}/customer/forgotpassword`, { email });
            toast.success("Password reset link sent to your email");
            setTimeout(() => {
                navigate('/login');
            }, 2000);
        } catch (error) {
            toast.error(error.response.data);
        }
    }

    return (
        <>
        <div id='register'>
            <h1>Forgot Password</h1>
            <form>
                <label>Email:</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                <br />
                <button onClick={handleSubmit}>Submit</button>
            </form>
            </div>
            <ToastContainer />
        </>
    )
}

export default ForgotPass;
