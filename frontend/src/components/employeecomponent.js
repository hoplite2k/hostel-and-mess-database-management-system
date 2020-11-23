import React from 'react';
import { Card, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const AdminButton = (props) => {
    if(props.isadmin){
        return(
            <h3>
                <strong>{props.name}</strong> 
                <Badge variant="danger" className="badge-margin">Admin</Badge>
            </h3>
        );
    }
    else{
        return(
            <h3><strong>{props.name}</strong></h3>
        );
    }
}

const Employee = (props) => {
    return(
        <Card className="p-3 my-3 rounded">
            <Link to={`/employees/${props.employee._id}`}>
                <Card.Img src={props.employee.image} variant="top"/>
            </Link>
            <Card.Body>
                <Link to={`/employees/${props.employee._id}`}>
                    <Card.Title as="div">
                        <AdminButton name={props.employee.name} isadmin={props.employee.isadmin}/>
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