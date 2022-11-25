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
//BFS graph
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
console.log(breadthFirst(graph1, 'a'));  // [ 'a', 'b', 'c', 'd', 'e', 'f' ]
