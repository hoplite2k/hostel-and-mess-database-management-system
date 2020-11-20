import React from 'react';
import { Spinner } from 'react-bootsrtap';

const Loading = () => {
    return(
        <Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
        </Spinner>
    );
}

export default Loading;