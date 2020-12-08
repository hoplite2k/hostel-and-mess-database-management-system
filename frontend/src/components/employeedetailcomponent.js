import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Breadcrumb, Row, Col, Image, Badge, Button, Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import { listemployeesdetails } from '../actions/employeeactions';
import Loader from '../components/loadercomponent';
import Message from '../components/messagecomponent';

function IDModal(props) {
    return (
        <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Identity: {props.name}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <img src={props.image} alt={props.name} className="img-fluid" />
            </Modal.Body>
        </Modal>
    );
}

const AdminButton = (props) => {
    if (props.isadmin) {
        return (
            <h3>
                <strong>{props.name}</strong>
                <Badge variant="danger" className="badge-margin">Admin</Badge>
            </h3>
        );
    }
    else {
        return (
            <h3><strong>{props.name}</strong></h3>
        );
    }
}

const EmployeeDetail = (props) => {

    const [modalShow, setModalShow] = useState(false);

    const dispatch = useDispatch();

    const employeedetails = useSelector((state) => state.employeedetails);
    var { loading, error, employee } = employeedetails;

    const userlogin = useSelector((state) => state.userlogin);
    const { userinfo } = userlogin;

    useEffect(() => {
        if (!userinfo) {
            props.history.push('/login');
        } else {
            dispatch(listemployeesdetails(props.match.params.id));
        }
    }, [dispatch, props.match, props.history, userinfo]);


    return (
        <>
            <Breadcrumb>
                <Breadcrumb.Item><Link to="/employees">Employees</Link></Breadcrumb.Item>
                <Breadcrumb.Item href="#" active>{employee.name}</Breadcrumb.Item>
            </Breadcrumb>
            <LinkContainer classname='my-3' to='/employees'><Button variant="dark"><span className="fas fa-chevron-left"></span> Back</Button></LinkContainer>
            {
                loading ? <Loader /> : error ? <Message variant='danger'>{`Error ${error.status}: ${error.statusText}`}</Message> :
                    <Row className="start">
                        <Col md={12} lg={{ span: 4, offset: 1 }} className="py-5">
                            <Image src={employee.image} alt={employee.name} thumbnail />
                        </Col>
                        <Col md={12} lg={{ span: 4, offset: 2 }}>
                            <div>
                                <h4 className="person-name">
                                    <AdminButton name={employee.name} isadmin={employee.isadmin} />
                                </h4>
                            </div>
                            <br />
                            <div className="person-details">
                                <p><strong>Staff ID: </strong>{employee.staffid}</p>
                                <p><strong>Email: </strong>{employee.email}</p>
                                <p><strong>Contact: </strong>{employee.contact}</p>
                                <p><strong>DOB: </strong>{employee.dob}</p>
                                <p><strong>Address: </strong>{employee.address}</p>
                                <p><strong>Blood Group: </strong>{employee.bloodgrp}</p>
                                <p><strong>Role: </strong>{employee.role}</p>
                                <Button onClick={() => setModalShow(true)}>ID Proof</Button>
                                <IDModal name={employee.name} image={employee.idproof} show={modalShow} onHide={() => setModalShow(false)} />
                            </div>
                        </Col>
                    </Row>
            }
        </>
    );
}

export default EmployeeDetail;