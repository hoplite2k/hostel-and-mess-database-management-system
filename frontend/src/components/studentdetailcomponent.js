import React, { useEffect, useState } from 'react';
import { Breadcrumb, Row, Col, Image} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';

const StudentDetail = (props) => {
    
    const [student, setstudent] = useState({});

    useEffect(() => {
        const fetchstudent = async () => {
            const res = await axios.get(`/students/${props.match.params.id}`);

            setstudent(res.data);
        }

        fetchstudent();
    }, [props.match]);

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