import React from 'react';

const ButtonContainer = props => {

    return (

        <div className="button-container">
            <button className="generate-button" onClick={props.onClickGenerateHandler}>Generate New Array</button>
            <button className="button" onClick={props.onClickMergeHandler}>Merge Sort</button>
            <button className="button" onClick={props.onClickBubbleHandler}>Bubble Sort</button>
            <button className="button" onClick={props.onClickQuickHandler}>Quick Sort</button>
        </div>


    );
}

export default ButtonContainer;