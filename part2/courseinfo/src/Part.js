import React from 'react';

const Part = (props) => {
    return (
        <p>
            {props.partName} {props.exerciseNumber}
        </p>
    );
};

export default Part;