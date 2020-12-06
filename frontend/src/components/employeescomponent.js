import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Breadcrumb, Button, Card, Form } from 'react-bootstrap';
import Employee from '../components/employeecomponent';
import { listemployees, searchemployees } from '../actions/employeeactions';
import { LinkContainer } from 'react-router-bootstrap';
import Loader from '../components/loadercomponent';
import Message from '../components/messagecomponent';

const Employees = (props) => {

    const dispatch = useDispatch();

    const [showserform, setshowserform] = useState(false);
    const [name, setname] = useState('');
    const [staffid, setstaffid] = useState('');
    const [role, setrole] = useState('');
    const [isadmin, setisadmin] = useState('');
    const [email, setemail] = useState('');
    const [contact, setcontact] = useState('');

    const employeelist = useSelector((state) => state.employeelist);
    const { loading, error, employees } = employeelist;

    const employeesearch = useSelector((state) => state.employeesearch);
    const { loading: searchloading, error: searcherror, success: searchsuccess, employees: seremployees } = employeesearch;

    const userlogin = useSelector((state) => state.userlogin);
    const { userinfo } = userlogin;

    const deleteemployee = useSelector((state) => state.deleteemployee);
    const { success: successDelete } = deleteemployee;

    useEffect(() => {
        if (userinfo && userinfo.isadmin) {
            dispatch(listemployees());
        } else if (searchsuccess !== true) {
            props.history.push('/login');
        }
    }, [dispatch, props.history, userinfo, successDelete, searchsuccess]);

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(searchemployees({
            name, staffid, contact, email, role, isadmin
        }));
        setshowserform(false);
    }

    return (
        <>
            {
                loading ? <Loader /> : error ? <Message variant='danger'>{error.statusText ? `Error ${error.status}: ${error.statusText}` : error}</Message> :
                    <>
                        <Breadcrumb>
                            <Breadcrumb.Item href="#" active>Employees</Breadcrumb.Item>
                        </Breadcrumb>
                        {
                            userinfo && userinfo.isadmin && (<LinkContainer to={'/newemployee'}><Button variant='success'><span className='fas fa-plus'></span> Add Employee</Button></LinkContainer>)
                        }
                        &nbsp;&nbsp;<Button variant='primary' onClick={() => setshowserform(true)}><span className='fas fa-search-plus'></span> Search</Button>
                        <Button variant='secondary' style={{ float: 'right' }}><span className="fas fa-database"></span> Get All</Button>
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
                                                    <Form.Group controlId='contact'>
                                                        <Form.Label>Contact</Form.Label>
                                                        <Form.Control type='text' value={contact} onChange={(e) => setcontact(e.target.value)}></Form.Control>
                                                    </Form.Group>
                                                    <Form.Group controlId='role'>
                                                        <Form.Label>Role</Form.Label>
                                                        <Form.Control type='text' value={role} onChange={(e) => setrole(e.target.value)}></Form.Control>
                                                    </Form.Group>
                                                </Col>
                                                <Col xs={12} md={6}>
                                                    <Form.Group controlId='staffid'>
                                                        <Form.Label>Staff ID</Form.Label>
                                                        <Form.Control type='text' value={staffid} onChange={(e) => setstaffid(e.target.value)}></Form.Control>
                                                    </Form.Group>
                                                    <Form.Group controlId='email'>
                                                        <Form.Label>Email</Form.Label>
                                                        <Form.Control type='email' value={email} onChange={(e) => setemail(e.target.value)}></Form.Control>
                                                    </Form.Group>
                                                    <Form.Group controlId='isadmin'>
                                                        <Form.Label>Admin</Form.Label>
                                                        <Form.Control as='select' value={isadmin} onChange={(e) => setisadmin(e.target.value)}>
                                                            {
                                                                ["SELECT", "YES", "NO"].map((y) => {
                                                                    return <option key={y} value={y}>{y}</option>
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
                        <br />
                        {searchloading ? <Loader /> : searcherror ? (<><br /><Message variant='danger'>{searcherror.status ? `Error ${searcherror.status}: ${searcherror.statusText}` : searcherror}</Message></>) : ""}
                        <Row>
                            {employees && (seremployees === [] || searchsuccess !== true) && employees.map((employee) => (
                                <Col key={employee._id} sm={12} md={6} lg={4} xl={3}>
                                    <Employee employee={employee} />
                                </Col>
                            ))}
                            {
                                seremployees && seremployees.map((employee) => (
                                    <Col key={employee._id} sm={12} md={6} lg={4} xl={3}>
                                        <Employee employee={employee} />
                                    </Col>
                                ))
                            }
                        </Row>
                    </>
            }
        </>
    );
}

export default Employees;