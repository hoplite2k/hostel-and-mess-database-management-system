import React from 'react';
import { Breadcrumb, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Student from '../components/studentcomponent';
import ROOMS from '../shared/rooms';
import STUDENTS from '../shared/students';

const Handler = (props) => {
    if(props.one === undefined && props.two === undefined){
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
    const room = ROOMS.find((r) => r._id === props.match.params.id);
    const student1 = STUDENTS.find((s) => s.usn === room.oneusn);
    const student2 = STUDENTS.find((s) => s.usn === room.twousn);
    return(
        <>
            <Breadcrumb>
                <Breadcrumb.Item><Link to="/rooms">Rooms</Link></Breadcrumb.Item>
                <Breadcrumb.Item href="#" active>Students</Breadcrumb.Item>
            </Breadcrumb>
            <Row>
                {
                    student1 !== undefined ?
                    <Col key={student1._id} sm={12} md={6} lg={4} xl={3}>
                        <Student student={student1} />
                    </Col> : <div></div>
                }
                {   student2 !== undefined ?
                    <Col key={student2._id} sm={12} md={6} lg={4} xl={3}>
                        <Student student={student2} />
                    </Col> : <div></div>
                }
                <Handler one={student1} two={student2}/>
            </Row>
        </>
    );
}

export default RoomDetail;