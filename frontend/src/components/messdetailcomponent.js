import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Breadcrumb, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import { listmessdetails } from '../actions/messactions';
import Loader from '../components/loadercomponent';
import Message from '../components/messagecomponent';

const MessDetail = (props) => {

    const dispatch = useDispatch();

    const messdetails = useSelector((state) => state.messdetails);
    const { loading, error, mess } = messdetails;

    const userlogin = useSelector((state) => state.userlogin);
    const { userinfo } = userlogin;

    useEffect(() => {
        if (!userinfo) {
            props.history.push('/login');
        } else {
            dispatch(listmessdetails(props.match.params.id));
        }
    }, [dispatch, props.match, userinfo, props.history]);

    return (
        <>
            <Breadcrumb>
                <Breadcrumb.Item><Link to="/mess">Mess</Link></Breadcrumb.Item>
                <Breadcrumb.Item href="#" active>{mess.date}</Breadcrumb.Item>
            </Breadcrumb>
            <LinkContainer classname='my-3' to='/mess'><Button variant="dark"><span className="fas fa-chevron-left"></span> Back</Button></LinkContainer>
            {
                loading ? <Loader /> : error ? <Message variant='danger'>{`Error ${error.status}: ${error.statusText}`}</Message> :
                    <Row className="start">
                        <Col md={12} lg={{ span: 4, offset: 2 }}>
                            <div className="person-name">
                                {mess.date}
                            </div>
                            <br />
                            <div className="person-details">
                                <p><strong>Day: </strong>{mess.day}</p>
                                <p><strong>Ration Used: </strong>{mess.rationused} Kgs</p>
                                <p><strong>Food Wasted: </strong>{mess.foodwasted} Kgs</p>
                            </div>
                        </Col>
                    </Row>
            }
        </>
    );
}

export default MessDetail;