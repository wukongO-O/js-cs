//DFS directed graph via iteration
const depthFirstI = (graphAdjList, nodeKey) => {
    const stack = [nodeKey]; //a stack to store nodes
    const result = [];

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

//testing
const graph = {
    a: ['b', 'c'],
    b: ['d'],
    c: ['e'],
    d: ['f'],
    e: [],
    f: []
}
// console.log(depthFirstI(graph, 'b')); //[ 'b', 'd', 'f' ]
// console.log(depthFirstI(graph, 'a')); // [ 'a', 'c', 'e', 'b', 'd', 'f' ]
console.log(depthFirstRec(graph, 'a'));  //[ 'a', 'b', 'd', 'f', 'c', 'e' ]
console.log(depthFirstRec(graph, 'b'));  //[ 'b', 'd', 'f' ]
