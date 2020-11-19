/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { Container, Row, Col, Nav } from 'react-bootstrap';
 
const Footer = () => {
    return(
        <footer>
            <Container>
                <Row className="justify-content-md-center py-4">
                    <Col xs md={{span:2, offset:1}}>
                        <h5>Links</h5>
                        <ul className="list-unstyled">
                            <li><Nav.Link href="/home">Home</Nav.Link></li>
                            <li><Nav.Link href="/aboutus">About Us</Nav.Link></li>
                        </ul>
                    </Col>
                    <Col xs md={{span:4, offset:1}}>
                        <h5>Our Address</h5>
                        <address>
                            121, Clear Water Bay Road<br />
                            Clear Water Bay, Kowloon<br />
                            HONG KONG<br />
                            <span className="fas fa-phone"></span>: +852 1234 5678<br />
                            <span className="fas fa-fax"></span>: +852 8765 4321<br />
                            <span className="fas fa-envelope"></span>: <a href="/">hostel@stay.net</a>
                        </address>
                    </Col>
                    <Col xs md={{span:3}}>
                        <h5>Visit Us</h5>
                        <div>
                            <a className="btn btn-social-icon btn-twitter" href="/"><span className="fab fa-twitter fa-lg"> </span></a>
                            <a className="btn btn-social-icon btn-facebook" href="/"><span className="fab fa-facebook fa-lg"> </span></a>
                            <a className="btn btn-social-icon btn-google" href="/"><span className="fab fa-google-plus fa-lg"> </span></a>
                            <a className="btn btn-social-icon btn-yahoo" href="/"><span className="fab fa-yahoo fa-lg"> </span></a>
                            <a className="btn btn-social-icon btn-linkedin" href="/"><span className="fab fa-linkedin fa-lg"> </span></a>
                        </div>
                    </Col>
                </Row>
                <Row className="justify-content-md-center">
                    <Col className="text-center py-2">
                        Copyright &copy; All Rights Reserved.
                    </Col>
                </Row>
            </Container>
        </footer>
    );
}

export default Footer;