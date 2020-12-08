import React from 'react';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../actions/useractions';

const Header = () => {

    const dispatch = useDispatch();

    const userlogin = useSelector((state) => state.userlogin);
    const { userinfo } = userlogin;

    const logoutHandler = () => {
        dispatch(logout());
    }

    if (userinfo) {
        var usertitle = (<span className='fas fa-user-circle'> {userinfo.name}</span>);
    }

    return (
        <header>
            <Navbar bg="light" variant="light" expand="lg" collapseOnSelect>
                <Container>
                    <LinkContainer to="/"><Navbar.Brand><span><img src={window.location.origin + "/images/logo.png"} alt="logo" className="logo" /></span></Navbar.Brand></LinkContainer>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto" defaultActiveKey="/home">
                            <LinkContainer to="/hostel"><Nav.Link><span className="fas fa-building nav-mar"></span> Hostel</Nav.Link></LinkContainer>
                            <LinkContainer to="/aboutus"><Nav.Link><span className="fas fa-address-card nav-mar"></span> About Us</Nav.Link></LinkContainer>
                            {
                                userinfo && (<LinkContainer to="/students"><Nav.Link><span className="fas fa-user-graduate nav-mar"></span> Student</Nav.Link></LinkContainer>)
                            }
                            {
                                userinfo && userinfo.isadmin && (<LinkContainer to="/employees"><Nav.Link><span className="fas fa-user nav-mar"></span> Employee</Nav.Link></LinkContainer>)
                            }
                            {
                                userinfo && (<LinkContainer to="/rooms"><Nav.Link><span className="fas fa-person-booth nav-mar"></span> Rooms</Nav.Link></LinkContainer>)
                            }
                            {
                                userinfo && (<LinkContainer to="/mess"><Nav.Link><span className="fas fa-utensils nav-mar"></span> Mess</Nav.Link></LinkContainer>)
                            }
                        </Nav>
                        <Nav className='ml-auto'>
                            {
                                userinfo ? (
                                    <NavDropdown title={usertitle} id='username'>
                                        <LinkContainer to='/profile'><NavDropdown.Item>Profile</NavDropdown.Item></LinkContainer>
                                        <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
                                    </NavDropdown>
                                ) :
                                    <LinkContainer to="/login"><Nav.Link><span className="fas fa-user-circle fa-lg"></span> Login</Nav.Link></LinkContainer>
                            }
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    );
}

export default Header;