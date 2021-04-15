import React from 'react';
import Part from './Part';

const Content = (props) => {    
    return (
        <div>
            {
                props.parts.map(({name, exercises}) => {
                    return <Part key={name} partName={name} exerciseNumber={exercises} />;
                })
            }
        </div>
    );
};

export default Content;