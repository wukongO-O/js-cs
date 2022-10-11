const Node = (rootNode, leftChild, rightChild) => {
    let node = {};
    node.rootNode = rootNode;
    node.leftChild = leftChild;
    node.rightChild = rightChild;
    return node;
};
const Tree = (arr) => {
    let tree = {arr};
    let root;
    
    const buildTree = (arr) => {
        const sortedArr = arr.sort();
        let newSortedArr = [];
        for (let i = 0; i < sortedArr.length; i++) {
            if (sortedArr[i] == sortedArr[i+1]) {
                return;
            } else {
                newSortedArr.push(sortedArr[i]);
            }
        }
        const midIndex = Math.round(newSortedArr.length/2);
        const leftArr = newSortedArr.slice(0, midIndex);
        const rightArr = newSortedArr.slice(midIndex, newSortedArr.length);
        buildTree(leftArr);
        buildTree(rightArr);
        root = newSortedArr[midIndex]
        return root;
    };
    //visualize bst
    const prettyPrint = (node, prefix = '', isLeft = true) => {
        node = root;
        if (node.right !== null) {
          prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
        }
        console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
        if (node.left !== null) {
          prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
        }
      }

    return tree;
};

const test1 = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
const tree1 = Tree(test1); 
//console.log(tree1.buildTree(tree1));
tree1.prettyPrint();
