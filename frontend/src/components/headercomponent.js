import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';

const Header = () => {
    return(
        <header>
            <Navbar bg="light" variant="light" expand="lg" collapseOnSelect>
                <Container>
                    <Navbar.Brand href="/">Hostel logo</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                            <Nav.Link href="/hostel"><span className="fas fa-building"></span> Hostel</Nav.Link>
                            <Nav.Link href="/aboutus" ><span className="fas fa-address-card"></span> About Us</Nav.Link>
                            <Nav.Link href="/student"><span className="fas fa-user-graduate"></span> Student</Nav.Link>
                            <Nav.Link href="/employee"><span className="fas fa-user"></span> Employee</Nav.Link>
                            <Nav.Link href="/mess"><span className="fas fa-utensils"></span> Mess</Nav.Link>
                        </Nav>
                        <Nav className="ml-auto">
                            <Nav.Link href="/login"><span className="fas fa-user-circle fa-lg"></span> Login</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    );
}

export default Header;