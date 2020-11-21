import React from 'react';
import { Row, Col, Breadcrumb } from 'react-bootstrap';
import EMPLOYEES from '../shared/employees';
import Employee from '../components/employeecomponent';

const Employees = () => {
    return(
        <>
            <Breadcrumb>
                <Breadcrumb.Item href="#" active>Employees</Breadcrumb.Item>
            </Breadcrumb>
            <Row>
                {EMPLOYEES.map((employee) => (
                    <Col key={employee._id} sm={12} md={6} lg={4} xl={3}>
                        <Employee employee={employee} />
                    </Col>
                ))}
            </Row>
        </>
    );
}

export default Employees;