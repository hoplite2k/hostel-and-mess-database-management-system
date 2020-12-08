import React from 'react';
import { Carousel } from 'react-bootstrap';

const CarouselComp = () => {
    return (
        <>
            <Carousel>
                <Carousel.Item interval={3000}>
                    <img
                        className="d-block w-100 img-fit"
                        src={window.location.origin + "/images/Hostel1.JPG"}
                        alt="Sir M. Visweswaraiah Block"
                    />
                    <Carousel.Caption>
                        <h3 style={{ color: 'white' }}>Sir M. Visweswaraiah Block</h3>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item interval={3000}>
                    <img
                        className="d-block w-100 img-fit"
                        src={window.location.origin + "/images/Hostel2.JPG"}
                        alt="Diamond Jubilee Block"
                    />
                    <Carousel.Caption>
                        <h3 style={{ color: 'white' }}>Diamond Jubilee Block</h3>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item interval={3000}>
                    <img
                        className="d-block w-100 img-fit"
                        src={window.location.origin + "/images/Hostel3.JPG"}
                        alt="Chamundi Block"
                    />
                    <Carousel.Caption>
                        <h3 style={{ color: 'white' }}>Chamundi Block</h3>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
        </>
    );
}

export default CarouselComp;