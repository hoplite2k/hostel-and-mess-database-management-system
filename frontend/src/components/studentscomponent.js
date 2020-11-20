import React from 'react';
import { Row, Col } from 'react-bootstrap';
import STUDENTS from '../shared/students';
import Student from '../components/studentcomponent';

const Students = () => {
    return(
        <>
            <Row>
                {STUDENTS.map((student) => (
                    <Col sm={12} md={6} lg={4} xl={3}>
                        <Student student={student} />
                    </Col>
                ))}
            </Row>
        </>
    );
}

export default Students;