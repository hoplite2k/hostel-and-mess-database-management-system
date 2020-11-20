import React from 'react';
import { Card } from 'react-bootstrap';

const Student = (props) => {
    return(
        <Card className="p-3 my-3 rounded">
            <a href={`/students/${props.student._id}`}>
                <Card.Img src={props.student.image} variant="top"/>
            </a>
            <Card.Body>
                <a href={`/students/${props.student._id}`}>
                    <Card.Title as="div">
                        <strong>{props.student.name}</strong>
                    </Card.Title>
                </a>
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