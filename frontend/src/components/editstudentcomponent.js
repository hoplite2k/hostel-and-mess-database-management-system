import React, { useState, useEffect } from 'react';
import { Form, Button, Breadcrumb } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from "../components/messagecomponent";
import Loader from "../components/loadercomponent";
import FormContainer from "../components/formcontainercomponent";
import { liststudentdetails, updatestudentdetails } from "../actions/studentactions";
import { STUDENT_UPDATE_RESET } from "../constants/studentconstants";
import axios from 'axios';

const Editstudent = (props) => {
    const studentid = props.match.params.id;

    const [name, setname] = useState('');
    const [usn, setusn] = useState('');
    const [image, setimage] = useState('');
    const [branch, setbranch] = useState('');
    const [year, setyear] = useState('');
    const [roomno, setroomno] = useState('');
    const [roomatename, setroomatename] = useState('');
    const [roomateusn, setroomateusn] = useState('');
    const [dob, setdob] = useState('');
    const [idproof, setidproof] = useState('');
    const [contact, setcontact] = useState('');
    const [email, setemail] = useState('');
    const [address, setaddress] = useState('');
    const [feespaid, setfeespaid] = useState(25000);
    const [feesdue, setfeesdue] = useState(0);
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

    const [errorname, seterrorname] = useState('');
    const [errorusn, seterrorusn] = useState('');
    const [errorimage, seterrorimage] = useState('');
    const [errorbranch, seterrorbranch] = useState('');
    const [erroryear, seterroryear] = useState('');
    const [errorroomno, seterrorroomno] = useState('');
    const [errordob, seterrordob] = useState('');
    const [erroridproof, seterroridproof] = useState('');
    const [errorcontact, seterrorcontact] = useState('');
    const [erroremail, seterroremail] = useState('');
    const [erroraddress, seterroraddress] = useState('');
    const [errorbloodgrp, seterrorbloodgrp] = useState('');
    const [errorfname, seterrorfname] = useState('');
    const [errormname, seterrormname] = useState('');
    const [errorpaddress, seterrorpaddress] = useState('');
    const [errorpemail, seterrorpemail] = useState('');
    const [errorpcontact, seterrorpcontact] = useState('');

    const [uploading, setuploading] = useState(false);

    const dispatch = useDispatch();

    const studentdetails = useSelector((state) => state.studentdetails);
    const { loading, error, student } = studentdetails;

    const updatestudent = useSelector((state) => state.updatestudent);
    const { loading: loadingupdate, error: errorupdate, success: successupdate } = updatestudent;

    const userlogin = useSelector((state) => state.userlogin);
    const { userinfo } = userlogin;

    useEffect(() => {
        if (!userinfo) {
            props.history.push('/login');
        }
        if (successupdate) {
            dispatch({
                type: STUDENT_UPDATE_RESET
            });
            props.history.push('/students');
        } else {
            if (!student.name || student._id !== studentid) {
                dispatch(liststudentdetails(studentid));
            } else {
                setname(student.name);
                setusn(student.usn);
                setimage(student.image);
                setbranch(student.branch);
                setyear(student.year);
                setroomno(student.roomno);
                setroomatename(student.roomatename);
                setroomateusn(student.roomateusn);
                setdob(student.dob);
                setidproof(student.idproof);
                setcontact(student.contact);
                setemail(student.email);
                setaddress(student.address);
                setfeespaid(student.feespaid);
                setfeesdue(student.feesdue);
                setpenalties(student.penalties);
                setfirstyear(student.firstyear);
                setfinalyear(student.finalyear);
                setbloodgrp(student.bloodgrp);
                setispassedout(student.ispassedout);
                setfname(student.parents.fname);
                setmname(student.parents.mname);
                setpaddress(student.parents.address);
                setpemail(student.parents.email);
                setpcontact(student.parents.contact);
            }
        }
    }, [dispatch, studentid, student, props.match, props.history, successupdate, userinfo]);

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

            const { data } = await axios.post('/api/uploads/profile/student', formData, config);
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

            const { data } = await axios.post('/api/uploads/identity/student', formData, config);
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

        if (!(/^1RV/.test(usn))) {
            seterrorusn("Enter vaild USN");
            res = false;
        } else {
            seterrorusn("");
        }

        if (image === "") {
            seterrorimage("Enter a valid path");
            res = false;
        } else {
            seterrorimage("");
        }

        if (branch === "") {
            seterrorbranch("Enter a valid branch");
            res = false;
        } else {
            seterrorbranch("");
        }

        if (year === "") {
            seterroryear("Enter a valid year");
            res = false;
        } else {
            seterroryear("");
        }

        if (roomno === "") {
            seterrorroomno("Enter a valid path");
            res = false;
        } else {
            seterrorroomno("");
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

        if (!(/^[a-zA-z]{2,20}$/.test(fname))) {
            seterrorfname("Enter a valid name with 2-10 characters");
            res = false;
        } else {
            seterrorfname("");
        }

        if (!(/^[a-zA-z]{2,20}$/.test(mname))) {
            seterrormname("Enter a valid name with 2-10 characters");
            res = false;
        } else {
            seterrormname("");
        }

        if (!(/^[0-9]{10,10}$/.test(pcontact))) {
            seterrorpcontact("Enter a valid Contact No.");
            res = false;
        } else {
            seterrorpcontact("");
        }

        if (!(/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/.test(pemail))) {
            seterrorpemail("Enter a valid Email");
            res = false;
        } else {
            seterrorpemail("");
        }

        if (paddress === "") {
            seterrorpaddress("Enter a valid Address");
            res = false;
        } else {
            seterrorpaddress("");
        }

        return res;
    }

    const submitHandler = (e) => {
        e.preventDefault();
        const valid = validate();
        if (valid) {
            dispatch(updatestudentdetails({
                _id: studentid, name, usn, image, branch, year, roomno, roomatename, roomateusn, dob, idproof, contact, email, address, feespaid, feesdue, penalties, firstyear, finalyear, bloodgrp, parents: { fname, mname, address: paddress, email: pemail, contact: pcontact },
            }));
        }
    }

    return (
        <>
            <Breadcrumb>
                <Breadcrumb.Item><Link to="/students">Students</Link></Breadcrumb.Item>
                <Breadcrumb.Item ><Link to={`/students/${student._id}`}>{student.name}</Link></Breadcrumb.Item>
                <Breadcrumb.Item href="#" active>Edit</Breadcrumb.Item>
            </Breadcrumb>
            <LinkContainer classname='my-3' to={`/students/${student._id}`}><Button variant="dark"><span className="fas fa-chevron-left"></span> Back</Button></LinkContainer>
            {loadingupdate && <Loader />}
            {errorupdate && <Message variant='danger'>{errorupdate.statusText ? `Error ${errorupdate.status}: ${errorupdate.statusText}` : errorupdate}</Message>}
            {
                loading ? <Loader /> : error ? <Message variant='danger'>{error.statusText ? `Error ${error.status}: ${error.statusText}` : error}</Message> :
                    <FormContainer>
                        <h1>Edit Student</h1>
                        <br />
                        <Form onSubmit={submitHandler}>
                            <Form.Group controlId='name'>
                                <Form.Label>Name</Form.Label>
                                <Form.Control type='text' placeholder='Enter Name' value={name} onChange={(e) => setname(e.target.value)}></Form.Control>
                                <p style={{ color: 'red' }}>{errorname}</p>
                            </Form.Group>
                            <Form.Group controlId='usn'>
                                <Form.Label>Usn</Form.Label>
                                <Form.Control type='text' placeholder='Enter Usn' value={usn} onChange={(e) => setusn(e.target.value)} disabled></Form.Control>
                                <p style={{ color: 'red' }}>{errorusn}</p>
                            </Form.Group>
                            <Form.Group controlId='image'>
                                <Form.Label>Image</Form.Label>
                                <Form.Control type='text' placeholder='Enter Image' value={image} onChange={(e) => setimage(e.target.value)}></Form.Control>
                                <br />
                                <Form.File id='student-image-file' onChange={uploadprofileHandler} />
                                {uploading && <Loader />}
                                <p style={{ color: 'red' }}>{errorimage}</p>
                            </Form.Group>
                            <Form.Group controlId='branch'>
                                <Form.Label>Branch</Form.Label>
                                <Form.Control as='select' value={branch} onChange={(e) => setbranch(e.target.value)}>
                                    {
                                        ["--SELECT--", "CSE", "ISE", "ECE", "EEE", "TCE", "ME", "IEM", "AE", "CV"].map((b) => {
                                            if (b === "--SELECT--") {
                                                return <option key={""} value={""}>{b}</option>
                                            } else {
                                                return <option key={b} value={b}>{b}</option>
                                            }
                                        })
                                    }
                                </Form.Control>
                                <p style={{ color: 'red' }}>{errorbranch}</p>
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
                                <p style={{ color: 'red' }}>{erroryear}</p>
                            </Form.Group>
                            <Form.Group controlId='roomno'>
                                <Form.Label>Room No</Form.Label>
                                <Form.Control type='text' placeholder='Enter Room No' value={roomno} onChange={(e) => setroomno(e.target.value)}></Form.Control>
                                <p style={{ color: 'red' }}>{errorroomno}</p>
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
                                <p style={{ color: 'red' }}>{errordob}</p>
                            </Form.Group>
                            <Form.Group controlId='idproof'>
                                <Form.Label>ID Proof</Form.Label>
                                <Form.Control type='text' placeholder='Enter ID Proof' value={idproof} onChange={(e) => setidproof(e.target.value)}></Form.Control>
                                <br />
                                <Form.File id='student-identity-file' onChange={uploadidentityHandler} />
                                {uploading && <Loader />}
                                <p style={{ color: 'red' }}>{erroridproof}</p>
                            </Form.Group>
                            <Form.Group controlId='contact'>
                                <Form.Label>Contact No</Form.Label>
                                <Form.Control type='text' placeholder='Enter Contact No' value={contact} onChange={(e) => setcontact(e.target.value)}></Form.Control>
                                <p style={{ color: 'red' }}>{errorcontact}</p>
                            </Form.Group>
                            <Form.Group controlId='email'>
                                <Form.Label>Email</Form.Label>
                                <Form.Control type='email' placeholder='Enter Email' value={email} onChange={(e) => setemail(e.target.value)}></Form.Control>
                                <p style={{ color: 'red' }}>{erroremail}</p>
                            </Form.Group>
                            <Form.Group controlId='address'>
                                <Form.Label>Address</Form.Label>
                                <Form.Control type='text' placeholder='Enter Address' value={address} onChange={(e) => setaddress(e.target.value)}></Form.Control>
                                <p style={{ color: 'red' }}>{erroraddress}</p>
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
                            <Form.Group controlId='fname'>
                                <Form.Label>Father's Name</Form.Label>
                                <Form.Control type='text' placeholder="Enter Father's Name" value={fname} onChange={(e) => setfname(e.target.value)}></Form.Control>
                                <p style={{ color: 'red' }}>{errorfname}</p>
                            </Form.Group>
                            <Form.Group controlId='mname'>
                                <Form.Label>Mother's Name</Form.Label>
                                <Form.Control type='text' placeholder="Enter Mother's Name" value={mname} onChange={(e) => setmname(e.target.value)}></Form.Control>
                                <p style={{ color: 'red' }}>{errormname}</p>
                            </Form.Group>
                            <Form.Group controlId='paddress'>
                                <Form.Label>Parent's Address</Form.Label>
                                <Form.Control type='text' placeholder="Enter Parents's Address" value={paddress} onChange={(e) => setpaddress(e.target.value)}></Form.Control>
                                <p style={{ color: 'red' }}>{errorpaddress}</p>
                            </Form.Group>
                            <Form.Group controlId='pemail'>
                                <Form.Label>Parents' Email</Form.Label>
                                <Form.Control type='email' placeholder="Enter Parent's Email" value={pemail} onChange={(e) => setpemail(e.target.value)}></Form.Control>
                                <p style={{ color: 'red' }}>{errorpemail}</p>
                            </Form.Group>
                            <Form.Group controlId='pcontact'>
                                <Form.Label>Parent's Contact</Form.Label>
                                <Form.Control type='text' placeholder="Enter Parent's Contact" value={pcontact} onChange={(e) => setpcontact(e.target.value)}></Form.Control>
                                <p style={{ color: 'red' }}>{errorpcontact}</p>
                            </Form.Group>
                            <Form.Group controlId='ispassedout'>
                                <Form.Check type='switch' label='Passed Out' checked={ispassedout} onChange={(e) => setispassedout(e.target.checked)}></Form.Check>
                            </Form.Group>
                            <Button type='submit' variant='primary'>Update</Button>
                        </Form>
                    </FormContainer>
            }
        </>
    )
}

export default Editstudent;
