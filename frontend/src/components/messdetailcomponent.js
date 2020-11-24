import React, { useEffect, useState } from 'react';
import { Breadcrumb, Row, Col} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';

const MessDetail = (props) => {
    
    const [mess, setmess] = useState({});

    useEffect(() => {
        const fetchmess = async () => {
            const res = await axios.get(`/mess/${props.match.params.id}`);

            setmess(res.data);
        }

        fetchmess();
    }, [props.match]);

    return(
        <>
            <Breadcrumb>
                <Breadcrumb.Item><Link to="/students">Students</Link></Breadcrumb.Item>
                <Breadcrumb.Item href="#" active>{mess.date}</Breadcrumb.Item>
            </Breadcrumb>
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
        </>
    );
}

export default MessDetail;