import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Breadcrumb } from 'react-bootstrap';
import Employee from '../components/employeecomponent';
import { listemployees } from '../actions/employeeactions';
import Loader from '../components/loadercomponent';
import Message from '../components/messagecomponent';

const Employees = (props) => {

    const dispatch = useDispatch();

    const employeelist = useSelector((state) => state.employeelist);
    const { loading, error, employees } = employeelist;

    const userlogin = useSelector((state) => state.userlogin);
    const {userinfo} = userlogin;

    useEffect(() => {
        if(!userinfo){
            props.history.push('/login');
        } else {
            dispatch(listemployees('profile'));
        }    
    }, [dispatch, props.history, userinfo]);

    return(
        <>
            {
                loading ? <Loader /> : error ? <Message variant='danger'>{error.statusText ? `Error ${error.status}: ${error.statusText}` : error}</Message> :
                <>
                    <Breadcrumb>
                        <Breadcrumb.Item href="#" active>Employees</Breadcrumb.Item>
                    </Breadcrumb>
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