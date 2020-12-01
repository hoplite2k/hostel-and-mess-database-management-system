import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Room = (props) => {
    var variant, vacancy;
    if(props.room.inmates.length === 0){
        variant = "danger";
        vacancy = 2;
    }
    else if(props.room.inmates.length === 1){
        variant = "warning";
        vacancy = 1;
    }
    else{
        variant = "light";
        vacancy = 0;
    }
    return(
        <Link to={`/rooms/${props.room._id}`}>
            <Card style={{height:"300px"}} className="p-3 my-3 rounded" bg={variant}>
                <Card.Body>                    
                    <Card.Title as="div">
                        <center><h3><strong>{props.room.roomno}</strong></h3></center>
                    </Card.Title>
                    <Card.Text>
                        <ul className="card-text">
                            {
                                props.room.inmates.map((s,i) => {
                                    return <li><strong>{`Student ${i}`}</strong> {s ? s : " - "}</li>
                                })
                            }
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