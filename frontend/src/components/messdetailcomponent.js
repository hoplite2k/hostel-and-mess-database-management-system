import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Breadcrumb, Row, Col} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { listmessdetails } from '../actions/messactions';
import Loader from '../components/loadercomponent';
import Message from '../components/messagecomponent';

const MessDetail = (props) => {

    const dispatch = useDispatch();

    const messdetails = useSelector((state) => state.messdetails);
    const {loading, error, mess} = messdetails;

    useEffect(() => {
        dispatch(listmessdetails(props.match.params.id));
    }, [dispatch, props.match]);

    return(
        <>
            <Breadcrumb>
                <Breadcrumb.Item><Link to="/students">Students</Link></Breadcrumb.Item>
                <Breadcrumb.Item href="#" active>{mess.date}</Breadcrumb.Item>
            </Breadcrumb>
            {
                loading ? <Loader /> : error ? <Message variant='danger'>{`Error ${error.status}: ${error.statusText}`}</Message> :
                <Row>
                    <Col md={12} lg={{span:4, offset:2}}>
                        <div className="person-name">
                            {mess.date}
                        </div>
                        <br />
                        <div className="person-details">
                            <p><strong>Day: </strong>{mess.day}</p>
                            <p><strong>Ration Used: </strong>{mess.rationused}</p>
                            <p><strong>Food Wasted: </strong>{mess.foodwasted}</p>
                        </div>
                    </Col>
                </Row>
            }
        </>
    );
}

export default MessDetail;