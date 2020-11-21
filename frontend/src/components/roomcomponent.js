import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Room = (props) => {
    var variant, vacancy;
    if(props.room.one === null && props.room.two === null){
        variant = "danger";
        vacancy = 2;
    }
    else if(props.room.one === null || props.room.two === null){
        variant = "warning";
        vacancy = 1;
    }
    else{
        variant = "light";
        vacancy = 0;
    }
    return(
        <Link to={`/rooms/${props.room._id}`}>
            <Card className="p-3 my-3 rounded" bg={variant}>
                <Card.Body>                    
                    <Card.Title as="div">
                        <center><h3><strong>{props.room.roomno}</strong></h3></center>
                    </Card.Title>
                    <Card.Text>
                        <ul className="card-text">
                            <li><strong>Student 1:</strong> {props.room.one ? props.room.one : " - "}</li>
                            <li><strong>Student 2:</strong> {props.room.two ? props.room.two : " - "}</li>
                        </ul>
                    </Card.Text>
                    <Card.Text>
                        <center><strong>Vacancy:</strong> {vacancy}</center>
                    </Card.Text>
                </Card.Body>
            </Card>
        </Link>
    );
}

export default Room;