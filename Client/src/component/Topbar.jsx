import { Link } from "react-router-dom"
import img1 from "../images/logo.webp"  
import { Navbar, Nav } from 'react-bootstrap';
const Topbar = () => {
return(
<Navbar style={{backgroundColor:'#7e30de'}} variant="dark">
    <Navbar.Brand as={Link} to="home">
        <img
            src={img1}
            height={60}
            width={100}
            className="d-inline-block align-top"
            style={{borderRadius:'50%'}}
            alt="CBI Bank Logo"
        />
    </Navbar.Brand>
    <Nav className="mr-auto" >
        <Nav.Link as={Link} to="login">Login</Nav.Link>
        <Nav.Link as={Link} to="register">Registration</Nav.Link>
    </Nav>
</Navbar>
)
}
export default Topbar

