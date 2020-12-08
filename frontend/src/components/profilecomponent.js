import React, { useState, useEffect } from 'react';
import { Row, Col, Button, Card, Form, Breadcrumb, Image } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/loadercomponent';
import Message from '../components/messagecomponent';
import { getuserdetails, updateuserpassword } from '../actions/useractions';

const Profile = (props) => {

    const dispatch = useDispatch();

    const [message, setmessage] = useState(null);
    const [newpassword, setnewpassword] = useState('');
    const [confirmpassword, setconfirmpassword] = useState('');
    const [showform, setshowform] = useState(false);

    const userdetails = useSelector((state) => state.userdetails);
    const { loading, error, user } = userdetails;

    const userlogin = useSelector((state) => state.userlogin);
    const { userinfo } = userlogin;

    const userupdatepassword = useSelector((state) => state.userupdatepassword);
    const { success } = userupdatepassword;

    useEffect(() => {
        if (!userinfo) {
            props.history.push('/login');
        } else {
            dispatch(getuserdetails('profile'));
        }
    }, [dispatch, props.history, userinfo]);

    const submitHandler = (e) => {
        e.preventDefault();
        if (newpassword !== confirmpassword) {
            setmessage("Passwords do not match");
        } else if (newpassword === '' || confirmpassword === '') {
            setmessage("Enter Passwords");
        } else {
            setmessage("");
            dispatch(updateuserpassword({ id: user._id, password: newpassword }));
        }
    }

    return (
        <>
            <Breadcrumb>
                <Breadcrumb.Item href="#" active>Profile</Breadcrumb.Item>
            </Breadcrumb>
            {message && <Message variant='danger'>{message}</Message>}
            {success && <Message variant='success'>Password Updated</Message>}
            {error && <Message variant='danger'>{error}</Message>}
            {loading && <Loader />}

            <Row className="start">
                <Col md={12} lg={{ span: 4, offset: 1 }} className="py-5">
                    <Image src={user.employeeid.image} alt={user.employeeid.name} thumbnail />
                </Col>
                <Col md={12} lg={{ span: 4, offset: 2 }}>
                    <div>
                        <h4 className="person-name">{user.employeeid.name}</h4>
                    </div>
                    <br />
                    <div className="person-details">
                        <p><strong>Staff ID: </strong>{user.employeeid.staffid}</p>
                        <p><strong>Email: </strong>{user.employeeid.email}</p>
                        <p><strong>Contact: </strong>{user.employeeid.contact}</p>
                        <p><strong>DOB: </strong>{user.employeeid.dob}</p>
                        <p><strong>Address: </strong>{user.employeeid.address}</p>
                        <p><strong>Blood Group: </strong>{user.employeeid.bloodgrp}</p>
                        <p><strong>Role: </strong>{user.employeeid.role}</p>
                    </div>
                </Col>
            </Row>
            <br />
            <center><Button variant='primary' onClick={(e) => setshowform(true)}>Change Password</Button></center>
            <br />
            {
                showform ?
                    <Row>
                        <Col md={{ offset: '3', span: '6' }}>
                            <Card className="my-4" bg="light">
                                <Card.Body>
                                    <Form onSubmit={submitHandler}>
                                        <Form.Group controlId='newpassword'>
                                            <Form.Label>New Password</Form.Label>
                                            <Form.Control type='password' placeholder='Enter New Password' value={newpassword} onChange={(e) => setnewpassword(e.target.value)}></Form.Control>
                                        </Form.Group>
                                        <Form.Group controlId='confirmpassword'>
                                            <Form.Label>Confirm Password</Form.Label>
                                            <Form.Control type='password' placeholder='Confirm Password' value={confirmpassword} onChange={(e) => setconfirmpassword(e.target.value)}></Form.Control>
                                        </Form.Group>
                                        <Button variant='primary' type='submit'>Update Password</Button>
                                    </Form>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row> : <div></div>
            }
        </>
    );
}

export default Profile;
