import React from 'react';

const ArrayContainer = props => {

    return (
        <div className="array-container">
            {props.barArray.map((num, idx) => {
                return (
                <div 
                    className="array-bar" 
                    key={idx}
                    style={{height: `${num}px`}}
                ></div>
                )
            })} 
        </div>
    );
}

export default ArrayContainer;