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
    function findVal(root, value) {
        if (root == null) return null;
        if (root.rootNode == value) {
            return root;
        } else if (root.rootNode > value) {
            return findVal(root.leftChild, value);
        } else {
            return findVal(root.rightChild, value);
        }
    };
    //to traverse the tree in breadth-first level order, using iteration
    const levelOrder1 = (treeRoot) => {
        if (treeRoot == null) return null;
        let bstQueue = [treeRoot]; //create a queue with the bst tree's level-0 root node as the first item in the array
        let nodeArr = [];
        while (bstQueue.length != 0) {
            let currentNode1 = bstQueue[0]; //point to the 1st node item in queue
            nodeArr.push(currentNode1.rootNode); //add the 1st node's value to an array 
            if (currentNode1.leftChild != null) {
                bstQueue.push(currentNode1.leftChild);
            };
            if (currentNode1.rightChild != null) {
                bstQueue.push(currentNode1.rightChild);
            };
            bstQueue.shift(); //pop the 1st node from the queue, so its left child is lined up for the next iteration
        };
        return nodeArr;
    };
    //level-order traversal, using recursion 
    const levelOrder2 = (tree) => {
        let nodeVals = []; 
        levelOrderRec(tree.root0, 0, nodeVals);
        return nodeVals.join(',').split(',').map(Number); //join all array elements & turn each element from string to number
    };
    function levelOrderRec (currentNode, level, arr) {
        if (currentNode == null) return;
        if (arr[level]) { 
            arr[level].push(currentNode.rootNode); //for another node at the current level, add its value to the level's array element 
        } else {
            arr[level] = [currentNode.rootNode]; //create an array w 1st node value of current level & as an array element w the node's level as index, to eventually store node values of this level 
        }
        levelOrderRec(currentNode.leftChild, level+1, arr); 
        levelOrderRec(currentNode.rightChild, level+1, arr);  
    };
    //inorder traversal of bst, i.e. from left subtree to root to right subtree
    const inorder = (tree) => {
        let nodeVals = [];
        inOrderRec(tree.root0, nodeVals);
        return nodeVals;
    };
    function inOrderRec (currentNode, arr) {
        if (!currentNode) return;
        inOrderRec(currentNode.leftChild, arr);
        arr.push(currentNode.rootNode);
        inOrderRec(currentNode.rightChild, arr);
    };
    //traverse tree in depth-first preorder, i.e. from root to left branch to right branch
    const preorder = (tree) => {
        let nodeVals = [];
        preorderRec(tree.root0, nodeVals);
        return nodeVals;
    };
    function preorderRec (currentNode, arr) {
        if (!currentNode) return;
        arr.push(currentNode.rootNode); //recursively add value to the array from the root to the left child and then right child
        preorderRec(currentNode.leftChild, arr);
        preorderRec(currentNode.rightChild, arr);
    };
    //postorder traversal of bst, i.e. from left subtree to root to right subtree
    const postorder = (tree) => {
        let nodeVals = [];
        postorderRec(tree.root0, nodeVals);
        return nodeVals;
    };
    function postorderRec (currentNode, arr) {
        if (!currentNode) return;
        postorderRec(currentNode.leftChild, arr);
        postorderRec(currentNode.rightChild, arr);
        arr.push(currentNode.rootNode);
    };
    //returns a given node's height - the longest path from this node to a leaf
    const height = (node) => {
        if (node == null) return -1;
        let heightFromL = height(node.leftChild) + 1; 
        let heightFromR = height(node.rightChild) + 1;
        return Math.max(heightFromL, heightFromR); 
    };
    //returns a given node's depth - edgt #s from this node to the root 
    const depth = (node, root) => {
        if (!node || !root) return;
        let nodeDepth;
        if (node == root) {
            nodeDepth = 0;
        } else if (node.rootNode < root.rootNode) {
            nodeDepth = depth(node, root.leftChild) + 1;
        } else {
            nodeDepth = depth(node, root.rightChild) + 1;
        };
        return nodeDepth;
    };
    //checks if the tree is balanced & returns T/F 
    const isBanalanced = (root) => {
        if (!root) return;
        let leftHeight = height(root.leftChild);
        let rightHeight = height(root.rightChild);
        const heightDifference = leftHeight - rightHeight;
        return heightDifference >= -1 && heightDifference <= 1;  //tenary operator is omitted as the condition returns a boolean value
    };
    //rebalance an unblanced tree
    const rebalance = (root) => {
        if (isBanalanced == true) return;
        let newArr = [];
        inOrderRec(root, newArr);
        const newRoot = buildTree(newArr);
        return newRoot;
    };

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
        levelOrder2,
        inorder,
        preorder,
        postorder,
        height,
        depth,
        isBanalanced,
        rebalance
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

//TESTS
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
//console.log(tree1.levelOrder1(tree1.root0)); // [8,  4,   67, 1, 5,  9,  324, 3, 7, 23, 6345]
//console.log(tree1.levelOrder2(tree1)); // [8,  4,   67, 1, 5,  9,  324, 3, 7, 23, 6345]
//console.log(tree1.inorder(tree1)); // [1, 3, 4, 5,7, 8, 9, 23,67, 324, 6345]
//console.log(tree1.preorder(tree1)); //[8, 4, 1, 3, 5, 7, 67, 9, 23, 324, 6345]
//console.log(tree1.postorder(tree1)); //[3, 1, 7, 5, 4, 23, 9, 6345, 324, 67, 8]
//console.log(tree1.height(tree1.root0.leftChild));  //2
//console.log(tree1.depth(tree1.root0.rightChild.leftChild, tree1.root0)); //2
//console.log(tree1.isBanalanced(tree1.root0)); //true
tree1.insertVal(tree1, 30);
tree1.insertVal(tree1, 31);
//console.log(tree1.isBanalanced(tree1.root0)); //false
console.log(tree1.prettyPrint(tree1.rebalance(tree1.root0)));
/*
│           ┌── 6345
│       ┌── 324
│       │   └── 67
│   ┌── 31
│   │   │   ┌── 30
│   │   └── 23
└── 9
    │       ┌── 8
    │   ┌── 7
    │   │   └── 5
    └── 4
        │   ┌── 3
        └── 1
*/
const randomArr = (arrLength) => {
    let arr = [];
    for (let i = 0; i < arrLength; i++) {
        arr.push(Math.floor(Math.random()*10000));
    };
    return arr;
};
const test2 = randomArr(9);
const tree2 = Tree(test2);
console.log(tree2.prettyPrint(tree2.root0));
/*
│           ┌── 9369
│       ┌── 8341
│   ┌── 7813
│   │   └── 7411
└── 6831
    │       ┌── 6067
    │   ┌── 5173
    └── 2553
        └── 2342
/
console.log(tree2.isBanalanced(tree2.root0)); //true