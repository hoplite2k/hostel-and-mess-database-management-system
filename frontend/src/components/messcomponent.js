import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { Link } from 'react-router-dom';
import { deletemessdetails } from "../actions/messactions";

const Mess = (props) => {

    const dispatch = useDispatch();

    const userlogin = useSelector((state) => state.userlogin);
    const { userinfo } = userlogin;

    const deleteHandler = (id) => {
        if (window.confirm("Are you sure?")) {
            dispatch(deletemessdetails(id));
        }
    }

    return (
        <Card style={{ height: "225px" }} className="p-3 my-3 rounded">
            <Card.Body>
                <Link to={`/mess/${props.mess._id}`}>
                    <Card.Title as="div">
                        <center><h3><strong>{props.mess.date}</strong></h3></center>
                    </Card.Title>
                    <Card.Text>
                        <ul className="card-text">
                            <li><strong>Ration Used:</strong> {props.mess.rationused ? props.mess.rationused : " - "} Kgs</li>
                            <li><strong>Food Wasted:</strong> {props.mess.foodwasted ? props.mess.foodwasted : " - "} Kgs</li>
                        </ul>
                    </Card.Text>
                </Link>
                {userinfo && (
                    <div className="bottom-right">
                        <LinkContainer to={`/mess/${props.mess._id}/edit`}><Button variant='success'><span className="fas fa-edit"></span></Button></LinkContainer>{' '}
                        <Button variant='danger' onClick={() => deleteHandler(props.mess._id)}><span className="fas fa-trash-alt"></span></Button>
                    </div>
                )}
            </Card.Body>
        </Card >
    );
}

export default Mess;