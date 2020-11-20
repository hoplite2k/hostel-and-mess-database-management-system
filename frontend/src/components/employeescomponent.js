import React from 'react';
import { Row, Col } from 'react-bootstrap';
import STUDENTS from '../shared/students';
import Employee from '../components/employeecomponent';

const Employees = () => {
    return(
        <>
            <Row>
                {STUDENTS.map((employee) => (
                    <Col sm={12} md={6} lg={4} xl={3}>
                        <Employee employee={employee} />
                    </Col>
                ))}
            </Row>
        </>
    );
}

export default Employees;