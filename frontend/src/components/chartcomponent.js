import React, { useEffect, useMemo } from 'react';
import { Chart } from 'react-charts';
import { Col, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getchart } from '../actions/chartactions';
import Loader from '../components/loadercomponent';
import Message from '../components/messagecomponent';

const Chartcomponent = () => {

    const dispatch = useDispatch();

    const userlogin = useSelector((state) => state.userlogin);
    const { userinfo } = userlogin;

    const chart = useSelector((state) => state.chart);
    const { loading, error, data } = chart;

    useEffect(() => {
        if (userinfo) {
            dispatch(getchart());
        }
    }, [dispatch, userinfo]);

    const datas = useMemo(
        () => [
            {
                label: 'Food',
                data: data
            }
        ],
        [data]
    );

    const axes = useMemo(
        () => [
            { primary: true, type: 'ordinal', position: 'bottom' },
            { type: 'linear', position: 'left' }
        ],
        []
    );

    var date = new Date().toDateString();

    return (
        <>
            {
                loading ? <Loader /> : error ? <Message variant='danger'>{`Error ${error.status}: ${error.statusText}`}</Message> :
                    <>
                        <center><h2>{date}</h2></center>
                        <Row>
                            <Col xs={1}>
                                <p>W<br />a<br />s<br />t<br />a<br />g<br />e<br />(in<br /> KGS)</p>
                            </Col>
                            <Col style={{ width: '400px', height: '300px' }} xs={10}>
                                <Chart data={datas} axes={axes} tooltip />
                                <center><p>Ration Consumed (in KGS)</p></center>
                            </Col>
                        </Row>
                    </>
            }
        </>
    )
}

export default Chartcomponent;
