/**
 * PROBLEM: Graph Traversal
 * 
 * DESCRIPTION:
 * Implement DFS and BFS algorithms for graph traversal.
 * Handle both directed and undirected graphs.
 * 
 * APPLICATIONS:
 * - Finding connected components
 * - Detecting cycles  
 * - Pathfinding and shortest paths
 * - Social network analysis
 */

// Graph class
class Graph {
    constructor() {
        this.adjacentList = {};
    }
    
    addVertex(vertex) {
        if (!this.adjacentList[vertex]) {
            this.adjacentList[vertex] = [];
        }
    }
    
    addEdge(vertex1, vertex2) {
        this.addVertex(vertex1);
        this.addVertex(vertex2);
        this.adjacentList[vertex1].push(vertex2);
        this.adjacentList[vertex2].push(vertex1); // Undirected
    }
    
    getNeighbors(vertex) {
        return this.adjacentList[vertex] || [];
    }
    
    display() {
        console.log("Graph structure:");
        for (const vertex in this.adjacentList) {
            console.log(`  ${vertex} -> [${this.adjacentList[vertex].join(', ')}]`);
        }
    }
}

// DFS Recursive
function dfsRecursive(graph, start, visited = new Set(), path = []) {
    console.log(`DFS visiting: ${start}`);
    visited.add(start);
    path.push(start);
    
    const neighbors = graph.getNeighbors(start);
    for (const neighbor of neighbors) {
        if (!visited.has(neighbor)) {
            dfsRecursive(graph, neighbor, visited, path);
        }
    }
    
    return path;
}

// DFS Iterative
function dfsIterative(graph, start) {
    console.log(`DFS iterative from ${start}:`);
    const visited = new Set();
    const stack = [start];
    const path = [];
    
    while (stack.length > 0) {
        const current = stack.pop();
        
        if (!visited.has(current)) {
            visited.add(current);
            path.push(current);
            console.log(`  Visited: ${current}`);
            
            const neighbors = graph.getNeighbors(current);
            for (let i = neighbors.length - 1; i >= 0; i--) {
                if (!visited.has(neighbors[i])) {
                    stack.push(neighbors[i]);
                }
            }
        }
    }
    
    return path;
}

// BFS Implementation
function bfs(graph, start) {
    console.log(`BFS from ${start}:`);
    const visited = new Set();
    const queue = [start];
    const path = [];
    
    visited.add(start);
    
    while (queue.length > 0) {
        const current = queue.shift();
        path.push(current);
        console.log(`  Visited: ${current}`);
        
        const neighbors = graph.getNeighbors(current);
        for (const neighbor of neighbors) {
            if (!visited.has(neighbor)) {
                visited.add(neighbor);
                queue.push(neighbor);
            }
        }
    }
    
    return path;
}

// Shortest Path (BFS)
function shortestPath(graph, start, end) {
    console.log(`Finding shortest path from ${start} to ${end}:`);
    
    if (start === end) return [start];
    
    const visited = new Set();
    const queue = [start];
    const parent = { [start]: null };
    visited.add(start);
    
    while (queue.length > 0) {
        const current = queue.shift();
        
        const neighbors = graph.getNeighbors(current);
        for (const neighbor of neighbors) {
            if (!visited.has(neighbor)) {
                visited.add(neighbor);
                parent[neighbor] = current;
                queue.push(neighbor);
                
                if (neighbor === end) {
                    // Reconstruct path
                    const path = [];
                    let curr = end;
                    while (curr !== null) {
                        path.unshift(curr);
                        curr = parent[curr];
                    }
                    console.log(`  Path found: ${path.join(' -> ')}`);
                    return path;
                }
            }
        }
    }
    
    console.log(`  No path found`);
    return null;
}

// Test graph algorithms
console.log("=== Graph Traversal Testing ===");

const graph = new Graph();
graph.addEdge('A', 'B');
graph.addEdge('A', 'C');
graph.addEdge('B', 'D');
graph.addEdge('C', 'E');
graph.addEdge('D', 'E');

graph.display();

console.log("\n--- DFS Recursive ---");
const dfsRecPath = dfsRecursive(graph, 'A');
console.log(`Path: ${dfsRecPath.join(' -> ')}`);

console.log("\n--- DFS Iterative ---");
const dfsIterPath = dfsIterative(graph, 'A');
console.log(`Path: ${dfsIterPath.join(' -> ')}`);

console.log("\n--- BFS ---");
const bfsPath = bfs(graph, 'A');
console.log(`Path: ${bfsPath.join(' -> ')}`);

console.log("\n--- Shortest Path ---");
shortestPath(graph, 'A', 'E');

module.exports = { Graph, dfsRecursive, dfsIterative, bfs, shortestPath }; 