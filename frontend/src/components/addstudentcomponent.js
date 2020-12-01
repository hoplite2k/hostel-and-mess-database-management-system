import React, { useState, useEffect } from 'react';
import { Form, Button, Breadcrumb } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from "../components/messagecomponent";
import Loader from "../components/loadercomponent";
import FormContainer from "../components/formcontainercomponent";
import { addnewstudent } from "../actions/studentactions";
import { STUDENT_ADD_RESET } from "../constants/studentconstants";

const Addstudent = (props) => {

    const [name, setname] = useState('');
    const [usn, setusn] = useState('');
    const [image, setimage] = useState('');
    const [branch, setbranch] = useState('');
    const [year, setyear] = useState(1);
    const [roomno, setroomno] = useState('');
    const [roomatename, setroomatename] = useState('');
    const [roomateusn, setroomateusn] = useState('');
    const [dob, setdob] = useState('');
    const [idproof, setidproof] = useState('');
    const [contact, setcontact] = useState('');
    const [email, setemail] = useState('');
    const [address, setaddress] = useState('');
    const [feespaid, setfeespaid] = useState(0);
    const [feesdue, setfeesdue] = useState(25000);
    const [penalties, setpenalties] = useState(0);
    const [firstyear, setfirstyear] = useState(2018);
    const [finalyear, setfinalyear] = useState(2022);
    const [bloodgrp, setbloodgrp] = useState('');
    const [ispassedout, setispassedout] = useState(false);
    const [fname, setfname] = useState('');
    const [mname, setmname] = useState('');
    const [paddress, setpaddress] = useState('');
    const [pemail, setpemail] = useState('');
    const [pcontact, setpcontact] = useState('');

    const dispatch = useDispatch();

    const addstudent = useSelector((state) => state.addstudent);
    const { loading, error, success, student } = addstudent;

    useEffect(() => {
        if (success) {
            dispatch({
                type: STUDENT_ADD_RESET
            });
            props.history.push('/students');
        }
    }, [dispatch, props.history, success]);

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(addnewstudent({
            name, usn, image, branch, year, roomno, roomatename, roomateusn, dob, idproof, contact, email, address, feespaid, feesdue, penalties, firstyear, finalyear, bloodgrp, parents: { fname, mname, address: paddress, email: pemail, contact: pcontact },
        }));
        console.log(student);
    }

    return (
        <>
            <Breadcrumb>
                <Breadcrumb.Item><Link to="/students">Students</Link></Breadcrumb.Item>
                <Breadcrumb.Item href="#" active>Add</Breadcrumb.Item>
            </Breadcrumb>
            <LinkContainer classname='my-3' to={'/students'}><Button variant="dark"><span className="fas fa-chevron-left"></span> Back</Button></LinkContainer>
            {
                loading ? <Loader /> : error ? <Message variant='danger'>{error.statusText ? `Error ${error.status}: ${error.statusText}` : error}</Message> :
                    <FormContainer>
                        <h1>Add New Student</h1>
                        <br />
                        <Form onSubmit={submitHandler}>
                            <Form.Group controlId='name'>
                                <Form.Label>Name</Form.Label>
                                <Form.Control type='text' placeholder='Enter Name' value={name} onChange={(e) => setname(e.target.value)}></Form.Control>
                            </Form.Group>
                            <Form.Group controlId='usn'>
                                <Form.Label>Usn</Form.Label>
                                <Form.Control type='text' placeholder='Enter Usn' value={usn} onChange={(e) => setusn(e.target.value)}></Form.Control>
                            </Form.Group>
                            <Form.Group controlId='image'>
                                <Form.Label>Image</Form.Label>
                                <Form.Control type='text' placeholder='Enter Image' value={image} onChange={(e) => setimage(e.target.value)}></Form.Control>
                            </Form.Group>
                            <Form.Group controlId='branch'>
                                <Form.Label>Branch</Form.Label>
                                <Form.Control as='select' value={branch} onChange={(e) => setbranch(e.target.value)}>
                                    {
                                        ["SELECT", "CSE", "ISE", "ECE", "EEE", "TCE", "ME", "IEM", "AE", "CV"].map((b) => {
                                            return <option key={b} value={b}>{b}</option>
                                        })
                                    }
                                </Form.Control>
                            </Form.Group>
                            <Form.Group controlId='year'>
                                <Form.Label>Year</Form.Label>
                                <Form.Control as='select' value={year} onChange={(e) => setyear(e.target.value)}>
                                    {
                                        ["SELECT", "1", "2", "3", "4"].map((y) => {
                                            return <option key={y} value={y}>{y}</option>
                                        })
                                    }
                                </Form.Control>
                            </Form.Group>
                            <Form.Group controlId='roomno'>
                                <Form.Label>Room No</Form.Label>
                                <Form.Control type='text' placeholder='Enter Room No' value={roomno} onChange={(e) => setroomno(e.target.value)}></Form.Control>
                            </Form.Group>
                            <Form.Group controlId='roomatename'>
                                <Form.Label>Roomate Name</Form.Label>
                                <Form.Control type='text' placeholder='Enter Roomate Name' value={roomatename} onChange={(e) => setroomatename(e.target.value)}></Form.Control>
                            </Form.Group>
                            <Form.Group controlId='roomateusn'>
                                <Form.Label>Roomate Usn</Form.Label>
                                <Form.Control type='text' placeholder='Enter Roomate Usn' value={roomateusn} onChange={(e) => setroomateusn(e.target.value)}></Form.Control>
                            </Form.Group>
                            <Form.Group controlId='dob'>
                                <Form.Label>DOB</Form.Label>
                                <Form.Control type='date' placeholder='Enter DOB' value={dob} onChange={(e) => setdob((e.target.value).toString())}></Form.Control>
                            </Form.Group>
                            <Form.Group controlId='idproof'>
                                <Form.Label>ID Proof</Form.Label>
                                <Form.Control type='text' placeholder='Enter ID Proof' value={idproof} onChange={(e) => setidproof(e.target.value)}></Form.Control>
                            </Form.Group>
                            <Form.Group controlId='contact'>
                                <Form.Label>contact No</Form.Label>
                                <Form.Control type='text' placeholder='Enter Contact No' value={contact} onChange={(e) => setcontact(e.target.value)}></Form.Control>
                            </Form.Group>
                            <Form.Group controlId='email'>
                                <Form.Label>Email</Form.Label>
                                <Form.Control type='email' placeholder='Enter Email' value={email} onChange={(e) => setemail(e.target.value)}></Form.Control>
                            </Form.Group>
                            <Form.Group controlId='address'>
                                <Form.Label>Address</Form.Label>
                                <Form.Control type='text' placeholder='Enter Address' value={address} onChange={(e) => setaddress(e.target.value)}></Form.Control>
                            </Form.Group>
                            <Form.Group controlId='feespaid'>
                                <Form.Label>Fees Paid</Form.Label>
                                <Form.Control type='number' placeholder='Enter Fees Paid' value={feespaid} onChange={(e) => setfeespaid(e.target.value)}></Form.Control>
                            </Form.Group>
                            <Form.Group controlId='feesdue'>
                                <Form.Label>Fees Due</Form.Label>
                                <Form.Control type='number' placeholder='Enter Fees Due' value={feesdue} onChange={(e) => setfeesdue(e.target.value)}></Form.Control>
                            </Form.Group>
                            <Form.Group controlId='penalties'>
                                <Form.Label>Penalties</Form.Label>
                                <Form.Control type='number' placeholder='Enter Penalties' value={penalties} onChange={(e) => setpenalties(e.target.value)}></Form.Control>
                            </Form.Group>
                            <Form.Group controlId='firstyear'>
                                <Form.Label>First Year</Form.Label>
                                <Form.Control type='number' placeholder='Enter First Year' value={firstyear} onChange={(e) => setfirstyear(e.target.value)}></Form.Control>
                            </Form.Group>
                            <Form.Group controlId='finalyear'>
                                <Form.Label>Final Year</Form.Label>
                                <Form.Control type='number' placeholder='Enter Final Year' value={finalyear} onChange={(e) => setfinalyear(e.target.value)}></Form.Control>
                            </Form.Group>
                            <Form.Group controlId='bloodgrp'>
                                <Form.Label>Blood Grp</Form.Label>
                                <Form.Control as='select' value={bloodgrp} onChange={(e) => setbloodgrp(e.target.value)}>
                                    {
                                        ["SELECT", "A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"].map((b) => {
                                            return <option key={b} value={b}>{b}</option>
                                        })
                                    }
                                </Form.Control>
                            </Form.Group>
                            <Form.Group controlId='fname'>
                                <Form.Label>Father's Name</Form.Label>
                                <Form.Control type='text' placeholder="Enter Father's Name" value={fname} onChange={(e) => setfname(e.target.value)}></Form.Control>
                            </Form.Group>
                            <Form.Group controlId='mname'>
                                <Form.Label>Mother's Name</Form.Label>
                                <Form.Control type='text' placeholder="Enter Mother's Name" value={mname} onChange={(e) => setmname(e.target.value)}></Form.Control>
                            </Form.Group>
                            <Form.Group controlId='paddress'>
                                <Form.Label>Parent's Address</Form.Label>
                                <Form.Control type='text' placeholder="Enter Parents's Address" value={paddress} onChange={(e) => setpaddress(e.target.value)}></Form.Control>
                            </Form.Group>
                            <Form.Group controlId='pemail'>
                                <Form.Label>Parents' Email</Form.Label>
                                <Form.Control type='email' placeholder="Enter Parent's Email" value={pemail} onChange={(e) => setpemail(e.target.value)}></Form.Control>
                            </Form.Group>
                            <Form.Group controlId='pcontact'>
                                <Form.Label>Parent's Contact</Form.Label>
                                <Form.Control type='text' placeholder="Enter Parent's Contact" value={pcontact} onChange={(e) => setpcontact(e.target.value)}></Form.Control>
                            </Form.Group>
                            <Form.Group controlId='ispassedout'>
                                <Form.Check type='checkbox' label='Passed Out' checked={ispassedout} onChange={(e) => setispassedout(e.target.checked)}></Form.Check>
                            </Form.Group>
                            <Button type='submit' variant='primary'>Submit</Button>
                        </Form>
                    </FormContainer>
            }
        </>
    )
}

export default Addstudent;
