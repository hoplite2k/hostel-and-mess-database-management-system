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
import axios from 'axios';

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
    const [uploading, setuploading] = useState(false);

    const [errorname, seterrorname] = useState('');
    const [errorstaffid, seterrorstaffid] = useState('');
    const [errorimage, seterrorimage] = useState('');
    const [errordob, seterrordob] = useState('');
    const [erroridproof, seterroridproof] = useState('');
    const [errorcontact, seterrorcontact] = useState('');
    const [erroremail, seterroremail] = useState('');
    const [erroraddress, seterroraddress] = useState('');
    const [errorbloodgrp, seterrorbloodgrp] = useState('');
    const [errorrole, seterrorrole] = useState('');

    const dispatch = useDispatch();

    const addemployee = useSelector((state) => state.addemployee);
    const { loading, error, success, employee } = addemployee;

    const userlogin = useSelector((state) => state.userlogin);
    const { userinfo } = userlogin;

    useEffect(() => {
        if (!userinfo) {
            props.history.push('/login');
        }
        if (success) {
            dispatch({
                type: EMPLOYEE_ADD_RESET
            });
            props.history.push('/employees');
        }
    }, [dispatch, props.history, success, userinfo]);

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

            const { data } = await axios.post('/api/uploads/profile/employee', formData, config);
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

            const { data } = await axios.post('/api/uploads/identity/employee', formData, config);
            setidproof(data);
            setuploading(false);
        } catch (error) {
            console.error(error);
            setuploading(false);
        }
    }

    const validate = () => {
        let res = true;

        if (!(/^[a-zA-z]{2,20}$/.test(name))) {
            seterrorname("Enter a valid name with 2-10 characters");
            res = false;
        } else {
            seterrorname("");
        }

        if (!(/^STAFF/.test(staffid))) {
            seterrorstaffid("Staff ID must begin with 'STAFF'");
            res = false;
        } else {
            seterrorstaffid("");
        }

        if (image === "") {
            seterrorimage("Enter a valid path");
            res = false;
        } else {
            seterrorimage("");
        }

        if (dob === "") {
            seterrordob("Enter a valid date");
            res = false;
        } else {
            seterrordob("");
        }

        if (idproof === "") {
            seterroridproof("Enter a valid path");
            res = false;
        } else {
            seterroridproof("");
        }

        if (!(/^[0-9]{10,10}$/.test(contact))) {
            seterrorcontact("Enter a valid Contact No.");
            res = false;
        } else {
            seterrorcontact("");
        }

        if (!(/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/.test(email))) {
            seterroremail("Enter a valid Email");
            res = false;
        } else {
            seterroremail("");
        }

        if (bloodgrp === "") {
            seterrorbloodgrp("Enter a valid Blood Group");
            res = false;
        } else {
            seterrorbloodgrp("");
        }

        if (address === "") {
            seterroraddress("Enter a valid Address");
            res = false;
        } else {
            seterroraddress("");
        }

        if (role === "") {
            seterrorrole("Enter a valid Role");
            res = false;
        } else {
            seterrorrole("");
        }

        return res;
    }

    const submitHandler = (e) => {
        e.preventDefault();
        const valid = validate();
        if (valid) {
            dispatch(addnewemployee({
                name, staffid, image, dob, idproof, contact, email, address, bloodgrp, role, isadmin
            }));
            console.log(employee);
        }
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
                                <p style={{ color: 'red' }}>{errorname}</p>
                            </Form.Group>
                            <Form.Group controlId='staffid'>
                                <Form.Label>Staff ID</Form.Label>
                                <Form.Control type='text' placeholder='Enter staffid' value={staffid} onChange={(e) => setstaffid(e.target.value)}></Form.Control>
                                <p style={{ color: 'red' }}>{errorstaffid}</p >
                            </Form.Group>
                            <Form.Group controlId='image'>
                                <Form.Label>Image</Form.Label>
                                <Form.Control type='text' placeholder='Enter Image' value={image} onChange={(e) => setimage(e.target.value)}></Form.Control>
                                <br />
                                <Form.File id='employee-image-file' onChange={uploadprofileHandler} />
                                {uploading && <Loader />}
                                <p style={{ color: 'red' }}>{errorimage}</p>
                            </Form.Group>
                            <Form.Group controlId='dob'>
                                <Form.Label>DOB</Form.Label>
                                <Form.Control type='date' placeholder='Enter DOB' value={dob} onChange={(e) => setdob((e.target.value).toString())}></Form.Control>
                                <p style={{ color: 'red' }}>{errordob}</p >
                            </Form.Group>
                            <Form.Group controlId='idproof'>
                                <Form.Label>ID Proof</Form.Label>
                                <Form.Control type='text' placeholder='Enter ID Proof' value={idproof} onChange={(e) => setidproof(e.target.value)}></Form.Control>
                                <br />
                                <Form.File id='employee-identity-file' onChange={uploadidentityHandler} />
                                {uploading && <Loader />}
                                <p style={{ color: 'red' }}>{erroridproof}</p >
                            </Form.Group>
                            <Form.Group controlId='contact'>
                                <Form.Label>Contact No</Form.Label>
                                <Form.Control type='text' placeholder='Enter Contact No' value={contact} onChange={(e) => setcontact(e.target.value)}></Form.Control>
                                <p style={{ color: 'red' }}>{errorcontact}</p >
                            </Form.Group>
                            <Form.Group controlId='email'>
                                <Form.Label>Email</Form.Label>
                                <Form.Control type='email' placeholder='Enter Email' value={email} onChange={(e) => setemail(e.target.value)}></Form.Control>
                                <p style={{ color: 'red' }}>{erroremail}</p   >
                            </Form.Group>
                            <Form.Group controlId='address'>
                                <Form.Label>Address</Form.Label>
                                <Form.Control type='text' placeholder='Enter Address' value={address} onChange={(e) => setaddress(e.target.value)}></Form.Control>
                                <p style={{ color: 'red' }}>{erroraddress}</p >
                            </Form.Group>
                            <Form.Group controlId='bloodgrp'>
                                <Form.Label>Blood Grp</Form.Label>
                                <Form.Control as='select' value={bloodgrp} onChange={(e) => setbloodgrp(e.target.value)}>
                                    {
                                        ["--SELECT--", "A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"].map((b) => {
                                            if (b === "--SELECT--") {
                                                return <option key={""} value={""}>{b}</option>
                                            } else {
                                                return <option key={b} value={b}>{b}</option>
                                            }
                                        })
                                    }
                                </Form.Control>
                                <p style={{ color: 'red' }}>{errorbloodgrp}</p>
                            </Form.Group>
                            <Form.Group controlId='role'>
                                <Form.Label>Role</Form.Label>
                                <Form.Control type='text' placeholder="Enter Role" value={role} onChange={(e) => setrole(e.target.value)}></Form.Control>
                                <p style={{ color: 'red' }}>{errorrole}</p>
                            </Form.Group>
                            <Form.Group controlId='isadmin'>
                                <Form.Check type='switch' label='Admin' checked={isadmin} onChange={(e) => setisadmin(e.target.checked)}></Form.Check>
                            </Form.Group>
                            <Button type='submit' variant='primary'>Add</Button>
                        </Form>
                    </FormContainer>
            }
        </>
    )
}

export default Addemployee;
