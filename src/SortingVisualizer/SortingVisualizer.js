import React, {useState, useEffect} from 'react';
import './SortingVisualizer.css';
import ButtonContainer from './Components/ButtonContainer';
import ArrayContainer from './Components/ArrayContainer';
// import * as algorithmAnimations from './Animations/animations';

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

    return (
        <div>
            <ButtonContainer
                onClickGenerateHandler={onClickGenerateHandler}
                barArray={barArray}
            />
            <ArrayContainer barArray={barArray} />
        </div>
    );
}
export default SortingVisualizer;