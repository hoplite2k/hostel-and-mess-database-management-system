import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Breadcrumb, Row, Col, Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import { listroomdetails } from '../actions/roomactions';
import Student from '../components/studentcomponent';
import Loader from '../components/loadercomponent';
import Message from '../components/messagecomponent';

const Handler = () => {
    return (
        <h3>Room is Empty</h3>
    );
}


const RoomDetail = (props) => {

    const dispatch = useDispatch();

    const roomdetails = useSelector((state) => state.roomdetails);
    const { loading, error, room } = roomdetails;

    const userlogin = useSelector((state) => state.userlogin);
    const { userinfo } = userlogin;

    useEffect(() => {
        if (userinfo) {
            dispatch(listroomdetails(props.match.params.id));
        } else {
            props.history.push('/login');
        }
    }, [dispatch, props.match, userinfo, props.history]);

    return (
        <>
            <Breadcrumb>
                <Breadcrumb.Item><Link to="/rooms">Rooms</Link></Breadcrumb.Item>
                <Breadcrumb.Item href="#" active>{room.roomno}</Breadcrumb.Item>
            </Breadcrumb>
            <LinkContainer classname='my-3' to='/rooms'><Button variant="dark"><span className="fas fa-chevron-left"></span> Back</Button></LinkContainer>
            {
                loading ? <Loader /> : error ? <Message variant='danger'>{`Error ${error.status}: ${error.statusText}`}</Message> :
                    room.inmates.length > 0 ?
                        <Row className="start">
                            <Card style={{ height: "375px" }} className="p-3 my-3 rounded">
                                <Card.Body>
                                    <Card.Title as="div">
                                        <center><h3><strong><u>Room Details</u></strong></h3></center>
                                    </Card.Title>
                                    <br /> <br />
                                    <Card.Text>
                                        <center><h5><strong>Room No : {room.roomno}</strong></h5></center>
                                        <ul className="card-text">
                                            <li>Room Allocation Year: {room.roomallocationyear}</li>
                                            <li>Room Vacating Year: {room.roomvacatingyear}</li>
                                        </ul>
                                    </Card.Text>
                                </Card.Body >
                            </Card >
                            {room.inmates.map((s) => {
                                return (
                                    <Col key={s._id} sm={12} md={6} lg={4} xl={3}>
                                        <Student student={s} />
                                    </Col>)
                            })}
                        </Row>
                        :
                        <Handler />

            }
        </>
    );
}

export default RoomDetail;