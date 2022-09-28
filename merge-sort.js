function mergeSort(arr) {
    const n = arr.length;
    if(n <= 1) {
        return arr;
    } else {
        const m = Math.round(n / 2);
        const arrL = mergeSort(arr.slice(0, m));
        const arrR = mergeSort(arr.slice(m));
        
        let i = 0;
        let j = 0;
        let arrMerge = [];
        while (i < arrL.length && j < arrR.length) {
            if (arrL[i] < arrR[j]) {
                arrMerge.push(arrL[i]);
                i++;
            } else {
                arrMerge.push(arrR[j]);
                j++;
            }
        }
        if (j <= i) {
            while (j < arrR.length) {
                arrMerge.push(arrR[j]);
                j++;
            }
        } else {
            while (i < arrL.length) {
                arrMerge.push(arrL[i]);
                i++;
            }
        };
        return arrMerge;
    }
}
const arr1 = [2, 4, 3, 5, 19, 10, 9];
const arr2 = [3, 2, 5, 8, 7];
const arr3 = [3]
console.log(mergeSort(arr1));
console.log(mergeSort(arr2));
console.log(mergeSort(arr3));