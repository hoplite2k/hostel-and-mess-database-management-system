import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Breadcrumb, Row, Col, Button, Form, Card } from 'react-bootstrap';
import { listrooms, addnewroomset, roomsetdelete } from '../actions/roomactions';
import { ROOMSET_ADD_RESET } from '../constants/roomconstants';
import Room from '../components/roomcomponent';
import Loader from '../components/loadercomponent';
import Message from '../components/messagecomponent';
import FormContainer from '../components/formcontainercomponent';

const Rooms = (props) => {

    const dispatch = useDispatch();

    const [showaddform, setshowaddform] = useState(false);
    const [showdelform, setshowdelform] = useState(false);
    const [showserform, setshowserform] = useState(false);
    const [roomallocationyear, setroomallocationyear] = useState(2012);
    const [roomvacatingyear, setroomvacatingyear] = useState(2013);

    const roomlist = useSelector((state) => state.roomlist);
    const { loading, error, rooms } = roomlist;

    const userlogin = useSelector((state) => state.userlogin);
    const { userinfo } = userlogin;

    const deleteroomset = useSelector((state) => state.deleteroomset);
    const { success: successDelete } = deleteroomset;

    const addroomset = useSelector((state) => state.addroomset);
    const { success: successAdd } = addroomset;

    useEffect(() => {
        if (!userinfo) {
            props.history.push('/login');
        } else if (successAdd) {
            dispatch({
                type: ROOMSET_ADD_RESET
            });
        } else {
            dispatch(listrooms());
        }
    }, [dispatch, props.history, userinfo, successDelete, successAdd]);

    const delsubmitHandler = (e) => {
        e.preventDefault();
        dispatch(roomsetdelete({
            roomallocationyear, roomvacatingyear
        }));
    }

    const addsubmitHandler = (e) => {
        e.preventDefault();
        dispatch(addnewroomset({
            roomallocationyear, roomvacatingyear
        }));
    }

    const sersubmitHandler = () => {
        console.log('search');
    }

    var submitHandler;

    return (
        <>
            {
                loading ? <Loader /> : error ? <Message variant='danger'>{`Error ${error.status}: ${error.statusText}`}</Message> :
                    <>
                        <Breadcrumb>
                            <Breadcrumb.Item href="#" active>Rooms</Breadcrumb.Item>
                        </Breadcrumb>
                        {
                            userinfo && userinfo.isadmin && (<Button variant='success' onClick={() => { setshowaddform(true); setshowdelform(false); setshowserform(false); }}><span className='fas fa-plus'></span> Add Roomset</Button>)
                        }
                    &nbsp;&nbsp;
                        {
                            userinfo && userinfo.isadmin && (<Button variant='danger' onClick={() => { setshowdelform(true); setshowaddform(false); setshowserform(false); }}><span className='fas fa-trash-alt'></span> Delete Roomset</Button>)
                        }
                    &nbsp;&nbsp;
                        <Button variant='primary' onClick={() => { setshowserform(true); setshowaddform(false); setshowdelform(false); }}><span className='fas fa-search-plus'></span> Search</Button>
                        {
                            (showaddform || showdelform || showserform) &&
                            <>
                                <br />
                                <br />
                                <Card className="my-4" bg="light">
                                    <Card.Title style={{ textAlign: 'center' }}><strong>{showaddform ? "Add Roomset" : showdelform ? "Delete Roomset" : "Search"}</strong></Card.Title>
                                    <Card.Body>
                                        <FormContainer>
                                            {submitHandler = showaddform ? addsubmitHandler : showdelform ? delsubmitHandler : sersubmitHandler}
                                            <Form onSubmit={submitHandler}>
                                                <Form.Group controlId='roomallocation'>
                                                    <Form.Label>Room Allocation Year</Form.Label>
                                                    <Form.Control type='number' value={roomallocationyear} onChange={(e) => setroomallocationyear(e.target.value)}></Form.Control>
                                                </Form.Group>
                                                <Form.Group controlId='roomvacating'>
                                                    <Form.Label>Room Vacating Year</Form.Label>
                                                    <Form.Control type='number' value={roomvacatingyear} onChange={(e) => setroomvacatingyear(e.target.value)}></Form.Control>
                                                </Form.Group>
                                                {showaddform && <Button variant='success' type='submit'>Add</Button>}
                                                {showdelform && <Button variant='danger' type='submit'>Delete</Button>}
                                                {showserform && <Button variant='primary' type='submit'>Search</Button>}
                                            </Form>
                                        </FormContainer>
                                    </Card.Body>
                                </Card>
                            </>
                        }
                        <br />
                        <Row>
                            {rooms.map((room) => (
                                <Col key={room._id} sm={12} md={6} lg={4} xl={3}>
                                    <Room room={room} />
                                </Col>
                            ))}
                        </Row>
                    </>
            }
        </>
    );
}

export default Rooms;