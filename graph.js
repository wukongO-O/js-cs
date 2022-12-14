//notes from 'Graph Algorithms for Technical Interviews - Full Course'
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

//check if a path exists for 2 nodes in undirected graph, taking edge list as 1 of the arguments 
const undirectedGraphPath = (edgeList, nodeA, nodeB) => {
    const graphAdjList = adjList(edgeList);
    return hasUndirectedPath (graphAdjList, nodeA, nodeB, new Set());
};
const hasUndirectedPath = (graph, nodeA, nodeB, visited) => {
    if (nodeA === nodeB) return true;

    if (visited.has(nodeA)) return false;
    visited.add(nodeA);  //Set constructor to store visited nodes to void infite loop

    for (let neighbor of graph[nodeA]) {
        if (hasUndirectedPath(graph, neighbor, nodeB, visited) === true) return true;
    };

    return false;
};
const adjList = (edgeList) => {
    const graphAdjList = {};
    for (let edge of edgeList) {
        const [a, b] = edge;
        if (! (a in graphAdjList)) graphAdjList[a] = [];
        graphAdjList[a].push(b);
        if (! (b in graphAdjList)) graphAdjList[b] = [];
        graphAdjList[b].push(a);
    }
    return graphAdjList;
};

//count # of islands in the graph
const connectedComponentsCount = (graphAdjList) => {
    const visitedNodes = new Set();
    let count = 0;

    for (let node in graphAdjList) {
        if (visitIslandNodes(graphAdjList, node, visitedNodes) === true) {
            count += 1;
        }
    }

    return count;
};
const visitIslandNodes = (graph, currentNode, visited) => {
    if (visited.has(String(currentNode))) return false; //if already visited the node, skip to avoid infinit traversal
    visited.add(String(currentNode));

    for (let neighbor of graph[currentNode]) {
        visitIslandNodes(graph, neighbor, visited);
    };

    return true; //after done visiting all neighbors
};

//largest components
const largestIsland = (graphAdjList) => {
    const visitedNode = new Set();
    let largestOne = 1;
    
    for (let node in graphAdjList) {
        let currentSize = visitedIslandSize(graphAdjList, node, visitedNode);
        if (currentSize > largestOne) largestOne = currentSize;
    }

    return largestOne;
};
const visitedIslandSize = (graphAdjList, currentNode, visited) => {
    if (visited.has(currentNode)) return 0;
    visited.add(currentNode);
    let islandSize = 1;
    
    for (let neighbor of graphAdjList[currentNode]) {
        islandSize += visitedIslandSize(graphAdjList, neighbor, visited);
    }

    return islandSize;
};

//shortest path - bfs
const shortestPath = (edgeList, nodeA, nodeB) => {
    const graphAdjList = adjList(edgeList);
    const visitedNodes = new Set([nodeA]); 
    let queue = [[nodeA, 0]];
    while (queue.length > 0) {
        const [currentNode, edges] = queue.shift();

        if (currentNode === nodeB) return edges;
        //keep searching if above condition wasn't met
        for (let neighbor of graphAdjList[currentNode]) {
            if (! visitedNodes.has(neighbor)) {
                visitedNodes.add(neighbor);
                queue.push([neighbor, edges + 1]);
            }
        }
    }

    return -1; //if no path is found 
};

//island count - dfs
const islandCount = (grid) => {
    const visitedNodes = new Set();
    let count = 0;
    for (let row = 0; row < grid.length; row++) {
        for (let col = 0; col < grid[0].length; col++) {
            if (visitedIsland(grid, row, col, visitedNodes) === true) count +=1;
        }
    }

    return count;
}
const visitedIsland = (grid, row, col, visited) => {
    const rowInbounds = 0 <= row && row < grid.length; //store the inbounds conditions to 2 boolean variables
    const columnInbounds = 0 <= col && col < grid[0].length;
    if (! rowInbounds || ! columnInbounds) return false; //forming 1 out-of-bounds base case 

    if (grid[row][col] === 'W') return false;

    const gridCell = row + ',' + col;
    if (visited.has(gridCell)) return false;
    visited.add(gridCell);
    //dfs recursively for all 4 neighbors, if they pass all above conditions
    visitedIsland(grid, row + 1, col, visited);
    visitedIsland(grid, row - 1, col, visited);
    visitedIsland(grid, row, col + 1, visited);
    visitedIsland(grid, row, col - 1, visited);

    return true;
};
//class Graph

//TEST
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
// console.log(hasPathI(graph1, 'c', 'f'));  // false
// console.log(hasPahtRec(graph1, 'c', 'f'));  // false
// console.log(hasPahtRec(graph1, 'a', 'f'));  // true

const edges1 = [
    ['i', 'j'],
    ['k', 'i'],
    ['m', 'k'],
    ['k', 'l'],
    ['o', 'n']
];
// console.log(undirectedGraphPath(edges1, 'j', 'm')); //true
// console.log(undirectedGraphPath(edges1, 'k', 'n')); //false

const graph2 = {
    0: ['8', '1', '5'],
    1: ['0'],
    5: ['0', '8'],
    8: ['0', '5'],
    2: ['3', '4'],
    3: ['2', '4'],
    4: ['3', '2']
}
// console.log(connectedComponentsCount(graph2)); //2
// console.log(largestIsland(graph2)); //4
// console.log(shortestPath(edges1, 'i', 'l')); //2

const grid1 = [
    ['W', 'L', 'W', 'W', 'W'],
    ['W', 'L', 'W', 'W', 'W'],
    ['W', 'W', 'W', 'L', 'W'],
    ['W', 'W', 'L', 'L', 'W'],
    ['L', 'W', 'W', 'L', 'L'],
    ['L', 'L', 'W', 'W', 'W'],
];
console.log(islandCount(grid1)); //3