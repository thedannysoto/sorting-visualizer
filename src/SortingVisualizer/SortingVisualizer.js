import React, {useState, useEffect} from 'react';
import './SortingVisualizer.css';
import * as sortingAlgorithms from './sortingAlgorithms';
import ButtonContainer from './ButtonContainer';
import ArrayContainer from './ArrayContainer';

const ANIMATION_SPEED_MS = .1;
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

    // ALGORITHM ANIMATIONS
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
            const barOneIdx = animations[i][0];
            const barTwoIdx = animations[i][2];
            const isColorChange = i % 2 !== 1;
            // Color change for yellow bars
            if (isColorChange) {
                const [firstBarIdx, secondBarIdx] = animations[i];
                const firstBarStyle = arrayBars[firstBarIdx].style;
                const secondBarStyle = arrayBars[secondBarIdx].style;
                const color = SECONDARY_COLOR;
                setTimeout(() => {
                    firstBarStyle.backgroundColor = color;
                    secondBarStyle.backgroundColor = color;
                }, i * ANIMATION_SPEED_MS);
            // Color change back to red and switch bar heights
            } else {
                setTimeout(() => {
                    const barOneStyle = arrayBars[barOneIdx].style;
                    const barTwoStyle = arrayBars[barTwoIdx].style;
                    barOneStyle.backgroundColor = 'red';
                    barTwoStyle.backgroundColor = 'red';
                    barOneStyle.height = `${animations[i][1]}px`;
                    barTwoStyle.height = `${animations[i][3]}px`;
                }, i * ANIMATION_SPEED_MS);
            }
            // Color change to blue if it's the final bar
            if (animations[i][4]) {
                setTimeout(() => {
                    const barTwoStyle = arrayBars[barTwoIdx].style;
                    barTwoStyle.backgroundColor = finalColor(barTwoStyle.height);
                }, i * ANIMATION_SPEED_MS);
            }
        }
        // Color change smallest bar to blue at the end
        const arrayBars = document.getElementsByClassName('array-bar');
        setTimeout(() => {
            arrayBars[0].style.backgroundColor = finalColor(arrayBars[0].style.height);
        }, animations.length * ANIMATION_SPEED_MS);
                
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
                    console.log(animations[i]);
                    const barOneIdx = animations[i][0];
                    const barTwoIdx = animations[i][2];
                    const barOneStyle = arrayBars[barOneIdx].style;
                    const barTwoStyle = arrayBars[barTwoIdx].style;
                    if (animations[i][4]) {
                        barOneStyle.height = `${animations[i][1]}px`;
                        barTwoStyle.height = `${animations[i][3]}px`;
                    } else if (animations[i][1] !== animations[i][3]) {
                        barOneStyle.height = `${animations[i][1]}px`;
                        // barOneStyle.height = barTwoStyle.height;
                        barTwoStyle.height = `${animations[i][3]}px`;
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
                    // Set previous bar back to red
                    if (i > 0) {
                        const barPreviousStyle = arrayBars[barCurrentIdx - 1].style;
                        if (barPreviousStyle.backgroundColor === SECONDARY_COLOR) {
                            barPreviousStyle.backgroundColor = 'red';
                        }
                    }
                    // Set current bar to yellow
                    const barCurrentStyle = arrayBars[barCurrentIdx].style;
                    barCurrentStyle.backgroundColor = SECONDARY_COLOR;
                }, i * ANIMATION_SPEED_MS);
              // Switch bar heights and set lowest height to final blue color  
            } else if (animations[i].length === 4) {
                setTimeout(() => {
                    const barOneIdx = animations[i][0];
                    const barTwoIdx = animations[i][2];
                    const barOneStyle = arrayBars[barOneIdx].style;
                    const barTwoStyle = arrayBars[barTwoIdx].style;
                    barOneStyle.height = `${animations[i][3]}px`;
                    barTwoStyle.height = `${animations[i][1]}px`;
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
export default SortingVisualizer;