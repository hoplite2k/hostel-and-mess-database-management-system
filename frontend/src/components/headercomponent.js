import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const Header = () => {
    return(
        <header>
            <Navbar bg="light" variant="light" expand="lg" collapseOnSelect>
                <Container>
                    <LinkContainer to="/"><Navbar.Brand><span><img src="assets/images/logo.png" alt="logo" className="logo" /></span></Navbar.Brand></LinkContainer>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                            <LinkContainer to="/hostel"><Nav.Link><span className="fas fa-building"></span> Hostel</Nav.Link></LinkContainer>
                            <LinkContainer to="/aboutus"><Nav.Link><span className="fas fa-address-card"></span> About Us</Nav.Link></LinkContainer>
                            <LinkContainer to="/students"><Nav.Link><span className="fas fa-user-graduate"></span> Student</Nav.Link></LinkContainer>
                            <LinkContainer to="/employees"><Nav.Link><span className="fas fa-user"></span> Employee</Nav.Link></LinkContainer>
                            <LinkContainer to="/rooms"><Nav.Link><span className="fas fa-person-booth"></span> Rooms</Nav.Link></LinkContainer>
                            <LinkContainer to="/mess"><Nav.Link><span className="fas fa-utensils"></span> Mess</Nav.Link></LinkContainer>
                        </Nav>
                        <Nav className="ml-auto">
                        <LinkContainer to="/login"><Nav.Link><span className="fas fa-user-circle fa-lg"></span> Login</Nav.Link></LinkContainer>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    );
}

export default Header;