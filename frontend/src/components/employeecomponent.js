import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, Badge, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import { deleteemployeedetails } from "../actions/employeeactions";

const AdminButton = (props) => {
    if (props.isadmin) {
        return (
            <h4>
                <strong>{props.name}</strong>
                <Badge variant="danger" className="badge-margin">Admin</Badge>
            </h4>
        );
    }
    else {
        return (
            <h4><strong>{props.name}</strong></h4>
        );
    }
}

const Employee = (props) => {

    const dispatch = useDispatch();

    const userlogin = useSelector((state) => state.userlogin);
    const { userinfo } = userlogin;

    const deleteHandler = (id) => {
        if (window.confirm("Are you sure?")) {
            dispatch(deleteemployeedetails(id));
        }
    }

    return (
        <Card style={{ height: "400px" }} className="p-3 my-3 rounded">
            <Link to={`/employees/${props.employee._id}`}>
                <Card.Img src={props.employee.image} style={{ height: "125px", width: "220px" }} variant="top" />
            </Link>
            <Card.Body>
                <Link to={`/employees/${props.employee._id}`}>
                    <Card.Title as="div">
                        <AdminButton name={props.employee.name} isadmin={props.employee.isadmin} />
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
                {userinfo && userinfo.isadmin && (
                    <div className="bottom-right">
                        <LinkContainer to={`/employees/${props.employee._id}/edit`}><Button variant='success'><span className="fas fa-edit"></span></Button></LinkContainer>{' '}
                        <Button variant='danger' onClick={() => deleteHandler(props.employee._id)}><span className="fas fa-trash-alt"></span></Button>
                    </div>
                )}
            </Card.Body>
        </Card>
    );
}

export default Employee;