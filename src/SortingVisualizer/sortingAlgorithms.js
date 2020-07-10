// MERGE SORT
export function mergeSort(array) {
    const animations = [];
    if (array.length <= 1) return array;
    const auxArray = array.slice();
    mergeSortHelper(array, 0, array.length - 1, auxArray, animations);
    return animations;
}

function mergeSortHelper(
    mainArray,
    startIdx,
    endIdx,
    auxArray,
    animations
) {
    if (startIdx === endIdx) return;
    const middleIdx = Math.floor((startIdx + endIdx) / 2);
    mergeSortHelper(auxArray, startIdx, middleIdx, mainArray, animations);
    mergeSortHelper(auxArray, middleIdx + 1, endIdx, mainArray, animations);
    doMerge(mainArray, startIdx, middleIdx, endIdx, auxArray, animations); 
}

function doMerge(
    mainArray,
    startIdx,
    middleIdx,
    endIdx,
    auxArray,
    animations
) {
    let k = startIdx;
    let i = startIdx;
    let j = middleIdx + 1;
    while (i <= middleIdx && j <= endIdx ) {
        // compared values pushed to change color
        animations.push([i, j]);
        // compared values pushed again to change to 2nd color
        animations.push([i, j]);
        if (auxArray[i] <= auxArray[j]) {
            // overwrite value at index k in the original array with
            // the value at index i in the auxilary array
            animations.push([k, auxArray[i]]);
            mainArray[k++] = auxArray[i++];
        } else {
            // overwrite value at index k in the original array with
            // value at index j in the aux array
            animations.push([k, auxArray[j]]);
            mainArray[k++] = auxArray[j++];
        }
    }
    while (i <= middleIdx) {
        animations.push([i, i]);
        animations.push([i, i]);
        animations.push([k, auxArray[i]]);
        mainArray[k++] = auxArray[i++];
    }
    while(j <= endIdx) {
        animations.push([j, j]);
        animations.push([j, j]);
        animations.push([k, auxArray[j]]);
        mainArray[k++] = auxArray[j++];
    }
}

// BUBBLE SORT
export function bubbleSort(array) {
    const animations = [];
    for (let x = 0; x < array.length; x++) {
        for (let y = 0; y < array.length-x-1; y++) {
            animations.push([y, y+1]);
            animations.push([y, y+1]);
            if (array[y] > array[y+1]) {
                bubbleSwap(array, y, y+1);
                animations.push([y, y+1])
            } else {
                animations.push([y + 1, y]);
            }
        }
    }
    return animations;
}

function bubbleSwap(array, a, b) {
    let temp = array[a];
    array[a] = array[b];
    array[b] = temp;
}

// QUICK SORT
export function quickSort(arr, start, end, animations) {
    if(start >= end) return;
    
    let index = quickSortPartition(arr, start, end, animations);
    quickSort(arr, start, index - 1, animations);
    quickSort(arr, index + 1, end, animations);

    return animations;
}

function quickSortPartition(arr, start, end, animations) {
    let pivotIndex = start;
    animations.push([pivotIndex]);
    let pivotValue = arr[end];
    animations.push([end]);
    for (let i = start; i < end; i++) {
        if(arr[i] < pivotValue) {
            bubbleSwap(arr, i, pivotIndex)
            animations.push([i, pivotIndex])
            pivotIndex++;
            animations.push([pivotIndex]);
        }
    }
    bubbleSwap(arr, pivotIndex, end);
    animations.push([pivotIndex, end]);
    return pivotIndex;
}

// SELECTION SORT
export function selectionSort(arr, animations) {
    let index = 0;
    let returnArray = arr.slice();
    while (index < returnArray.length) {
        let min = returnArray[index];
        let minIndex = index;
        for (let x = index; x < returnArray.length; x++) {
            animations.push([x]);
            if (returnArray[x] < min) {
                min = returnArray[x];
                minIndex = x;
            }
        }
        animations.push([index, minIndex]);
        let temp = returnArray[index];
        returnArray[index] = returnArray[minIndex];
        returnArray[minIndex] = temp;
        index++;
    }
    return animations;
}


