import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { Row, Col, Breadcrumb, Button, Form, Card } from 'react-bootstrap';
import { liststudents, searchstudents, listallstudents } from '../actions/studentactions';
import Student from '../components/studentcomponent';
import Loader from '../components/loadercomponent';
import Message from '../components/messagecomponent';

const Students = (props) => {
    const dispatch = useDispatch();

    const [showserform, setshowserform] = useState(false);
    const [name, setname] = useState('');
    const [usn, setusn] = useState('');
    const [branch, setbranch] = useState('');
    const [year, setyear] = useState(1);
    const [roomno, setroomno] = useState('');
    const [firstyear, setfirstyear] = useState('');
    const [contact, setcontact] = useState('');
    const [email, setemail] = useState('');
    const [feespaid, setfeespaid] = useState('');
    const [feesdue, setfeesdue] = useState('');
    const [penalties, setpenalties] = useState('');
    const [ispassedout, setispassedout] = useState('');
    const [bloodgrp, setbloodgrp] = useState('');

    const studentlist = useSelector((state) => state.studentlist);
    const { loading, error, students } = studentlist;

    const studentlistall = useSelector((state) => state.studentlistall);
    const { loading: allloading, error: allerror, success: allsuccess, students: allstudents } = studentlistall;

    const studentsearch = useSelector((state) => state.studentsearch);
    const { loading: searchloading, error: searcherror, success: searchsuccess, students: serstudents } = studentsearch;

    const userlogin = useSelector((state) => state.userlogin);
    const { userinfo } = userlogin;

    const deletestudent = useSelector((state) => state.deletestudent);
    const { success: successDelete } = deletestudent;

    useEffect(() => {
        if (!userinfo) {
            props.history.push('/login');
        } else if (searchsuccess !== true && allsuccess !== true) {
            dispatch(liststudents());
        }
    }, [dispatch, props.history, userinfo, successDelete, searchsuccess, allsuccess]);

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(searchstudents({
            name, usn, branch, year, roomno, contact, email, feespaid, feesdue, penalties, firstyear, ispassedout, bloodgrp
        }));
        setshowserform(false);
    }

    const all = (e) => {
        e.preventDefault();
        dispatch(listallstudents());
        setshowserform(false);
    }

    return (
        <>
            {
                loading ? <Loader /> : error ? <Message variant='danger'>{`Error ${error.status}: ${error.statusText}`}</Message> :
                    <>
                        <Breadcrumb>
                            <Breadcrumb.Item href="#" active>Students</Breadcrumb.Item>
                        </Breadcrumb>
                        {
                            userinfo && userinfo.isadmin && (<LinkContainer to={'/newstudent'}><Button variant='success'><span className='fas fa-plus'></span> Add Student</Button></LinkContainer>)
                        }
                        &nbsp;&nbsp;<Button variant='primary' onClick={() => setshowserform(true)}><span className='fas fa-search-plus'></span> Search</Button>
                        <Button variant='secondary' style={{ float: 'right' }} onClick={all}><span className="fas fa-database"></span> Get All</Button>
                        <br />
                        {
                            showserform &&
                            <>
                                <br />
                                <br />
                                <Card className="my-4" bg="light">
                                    <Card.Header><h2 style={{ textAlign: 'center' }}>Search</h2></Card.Header>
                                    <Card.Body>
                                        <Form onSubmit={submitHandler}>
                                            <Form.Row>
                                                <Col xs={12} md={6}>
                                                    <Form.Group controlId='name'>
                                                        <Form.Label>Name</Form.Label>
                                                        <Form.Control type='text' value={name} onChange={(e) => setname(e.target.value)}></Form.Control>
                                                    </Form.Group>
                                                    <Form.Group controlId='branch'>
                                                        <Form.Label>Branch</Form.Label>
                                                        <Form.Control type='text' value={branch} onChange={(e) => setbranch(e.target.value)}></Form.Control>
                                                    </Form.Group>
                                                    <Form.Group controlId='email'>
                                                        <Form.Label>Email</Form.Label>
                                                        <Form.Control type='email' value={email} onChange={(e) => setemail(e.target.value)}></Form.Control>
                                                    </Form.Group>
                                                    <Form.Group controlId='roomno'>
                                                        <Form.Label>Room No</Form.Label>
                                                        <Form.Control type='text' value={roomno} onChange={(e) => setroomno(e.target.value)}></Form.Control>
                                                    </Form.Group>
                                                    <Form.Group controlId='feespaid'>
                                                        <Form.Label>Fees Paid</Form.Label>
                                                        <Form.Control type='text' value={feespaid} onChange={(e) => setfeespaid(e.target.value)}></Form.Control>
                                                    </Form.Group>
                                                    <Form.Group controlId='penalties'>
                                                        <Form.Label>Penalties</Form.Label>
                                                        <Form.Control type='text' value={penalties} onChange={(e) => setpenalties(e.target.value)}></Form.Control>
                                                    </Form.Group>
                                                    <Form.Group controlId='ispassedout'>
                                                        <Form.Label>Passed Out</Form.Label>
                                                        <Form.Control as='select' value={ispassedout} onChange={(e) => setispassedout(e.target.value)}>
                                                            {
                                                                ["--SELECT--", "YES", "NO"].map((y) => {
                                                                    if (y === "--SELECT--") {
                                                                        return <option key={""} value={""}>{y}</option>
                                                                    } else {
                                                                        return <option key={y} value={y}>{y}</option>
                                                                    }
                                                                })
                                                            }
                                                        </Form.Control>
                                                    </Form.Group>
                                                </Col>
                                                <Col xs={12} md={6}>
                                                    <Form.Group controlId='usn'>
                                                        <Form.Label>USN</Form.Label>
                                                        <Form.Control type='text' value={usn} onChange={(e) => setusn(e.target.value)}></Form.Control>
                                                    </Form.Group>
                                                    <Form.Group controlId='year'>
                                                        <Form.Label>Year</Form.Label>
                                                        <Form.Control as='select' value={year} onChange={(e) => setyear(e.target.value)}>
                                                            {
                                                                ["--SELECT--", "1", "2", "3", "4"].map((y) => {
                                                                    if (y === "--SELECT--") {
                                                                        return <option key={""} value={""}>{y}</option>
                                                                    } else {
                                                                        return <option key={y} value={y}>{y}</option>
                                                                    }
                                                                })
                                                            }
                                                        </Form.Control>
                                                    </Form.Group>
                                                    <Form.Group controlId='firstyear'>
                                                        <Form.Label>Joining Year</Form.Label>
                                                        <Form.Control type='text' value={firstyear} onChange={(e) => setfirstyear(e.target.value)}></Form.Control>
                                                    </Form.Group>
                                                    <Form.Group controlId='contact'>
                                                        <Form.Label>Contact No</Form.Label>
                                                        <Form.Control type='text' value={contact} onChange={(e) => setcontact(e.target.value)}></Form.Control>
                                                    </Form.Group>
                                                    <Form.Group controlId='feesdue'>
                                                        <Form.Label>Fees Due</Form.Label>
                                                        <Form.Control type='text' value={feesdue} onChange={(e) => setfeesdue(e.target.value)}></Form.Control>
                                                    </Form.Group>
                                                    <Form.Group controlId='bloodgrp'>
                                                        <Form.Label>Blood Group</Form.Label>
                                                        <Form.Control as='select' value={bloodgrp} onChange={(e) => setbloodgrp(e.target.value)}>
                                                            {
                                                                ["--SELECT--", "A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((y) => {
                                                                    if (y === "--SELECT--") {
                                                                        return <option key={""} value={""}>{y}</option>
                                                                    } else {
                                                                        return <option key={y} value={y}>{y}</option>
                                                                    }
                                                                })
                                                            }
                                                        </Form.Control>
                                                    </Form.Group>
                                                </Col>
                                            </Form.Row>
                                            <Button variant='primary' type='submit'>Search</Button>
                                        </Form>
                                    </Card.Body>
                                </Card>
                            </>
                        }
                        {searchloading ? <Loader /> : searcherror ? (<><br /><Message variant='danger'>{searcherror.status ? `Error ${searcherror.status}: ${searcherror.statusText}` : searcherror}</Message></>) : ""}
                        {allloading ? <Loader /> : allerror ? (<><br /><Message variant='danger'>{allerror.status ? `Error ${allerror.status}: ${allerror.statusText}` : allerror}</Message></>) : ""}
                        <Row>
                            {
                                students && (serstudents === [] || searchsuccess !== true) && (allstudents === [] || allsuccess !== true) && students.map((student) => (
                                    <Col key={student._id} sm={12} md={6} lg={4} xl={3}>
                                        <Student student={student} />
                                    </Col>
                                ))
                            }
                            {
                                serstudents && (allstudents === [] || allsuccess !== true) && serstudents.map((student) => (
                                    <Col key={student._id} sm={12} md={6} lg={4} xl={3}>
                                        <Student student={student} />
                                    </Col>
                                ))
                            }
                            {
                                allstudents && allstudents.map((student) => (
                                    <Col key={student._id} sm={12} md={6} lg={4} xl={3}>
                                        <Student student={student} />
                                    </Col>
                                ))
                            }
                        </Row>
                    </>
            }

        </>
    );
}

export default Students;