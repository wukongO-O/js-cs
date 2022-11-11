//Build a node factory
function Node(rootNode, leftChild = null, rightChild = null) {
    return {
        rootNode,
        leftChild,
        rightChild
    };
}
//Build a tree factory taking an array 
function Tree(arr) {
    const prettyPrint = (node, prefix = '', isLeft = true) => {
        if (node.rightChild !== null) {
            prettyPrint(node.rightChild, `${prefix}${isLeft ? '│   ' : '    '}`, false);
        }
        console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.rootNode}`);
        if (node.leftChild !== null) {
            prettyPrint(node.leftChild, `${prefix}${isLeft ? '    ' : '│   '}`, true);
        }
    };
    //to insert a value, using arrow functions 
    const insertVal = (obj, value) => { 
        const insertNode = Node(value);
        findNodeToInsert(obj, obj.root0, insertNode);
    };
    const findNodeToInsert = (obj, currentNode, insertNode) => {
        if (obj.root0 == null) {
            obj.root0 = insertNode;
        } else {
            if (currentNode.rootNode > insertNode.rootNode) {
                if (currentNode.leftChild == null) {
                    currentNode.leftChild = insertNode;
                } else {
                    findNodeToInsert(obj, currentNode.leftChild, insertNode);
                }
            } else if (currentNode.rootNode < insertNode.rootNode) {
                if (currentNode.rightChild == null) {
                    currentNode.rightChild = insertNode;
                } else {
                    findNodeToInsert(obj, currentNode.rightChild, insertNode);
                }
            }
        }
    };
    //to find a value, using function declaration
    function findVal(currentNode, value) {
        if (currentNode == null) return null;
        if (currentNode.rootNode == value) {
            return currentNode;
        } else if (currentNode.rootNode > value) {
            return findVal(currentNode.leftChild, value);
        } else {
            return findVal(currentNode.rightChild, value);
        }
    };
    //to traverse the tree in breadth-first level order, using iteration
    const levelOrder1 = (treeRoot) => {
        if (treeRoot == null) return null;
        let bstQueue = [treeRoot];
        let nodeArr = [treeRoot.rootNode];
        while (bstQueue != []) {
            let currentNode1 = bstQueue[0];
            if (currentNode1.leftChild != null) {
                bstQueue.push(currentNode1.leftChild);
            };
            if (currentNode1.rightChild != null) {
                bstQueue.push(currentNode1.rightChild);
            } else {
                return currentNode1;
            }
            bstQueue.shift();
            nodeArr.push(bstQueue[0].rootNode);
        }
        return nodeArr;
    }
    //using recursion 
    const levelOrder2 = () => {

    }

    return {
        root0: buildTree(arr),
        prettyPrint,
        insertVal,
        //function to delete a value, using 'this' to reference returned object
        deleteVal(root, value) {
            if (root == null) return null;
            if (root.rootNode > value) {
                this.deleteVal(root.leftChild, value);
            } else if (root.rootNode < value) {
                this.deleteVal(root.rightChild, value);
            } else {
                if (root.leftChild == null) {
                    return root = root.rightChild;
                } else if (root.rightChild == null) {
                    return root = root.leftChild;
                } else {
                    const maxLeftChild = this.findMaxLeftChild(root.leftChild);
                    root.rootNode = maxLeftChild.rootNode;
                    this.deleteVal(root.leftChild, maxLeftChild.rootNode);
                }
            }
            return root;
        },
        findMaxLeftChild(nodeL) {
            while (nodeL.rightChild != null) {
                nodeL = nodeL.rightChild;
            }
            return nodeL;
        },
        findVal,
        levelOrder1,
        levelOrder2
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

//Tests
const test1 = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
//console.log(sortArr(test1)); // [1, 3, 4, 4, 5, 7, 7, 8, 9, 9, 23, 67, 324, 6345]
//console.log(removeDups(test1)); //[1, 3, 4, 5, 7, 8, 9, 23, 67, 324, 6345]
const tree1 = Tree(test1); //
//console.log(tree1.root0); 
/*{
    root0: {
      rootNode: 8,
      leftChild: { rootNode: 4, leftChild: [Object], rightChild: [Object] },
      rightChild: { rootNode: 67, leftChild: [Object], rightChild: [Object] }
    }
  } */
//console.log(tree1.prettyPrint(tree1.root0));  
/* 
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
//tree1.insertVal(tree1, 10);
//console.log(tree1.prettyPrint(tree1.root0)); 
/*
│           ┌── 6345
│       ┌── 324
│   ┌── 67
│   │   │   ┌── 23
│   │   │   │   └── 10
│   │   └── 9
└── 8
    │       ┌── 7
    │   ┌── 5
    └── 4
        │   ┌── 3
        └── 1
*/
//console.dir(tree1.root0, {depth: null});
//console.log(tree1.findMaxLeftChild(tree1.root0.leftChild)); //{ rootNode: 7, leftChild: null, rightChild: null }
//tree1.deleteVal(tree1.root0, 67);
//console.dir(tree1.root0, {depth: null});
/*
{
  rootNode: 8,
  leftChild: {
    rootNode: 4,
    leftChild: {
      rootNode: 1,
      leftChild: null,
      rightChild: { rootNode: 3, leftChild: null, rightChild: null }
    },
    rightChild: {
      rootNode: 5,
      leftChild: null,
      rightChild: { rootNode: 7, leftChild: null, rightChild: null }
    }
  },
  rightChild: {
    rootNode: 23,
    leftChild: {
      rootNode: 9,
      leftChild: null,
      rightChild: { rootNode: 10, leftChild: null, rightChild: null }
    },
    rightChild: {
      rootNode: 324,
      leftChild: null,
      rightChild: { rootNode: 6345, leftChild: null, rightChild: null }
    }
  }
}
*/
//console.log(tree1.prettyPrint(tree1.root0));
/*
│           ┌── 6345
│       ┌── 324
│   ┌── 23
│   │   │   ┌── 10
│   │   └── 9
└── 8
    │       ┌── 7
    │   ┌── 5
    └── 4
        │   ┌── 3
        └── 1
*/
//console.log(tree1.findVal(tree1.root0, 9));
/*
{
  rootNode: 9,
  leftChild: null,
  rightChild: { rootNode: 23, leftChild: null, rightChild: null }
}
*/
console.log(tree1.levelOrder1(tree1.root0));