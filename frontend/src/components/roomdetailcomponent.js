import React from 'react';
import { Breadcrumb, Row, Col } from 'react-bootstrap';
import Student from '../components/studentcomponent';
import ROOMS from '../shared/rooms';
import STUDENTS from '../shared/students';

const RoomDetail = (props) => {
    const room = ROOMS.find((r) => r._id === props.match.params.id);
    const student1 = STUDENTS.find((s) => s.usn === room.oneusn);
    const student2 = STUDENTS.find((s) => s.usn === room.twousn);
    return(
        <>
            <Breadcrumb>
                <Breadcrumb.Item href="/rooms">Rooms</Breadcrumb.Item>
                <Breadcrumb.Item href="#" active>Students</Breadcrumb.Item>
            </Breadcrumb>
            <Row>
                <Col key={student1._id} sm={12} md={6} lg={4} xl={3}>
                    <Student student={student1} />
                </Col>
                {   student2 !== undefined ?
                    <Col key={student2._id} sm={12} md={6} lg={4} xl={3}>
                        <Student student={student2} />
                    </Col> : <div></div>
                }
            </Row>
        </>
    );
}

export default RoomDetail;