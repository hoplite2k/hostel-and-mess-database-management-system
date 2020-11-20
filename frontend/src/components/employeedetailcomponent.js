import React from 'react';
import { Breadcrumb, Row, Col, Image} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import STUDENTS from '../shared/students';

const EmployeeDetail = (props) => {
    const employee = STUDENTS.find((e) => e._id === props.match.params.id);
    return(
        <>
            <Breadcrumb>
                <Breadcrumb.Item><Link to="/students">Students</Link></Breadcrumb.Item>
                <Breadcrumb.Item href="#" active>{employee.name}</Breadcrumb.Item>
            </Breadcrumb>
            <Row>
                <Col md={12} lg={{span:4, offset:1}} className="py-5">
                    <Image src={employee.image} alt={employee.name} thumbnail/>
                </Col>
                <Col md={12} lg={{span:4, offset:2}}>
                    <div className="person-name">
                        {employee.name}
                    </div>
                    <br />
                    <div className="person-details">
                        <p><strong>Staff ID: </strong>{employee.usn}</p>
                        <p><strong>Email: </strong>{employee.email}</p>
                        <p><strong>Contact: </strong>{employee.contact}</p>
                        <p><strong>DOB: </strong>{employee.dob}</p>
                        <p><strong>Address: </strong>{employee.address}</p>
                    </div>
                </Col>
            </Row>
        </>
    );
}

export default EmployeeDetail;