import React, {useState, useEffect} from 'react';
import './SortingVisualizer.css';
import * as sortingAlgorithms from './sortingAlgorithms';
import ButtonContainer from './ButtonContainer';
import ArrayContainer from './ArrayContainer';

const ANIMATION_SPEED_MS = .01;
const NUMBER_OF_ARRAY_BARS = 250;
const SECONDARY_COLOR = 'yellow';
const finalColor = (height) => {
    const barHeight = parseInt(height.split("px")[0]);
    const multiplier = 1 - (barHeight / 510);
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
           let testArray = [];
        for (let a = 0; a < arrayBars.length; a++) {
            testArray.push(arrayBars[a].style.height);
        }
        console.log(testArray);
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
        for (let i = 0; i < animations.length; i++) {
        const arrayBars = document.getElementsByClassName('array-bar');
           const isColorChange = i % 3 !== 2;
           if (isColorChange) {
               const [barOneIdx, barTwoIdx] = animations[i];
               const barOneStyle = arrayBars[barOneIdx].style;
               const barTwoStyle = arrayBars[barTwoIdx].style;
               const color = SECONDARY_COLOR;
               setTimeout(() => {
                //    if (barOneStyle.backgroundColor === 'red') {
                       barOneStyle.backgroundColor = color;
                //    } else if (barTwoStyle.backgroundColor === 'red') {
                       barTwoStyle.backgroundColor = color;
                    // }
               }, i * ANIMATION_SPEED_MS);
           } else {
               const barOneIdx = animations[i][0];
               const barTwoIdx = animations[i][2];
               const barOneStyle = arrayBars[barOneIdx].style;
               const barTwoStyle = arrayBars[barTwoIdx].style;
               setTimeout(() => {
                //    if (barOneStyle.backgroundColor === 'yellow') {

                       barOneStyle.backgroundColor = 'red';
                //    } else if (barTwoStyle.backgroundColor === 'yellow') {

                       barTwoStyle.backgroundColor = 'red';
                //    }
                    // if (animations[i][1] !== 0) {
                        barOneStyle.height = `${animations[i][1]}px`;
                        barTwoStyle.height = `${animations[i][3]}px`;
                    // }
                   }, i * ANIMATION_SPEED_MS);
            }
            if (animations[i][4]) {
                setTimeout(() => {
                    const barOneIdx = animations[i][2];
                    // const barTwoIdx = animations[i][0];
                    const barOneStyle = arrayBars[barOneIdx].style;
                    // const barTwoStyle = arrayBars[barTwoIdx].style;
                    if (animations[i][3] > animations[i][1]) {
                        barOneStyle.backgroundColor = finalColor(barOneStyle.height);
                        // barTwoStyle.backgroundColor = finalColor(barTwoStyle.height);
                    }
                }, i * ANIMATION_SPEED_MS);
            }
                //    let testArray = [];
                    // for (let a = 0; a < arrayBars.length; a++) {
                    //     testArray.push(arrayBars[a].style.height);
                    // }
                //    const [barOneIdx, barTwoIdx] = animations[i];
                //    const barOneStyle = arrayBars[barOneIdx].style;
                //    const barTwoStyle = arrayBars[barTwoIdx].style;

                    // console.log(testArray);

                //    if (animations[i][0] < animations[i][1]) {
                //     console.log(animations[i]);
                //     console.log('anim', arrayBars[animations[i][0]].style.height, arrayBars[animations[i][1]].style.height);
                //        console.log("CHECK", barOneStyle.height, barTwoStyle.height)
                    //    console.log(arrayBars[animations[i][0]].style.height, arrayBars[animations[i][1]].style.height);
                        //    const temp = barOneStyle.height;
                        //    console.log(barOneStyle.height, barTwoStyle.height);
                        //    barOneStyle.height = barTwoStyle.height;
                        //    barTwoStyle.height = temp;
                        //    console.log(temp, barOneStyle.height, barTwoStyle.height);
                        //    console.log(barOneStyle.height, barTwoStyle.height);
                        //    barOneStyle.backgroundColor = 'red';
                        //    barTwoStyle.backgroundColor = finalColor(barTwoStyle.height);  
                //    } else {
                    // barTwoStyle.backgroundColor = 'red';
                    // barOneStyle.backgroundColor = finalColor(barTwoStyle.height);  
                   }
                const arrayBars = document.getElementsByClassName('array-bar');
                setTimeout(() => {

                    arrayBars[0].style.backgroundColor = finalColor(arrayBars[0].style.height);
                    console.log("DONE");
                }, animations.length * ANIMATION_SPEED_MS);
                // arrayBars[0].style.backgroundColor = finalColor(arrayBars[0].style.height);
                //    if (i === animations.length - 1) {
                    // barTwoStyle.backgroundColor = finalColor(barTwoStyle.height);
                    // barOneStyle.backgroundColor = finalColor(barOneStyle.height);  
                   
            //    }, i * ANIMATION_SPEED_MS);
           }
        
        // arrayBars[0].style.backgroundColor = finalColor(arrayBars[0].style.height);
    

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
                    console.log(animations[i]);
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

    const selectionSort = () => {
        let animations = [];
        animations = sortingAlgorithms.selectionSort(barArray, animations);
        const arrayBars = document.getElementsByClassName('array-bar');
        for (let i = 0; i < animations.length; i++) {
            if (animations[i].length === 1 && i !== animations.length - 1) {
                setTimeout(() => {

                    const barCurrentIdx = animations[i];
                    if (i > 0) {
                        const barPreviousStyle = arrayBars[barCurrentIdx - 1].style;
                        if (barPreviousStyle.backgroundColor === SECONDARY_COLOR) {
                            barPreviousStyle.backgroundColor = 'red';
                        }
                    }
                    const barCurrentStyle = arrayBars[barCurrentIdx].style;
                    barCurrentStyle.backgroundColor = SECONDARY_COLOR;
                }, i * ANIMATION_SPEED_MS);
                
            } else if (animations[i].length === 2) {
                setTimeout(() => {
                    const [barOneIdx, barTwoIdx] = animations[i];
                    const barOneStyle = arrayBars[barOneIdx].style;
                    const barTwoStyle = arrayBars[barTwoIdx].style;
                    const temp = barOneStyle.height;
                    barOneStyle.height = barTwoStyle.height;
                    barTwoStyle.height = temp;
                    barOneStyle.backgroundColor = finalColor(barOneStyle.height);
                }, i * ANIMATION_SPEED_MS);
            }
        }
    }

    const onClickGenerateHandler = () => {
        resetArray();
    };

    const onClickQuickHandler = () => {
        quickSort();
    }

    const onClickMergeHandler = () => {
        mergeSort();
    }

    const onClickBubbleHandler = () => {
            bubbleSort();
    }

    const onClickSelectionHandler = () => {
        selectionSort();
    }

    return (
        <div>
            <ButtonContainer
                onClickGenerateHandler={onClickGenerateHandler}
                onClickMergeHandler={onClickMergeHandler} 
                onClickBubbleHandler={onClickBubbleHandler}
                onClickQuickHandler={onClickQuickHandler}
                onClickSelectionHandler={onClickSelectionHandler}
            />
            <ArrayContainer barArray={barArray} />
        </div>
    );
}
// On Click Handlers
// const onClickGenerateHandler = (resetArray) => {
//    resetArray();
// };

// const onClickMergeHandler = (mergeSort) => {
//     mergeSort();
// }

// const onClickBubbleHandler = (bubbleSort) => {
//     bubbleSort();
// }

// const onClickQuickHandler = (quickSort) => {
//     quickSort();
// }

// const onClickSelectionHandler = (selectionSort) => {
//     selectionSort();
// }


// function randomIntFromInterval(min, max) {
//     // min and max are included
//     return Math.floor(Math.random() * (max - min + 1) + min);
// }


export default SortingVisualizer;