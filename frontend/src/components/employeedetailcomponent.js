import React from 'react';
import { Breadcrumb, Row, Col, Image, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import EMPLOYEES from '../shared/employees';

const AdminButton = (props) => {
    if(props.isadmin){
        return(
            <h4>
                <Badge variant="danger">Admin</Badge>
            </h4>
        );
    }
    else{
        return(
            <div></div>
        );
    }
}

const EmployeeDetail = (props) => {
    const employee = EMPLOYEES.find((e) => e._id === props.match.params.id);
    return(
        <>
            <Breadcrumb>
                <Breadcrumb.Item><Link to="/employees">Employees</Link></Breadcrumb.Item>
                <Breadcrumb.Item href="#" active>{employee.name}</Breadcrumb.Item>
            </Breadcrumb>
            <Row>
                <Col md={12} lg={{span:4, offset:1}} className="py-5">
                    <Image src={employee.image} alt={employee.name} thumbnail/>
                </Col>
                <Col md={12} lg={{span:4, offset:2}}>
                    <div>
                        <h4 className="person-name">
                            {employee.name} <AdminButton isadmin={employee.isadmin}/>
                        </h4>
                    </div>
                    <br />
                    <div className="person-details">
                        <p><strong>Staff ID: </strong>{employee.staffid}</p>
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