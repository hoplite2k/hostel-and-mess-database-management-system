import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Breadcrumb, Row, Col, Button } from 'react-bootstrap';
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
                <Breadcrumb.Item href="#" active>Students</Breadcrumb.Item>
            </Breadcrumb>
            <LinkContainer classname='my-3' to='/rooms'><Button variant="dark"><span className="fas fa-chevron-left"></span> Back</Button></LinkContainer>
            {
                loading ? <Loader /> : error ? <Message variant='danger'>{`Error ${error.status}: ${error.statusText}`}</Message> :
                    room.inmates.length > 0 ?
                        <Row className="start">
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