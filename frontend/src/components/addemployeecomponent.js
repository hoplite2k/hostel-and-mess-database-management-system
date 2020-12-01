import React, { useState, useEffect } from 'react';
import { Form, Button, Breadcrumb } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from "../components/messagecomponent";
import Loader from "../components/loadercomponent";
import FormContainer from "../components/formcontainercomponent";
import { addnewemployee } from "../actions/employeeactions";
import { EMPLOYEE_ADD_RESET } from "../constants/employeeconstants";

const Addemployee = (props) => {

    const [name, setname] = useState('');
    const [staffid, setstaffid] = useState('');
    const [image, setimage] = useState('');
    const [dob, setdob] = useState('');
    const [idproof, setidproof] = useState('');
    const [contact, setcontact] = useState('');
    const [email, setemail] = useState('');
    const [address, setaddress] = useState('');
    const [bloodgrp, setbloodgrp] = useState('');
    const [role, setrole] = useState('');
    const [isadmin, setisadmin] = useState(false);

    const dispatch = useDispatch();

    const addemployee = useSelector((state) => state.addemployee);
    const { loading, error, success, employee } = addemployee;

    useEffect(() => {
        if (success) {
            dispatch({
                type: EMPLOYEE_ADD_RESET
            });
            props.history.push('/employees');
        }
    }, [dispatch, props.history, success]);

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(addnewemployee({
            name, staffid, image, dob, idproof, contact, email, address, bloodgrp, role, isadmin
        }));
        console.log(employee);
    }

    return (
        <>
            <Breadcrumb>
                <Breadcrumb.Item><Link to="/employees">Employees</Link></Breadcrumb.Item>
                <Breadcrumb.Item href="#" active>Add</Breadcrumb.Item>
            </Breadcrumb>
            <LinkContainer classname='my-3' to={'/employees'}><Button variant="dark"><span className="fas fa-chevron-left"></span> Back</Button></LinkContainer>
            {
                loading ? <Loader /> : error ? <Message variant='danger'>{error.statusText ? `Error ${error.status}: ${error.statusText}` : error}</Message> :
                    <FormContainer>
                        <h1>Add Employee</h1>
                        <br />
                        <Form onSubmit={submitHandler}>
                            <Form.Group controlId='name'>
                                <Form.Label>Name</Form.Label>
                                <Form.Control type='text' placeholder='Enter Name' value={name} onChange={(e) => setname(e.target.value)}></Form.Control>
                            </Form.Group>
                            <Form.Group controlId='staffid'>
                                <Form.Label>Staff ID</Form.Label>
                                <Form.Control type='text' placeholder='Enter staffid' value={staffid} onChange={(e) => setstaffid(e.target.value)}></Form.Control>
                            </Form.Group>
                            <Form.Group controlId='image'>
                                <Form.Label>Image</Form.Label>
                                <Form.Control type='text' placeholder='Enter Image' value={image} onChange={(e) => setimage(e.target.value)}></Form.Control>
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
                                <Form.Label>Contact No</Form.Label>
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
                            <Form.Group controlId='role'>
                                <Form.Label>Role</Form.Label>
                                <Form.Control type='text' placeholder="Enter Role" value={role} onChange={(e) => setrole(e.target.value)}></Form.Control>
                            </Form.Group>
                            <Form.Group controlId='isadmin'>
                                <Form.Check type='checkbox' label='Admin' checked={isadmin} onChange={(e) => setisadmin(e.target.checked)}></Form.Check>
                            </Form.Group>
                            <Button type='submit' variant='primary'>Add</Button>
                        </Form>
                    </FormContainer>
            }
        </>
    )
}

export default Addemployee;
