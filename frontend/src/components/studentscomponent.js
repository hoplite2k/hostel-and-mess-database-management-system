import React from 'react';
import { Row, Col, Breadcrumb } from 'react-bootstrap';
import STUDENTS from '../shared/students';
import Student from '../components/studentcomponent';

const Students = () => {
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