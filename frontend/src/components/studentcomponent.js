import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Student = (props) => {
    return(
        <Card style={{height:"350px"}} className="p-3 my-3 rounded">
            <Link to={`/students/${props.student._id}`}>
                <Card.Img src={props.student.image} variant="top"/>
            </Link>
            <Card.Body>
                <Link to={`/students/${props.student._id}`}>
                    <Card.Title as="div">
                        <h3><strong>{props.student.name}</strong></h3>
                    </Card.Title>
                </Link>
                <Card.Text>
                    <ul className="card-text">
                        <li>USN: {props.student.usn}</li>
                        <li>Room No.: {props.student.room}</li>
                        <li>Contact: {props.student.contact}</li>
                        <li>Email: {props.student.email}</li>
                    </ul>
                </Card.Text>
            </Card.Body>
        </Card>
    );
}

export default Student;