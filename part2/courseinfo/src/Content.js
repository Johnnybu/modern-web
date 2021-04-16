import React from 'react';
import Part from './Part';

const Content = (props) => {    
    return (
        <div>
            {
                props.parts.map(({name, exercises, id}) => {
                    return <Part key={id} partName={name} exerciseNumber={exercises} />;
                })
            }
        </div>
    );
};

export default Content;