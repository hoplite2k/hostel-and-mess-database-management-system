import React from 'react';
import { Card } from 'react-bootstrap';

const Employee = (props) => {
    return(
        <Card className="p-3 my-3 rounded">
            <a href={`/employees/${props.employee._id}`}>
                <Card.Img src={props.employee.image} variant="top"/>
            </a>
            <Card.Body>
                <a href={`/employees/${props.employee._id}`}>
                    <Card.Title as="div">
                        <strong>{props.employee.name}</strong>
                    </Card.Title>
                </a>
                <Card.Text>
                    <ul className="card-text">
                        <li>Staff ID: {props.employee.usn}</li>
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