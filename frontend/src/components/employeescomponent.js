import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Breadcrumb, Button } from 'react-bootstrap';
import Employee from '../components/employeecomponent';
import { listemployees } from '../actions/employeeactions';
import { LinkContainer } from 'react-router-bootstrap';
import Loader from '../components/loadercomponent';
import Message from '../components/messagecomponent';

const Employees = (props) => {

    const dispatch = useDispatch();

    const employeelist = useSelector((state) => state.employeelist);
    const { loading, error, employees } = employeelist;

    const userlogin = useSelector((state) => state.userlogin);
    const { userinfo } = userlogin;

    const deleteemployee = useSelector((state) => state.deleteemployee);
    const { success: successDelete } = deleteemployee;

    useEffect(() => {
        if (userinfo && userinfo.isadmin) {
            dispatch(listemployees());
        } else {
            props.history.push('/login');
        }
    }, [dispatch, props.history, userinfo, successDelete]);

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
                    &nbsp;&nbsp;<Button variant='primary'><span className='fas fa-search-plus'></span> Search</Button>
                        <Row>
                            {employees.map((employee) => (
                                <Col key={employee._id} sm={12} md={6} lg={4} xl={3}>
                                    <Employee employee={employee} />
                                </Col>
                            ))}
                        </Row>
                    </>
            }
        </>
    );
}

export default Employees;