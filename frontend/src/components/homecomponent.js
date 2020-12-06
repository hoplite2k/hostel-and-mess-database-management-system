import React from 'react';
import { Breadcrumb } from 'react-bootstrap';

function Home() {
    return (
        <>
            <Breadcrumb>
                <Breadcrumb.Item href="#" active>Hostel</Breadcrumb.Item>
            </Breadcrumb>
            <div className="start">
                <h3>R. V. College of Engineering</h3>
                <div>
                    Established in 1963 with three engineering branches namely Civil, Mechanical and Electrical, today RVCE offers 12 Under Graduate Engineering programmes, 16 Master Degree programmes and Doctoral Studies.Located 13 km from the heart of Bangalore City – the Silicon Valley of India, on Mysore Road.Sprawling campus spread over an area of 50.97 acres set in sylvan surroundings.Provides an ideal ambience to stimulate the teaching-learning process, helping in bringing out skilled and disciplined Engineers. Rated one amongst the top ten self-financing Engineering Institutions in the country. Current annual student intake for Undergraduate Programmes & Post Graduate Programmes in Engineering is in excess of 1200. Highly qualified and dedicated faculty. Utilizes its expertise in various disciplines to conduct Research and Development for Industry and Defense establishments in the country.
            </div>
                <br />
                <h3>Vision</h3>
                <div>
                    Leadership in Quality Technical Education, Interdisciplinary Research & Innovation, with a Focus on Sustainable and Inclusive Technology.
            </div>
                <br />
                <h3>Mission</h3>
                <ul>
                    <li>To deliver outcome based Quality education, emphasizing on experiential learning with the state of the art infrastructure.</li>
                    <li>To create a conducive environment for interdisciplinary research and innovation.</li>
                    <li>To nurture industry-institution collaboration leading to competency enhancement and entrepreneurship.</li>
                    <li>To focus on technologies that are sustainable and inclusive, benefiting all sections of the society.</li>
                    <li>To develop professionals through holistic education focusing on individual growth, discipline, integrity, ethics and social sensitivity.</li>
                </ul>
                <br />
                <h3>Quality Policy</h3>
                <div>
                    Achieving Excellence in Technical Education, Research and Consulting through an Outcome Based Curriculum focusing on Continuous Improvement and Innovation by Benchmarking against the global Best Practices.
            </div>
                <br />
                <h3>Core Values</h3>
                <div>
                    Professionalism, Commitment, Integrity, Team Work, Innovation.
            </div>
                <br />
            </div>
        </>
    );
}

export default Home;