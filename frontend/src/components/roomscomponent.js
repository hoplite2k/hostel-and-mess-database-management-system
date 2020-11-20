import React from 'react';
import { Breadcrumb, Row, Col } from 'react-bootstrap';
import Room from '../components/roomcomponent';
import ROOMS from '../shared/rooms';

const Rooms = () => {
    return(
        <>
            <Breadcrumb>
                <Breadcrumb.Item href="#" active>Rooms</Breadcrumb.Item>
            </Breadcrumb>
            <Row>
                {ROOMS.map((room) => (
                    <Col key={room._id} sm={12} md={6} lg={4} xl={3}>
                        <Room room={room} />
                    </Col>
                ))}
            </Row>
        </>
    );
}

export default Rooms;