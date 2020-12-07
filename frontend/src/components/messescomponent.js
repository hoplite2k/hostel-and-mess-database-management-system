import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Breadcrumb, Row, Col, Button, Card, Form } from 'react-bootstrap';
import { listmess, searchmess, listallmess } from '../actions/messactions';
import { LinkContainer } from 'react-router-bootstrap';
import Mess from '../components/messcomponent';
import Loader from '../components/loadercomponent';
import Message from '../components/messagecomponent';

const Messes = (props) => {

    const dispatch = useDispatch();

    const [showserform, setshowserform] = useState(false);
    const [date, setdate] = useState('');
    const [day, setday] = useState('');
    const [yearmonth, setyearmonth] = useState('');
    const [rationused, setrationused] = useState(0);
    const [foodwasted, setfoodwasted] = useState(0);

    const messlist = useSelector((state) => state.messlist);
    const { loading, error, messes } = messlist;

    const messlistall = useSelector((state) => state.messlistall);
    const { loading: allloading, error: allerror, success: allsuccess, messes: allmesses } = messlistall;

    const userlogin = useSelector((state) => state.userlogin);
    const { userinfo } = userlogin;

    const messsearch = useSelector((state) => state.messsearch);
    const { loading: searchloading, error: searcherror, success: searchsuccess, messes: sermesses } = messsearch;

    const deletemess = useSelector((state) => state.deletemess);
    const { success: successDelete } = deletemess;

    useEffect(() => {
        if (!userinfo) {
            props.history.push('/login');
        } else if (searchsuccess !== true && allsuccess !== true) {
            dispatch(listmess());
        }
    }, [dispatch, props.history, userinfo, successDelete, searchsuccess, allsuccess]);

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(searchmess({
            date, day, rationused, foodwasted, yearmonth
        }));
        setshowserform(false);
    }

    const all = (e) => {
        e.preventDefault();
        dispatch(listallmess());
        setshowserform(false);
    }

    return (
        <>
            {
                loading ? <Loader /> : error ? <Message variant='danger'>{`Error ${error.status}: ${error.statusText}`}</Message> :
                    <>
                        <Breadcrumb>
                            <Breadcrumb.Item href="#" active>Mess</Breadcrumb.Item>
                        </Breadcrumb>
                        <LinkContainer to={'/newmessdetail'}><Button variant='success'><span className='fas fa-plus'></span> Add Mess Detail</Button></LinkContainer>&nbsp;&nbsp;
                        <Button variant='primary' onClick={() => setshowserform(true)}><span className='fas fa-search-plus'></span> Search</Button>
                        <Button variant='secondary' style={{ float: 'right' }} onClick={all}><span className="fas fa-database"></span> Get All</Button>
                        {
                            showserform &&
                            <>
                                <br />
                                <br />
                                <Card className="my-4" bg="light">
                                    <Card.Header><h2 style={{ textAlign: 'center' }}>Search</h2></Card.Header>
                                    <Card.Body>
                                        <Form onSubmit={submitHandler}>
                                            <Form.Row>
                                                <Col xs={12} md={6}>
                                                    <Form.Group controlId='date'>
                                                        <Form.Label>Date</Form.Label>
                                                        <Form.Control type='date' value={date} onChange={(e) => setdate((e.target.value).toString())}></Form.Control>
                                                    </Form.Group>
                                                    <Form.Group controlId='yearmonth'>
                                                        <Form.Label>Year-Month</Form.Label>
                                                        <Form.Control type='string' value={yearmonth} onChange={(e) => setyearmonth(e.target.value)}></Form.Control>
                                                    </Form.Group>
                                                    <Form.Group controlId='rationused'>
                                                        <Form.Label>Ration Used</Form.Label>
                                                        <Form.Control type='number' value={rationused} onChange={(e) => setrationused(e.target.value)}></Form.Control>
                                                    </Form.Group>
                                                </Col>
                                                <Col xs={12} md={6}>
                                                    <Form.Group controlId='day'>
                                                        <Form.Label>Day</Form.Label>
                                                        <Form.Control as='select' value={day} onChange={(e) => setday(e.target.value)}>
                                                            {
                                                                ["SELECT", "SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"].map((d) => {
                                                                    return <option key={d} value={d}>{d}</option>
                                                                })
                                                            }
                                                        </Form.Control>
                                                    </Form.Group>
                                                    <Form.Group controlId='foodwasted'>
                                                        <Form.Label>Food Wasted</Form.Label>
                                                        <Form.Control type='number' value={foodwasted} onChange={(e) => setfoodwasted(e.target.value)}></Form.Control>
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
                                sermesses && (sermesses === [] || searchsuccess !== true) && (allmesses === [] || allsuccess !== true) && messes.map((mess) => (
                                    <Col key={mess._id} sm={12} md={6} lg={4} xl={3}>
                                        <Mess mess={mess} />
                                    </Col>
                                ))
                            }
                            {
                                sermesses && (allmesses === [] || allsuccess !== true) && sermesses.map((mess) => (
                                    <Col key={mess._id} sm={12} md={6} lg={4} xl={3}>
                                        <Mess mess={mess} />
                                    </Col>
                                ))
                            }
                            {
                                allmesses && allmesses.map((mess) => (
                                    <Col key={mess._id} sm={12} md={6} lg={4} xl={3}>
                                        <Mess mess={mess} />
                                    </Col>
                                ))
                            }
                        </Row>
                    </>
            }
        </>
    );
}

export default Messes;