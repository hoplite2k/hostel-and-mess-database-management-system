import React, { useEffect, useState } from 'react';
import { Breadcrumb, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Student from '../components/studentcomponent';
import axios from 'axios';

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

    const [room, setroom] = useState({});
    const [STUDENTS, setSTUDENTS] =  useState([]);

    useEffect(() => {
        const fetchroom = async () => {
            const res = await axios.get(`/rooms/${props.match.params.id}`);

            setroom(res.data);
        }

        const fetchSTUDENTS = async () => {
            const res = await axios.get('/students');

            setSTUDENTS(res.data);
        }

        fetchroom();
        fetchSTUDENTS();
    }, [props.match]);

    const student1 = STUDENTS.find((student) => student.usn === room.oneusn);
    const student2 = STUDENTS.find((student) => student.usn === room.twousn);

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
                {
                    student2 !== undefined ?
                    <Col key={student2._id} sm={12} md={6} lg={4} xl={3}>
                        <Student student={student2} />
                    </Col> : <div></div>
                }   
                <Handler one={student1} two={student2} />
            </Row>
        </>
    );
}

export default RoomDetail;