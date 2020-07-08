import React, {useState, useEffect} from 'react';
import './SortingVisualizer.css';
import * as sortingAlgorithms from './sortingAlgorithms';
import ButtonContainer from './ButtonContainer';

const SortingVisualizer = props => {

    const [barArray, setBarArray] = useState([]);

    useEffect(() => resetArray(), []);

    const resetArray = () => {
        const array = [];
        for (let i = 0; i < 200; i++) {
            array.push(randomIntFromInterval(5, 500));
        }
        setBarArray(array);
    }

    // Algorithms
    const mergeSort = () => {
        const animations = sortingAlgorithms.mergeSort(barArray);
        for (let i = 0; i < animations.length; i++) {
            const {comparison, swap} = animations[i];
            setTimeout(() => {
                const arrayBars = document.getElementsByClassName('array-bar');
                arrayBars[comparison[1]].style.backgroundColor = 'green';
                arrayBars[comparison[0]].style.backgroundColor = 'green';
                setTimeout(() => {
                    // arrayBars[comparison[1]].style.backgroundColor = 'red';
                    // arrayBars[comparison[0]].style.backgroundColor = 'red';
                }, (i + 1) * 10);
            }, i * 10);
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