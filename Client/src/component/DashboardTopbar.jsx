import React from 'react';
import {Link} from 'react-router-dom';
import {Nav, Navbar} from 'react-bootstrap';

const DashboardTopbar = () => {
    const username = localStorage.getItem('username');
    return (
        <Navbar bg="dark" variant="dark" expand="lg">
            <Navbar.Brand as={Link} to="/dashboard">Dashboard</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Navbar.Text>
                    Welcome, {localStorage.getItem("name")}
                </Navbar.Text>
            </Navbar.Collapse>
        </Navbar>
    );
};

export default DashboardTopbar;

