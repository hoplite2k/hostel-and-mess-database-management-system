import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Breadcrumb, Row, Col, Button } from 'react-bootstrap';
import { listmess } from '../actions/messactions';
import Mess from '../components/messcomponent';
import Loader from '../components/loadercomponent';
import Message from '../components/messagecomponent';

const Messes = (props) => {

    const dispatch = useDispatch();

    const messlist = useSelector((state) => state.messlist);
    const { loading, error, messes } = messlist;

    const userlogin = useSelector((state) => state.userlogin);
    const { userinfo } = userlogin;

    const deletemess = useSelector((state) => state.deletemess);
    const { success: successDelete } = deletemess;

    useEffect(() => {
        if (!userinfo) {
            props.history.push('/login');
        } else {
            dispatch(listmess());
        }
    }, [dispatch, props.history, userinfo, successDelete]);

    return (
        <>
            {
                loading ? <Loader /> : error ? <Message variant='danger'>{`Error ${error.status}: ${error.statusText}`}</Message> :
                    <>
                        <Breadcrumb>
                            <Breadcrumb.Item href="#" active>Mess</Breadcrumb.Item>
                        </Breadcrumb>
                        <Button variant='success'><span className='fas fa-plus'></span> Add Mess Detail</Button>&nbsp;&nbsp;
                        <Button variant='primary'><span className='fas fa-search-plus'></span> Search</Button>
                        <Row>
                            {messes.map((mess) => (
                                <Col key={mess._id} sm={12} md={6} lg={4} xl={3}>
                                    <Mess mess={mess} />
                                </Col>
                            ))}
                        </Row>
                    </>
            }
        </>
    );
}

export default Messes;