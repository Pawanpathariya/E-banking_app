
import { BrowserRouter,Routes,Route } from "react-router-dom"
import Layout from "./Layout"
import Registration from "./Pages/Register"
import Login from "./Pages/Login"
import Home from "./Pages/Home"
import Dashboard from "./Pages/Dashboard/Dashboard"
import Transcation from "./Pages/Dashboard/Transcation"
import Withdraw from "./Pages/Dashboard/withdraw"
import Deposite from "./Pages/Dashboard/Deposite"
import Reset from "./Pages/Dashboard/Reset"
import Balance from "./Pages/Dashboard/History"
import Profile from "./Pages/Dashboard/Profile"
import Statement from "./Pages/Dashboard/Statement"
import ForgotPass from "./Pages/ForgotPass"

const App=()=>{
  return(
    <>
    <BrowserRouter>
    <Routes>
       <Route path="/" element={<Layout/>}>
       <Route index element={<Home/>}/>
       <Route path="home" element={<Home/>}/>
       <Route path="login" element={<Login/>}/> 
       <Route path="register" element={<Registration/>}/>
       <Route path="forgot" element={<ForgotPass/>}/>

       </Route>
    </Routes>

<Routes>
<Route path="/dashboard" element={<Dashboard/>}>
<Route index element={<Balance/>}/>
<Route path='transaction' element={<Transcation/>}/>
<Route path='balance' element={<Balance/>}/>
<Route path='withdraw' element={<Withdraw/>}/>
<Route path='deposite' element={<Deposite/>}/>
<Route path='resetpass' element={<Reset/>}/>
<Route path='profile' element={<Profile/>}/>
<Route path='statement' element={<Statement/>}/>

</Route>

</Routes>

    </BrowserRouter>


    </>
  )
}
export default App