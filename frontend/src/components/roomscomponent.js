import React, { useEffect, useState } from 'react';
import { Breadcrumb, Row, Col } from 'react-bootstrap';
import Room from '../components/roomcomponent';
import axios from 'axios';

const Rooms = () => {

    const [ROOMS, setROOMS] = useState([]);

    useEffect(() => {
        const fetchROOMS = async () => {
            const res = await axios.get('/rooms');

            setROOMS(res.data);
        }

        fetchROOMS();
    }, []);

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