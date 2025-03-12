
import { BrowserRouter,Routes,Route } from "react-router-dom"
import Layout from "./Layout"
import Registration from "./Pages/Register"
import Login from "./Pages/Login"
import Home from "./Pages/Home"
import Dashboard from "./Pages/Dashboard/Dashboard"
import DHome from "./Pages/Dashboard/DHome"
import Transcation from "./Pages/Dashboard/Transcation"
import History from "./Pages/Dashboard/History"

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
       </Route>
    </Routes>

<Routes>
<Route path="dashboard" element={<Dashboard/>}>
<Route index element={<DHome/>}/>
<Route path='home' element={<DHome/>}/>
<Route path='transaction' element={<Transcation/>}/>
<Route path='history' element={<History/>}/>
</Route>

</Routes>

    </BrowserRouter>


    </>
  )
}
export default App