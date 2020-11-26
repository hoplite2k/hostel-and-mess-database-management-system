import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Mess = (props) => {
    return(
        <Link to={`/mess/${props.mess._id}`}>
            <Card style={{height:"200px"}} className="p-3 my-3 rounded">
                <Card.Body>                    
                    <Card.Title as="div">
                        <center><h3><strong>{props.mess.date}</strong></h3></center>
                    </Card.Title>
                    <Card.Text>
                        <ul className="card-text">
                            <li><strong>Ration Used:</strong> {props.mess.rationused ? props.mess.rationused : " - "} Kgs</li>
                            <li><strong>Food Wasted:</strong> {props.mess.foodwasted ? props.mess.foodwasted : " - "} Kgs</li>
                        </ul>
                    </Card.Text>
                </Card.Body>
            </Card>
        </Link>
    );
}

export default Mess;