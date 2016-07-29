import React from 'react';
import Chance from 'chance';

class Detail extends React.Component {
    render() {
        return <p>
        {
            chance.first() == 'John'
            ?'Hello, John!'
            : 'Hello, world!'
        }
        </p>;
    }
}

export default Detail;

