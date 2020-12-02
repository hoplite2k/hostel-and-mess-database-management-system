import React, { useState, useEffect } from 'react';
import { Form, Button, Breadcrumb } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from "../components/messagecomponent";
import Loader from "../components/loadercomponent";
import FormContainer from "../components/formcontainercomponent";
import { listemployeesdetails, updateemployeedetails } from "../actions/employeeactions";
import { EMPLOYEE_UPDATE_RESET } from "../constants/employeeconstants";
import axios from 'axios';

const Editemployee = (props) => {
    const employeeid = props.match.params.id;

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
    const [uploading, setuploading] = useState(false);

    const dispatch = useDispatch();

    const employeedetails = useSelector((state) => state.employeedetails);
    const { loading, error, employee } = employeedetails;

    const updateemployee = useSelector((state) => state.updateemployee);
    const { loading: loadingupdate, error: errorupdate, success: successupdate } = updateemployee;

    useEffect(() => {
        if (successupdate) {
            dispatch({
                type: EMPLOYEE_UPDATE_RESET
            });
            props.history.push('/employees');
        } else {
            if (!employee.name || employee._id !== employeeid) {
                dispatch(listemployeesdetails(employeeid));
            } else {
                setname(employee.name);
                setstaffid(employee.staffid);
                setimage(employee.image);
                setdob(employee.dob);
                setidproof(employee.idproof);
                setcontact(employee.contact);
                setemail(employee.email);
                setaddress(employee.address);
                setbloodgrp(employee.bloodgrp);
                setrole(employee.role);
                setisadmin(employee.isadmin);
            }
        }
    }, [dispatch, employeeid, employee, props.match, props.history, successupdate]);

    const uploadprofileHandler = async (e) => {
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append('image', file);
        setuploading(true);
        try {
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }

            const { data } = await axios.post('/uploads/profile/employee', formData, config);
            setimage(data);
            setuploading(false);
        } catch (error) {
            console.error(error);
            setuploading(false);
        }
    }

    const uploadidentityHandler = async (e) => {
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append('image', file);
        setuploading(true);
        try {
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }

            const { data } = await axios.post('/uploads/identity/employee', formData, config);
            setidproof(data);
            setuploading(false);
        } catch (error) {
            console.error(error);
            setuploading(false);
        }
    }

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(updateemployeedetails({
            _id: employeeid, name, staffid, image, dob, idproof, contact, email, address, bloodgrp, role, isadmin
        }));
    }

    return (
        <>
            <Breadcrumb>
                <Breadcrumb.Item><Link to="/employees">Employees</Link></Breadcrumb.Item>
                <Breadcrumb.Item ><Link to={`/employees/${employee._id}`}>{employee.name}</Link></Breadcrumb.Item>
                <Breadcrumb.Item href="#" active>Edit</Breadcrumb.Item>
            </Breadcrumb>
            <LinkContainer classname='my-3' to={`/employees/${employee._id}`}><Button variant="dark"><span className="fas fa-chevron-left"></span> Back</Button></LinkContainer>
            {loadingupdate && <Loader />}
            {errorupdate && <Message variant='danger'>{errorupdate.statusText ? `Error ${errorupdate.status}: ${errorupdate.statusText}` : errorupdate}</Message>}
            {
                loading ? <Loader /> : error ? <Message variant='danger'>{error.statusText ? `Error ${error.status}: ${error.statusText}` : error}</Message> :
                    <FormContainer>
                        <h1>Edit Employee</h1>
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
                                <br />
                                <Form.File id='employee-image-file' onChange={uploadprofileHandler} />
                                {uploading && <Loader />}
                            </Form.Group>
                            <Form.Group controlId='dob'>
                                <Form.Label>DOB</Form.Label>
                                <Form.Control type='date' placeholder='Enter DOB' value={dob} onChange={(e) => setdob((e.target.value).toString())}></Form.Control>
                            </Form.Group>
                            <Form.Group controlId='idproof'>
                                <Form.Label>ID Proof</Form.Label>
                                <Form.Control type='text' placeholder='Enter ID Proof' value={idproof} onChange={(e) => setidproof(e.target.value)}></Form.Control>
                                <br />
                                <Form.File id='employee-identity-file' onChange={uploadidentityHandler} />
                                {uploading && <Loader />}
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
                                        ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"].map((b) => {
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
                            <Button type='submit' variant='primary'>Update</Button>
                        </Form>
                    </FormContainer>
            }
        </>
    )
}

export default Editemployee;
