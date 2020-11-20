import React from 'react';
import { Breadcrumb, Row, Col, Image} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import STUDENTS from '../shared/students';

const StudentDetail = (props) => {
    const student = STUDENTS.find((s) => s._id === props.match.params.id);
    return(
        <>
            <Breadcrumb>
                <Breadcrumb.Item><Link to="/students">Students</Link></Breadcrumb.Item>
                <Breadcrumb.Item href="#" active>{student.name}</Breadcrumb.Item>
            </Breadcrumb>
            <Row>
                <Col md={12} lg={{span:4, offset:1}} className="py-5">
                    <Image src={student.image} alt={student.name} thumbnail/>
                </Col>
                <Col md={12} lg={{span:4, offset:2}}>
                    <div className="person-name">
                        {student.name}
                    </div>
                    <br />
                    <div className="person-details">
                        <p><strong>USN: </strong>{student.usn}</p>
                        <p><strong>Branch: </strong>{student.branch}</p>
                        <p><strong>Email: </strong>{student.email}</p>
                        <p><strong>Contact: </strong>{student.contact}</p>
                        <p><strong>DOB: </strong>{student.dob}</p>
                        <p><strong>Address: </strong>{student.address}</p>
                        <p><strong>Fees Paid: </strong>{student.feespaid}</p>
                        <p><strong>Fees Due: </strong>{student.feesdue}</p>
                        <p><strong>Penalties: </strong>{student.penalties}</p>
                        <p><strong>Room Number: </strong>{student.room}</p>
                        <p><strong>Roomate USN: </strong>{student.roomateusn}</p>
                    </div>
                </Col>
            </Row>
        </>
    );
}

export default StudentDetail;