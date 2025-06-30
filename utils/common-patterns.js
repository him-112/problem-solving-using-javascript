/**
 * COMMON ALGORITHM PATTERNS
 * 
 * This file contains reusable patterns and helper functions commonly used
 * in coding interviews and competitive programming.
 * 
 * CATEGORIES:
 * 1. Two Pointers Patterns
 * 2. Sliding Window Patterns  
 * 3. Binary Search Patterns
 * 4. Tree Traversal Patterns
 * 5. Graph Traversal Patterns
 * 6. Dynamic Programming Patterns
 * 7. Backtracking Patterns
 * 8. String Manipulation Patterns
 * 9. Mathematical Patterns
 * 10. Data Structure Utilities
 */

// ===== TWO POINTERS PATTERNS =====

/**
 * Two pointers: opposite direction (start and end)
 * Used for: palindromes, two sum, container problems
 */
function twoPointersOpposite(arr, condition) {
    let left = 0;
    let right = arr.length - 1;
    const results = [];
    
    while (left < right) {
        const result = condition(arr[left], arr[right], left, right);
        
        if (result.found) {
            results.push({ left, right, leftVal: arr[left], rightVal: arr[right] });
        }
        
        if (result.moveLeft) {
            left++;
        } else if (result.moveRight) {
            right--;
        } else {
            left++;
            right--;
        }
    }
    
    return results;
}

/**
 * Two pointers: same direction (fast and slow)
 * Used for: removing duplicates, cycle detection
 */
function twoPointersSameDirection(arr, shouldKeep) {
    let slow = 0;
    
    for (let fast = 0; fast < arr.length; fast++) {
        if (shouldKeep(arr[fast], fast)) {
            arr[slow] = arr[fast];
            slow++;
        }
    }
    
    return { newLength: slow, array: arr.slice(0, slow) };
}

/**
 * Floyd's Cycle Detection (Tortoise and Hare)
 * Used for: Linked list cycle detection, duplicate finding
 */
function floydsAlgorithm(getNext, start) {
    let slow = start;
    let fast = start;
    
    // Phase 1: Detect if cycle exists
    do {
        slow = getNext(slow);
        fast = getNext(getNext(fast));
    } while (slow !== fast);
    
    // Phase 2: Find cycle start
    let ptr = start;
    while (ptr !== slow) {
        ptr = getNext(ptr);
        slow = getNext(slow);
    }
    
    return ptr; // Start of cycle
}

// ===== SLIDING WINDOW PATTERNS =====

/**
 * Fixed size sliding window
 * Used for: maximum/minimum in subarray of size k
 */
function fixedSlidingWindow(arr, windowSize, operation) {
    if (arr.length < windowSize) return null;
    
    let windowSum = 0;
    
    // Calculate first window
    for (let i = 0; i < windowSize; i++) {
        windowSum += arr[i];
    }
    
    let bestResult = operation(windowSum, 0);
    
    // Slide the window
    for (let i = windowSize; i < arr.length; i++) {
        windowSum = windowSum - arr[i - windowSize] + arr[i];
        const currentResult = operation(windowSum, i - windowSize + 1);
        
        if (currentResult > bestResult) {
            bestResult = currentResult;
        }
    }
    
    return bestResult;
}

/**
 * Variable size sliding window
 * Used for: longest substring problems
 */
function variableSlidingWindow(arr, isValidWindow) {
    let left = 0;
    let maxLength = 0;
    let bestWindow = { start: 0, end: 0 };
    const windowState = new Map();
    
    for (let right = 0; right < arr.length; right++) {
        // Expand window
        const rightElement = arr[right];
        windowState.set(rightElement, (windowState.get(rightElement) || 0) + 1);
        
        // Contract window if needed
        while (!isValidWindow(windowState) && left <= right) {
            const leftElement = arr[left];
            windowState.set(leftElement, windowState.get(leftElement) - 1);
            if (windowState.get(leftElement) === 0) {
                windowState.delete(leftElement);
            }
            left++;
        }
        
        // Update best window
        const currentLength = right - left + 1;
        if (currentLength > maxLength) {
            maxLength = currentLength;
            bestWindow = { start: left, end: right };
        }
    }
    
    return { maxLength, window: bestWindow, subarray: arr.slice(bestWindow.start, bestWindow.end + 1) };
}

// ===== BINARY SEARCH PATTERNS =====

/**
 * Standard binary search
 */
