import DashboardTopbar from "../../component/DashboardTopbar"
import { Outlet } from "react-router-dom"
import Sidebar from "../../component/sidebar"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"
import axios from "axios"
import BASE_URL from "../../config"
const Dashboard = () => {
const navi=useNavigate()

const UserAuth=async()=>{
    const token=localStorage.getItem("token");
    if (!token)
    {
        navi("/login");
    }
    else
    {
        let api=`${BASE_URL}/customer/userauthenticate`;
        try {
            const response = await axios.post(api, null, { headers: { "x-auth-token": token } });
            console.log(response.data);
            localStorage.setItem("name", response.data.name);
            localStorage.setItem("email", response.data.email);
            localStorage.setItem("id", response.data._id);
             navi("/dashboard");
    }

    
    catch (error) {
        console.log(error);
        navi("/login");
    }
}
}



    useEffect(() => {
      UserAuth();   
    }, []);




    return (
<>
<DashboardTopbar/>
      <div id="dashboard">
        <div id="sidebar">
       <Sidebar/>
        </div>
        <div id="outlet">
        <Outlet/>
        </div>
     
        </div>
</>
    )
}

export default Dashboard
