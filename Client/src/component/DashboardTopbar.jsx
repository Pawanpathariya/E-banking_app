import React from 'react';
import {Link} from 'react-router-dom';
import {Nav, Navbar} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
const DashboardTopbar = () => {
    const navigate=useNavigate()
    const username = localStorage.getItem('username');
    return (
        <Navbar bg="dark" variant="dark" expand="lg" style={{position:"sticky",top:"0",zIndex:"1"}}>
            <Navbar.Brand as={Link} to="/dashboard">Dashboard</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Navbar.Text style={{display:"flex", justifyContent:"space-evenly", width:"100%"}}>
                  <p> Welcome, {localStorage.getItem("name")}</p> 
                    <p>Email:-{localStorage.getItem("email")}</p> 
                    <button className='btn btn-primary' onClick={()=>{localStorage.clear(),navigate('/')}}>Logout</button>
                </Navbar.Text>
            </Navbar.Collapse>
        </Navbar>
    );
};

export default DashboardTopbar;

