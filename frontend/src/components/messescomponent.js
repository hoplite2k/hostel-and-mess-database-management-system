import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Breadcrumb, Row, Col } from 'react-bootstrap';
import { listmess } from '../actions/messactions';
import Mess from '../components/messcomponent';
import Loader from '../components/loadercomponent';
import Message from '../components/messagecomponent';

const Messes = () => {

    const dispatch = useDispatch();

    const messlist = useSelector((state) => state.messlist);
    const {loading, error, messes} = messlist; 

    useEffect(() => {
        dispatch(listmess());
    }, [dispatch]);

    return(
        <>
            <Breadcrumb>
                <Breadcrumb.Item href="#" active>Mess</Breadcrumb.Item>
            </Breadcrumb>
            {
                loading ? <Loader /> : error ? <Message variant='danger'>{`Error ${error.status}: ${error.statusText}`}</Message> :
                <Row>
                    {messes.map((mess) => (
                        <Col key={mess._id} sm={12} md={6} lg={4} xl={3}>
                            <Mess mess={mess} />
                        </Col>
                    ))}
                </Row>
            }
        </>
    );
}

export default Messes;