function binarySearch(arr, target) {
    let left = 0;
    let right = arr.length - 1;
    
    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        
        if (arr[mid] === target) {
            return mid;
        } else if (arr[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    
    return -1;
}

/**
 * Binary search for first/last occurrence
 */
function binarySearchBounds(arr, target, findFirst = true) {
    let left = 0;
    let right = arr.length - 1;
    let result = -1;
    
    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        
        if (arr[mid] === target) {
            result = mid;
            if (findFirst) {
                right = mid - 1; // Continue searching left
            } else {
                left = mid + 1;  // Continue searching right
            }
        } else if (arr[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    
    return result;
}

/**
 * Binary Search on Answer
 * Used for: Minimize maximum, maximize minimum problems
 */
function binarySearchAnswer(minVal, maxVal, isValidAnswer) {
    let left = minVal;
    let right = maxVal;
    let bestAnswer = maxVal;
    
    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        
        if (isValidAnswer(mid)) {
            bestAnswer = mid;
            right = mid - 1; // Try to find better answer
        } else {
            left = mid + 1;
        }
    }
    
    return bestAnswer;
}

// ===== TREE TRAVERSAL PATTERNS =====

/**
 * Tree DFS - All Traversals
 * Used for: Tree processing, path finding
 */
function treeDFS(root, visitFunction, order = 'inorder') {
    const result = [];
    
    function traverse(node) {
        if (!node) return;
        
        if (order === 'preorder') visitFunction(node, result);
        
        traverse(node.left);
        
        if (order === 'inorder') visitFunction(node, result);
        
        traverse(node.right);
        
        if (order === 'postorder') visitFunction(node, result);
    }
    
    traverse(root);
    return result;
}

/**
 * Tree BFS (Level Order)
 * Used for: Level-wise processing, shortest path in trees
 */
function treeBFS(root, processLevel) {
    if (!root) return [];
    
    const queue = [root];
    const result = [];
    
    while (queue.length > 0) {
        const levelSize = queue.length;
        const currentLevel = [];
        
        for (let i = 0; i < levelSize; i++) {
            const node = queue.shift();
            currentLevel.push(node);
            
            if (node.left) queue.push(node.left);
            if (node.right) queue.push(node.right);
        }
        
        result.push(processLevel ? processLevel(currentLevel) : currentLevel);
    }
    
    return result;
}

/**
 * Path Sum Patterns
 * Used for: Finding paths with target sum
 */
function findPathsWithSum(root, targetSum, currentPath = [], allPaths = []) {
    if (!root) return allPaths;
    
    currentPath.push(root.val);
    
    // Check if leaf node and sum matches
    if (!root.left && !root.right && root.val === targetSum) {
        allPaths.push([...currentPath]);
    }
    
    // Recurse for children with reduced sum
    findPathsWithSum(root.left, targetSum - root.val, currentPath, allPaths);
    findPathsWithSum(root.right, targetSum - root.val, currentPath, allPaths);
    
    currentPath.pop(); // Backtrack
    return allPaths;
}

// ===== GRAPH TRAVERSAL PATTERNS =====

/**
 * Graph DFS
 * Used for: Connected components, cycle detection, topological sort
 */
function graphDFS(graph, startNode, visited = new Set(), processNode) {
    if (visited.has(startNode)) return;
    
    visited.add(startNode);
    if (processNode) processNode(startNode);
    
    const neighbors = graph[startNode] || [];
    for (const neighbor of neighbors) {
        graphDFS(graph, neighbor, visited, processNode);
    }
    
    return visited;
}

/**
 * Graph BFS
 * Used for: Shortest path, level-wise processing
 */
function graphBFS(graph, startNode, processNode) {
    const visited = new Set();
    const queue = [startNode];
    visited.add(startNode);
    
    while (queue.length > 0) {
        const node = queue.shift();
        if (processNode) processNode(node);
        
        const neighbors = graph[node] || [];
        for (const neighbor of neighbors) {
            if (!visited.has(neighbor)) {
                visited.add(neighbor);
                queue.push(neighbor);
            }
        }
    }
    
    return visited;
}

/**
 * Topological Sort (Kahn's Algorithm)
 * Used for: Dependency resolution, course scheduling
 */
function topologicalSort(graph, inDegree) {
    const queue = [];
    const result = [];
    
    // Find nodes with no incoming edges
    for (const node in inDegree) {
        if (inDegree[node] === 0) {
            queue.push(node);
        }
    }
    
    while (queue.length > 0) {
        const node = queue.shift();
        result.push(node);
        
        const neighbors = graph[node] || [];
        for (const neighbor of neighbors) {
            inDegree[neighbor]--;
            if (inDegree[neighbor] === 0) {
                queue.push(neighbor);
            }
        }
    }
    
    return result.length === Object.keys(graph).length ? result : null; // Cycle detected
}

// ===== DYNAMIC PROGRAMMING PATTERNS =====

/**
 * 1D DP Pattern
 * Used for: Fibonacci, climbing stairs, house robber
 */
function dp1D(n, baseCase, transition) {
    if (n <= 0) return baseCase(n);
    
    const dp = new Array(n + 1);
    
    // Initialize base cases
    for (let i = 0; i <= Math.min(n, 2); i++) {
        dp[i] = baseCase(i);
    }
    
    // Fill DP table
    for (let i = 3; i <= n; i++) {
        dp[i] = transition(dp, i);
    }
    
    return dp[n];
}

/**
 * 2D DP Pattern
 * Used for: Grid path counting, edit distance, LCS
 */
function dp2D(rows, cols, initValue, transition) {
    const dp = Array(rows).fill().map(() => Array(cols).fill(initValue));
    
    // Initialize first row and column if needed
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            if (i === 0 || j === 0) {
                dp[i][j] = initValue;
            }
        }
    }
    
    // Fill DP table
    for (let i = 1; i < rows; i++) {
        for (let j = 1; j < cols; j++) {
            dp[i][j] = transition(dp, i, j);
        }
    }
    
    return dp;
}

/**
 * Memoization Pattern
 * Used for: Top-down DP with recursion
 */
function memoize(fn) {
    const cache = new Map();
    
    return function(...args) {
        const key = JSON.stringify(args);
        
        if (cache.has(key)) {
            return cache.get(key);
        }
        
        const result = fn.apply(this, args);
        cache.set(key, result);
        return result;
    };
}

// ===== BACKTRACKING PATTERNS =====

/**
 * Generate All Combinations
 * Used for: Subset generation, combination problems
 */
function generateCombinations(arr, k, currentCombination = [], start = 0, allCombinations = []) {
    if (currentCombination.length === k) {
        allCombinations.push([...currentCombination]);
        return;
    }
    
    for (let i = start; i < arr.length; i++) {
        currentCombination.push(arr[i]);
        generateCombinations(arr, k, currentCombination, i + 1, allCombinations);
        currentCombination.pop(); // Backtrack
    }
    
    return allCombinations;
}

/**
 * Generate All Permutations
 * Used for: Arrangement problems, string permutations
 */
function generatePermutations(arr, currentPermutation = [], used = new Set(), allPermutations = []) {
    if (currentPermutation.length === arr.length) {
        allPermutations.push([...currentPermutation]);
        return;
    }
    
    for (let i = 0; i < arr.length; i++) {
        if (used.has(i)) continue;
        
        currentPermutation.push(arr[i]);
        used.add(i);
        
        generatePermutations(arr, currentPermutation, used, allPermutations);
        
        currentPermutation.pop(); // Backtrack
        used.delete(i);
    }
    
    return allPermutations;
}

// ===== STRING MANIPULATION PATTERNS =====

/**
 * KMP String Matching
 * Used for: Pattern searching in strings
 */
function kmpSearch(text, pattern) {
    function buildLPS(pattern) {
        const lps = new Array(pattern.length).fill(0);
        let len = 0;
        let i = 1;
        
        while (i < pattern.length) {
            if (pattern[i] === pattern[len]) {
                len++;
                lps[i] = len;
                i++;
            } else {
                if (len !== 0) {
                    len = lps[len - 1];
                } else {
                    lps[i] = 0;
                    i++;
                }
            }
        }
        
        return lps;
    }
    
    const lps = buildLPS(pattern);
    const matches = [];
    let i = 0; // text index
    let j = 0; // pattern index
    
    while (i < text.length) {
        if (pattern[j] === text[i]) {
            i++;
            j++;
        }
        
        if (j === pattern.length) {
            matches.push(i - j);
            j = lps[j - 1];
        } else if (i < text.length && pattern[j] !== text[i]) {
            if (j !== 0) {
                j = lps[j - 1];
            } else {
                i++;
            }
        }
    }
    
    return matches;
}

// ===== MATHEMATICAL PATTERNS =====

/**
 * Greatest Common Divisor
 */
function gcd(a, b) {
    while (b !== 0) {
        [a, b] = [b, a % b];
    }
    return a;
}

/**
 * Least Common Multiple
 */
function lcm(a, b) {
    return (a * b) / gcd(a, b);
}

/**
 * Fast exponentiation
 */
function fastPower(base, exponent, modulo = null) {
    let result = 1;
    base = base % (modulo || Number.MAX_SAFE_INTEGER);
    
    while (exponent > 0) {
        if (exponent % 2 === 1) {
            result = (result * base) % (modulo || Number.MAX_SAFE_INTEGER);
        }
        
        exponent = Math.floor(exponent / 2);
        base = (base * base) % (modulo || Number.MAX_SAFE_INTEGER);
    }
    
    return result;
}

// ===== UTILITY FUNCTIONS =====

/**
 * Array manipulation utilities
 */
const ArrayUtils = {
    // Swap elements at indices i and j
    swap: (arr, i, j) => {
        [arr[i], arr[j]] = [arr[j], arr[i]];
    },
    
    // Shuffle array in place
    shuffle: (arr) => {
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            ArrayUtils.swap(arr, i, j);
        }
        return arr;
    },
    
    // Rotate array by k positions
    rotate: (arr, k) => {
        k = k % arr.length;
        return [...arr.slice(k), ...arr.slice(0, k)];
    },
    
    // Find duplicates in array
    findDuplicates: (arr) => {
        const seen = new Set();
        const duplicates = new Set();
        
        for (const item of arr) {
            if (seen.has(item)) {
                duplicates.add(item);
            } else {
                seen.add(item);
            }
        }
        
        return Array.from(duplicates);
    }
};

