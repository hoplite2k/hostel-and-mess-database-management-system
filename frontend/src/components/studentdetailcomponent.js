import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Breadcrumb, Row, Col, Image, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import { liststudentdetails } from '../actions/studentactions';
import Loader from '../components/loadercomponent';
import Message from '../components/messagecomponent';

const StudentDetail = (props) => {

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
                        </Col>
                        <Col md={12} lg={{ span: 4, offset: 2 }}>
                            <div className="person-name">
                                {student.name}
                            </div>
                            <br />
                            <div className="person-details">
                                <p><strong>USN: </strong>{student.usn}</p>
                                <p><strong>Branch: </strong>{student.branch}</p>
                                <p><strong>Email: </strong>{student.email}</p>
                                <p><strong>Contact: </strong>{student.contact}</p>
                                <p><strong>DOB: </strong>{student.dob}</p>
                                <p><strong>Address: </strong>{student.address}</p>
                                <p><strong>Fees Paid: </strong>{student.feespaid}</p>
                                <p><strong>Fees Due: </strong>{student.feesdue}</p>
                                <p><strong>Penalties: </strong>{student.penalties}</p>
                                <p><strong>Room Number: </strong>{student.roomno}</p>
                                <p><strong>Roomate USN: </strong>{student.roomateusn}</p>
                            </div>
                        </Col>
                    </Row>
            }
        </>
    );
}

export default StudentDetail;