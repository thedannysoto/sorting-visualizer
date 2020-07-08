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




