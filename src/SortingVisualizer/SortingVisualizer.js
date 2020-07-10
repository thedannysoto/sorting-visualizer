import React, {useState, useEffect} from 'react';
import './SortingVisualizer.css';
import * as sortingAlgorithms from './sortingAlgorithms';
import ButtonContainer from './ButtonContainer';
import ArrayContainer from './ArrayContainer';

const ANIMATION_SPEED_MS = .5;
const NUMBER_OF_ARRAY_BARS = 250;
const SECONDARY_COLOR = 'yellow';
const finalColor = (height) => {
    const multiplier = 1 - (parseInt(height) / 510);
    const greenValue = Math.floor(255 * multiplier);
    return `rgb(0, ${greenValue}, 255)`;
};


const SortingVisualizer = props => {

    const [barArray, setBarArray] = useState([]);

    useEffect(() => resetArray(), []);

    const resetArray = () => {
        const array = [];
        setBarArray([]);

        for (let i = 5; i < ((NUMBER_OF_ARRAY_BARS * 2) + 6); i += 2){
            array.push(i);
        }

        for(let x = array.length-1; x > 0; x--){
            const y = Math.floor(Math.random() * x);
            const temp = array[x];
            array[x] = array[y];
            array[y] = temp;
        }

        setBarArray(array);
        const arrayBars = document.getElementsByClassName('array-bar');
        for (let x = 0; x < arrayBars.length; x++) {
            arrayBars[x].style.backgroundColor = 'red';
        }
    }

    // Algorithm Animations
    const mergeSort = () => {
        const animations = sortingAlgorithms.mergeSort(barArray);
        for (let i = 0; i < animations.length; i++) {
           const arrayBars = document.getElementsByClassName('array-bar');
           const isColorChange = i % 3 !== 2;
           if (isColorChange) {
               const [barOneIdx, barTwoIdx] = animations[i];
               const barOneStyle = arrayBars[barOneIdx].style;
               const barTwoStyle = arrayBars[barTwoIdx].style;
               if (i % 3 === 0) {
                    setTimeout(() => {
                        barOneStyle.backgroundColor = SECONDARY_COLOR;
                        barTwoStyle.backgroundColor = SECONDARY_COLOR;
                    }, i * ANIMATION_SPEED_MS);
               } else {
                   setTimeout(() => {
                       barOneStyle.backgroundColor = finalColor(barOneStyle.height);
                       barTwoStyle.backgroundColor = finalColor(barTwoStyle.height);

                   }, i * ANIMATION_SPEED_MS);
                } 
            } else {
               setTimeout(() => {
                   const [barOneIdx, newHeight] = animations[i];
                   const barOneStyle = arrayBars[barOneIdx].style;
                   barOneStyle.height = `${newHeight}px`;
                   barOneStyle.backgroundColor = finalColor(barOneStyle.height);
               }, i * ANIMATION_SPEED_MS);
           }
        }
    }

    const bubbleSort = () => {
        const animations = sortingAlgorithms.bubbleSort(barArray);
        const arrayBars = document.getElementsByClassName('array-bar');
        for (let i = 0; i < animations.length; i++) {
           const isColorChange = i % 3 !== 2;
           if (isColorChange) {
               const [barOneIdx, barTwoIdx] = animations[i];
               const barOneStyle = arrayBars[barOneIdx].style;
               const barTwoStyle = arrayBars[barTwoIdx].style;
               const color = SECONDARY_COLOR;
               setTimeout(() => {
                   barOneStyle.backgroundColor = color;
                   barTwoStyle.backgroundColor = color;
               }, i * ANIMATION_SPEED_MS);
           } else {
               setTimeout(() => {
                   const [barOneIdx, barTwoIdx] = animations[i];
                   const barOneStyle = arrayBars[barOneIdx].style;
                   const barTwoStyle = arrayBars[barTwoIdx].style;
                   if (animations[i][0] < animations[i][1]) {
                       const temp = barOneStyle.height;
                       barOneStyle.height = barTwoStyle.height;
                       barTwoStyle.height = temp;
                       barOneStyle.backgroundColor = 'red';
                       barTwoStyle.backgroundColor = finalColor(barTwoStyle.height);  
                   } else {
                    barTwoStyle.backgroundColor = 'red';
                    barOneStyle.backgroundColor = finalColor(barTwoStyle.height);  
                   }
                   if (i === animations.length - 1) {
                    barTwoStyle.backgroundColor = finalColor(barTwoStyle.height);
                    barOneStyle.backgroundColor = finalColor(barOneStyle.height);  
                   }
               }, i * ANIMATION_SPEED_MS);
           }
        }
        arrayBars[0].style.backgroundColor = finalColor(arrayBars[0].style.height);
    }

    const quickSort = () => {
        let animations = [];
        animations = sortingAlgorithms.quickSort(barArray, 0, barArray.length-1, animations);
        const arrayBars = document.getElementsByClassName('array-bar');
        for (let i = 0; i < animations.length; i++) {
            if (animations[i].length === 1) {
                // set pivot index and pivot bar to yellow
                setTimeout(() => {
                arrayBars[animations[i][0]].style.backgroundColor = SECONDARY_COLOR;
                }, i * ANIMATION_SPEED_MS);
            } else {
                // Set bars being switched to final blue color
                setTimeout(() => {
                const [barOneIdx, barTwoIdx] = animations[i];
                const barOneStyle = arrayBars[barOneIdx].style;
                const barTwoStyle = arrayBars[barTwoIdx].style;
                if (barOneStyle.height !== barTwoStyle.height) {
                    const temp = barOneStyle.height;
                    barOneStyle.height = barTwoStyle.height;
                    barTwoStyle.height = temp;
                }
                barOneStyle.backgroundColor = finalColor(barOneStyle.height);
                barTwoStyle.backgroundColor = finalColor(barTwoStyle.height);
                }, i * ANIMATION_SPEED_MS);
            }
        }
       
    }

    return (
        <div>
            <ButtonContainer
                onClickGenerateHandler={() => onClickGenerateHandler(resetArray)}
                onClickMergeHandler={() => onClickMergeHandler(mergeSort)} 
                onClickBubbleHandler={() => onClickBubbleHandler(bubbleSort)}
                onClickQuickHandler={() => onClickQuickHandler(quickSort)}
            />
            <ArrayContainer barArray={barArray} />
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

const onClickBubbleHandler = (bubbleSort) => {
    bubbleSort();
}

const onClickQuickHandler = (quickSort) => {
    quickSort();
}


// function randomIntFromInterval(min, max) {
//     // min and max are included
//     return Math.floor(Math.random() * (max - min + 1) + min);
// }


export default SortingVisualizer;