import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Breadcrumb, Row, Col, Button, Form, Card } from 'react-bootstrap';
import { listrooms, addnewroomset, roomsetdelete, searchrooms, listallrooms } from '../actions/roomactions';
import { ROOMSET_ADD_RESET } from '../constants/roomconstants';
import Room from '../components/roomcomponent';
import Loader from '../components/loadercomponent';
import Message from '../components/messagecomponent';

const Rooms = (props) => {

    const dispatch = useDispatch();

    const [showaddform, setshowaddform] = useState(false);
    const [showdelform, setshowdelform] = useState(false);
    const [showserform, setshowserform] = useState(false);
    const [roomallocationyear, setroomallocationyear] = useState('');
    const [roomvacatingyear, setroomvacatingyear] = useState('');
    const [roomno, setroomno] = useState('');

    const [search, setsearch] = useState(true);

    const roomlist = useSelector((state) => state.roomlist);
    const { loading, error, rooms } = roomlist;

    const roomlistall = useSelector((state) => state.roomlistall);
    const { loading: allloading, error: allerror, success: allsuccess, rooms: allrooms } = roomlistall;

    const userlogin = useSelector((state) => state.userlogin);
    const { userinfo } = userlogin;

    const deleteroomset = useSelector((state) => state.deleteroomset);
    const { success: successDelete } = deleteroomset;

    const roomsearch = useSelector((state) => state.roomsearch);
    const { loading: searchloading, error: searcherror, success: searchsuccess, rooms: serrooms } = roomsearch;

    const addroomset = useSelector((state) => state.addroomset);
    const { success: successAdd } = addroomset;

    useEffect(() => {
        if (!userinfo) {
            props.history.push('/login');
        } else if (successAdd) {
            dispatch({
                type: ROOMSET_ADD_RESET
            });
        } else if (searchsuccess !== true && allsuccess !== true) {
            dispatch(listrooms());
        }
    }, [dispatch, props.history, userinfo, successDelete, successAdd, searchsuccess, allsuccess]);

    const delsubmitHandler = (e) => {
        e.preventDefault();
        dispatch(roomsetdelete({
            roomallocationyear, roomvacatingyear
        }));
        setshowdelform(false);
        setroomallocationyear('');
        setroomvacatingyear('');
        setroomno('');
    }

    const addsubmitHandler = (e) => {
        e.preventDefault();
        dispatch(addnewroomset({
            roomallocationyear, roomvacatingyear
        }));
        setshowaddform(false);
        setroomallocationyear('');
        setroomvacatingyear('');
        setroomno('');
    }

    const sersubmitHandler = (e) => {
        e.preventDefault();
        dispatch(searchrooms({
            roomno, roomallocationyear, roomvacatingyear
        }));
        setshowserform(false);
        setroomallocationyear('');
        setroomvacatingyear('');
        setroomno('');
        setsearch(false);
    }

    const all = (e) => {
        e.preventDefault();
        dispatch(listallrooms());
        setshowserform(false);
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
                        <Button variant='secondary' style={{ float: 'right' }} onClick={all}><span className="fas fa-database"></span> Get All</Button>
                        {
                            (showaddform || showdelform) &&
                            <>
                                <br />
                                <br />
                                <Card className="my-4" bg="light">
                                    <Card.Header><h2 style={{ textAlign: 'center' }}>{showaddform ? "Add Roomset" : "Delete Roomset"}</h2></Card.Header>
                                    <Card.Body>
                                        {submitHandler = showaddform ? addsubmitHandler : delsubmitHandler}
                                        <Form onSubmit={submitHandler}>
                                            <Form.Row>
                                                <Col xs={12} md={6}>
                                                    <Form.Group controlId='roomallocation'>
                                                        <Form.Label>Room Allocation Year</Form.Label>
                                                        <Form.Control type='text' value={roomallocationyear} onChange={(e) => setroomallocationyear(e.target.value)}></Form.Control>
                                                    </Form.Group>
                                                </Col>
                                                <Col xs={12} md={6}>
                                                    <Form.Group controlId='roomvacating'>
                                                        <Form.Label>Room Vacating Year</Form.Label>
                                                        <Form.Control type='text' value={roomvacatingyear} onChange={(e) => setroomvacatingyear(e.target.value)}></Form.Control>
                                                    </Form.Group>
                                                </Col>
                                            </Form.Row>
                                            {showaddform && <Button variant='success' type='submit'>Add</Button>}
                                            {showdelform && <Button variant='danger' type='submit'>Delete</Button>}
                                        </Form>
                                    </Card.Body>
                                </Card>
                            </>
                        }
                        {
                            showserform &&
                            <>
                                <br />
                                <br />
                                <Card className="my-4" bg="light">
                                    <Card.Header><h2 style={{ textAlign: 'center' }}>Search</h2></Card.Header>
                                    <Card.Body>
                                        <Form onSubmit={sersubmitHandler}>
                                            <Form.Row>
                                                <Col xs={12} md={6}>
                                                    <Form.Group controlId='roomallocation'>
                                                        <Form.Label>Room Allocation Year</Form.Label>
                                                        <Form.Control type='text' value={roomallocationyear} onChange={(e) => setroomallocationyear(e.target.value)}></Form.Control>
                                                    </Form.Group>
                                                    <Form.Group controlId='roomno'>
                                                        <Form.Label>Room No</Form.Label>
                                                        <Form.Control type='text' value={roomno} onChange={(e) => setroomno(e.target.value)}></Form.Control>
                                                    </Form.Group>
                                                </Col>
                                                <Col xs={12} md={6}>
                                                    <Form.Group controlId='roomvacating'>
                                                        <Form.Label>Room Vacating Year</Form.Label>
                                                        <Form.Control type='text' value={roomvacatingyear} onChange={(e) => setroomvacatingyear(e.target.value)}></Form.Control>
                                                    </Form.Group>
                                                </Col>
                                            </Form.Row>
                                            <Button variant='primary' type='submit'>Search</Button>
                                        </Form>
                                    </Card.Body>
                                </Card>
                            </>
                        }
                        <br />
                        {searchloading ? <Loader /> : searcherror ? (<><br /><Message variant='danger'>{searcherror.status ? `Error ${searcherror.status}: ${searcherror.statusText}` : searcherror}</Message></>) : ""}
                        {allloading ? <Loader /> : allerror ? (<><br /><Message variant='danger'>{allerror.status ? `Error ${allerror.status}: ${allerror.statusText}` : allerror}</Message></>) : ""}
                        <Row>
                            {
                                search && rooms && (serrooms === [] || searchsuccess !== true) && (allrooms === [] || allsuccess !== true) && rooms.map((room) => (
                                    <Col key={room._id} sm={12} md={6} lg={4} xl={3}>
                                        <Room room={room} />
                                    </Col>
                                ))
                            }
                            {
                                serrooms && (allrooms === [] || allsuccess !== true) && serrooms.map((room) => (
                                    <Col key={room._id} sm={12} md={6} lg={4} xl={3}>
                                        <Room room={room} />
                                    </Col>
                                ))
                            }
                            {
                                allrooms && allrooms.map((room) => (
                                    <Col key={room._id} sm={12} md={6} lg={4} xl={3}>
                                        <Room room={room} />
                                    </Col>
                                ))
                            }
                        </Row>
                    </>
            }
        </>
    );
}

export default Rooms;