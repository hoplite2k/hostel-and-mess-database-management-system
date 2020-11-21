import React, { useState, useEffect} from 'react';
import { Row, Col, Breadcrumb } from 'react-bootstrap';
import Student from '../components/studentcomponent';
import axios from 'axios';

const Students = () => {
    const [STUDENTS, setSTUDENTS] = useState([]);

    useEffect(() => {
        const fetchSTUDENTS = async () => {
            const res = await axios.get('/students');

            setSTUDENTS(res.data);
        }

        fetchSTUDENTS();
    }, []);

    return(
        <>
            <Breadcrumb>
                <Breadcrumb.Item href="#" active>Students</Breadcrumb.Item>
            </Breadcrumb>
            <Row>
                {STUDENTS.map((student) => (
                    <Col key={student._id} sm={12} md={6} lg={4} xl={3}>
                        <Student student={student} />
                    </Col>
                ))}
            </Row>
        </>
    );
}

export default Students;