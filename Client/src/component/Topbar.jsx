import { Link } from "react-router-dom"
import img1 from "../images/logo.webp"  
const Topbar = () => {
return(
<>
<nav style={{display:'flex',alignItems:'center'}}>
        <h3 style={{marginRight:'10px'}}>CBI Bank  <img src={img1} height={60} width={100} style={{borderRadius:'50%'}}/></h3>
        <Link to="home">Home</Link> 
        <Link to="login">Login</Link>
        <Link to="register">Registration</Link>
</nav>
</>
)
}

export default Topbar

