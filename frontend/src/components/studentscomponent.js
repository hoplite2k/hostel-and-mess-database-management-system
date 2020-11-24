import React, { useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Breadcrumb } from 'react-bootstrap';
import { liststudents } from '../actions/studentactions';
import Student from '../components/studentcomponent';
import Loader from '../components/loadercomponent';
import Message from '../components/messagecomponent';

const Students = () => {
    const dispatch = useDispatch();

    const studentlist = useSelector((state) => state.studentlist);
    const { loading, error, students } = studentlist;

    useEffect(() => {
        dispatch(liststudents());
    }, [dispatch]);

    return(
        <>
            <Breadcrumb>
                <Breadcrumb.Item href="#" active>Students</Breadcrumb.Item>
            </Breadcrumb>
            {
                loading ? <Loader /> : error ? <Message variant='danger'>{`Error ${error.status}: ${error.statusText}`}</Message> : 
                <Row>
                    {students.map((student) => (
                        <Col key={student._id} sm={12} md={6} lg={4} xl={3}>
                            <Student student={student} />
                        </Col>
                    ))}
                </Row>
            }
            
        </>
    );
}

export default Students;