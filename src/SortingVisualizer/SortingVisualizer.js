import React, {useState, useEffect} from 'react';
import './SortingVisualizer.css';
import ButtonContainer from './Components/ButtonContainer';
import ArrayContainer from './Components/ArrayContainer';
import * as algorithmAnimations from './Animations/animations';

const NUMBER_OF_ARRAY_BARS = 250;


const SortingVisualizer = () => {
    // Holds initial randomized array
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


    // CLICK HANDLERS
    const onClickGenerateHandler = () => {
        resetArray();
    };

    const onClickQuickHandler = () => {
        algorithmAnimations.quickSort(barArray);
    }

    const onClickMergeHandler = () => {
        algorithmAnimations.mergeSort(barArray);
    }

    const onClickBubbleHandler = () => {
            algorithmAnimations.bubbleSort(barArray);
    }

    const onClickSelectionHandler = () => {
        algorithmAnimations.selectionSort(barArray);
    }

    const onClickHeapHandler = () => {
        algorithmAnimations.heapSort(barArray);
    }

    const onClickInsertionHandler = () => {
        algorithmAnimations.insertionSort(barArray);
    }

    const onClickCocktailHandler = () => {
        algorithmAnimations.cocktailSort(barArray);
    }
    
    const onClickRadixHandler = () => {
        algorithmAnimations.radixSort(barArray);
    }

    return (
        <div>
            <ButtonContainer
                onClickGenerateHandler={onClickGenerateHandler}
                onClickMergeHandler={onClickMergeHandler} 
                onClickBubbleHandler={onClickBubbleHandler}
                onClickQuickHandler={onClickQuickHandler}
                onClickSelectionHandler={onClickSelectionHandler}
                onClickHeapHandler={onClickHeapHandler}
                onClickInsertionHandler={onClickInsertionHandler}
                onClickCocktailHandler={onClickCocktailHandler}
                onClickRadixHandler={onClickRadixHandler}
            />
            <ArrayContainer barArray={barArray} />
        </div>
    );
}
export default SortingVisualizer;