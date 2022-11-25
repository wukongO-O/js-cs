//DFS directed graph via iteration
const depthFirstI = (graphAdjList, nodeKey) => {
    const stack = [nodeKey]; //a stack to store nodes
    let result = [];

    while (stack.length > 0) {
        const currentNode = stack.pop(); //LIFO
        result.push(currentNode);
        for (let neighbor of graphAdjList[currentNode]) {
            stack.push(neighbor);
        };
    };

    return result;
};

//DFS directed graph recursively
const depthFirstRec = (graphAdjList, nodeKey, result = []) => {
    result.push(nodeKey);

    for (let neighbor of graphAdjList[nodeKey]) {
        depthFirstRec(graphAdjList, neighbor, result);
    };

    return result;
};

//BFS directed graph
const breadthFirst = (graphAdjList, nodeKey) => {
    const queue = [nodeKey]; //a queue initiated with starting node's key to store nodes
    let result = [];

    while (queue.length > 0) {
        const currentNode = queue.shift(); //FIFO
        result.push(currentNode);
        for (let neighbor of graphAdjList[currentNode]) {
            queue.push(neighbor);
        };
    }

    return result;
};

// function to check if a path between node a & b exists in a directed graph: iteration / recursion
const hasPathI = (graphAdjList, nodeA, nodeB) => {
    const queue = [nodeA]; //use bfs

    while (queue.length > 0) {
        let currentNode = queue.shift();
        if (currentNode === nodeB) return true;
        for (let neighbor of graphAdjList[currentNode]) {
            queue.push(neighbor);
        }
    };

    return false;
}
const hasPahtRec = (graphAdjList, nodeA, nodeB) => {
    if (nodeA === nodeB) return true;

    for (let neighbor of graphAdjList[nodeA]) {
        if (hasPahtRec(graphAdjList, neighbor, nodeB) === true) return true;
    };
    
    return false;
};

//undirected graph 


//testing
const graph1 = {
    a: ['b', 'c'],
    b: ['d'],
    c: ['e'],
    d: ['f'],
    e: [],
    f: []
}
// console.log(depthFirstI(graph1, 'b')); //[ 'b', 'd', 'f' ]
// console.log(depthFirstI(graph1, 'a')); // [ 'a', 'c', 'e', 'b', 'd', 'f' ]
// console.log(depthFirstRec(graph1, 'a'));  //[ 'a', 'b', 'd', 'f', 'c', 'e' ]
// console.log(depthFirstRec(graph1, 'b'));  //[ 'b', 'd', 'f' ]
// console.log(breadthFirst(graph1, 'a'));  // [ 'a', 'b', 'c', 'd', 'e', 'f' ]
console.log(hasPathI(graph1, 'c', 'f'));  // false
console.log(hasPahtRec(graph1, 'c', 'f'));  // false
console.log(hasPahtRec(graph1, 'a', 'f'));  // true
