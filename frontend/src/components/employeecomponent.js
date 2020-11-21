import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Employee = (props) => {
    const IsAdmin = props.employee.isadmin ? "(Admin)" : "";
    return(
        <Card className="p-3 my-3 rounded">
            <Link to={`/employees/${props.employee._id}`}>
                <Card.Img src={props.employee.image} variant="top"/>
            </Link>
            <Card.Body>
                <Link to={`/employees/${props.employee._id}`}>
                    <Card.Title as="div">
                        <strong>{props.employee.name} {IsAdmin}</strong>
                    </Card.Title>
                </Link>
                <Card.Text>
                    <ul className="card-text">
                        <li>Staff ID: {props.employee.staffid}</li>
                        <li>Contact: {props.employee.contact}</li>
                        <li>Email: {props.employee.email}</li>
                        <li>Address: {props.employee.address}</li>
                    </ul>
                </Card.Text>
            </Card.Body>
        </Card>
    );
}

export default Employee;