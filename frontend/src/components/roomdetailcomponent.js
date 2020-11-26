import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Breadcrumb, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { listroomdetails } from '../actions/roomactions';
import Student from '../components/studentcomponent';
import Loader from '../components/loadercomponent';
import Message from '../components/messagecomponent';

const Handler = (props) => {
    if(props.one === null && props.two === null){
        return(
            <div className="py-3">
                <h3>Room is Empty</h3>
            </div>
        );
    }
    else{
        return(
            <div></div>
        );
    }
}

const RoomDetail = (props) => {

    const dispatch = useDispatch();

    const roomdetails = useSelector((state) => state.roomdetails);
    const {loading, error, room} = roomdetails;

    useEffect(() => {
        dispatch(listroomdetails(props.match.params.id));
    }, [dispatch, props.match]);

    return(
        <>
            <Breadcrumb>
                <Breadcrumb.Item><Link to="/rooms">Rooms</Link></Breadcrumb.Item>
                <Breadcrumb.Item href="#" active>Students</Breadcrumb.Item>
            </Breadcrumb>
            {
                loading ? <Loader /> : error ? <Message variant='danger'>{`Error ${error.status}: ${error.statusText}`}</Message> :
                    <Row>
                        {room.student1 !== null ?
                        <Col key={room.student1._id} sm={12} md={6} lg={4} xl={3}>
                            <Student student={room.student1} />
                        </Col> : <div></div> }

                        {room.student2 !== null ?
                        <Col key={room.student2._id} sm={12} md={6} lg={4} xl={3}>
                            <Student student={room.student2} />
                        </Col> : <div></div>}
                        <Handler one={room.student1} two={room.student2} />
                    </Row>
                
            }
        </>
    );
}

export default RoomDetail;