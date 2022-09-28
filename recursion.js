//iteration to return fibonacci #s as array
function fibs(n) {
    if (n<=0) {
        return []
    } else if (n===1) {
        return [0];
    } else if (n===2) {
        return [0, 1];
    } else {
        let fibArray = [0, 1];
        let fibN;
        for (let i = 2; i <n; i++) {
            fibN = fibArray[i-1] + fibArray[i-2];
            fibArray.push(fibN);
        }
        return fibArray;
    }
}
console.log(fibs(0));
console.log(fibs(1));
console.log(fibs(8));
//recursive method 
function fibsRec(n) {
    if (n<=0) {
        return [];
    } else if (n===1) {
        return [0];
    } else if (n===2) {
        return [0, 1];
    } else {
        let fibArr = fibsRec(n-1);
        let fibNum = fibArr[n-2] + fibArr[n-3];
        fibArr.push(fibNum);
        return fibArr;
    }
}
console.log(fibsRec(0));
console.log(fibsRec(1));
console.log(fibsRec(8));