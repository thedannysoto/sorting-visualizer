import React, {useState, useEffect} from 'react';
import './SortingVisualizer.css';
import * as sortingAlgorithms from './sortingAlgorithms';
import ButtonContainer from './ButtonContainer';

const ANIMATION_SPEED_MS = 3;
const NUMBER_OF_ARRAY_BARS = 300;
const PRIMARY_COLOR = 'red';
const SECONDARY_COLOR = 'white';
const FINAL_COLOR = 'blue';


const SortingVisualizer = props => {

    const [barArray, setBarArray] = useState([]);

    useEffect(() => resetArray(), []);

    const resetArray = () => {
        const array = [];
        for (let i = 0; i < NUMBER_OF_ARRAY_BARS; i++) {
            array.push(randomIntFromInterval(5, 500));
        }
        setBarArray(array);
        const arrayBars = document.getElementsByClassName('array-bar');
        for (let x = 0; x < arrayBars.length; x++) {
            arrayBars[x].style.backgroundColor = 'red';
        }
    }

    // Algorithms
    const mergeSort = () => {
        const animations = sortingAlgorithms.mergeSort(barArray);
        for (let i = 0; i < animations.length; i++) {
           const arrayBars = document.getElementsByClassName('array-bar');
           const isColorChange = i % 3 !== 2;
           if (isColorChange) {
               const [barOneIdx, barTwoIdx] = animations[i];
               const barOneStyle = arrayBars[barOneIdx].style;
               const barTwoStyle = arrayBars[barTwoIdx].style;
               const color = i % 3 === 0 ? SECONDARY_COLOR : FINAL_COLOR;
               setTimeout(() => {
                   barOneStyle.backgroundColor = color;
                   barTwoStyle.backgroundColor = color;
               }, i * ANIMATION_SPEED_MS);
           } else {
               setTimeout(() => {
                   const [barOneIdx, newHeight] = animations[i];
                   const barOneStyle = arrayBars[barOneIdx].style;
                   barOneStyle.height = `${newHeight}px`;
               }, i * ANIMATION_SPEED_MS);
           }
        }
    }

    return (
        <div>
            <ButtonContainer
                onClickGenerateHandler={() => onClickGenerateHandler(resetArray)}
                onClickMergeHandler={() => onClickMergeHandler(mergeSort)} 
            />
            <div className="array-container">
                {barArray.map((num, idx) => {
                    return (
                    <div 
                        className="array-bar" 
                        key={idx}
                        style={{height: `${num}px`}}
                    ></div>
                    )
                })} 
            </div>
        </div>
    );
}
// On Click Handlers
const onClickGenerateHandler = (resetArray) => {
   resetArray();
};

const onClickMergeHandler = (mergeSort) => {
    mergeSort();
}


function randomIntFromInterval(min, max) {
    // min and max are included
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function arraysAreEqual(arrayOne, arrayTwo) {
    if (arrayOne.length !== arrayTwo.length) return false;
    for (let i = 0; i < arrayOne.length; i++) {
        if (arrayOne[i] !== arrayTwo[i]) return false;
    }
    return true;
}

export default SortingVisualizer;