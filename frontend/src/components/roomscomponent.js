import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Breadcrumb, Row, Col, Button } from 'react-bootstrap';
import { listrooms } from '../actions/roomactions';
import Room from '../components/roomcomponent';
import Loader from '../components/loadercomponent';
import Message from '../components/messagecomponent';

const Rooms = (props) => {

    const dispatch = useDispatch();

    const roomlist = useSelector((state) => state.roomlist);
    const {loading, error, rooms} = roomlist;

    const userlogin = useSelector((state) => state.userlogin);
    const {userinfo} = userlogin;

    useEffect(() => {
        if(!userinfo){
            props.history.push('/login');
        } else {
            dispatch(listrooms());
        }    
    }, [dispatch, props.history, userinfo]);

    return(
        <>
            {
                loading ? <Loader /> : error ? <Message variant='danger'>{`Error ${error.status}: ${error.statusText}`}</Message> :
                <>
                    <Breadcrumb>
                        <Breadcrumb.Item href="#" active>Rooms</Breadcrumb.Item>
                    </Breadcrumb>
                    <Button variant='primary'><span className='fas fa-search-plus'></span> Search</Button>
                    <Row>
                        {rooms.map((room) => (
                            <Col key={room._id} sm={12} md={6} lg={4} xl={3}>
                                <Room room={room} />
                            </Col>
                        ))}
                    </Row>
                </>
            }
        </>
    );
}

export default Rooms;