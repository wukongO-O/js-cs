//DFS directed graph via iteration
const depthFirstI = (graphAdjList, nodeKey) => {
    const stack = [nodeKey];
    const result = [];

    while (stack.length > 0) {
        const currentNode = stack.pop();
        result.push(currentNode);
        for (let neighbor of graphAdjList[currentNode]) {
            stack.push(neighbor);
        }
    };
    return result;

}
//DFS graph recursively

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
console.log(depthFirstI(graph, 'b')); //[ 'b', 'd', 'f' ]
console.log(depthFirstI(graph, 'a')); // [ 'a', 'c', 'e', 'b', 'd', 'f' ]