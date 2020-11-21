import React from 'react';
import { Container, Row, Col, Image, Breadcrumb } from 'react-bootstrap';

const About = () => {
    return(
        <>
            <Breadcrumb>
                    <Breadcrumb.Item href="#" active>About Us</Breadcrumb.Item>
            </Breadcrumb>
            <div className="start">
                <h3>Hostel</h3>
                <div>
                    <p>A home away from home', is the concept of hostels in RVCE. We provide the best possible comfort needed for students. The number of students accommodated in a room depends on the semester. As the concentration and privacy required is more as a student progress from first year to final year, accordingly the accommodation is provided.</p>
                    <p>There is only one common mess for all the boarders and is provided in Cauvery block with vegetarian food. The boarders are provided sports, gymnasium and Wi-Fi facilities.</p>
                </div>
                <br />
                <h3>Hostel Names</h3>
                <ul>
                    <li>Chamundi block: First year U.G. students.</li>
                    <li>Cauvery Annex block - First year U.G. students.</li>
                    <li>Cauvery block – Second & Third year U.G. students</li>
                    <li>Sir M. Visweswaraya block : Final year U.G. and P.G. students.</li>
                </ul>
                <br />
                <Container>
                    <Row>
                        <Col xs={12} md={6}>
                            <Image src="images/Hostel1.JPG" alt="Cauvery Hostel" thumbnail/>
                            <h3>Cauvery Hostel</h3>
                            <br />
                        </Col>
                        <Col xs={12} md={6}>
                            <Image src="images/Hostel1.JPG" alt="Sir M. Visweswaraiah Block" thumbnail/>
                            <h3>Sir M. Visweswaraiah Block</h3>
                            <br />
                        </Col>
                        <Col xs={12} md={6}>
                            <Image src="images/Hostel2.JPG" alt="Diamond Jubilee Block" thumbnail/>
                            <h3>Diamond Jubilee Block</h3>
                            <br />
                        </Col>
                        <Col xs={12} md={6}>
                            <Image src="images/Hostel3.JPG" alt="Chamundi Block" thumbnail/>
                            <h3>Chamundi Block</h3>
                            <br />
                        </Col>
                    </Row>
                </Container>
                <br />
                <div> The entire Hostel for Boys is located at R. V. College of Engineering Campus. For Information: Hostel Office - 080-67178424 / 67178148.</div>
                <br />
                <h3>Note:</h3>
                <ol>
                    <li>Hostel rooms are of sharing type.</li>
                    <li>
                        Students are required to bring the following.
                        <ul>
                            <li>Bed.</li>
                            <li>Bucket / Mug and any other daily usage items.</li>
                            <li>Electrical items like Heating Coils / Iron Box / Tape Recorders etc., are not allowed.</li>
                        </ul>
                    </li>
                    <li>Students are required to adhere to college dress code strictly.</li>
                </ol>
                <br />
                <strong>Dr. K.N. Subramanya, Principal and Chief Warden, RVCE Hostels</strong>
                <div>
                    <div>Professor & Associate Dean, Dept. of Electronics & Instrumentation Engineering.</div>
                    <div>R.V. College of Engineering, Bengaluru-560059.</div>
                </div>
            </div>
        </>
    );
}

export default About;