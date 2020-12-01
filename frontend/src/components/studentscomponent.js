import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Breadcrumb, Button } from 'react-bootstrap';
import { liststudents } from '../actions/studentactions';
import Student from '../components/studentcomponent';
import Loader from '../components/loadercomponent';
import Message from '../components/messagecomponent';

const Students = (props) => {
    const dispatch = useDispatch();

    const studentlist = useSelector((state) => state.studentlist);
    const { loading, error, students } = studentlist;

    const userlogin = useSelector((state) => state.userlogin);
    const { userinfo } = userlogin;

    const deletestudent = useSelector((state) => state.deletestudent);
    const { success: successDelete } = deletestudent;

    useEffect(() => {
        if (!userinfo) {
            props.history.push('/login');
        } else {
            dispatch(liststudents());
        }
    }, [dispatch, props.history, userinfo, successDelete]);

    return (
        <>
            {
                loading ? <Loader /> : error ? <Message variant='danger'>{`Error ${error.status}: ${error.statusText}`}</Message> :
                    <>
                        <Breadcrumb>
                            <Breadcrumb.Item href="#" active>Students</Breadcrumb.Item>
                        </Breadcrumb>
                        {
                            userinfo && userinfo.isadmin && (<Button variant='success'><span className='fas fa-plus'></span> Add Student</Button>)
                        }
                    &nbsp;&nbsp;<Button variant='primary'><span className='fas fa-search-plus'></span> Search</Button>
                        <Row>
                            {students.map((student) => (
                                <Col key={student._id} sm={12} md={6} lg={4} xl={3}>
                                    <Student student={student} />
                                </Col>
                            ))}
                        </Row>
                    </>
            }

        </>
    );
}

export default Students;