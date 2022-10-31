//Build a node factory
function Node(rootNode, leftChild = null, rightChild = null) {
    return {
        rootNode,
        leftChild,
        rightChild
    };
}
//Build a tree factory taking an array & returning level-0 root
function Tree(arr) {
    return {
        root0: buildTree(arr)
    };
}
//function turing an array into a BST
function buildTree (arr) {
    const preppedArr = removeDups(sortArr(arr));
    return buildTreeFromPreppedArr(preppedArr, 0, preppedArr.length - 1);
}

function sortArr(arr) {
    return arr.sort((a,b) => a - b);
}
function removeDups(arr) {
    let uniqueArr = [];
    arr.forEach(item => {
        if (!uniqueArr.includes(item)) {
            uniqueArr.push(item);
        }
    })
    return uniqueArr;
}
function buildTreeFromPreppedArr(sortedArr, firstInd, lastInd) {
    if (firstInd > lastInd) return null;
    let midIndex = parseInt((firstInd + lastInd)/2);
    let currentRoot = Node(sortedArr[midIndex]);
    currentRoot.leftChild = buildTreeFromPreppedArr(sortedArr, firstInd, midIndex - 1);
    currentRoot.rightChild = buildTreeFromPreppedArr(sortedArr, midIndex + 1, lastInd);
    return currentRoot;
}


const prettyPrint = (node, prefix = '', isLeft = true) => {
    if (node.rightChild !== null) {
        prettyPrint(node.rightChild, `${prefix}${isLeft ? '│   ' : '    '}`, false);
    }
    console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.rootNode}`);
    if (node.leftChild !== null) {
        prettyPrint(node.leftChild, `${prefix}${isLeft ? '    ' : '│   '}`, true);
    }
};

//Tests
const test1 = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
console.log(sortArr(test1)); // [1, 3, 4, 4, 5, 7, 7, 8, 9, 9, 23, 67, 324, 6345]
console.log(removeDups(test1)); //[1, 3, 4, 5, 7, 8, 9, 23, 67, 324, 6345]
const tree1 = Tree(test1); //
console.log(tree1); /*{
    root0: {
      rootNode: 8,
      leftChild: { rootNode: 4, leftChild: [Object], rightChild: [Object] },
      rightChild: { rootNode: 67, leftChild: [Object], rightChild: [Object] }
    }
  } */
console.log(prettyPrint(tree1.root0)); /* 
│           ┌── 6345
│       ┌── 324
│   ┌── 67
│   │   │   ┌── 23
│   │   └── 9
└── 8
    │       ┌── 7
    │   ┌── 5
    └── 4
        │   ┌── 3
        └── 1
*/



