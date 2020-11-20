import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Room = (props) => {
    return(
        <Link to={`/rooms/${props.room._id}`}>
            <Card className="p-3 my-3 rounded" bg="light">
                <Card.Body>                    
                    <Card.Title as="div">
                        <center><strong>{props.room.roomno}</strong></center>
                    </Card.Title>
                    <Card.Text>
                        <ul className="card-text">
                            <li><strong>Student 1:</strong> {props.room.one}</li>
                            <li><strong>Student 2:</strong> {props.room.two}</li>
                        </ul>
                    </Card.Text>
                </Card.Body>
            </Card>
        </Link>
    );
}

export default Room;