/**
 * Performance measurement utility
 */
function measurePerformance(fn, ...args) {
    const start = performance.now();
    const result = fn(...args);
    const end = performance.now();
    
    return {
        result,
        timeMs: end - start,
        formatted: `${(end - start).toFixed(4)}ms`
    };
}

/**
 * Test case runner utility
 */
function runTestCases(testFunction, testCases, description = "Test") {
    console.log(`\n=== ${description} ===`);
    
    testCases.forEach((testCase, index) => {
        const { input, expected, description: desc } = testCase;
        
        try {
            const result = testFunction(...input);
            const passed = JSON.stringify(result) === JSON.stringify(expected);
            
            console.log(`Test ${index + 1}: ${desc || JSON.stringify(input)}`);
            console.log(`  Expected: ${JSON.stringify(expected)}`);
            console.log(`  Got: ${JSON.stringify(result)}`);
            console.log(`  ${passed ? '✅ PASS' : '❌ FAIL'}`);
        } catch (error) {
            console.log(`Test ${index + 1}: ${desc || JSON.stringify(input)}`);
            console.log(`  ❌ ERROR: ${error.message}`);
        }
    });
}

// Export all patterns and utilities
module.exports = {
    // Two Pointers
    twoPointersOpposite,
    twoPointersSameDirection,
    floydsAlgorithm,
    
    // Sliding Window
    fixedSlidingWindow,
    variableSlidingWindow,
    
    // Binary Search
    binarySearch,
    binarySearchBounds,
    binarySearchAnswer,
    
    // Tree Traversal
    treeDFS,
    treeBFS,
    findPathsWithSum,
    
    // Graph Traversal
    graphDFS,
    graphBFS,
    topologicalSort,
    
    // Dynamic Programming
    dp1D,
    dp2D,
    memoize,
    
    // Backtracking
    generateCombinations,
    generatePermutations,
    
    // String Manipulation
    kmpSearch,
    
    // Mathematical
    gcd,
    lcm,
    fastPower,
    
    // Utilities
    ArrayUtils,
    measurePerformance,
    runTestCases
};

/**
 * USAGE EXAMPLES:
 * 
 * // Two Pointers - Two Sum
 * const result = twoPointersOpposite([1,2,3,4,5], (left, right) => ({
 *     found: left + right === 7,
 *     moveLeft: left + right < 7,
 *     moveRight: left + right > 7
 * }));
 * 
 * // Sliding Window - Maximum subarray sum
 * const maxSum = fixedSlidingWindow([1,2,3,4,5], 3, (sum) => sum);
 * 
 * // Binary Search - Find element
 * const index = binarySearch([1,2,3,4,5], 3);
 * 
 * // Memoization - Fibonacci
 * const fibonacci = memoize((n) => n <= 1 ? n : fibonacci(n-1) + fibonacci(n-2));
 * 
 * // Performance measurement
 * const perf = measurePerformance(binarySearch, [1,2,3,4,5], 3);
 * console.log(`Result: ${perf.result}, Time: ${perf.formatted}`);
 */ 