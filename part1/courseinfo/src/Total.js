import React from 'react';

const Total = (props) => {
    const total = props.parts.reduce((prev, cur) => {
        return prev + cur.exercises;
    }, 0);

    return (
        <p>
            Number of exercises {total}
        </p>
    );
};

export default Total;