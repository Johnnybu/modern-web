import React from 'react';

const Total = (props) => {
    const total = props.parts.reduce((prev, cur) => {
        return prev + cur.exercises;
    }, 0);

    return (
        <p>
            <b>total of {total} exercises</b>
        </p>
    );
};

export default Total;