import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Breadcrumb, Row, Col, Image, Button, Modal, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import { liststudentdetails } from '../actions/studentactions';
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
            <div className="person-name">
                <strong>{props.name}</strong>
                <Badge variant="danger" className="badge-margin">Passed Out</Badge>
            </div>
        );
    }
    else {
        return (
            <div className="person-name">
                <strong>{props.name}</strong>
            </div>
        );
    }
}

const StudentDetail = (props) => {

    const [modalShow, setModalShow] = useState(false);

    const dispatch = useDispatch();

    const studentdetails = useSelector((state) => state.studentdetails);
    const { loading, error, student } = studentdetails;

    const userlogin = useSelector((state) => state.userlogin);
    const { userinfo } = userlogin;

    useEffect(() => {
        if (userinfo) {
            dispatch(liststudentdetails(props.match.params.id));
        } else {
            props.history.push('/login');
        }
    }, [dispatch, props.match, userinfo, props.history]);

    return (
        <>
            <Breadcrumb>
                <Breadcrumb.Item><Link to="/students">Students</Link></Breadcrumb.Item>
                <Breadcrumb.Item href="#" active>{student.name}</Breadcrumb.Item>
            </Breadcrumb>
            <LinkContainer classname='my-3' to='/students'><Button variant="dark"><span className="fas fa-chevron-left"></span> Back</Button></LinkContainer>
            {
                loading ? <Loader /> : error ? <Message variant='danger'>{`Error ${error.status}: ${error.statusText}`}</Message> :
                    <Row classname="start">
                        <Col md={12} lg={{ span: 4, offset: 1 }} className="py-5">
                            <Image src={student.image} alt={student.name} thumbnail />
                            <br /> <br /> <br /> <br /> <br />
                            <div className="person-details">
                                <div className='parent-detail-header'>Parent's Details</div>
                                <br />
                                <p><strong>Father's Name: </strong>{student.parents.fname}</p>
                                <p><strong>Mother's name: </strong>{student.parents.mname}</p>
                                <p><strong>Parent's Address: </strong>{student.parents.address}</p>
                                <p><strong>Parent's Email: </strong>{student.parents.email}</p>
                                <p><strong>Parent's Contact: </strong>{student.parents.contact}</p>
                            </div>
                        </Col>
                        <Col md={12} lg={{ span: 4, offset: 2 }}>
                            <div>
                                <AdminButton name={student.name} isadmin={student.ispassedout} />
                            </div>
                            <br />
                            <div className="person-details">
                                <p><strong>USN: </strong>{student.usn}</p>
                                <p><strong>Branch: </strong>{student.branch}</p>
                                <p><strong>Year: </strong>{student.year}</p>
                                <p><strong>Email: </strong><a href={`mailto:${student.email}`}>{student.email}</a></p>
                                <p><strong>Contact: </strong>{student.contact}</p>
                                <p><strong>DOB: </strong>{student.dob}</p>
                                <p><strong>Address: </strong>{student.address}</p>
                                <p><strong>Fees Paid: </strong>{student.feespaid}</p>
                                <p><strong>Fees Due: </strong>{student.feesdue}</p>
                                <p><strong>Penalties: </strong>{student.penalties}</p>
                                <p><strong>Room Number: </strong>{student.roomno}</p>
                                <p><strong>Roomate USN: </strong>{student.roomateusn}</p>
                                <p><strong>Joining Year: </strong>{student.firstyear}</p>
                                <p><strong>Blood Group: </strong>{student.bloodgrp}</p>
                                <Button onClick={() => setModalShow(true)}>ID Proof</Button>
                                <IDModal name={student.name} image={student.idproof} show={modalShow} onHide={() => setModalShow(false)} />
                            </div>
                        </Col>
                    </Row>
            }
        </>
    );
}

export default StudentDetail; 