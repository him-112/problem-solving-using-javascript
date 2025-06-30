/**
 * PROBLEM: Intermediate Recursion Algorithms
 * 
 * DESCRIPTION:
 * Advanced recursive techniques for algorithmic problem solving.
 * Covers divide and conquer, tree recursion, and optimization techniques.
 * 
 * KEY CONCEPTS:
 * - Divide and conquer paradigm
 * - Tree recursion patterns
 * - Memoization for optimization
 * - Backtracking fundamentals
 * - Recursive data structure manipulation
 * 
 * EXAMPLES:
 * Quick Sort, Merge Sort, Tree Traversals, Permutations
 */

// Method 1: Merge Sort (Divide and Conquer)
function mergeSort(arr) {
    /**
     * APPROACH: Divide array into halves, recursively sort, then merge
     * Classic divide and conquer algorithm
     * 
     * TIME COMPLEXITY: O(n log n)
     * SPACE COMPLEXITY: O(n)
     */
    
    console.log(`mergeSort([${arr.join(',')}]) called`);
    
    // Base case
    if (arr.length <= 1) {
        console.log(`  Base case: array length ${arr.length}`);
        return arr;
    }
    
    // Divide
    const mid = Math.floor(arr.length / 2);
    const left = arr.slice(0, mid);
    const right = arr.slice(mid);
    
    console.log(`  Dividing: left=[${left.join(',')}], right=[${right.join(',')}]`);
    
    // Conquer
    const sortedLeft = mergeSort(left);
    const sortedRight = mergeSort(right);
    
    // Combine
    const result = merge(sortedLeft, sortedRight);
    console.log(`  Merged result: [${result.join(',')}]`);
    return result;
    
    function merge(left, right) {
        const result = [];
        let i = 0, j = 0;
        
        while (i < left.length && j < right.length) {
            if (left[i] <= right[j]) {
                result.push(left[i++]);
            } else {
                result.push(right[j++]);
            }
        }
        
        return result.concat(left.slice(i)).concat(right.slice(j));
    }
}

// Method 2: Quick Sort (Divide and Conquer)
function quickSort(arr, low = 0, high = arr.length - 1) {
    /**
     * APPROACH: Choose pivot, partition around it, recursively sort partitions
     * In-place sorting algorithm
     * 
     * TIME COMPLEXITY: O(n log n) average, O(n²) worst case
     * SPACE COMPLEXITY: O(log n) average
     */
    
    console.log(`quickSort([${arr.join(',')}], ${low}, ${high}) called`);
    
    if (low < high) {
        // Partition and get pivot index
        const pivotIndex = partition(arr, low, high);
        console.log(`  Pivot at index ${pivotIndex}, value: ${arr[pivotIndex]}`);
        
        // Recursively sort elements before and after partition
        quickSort(arr, low, pivotIndex - 1);
        quickSort(arr, pivotIndex + 1, high);
    }
    
    return arr;
    
    function partition(arr, low, high) {
        const pivot = arr[high]; // Choose last element as pivot
        let i = low - 1; // Index of smaller element
        
        console.log(`    Partitioning with pivot: ${pivot}`);
        
        for (let j = low; j < high; j++) {
            if (arr[j] <= pivot) {
                i++;
                [arr[i], arr[j]] = [arr[j], arr[i]];
                console.log(`      Swapped ${arr[j]} and ${arr[i]}`);
            }
        }
        
        [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
        console.log(`    Final partition: [${arr.join(',')}]`);
        return i + 1;
    }
}

// Method 3: Generate All Permutations
function generatePermutations(arr) {
    /**
     * APPROACH: For each element, generate permutations of remaining elements
     * Classic backtracking problem
     * 
     * TIME COMPLEXITY: O(n!)
     * SPACE COMPLEXITY: O(n!) for storing results
     */
    
    console.log(`generatePermutations([${arr.join(',')}]) called`);
    
    const result = [];
    
    function backtrack(current, remaining) {
        console.log(`  backtrack([${current.join(',')}], [${remaining.join(',')}])`);
        
        // Base case: no more elements to choose
        if (remaining.length === 0) {
            result.push([...current]);
            console.log(`    Added permutation: [${current.join(',')}]`);
            return;
        }
        
        // Try each remaining element
        for (let i = 0; i < remaining.length; i++) {
            const element = remaining[i];
            const newRemaining = remaining.filter((_, index) => index !== i);
            
            current.push(element);
            console.log(`    Choosing ${element}, current: [${current.join(',')}]`);
            
            backtrack(current, newRemaining);
            
            current.pop(); // Backtrack
            console.log(`    Backtracking, removed ${element}`);
        }
    }
    
    backtrack([], arr);
    console.log(`  Total permutations: ${result.length}`);
    return result;
}

// Method 4: Generate All Subsets (Power Set)
function generateSubsets(arr) {
    /**
     * APPROACH: For each element, choose to include it or not
     * Binary choice at each level
     * 
     * TIME COMPLEXITY: O(2^n)
     * SPACE COMPLEXITY: O(2^n)
     */
    
    console.log(`generateSubsets([${arr.join(',')}]) called`);
    
    const result = [];
    
    function backtrack(index, current) {
        console.log(`  backtrack(${index}, [${current.join(',')}])`);
        
        // Base case: processed all elements
        if (index === arr.length) {
            result.push([...current]);
            console.log(`    Added subset: [${current.join(',')}]`);
            return;
        }
        
        // Choice 1: Don't include current element
        console.log(`    Not including ${arr[index]}`);
        backtrack(index + 1, current);
        
        // Choice 2: Include current element
        current.push(arr[index]);
        console.log(`    Including ${arr[index]}`);
        backtrack(index + 1, current);
        current.pop(); // Backtrack
    }
    
    backtrack(0, []);
    console.log(`  Total subsets: ${result.length}`);
    return result;
}

// Method 5: Tower of Hanoi
function towerOfHanoi(n, source = 'A', destination = 'C', auxiliary = 'B') {
    /**
     * APPROACH: Move n-1 disks to auxiliary, move largest to destination,
     * move n-1 disks from auxiliary to destination
     * 
     * TIME COMPLEXITY: O(2^n)
     * SPACE COMPLEXITY: O(n) - recursion stack
     */
    
    console.log(`towerOfHanoi(${n}, ${source}, ${destination}, ${auxiliary}) called`);
    
    const moves = [];
    
    function solve(n, from, to, via) {
        if (n === 1) {
            const move = `Move disk 1 from ${from} to ${to}`;
            moves.push(move);
            console.log(`  ${move}`);
            return;
        }
        
        // Move n-1 disks from source to auxiliary
        console.log(`  Moving ${n-1} disks from ${from} to ${via}`);
        solve(n - 1, from, via, to);
        
        // Move largest disk from source to destination
        const move = `Move disk ${n} from ${from} to ${to}`;
        moves.push(move);
        console.log(`  ${move}`);
        
        // Move n-1 disks from auxiliary to destination
        console.log(`  Moving ${n-1} disks from ${via} to ${to}`);
        solve(n - 1, via, to, from);
    }
    
    solve(n, source, destination, auxiliary);
    console.log(`  Total moves: ${moves.length}`);
    return moves;
}

// Method 6: Combination Sum
function combinationSum(candidates, target) {
    /**
     * APPROACH: Try each candidate, subtract from target, recurse
     * Allow reuse of candidates
     * 
     * TIME COMPLEXITY: O(2^target)
     * SPACE COMPLEXITY: O(target) - recursion depth
     */
    
    console.log(`combinationSum([${candidates.join(',')}], ${target}) called`);
    
    const result = [];
    candidates.sort((a, b) => a - b); // Sort for optimization
    
    function backtrack(start, current, remaining) {
        console.log(`  backtrack(${start}, [${current.join(',')}], ${remaining})`);
        
        // Base case: found valid combination
        if (remaining === 0) {
            result.push([...current]);
            console.log(`    Found combination: [${current.join(',')}]`);
            return;
        }
        
        // Base case: impossible to reach target
        if (remaining < 0) {
            console.log(`    Remaining ${remaining} < 0, backtracking`);
            return;
        }
        
        // Try each candidate from start index
        for (let i = start; i < candidates.length; i++) {
            const candidate = candidates[i];
            
            // Optimization: if candidate > remaining, skip rest
            if (candidate > remaining) {
                console.log(`    ${candidate} > ${remaining}, stopping`);
                break;
            }
            
            current.push(candidate);
            console.log(`    Trying ${candidate}, current: [${current.join(',')}]`);
            
            // Use same index to allow reuse
            backtrack(i, current, remaining - candidate);
            
            current.pop(); // Backtrack
        }
    }
    
    backtrack(0, [], target);
    console.log(`  Found ${result.length} combinations`);
    return result;
}

// Method 7: Binary Tree Maximum Depth
function maxDepth(root) {
    /**
     * APPROACH: Recursively find max depth of left and right subtrees
     * Add 1 for current node
     * 
     * TIME COMPLEXITY: O(n) where n is number of nodes
     * SPACE COMPLEXITY: O(h) where h is height of tree
     */
    
    console.log(`maxDepth called for node: ${root ? root.val : 'null'}`);
    
    // Base case: empty tree
    if (!root) {
        console.log(`  Base case: null node, depth = 0`);
        return 0;
    }
    
    // Recursive case
    const leftDepth = maxDepth(root.left);
    const rightDepth = maxDepth(root.right);
    
    const depth = Math.max(leftDepth, rightDepth) + 1;
    console.log(`  Node ${root.val}: leftDepth=${leftDepth}, rightDepth=${rightDepth}, depth=${depth}`);
    
    return depth;
}

// Method 8: Memoized Fibonacci (Optimization)
function fibonacciMemo(n, memo = new Map()) {
    /**
     * APPROACH: Store computed results to avoid redundant calculations
     * Convert exponential to linear time complexity
     * 
     * TIME COMPLEXITY: O(n)
     * SPACE COMPLEXITY: O(n)
     */
    
    console.log(`fibonacciMemo(${n}) called`);
    
    // Base cases
    if (n <= 1) {
        console.log(`  Base case: fib(${n}) = ${n}`);
        return n;
    }
    
    // Check memo
    if (memo.has(n)) {
        const cached = memo.get(n);
        console.log(`  Cache hit: fib(${n}) = ${cached}`);
        return cached;
    }
    
    // Compute and store
    const result = fibonacciMemo(n - 1, memo) + fibonacciMemo(n - 2, memo);
    memo.set(n, result);
    console.log(`  Computed and cached: fib(${n}) = ${result}`);
    
    return result;
}

// Helper class for binary tree
class TreeNode {
    constructor(val, left = null, right = null) {
        this.val = val;
        this.left = left;
        this.right = right;
    }
}

// Test all recursive algorithms
function testRecursiveAlgorithms() {
    console.log("=== Testing Intermediate Recursion ===");
    
    // Test sorting algorithms
    console.log("\n--- Divide and Conquer Sorting ---");
    const unsorted = [64, 34, 25, 12, 22, 11];
    console.log(`Original: [${unsorted.join(',')}]`);
    
    const mergeSorted = mergeSort([...unsorted]);
    console.log(`Merge Sort: [${mergeSorted.join(',')}]`);
    
    const quickSorted = [...unsorted];
    quickSort(quickSorted);
    console.log(`Quick Sort: [${quickSorted.join(',')}]`);
    
    // Test permutations and combinations
    console.log("\n--- Permutations and Combinations ---");
    const perms = generatePermutations([1, 2, 3]);
    console.log(`Permutations of [1,2,3]: ${perms.length} total`);
    perms.forEach((perm, i) => {
        if (i < 6) console.log(`  ${i + 1}: [${perm.join(',')}]`);
    });
    
    const subsets = generateSubsets([1, 2]);
    console.log(`Subsets of [1,2]:`);
    subsets.forEach((subset, i) => {
        console.log(`  ${i + 1}: [${subset.join(',')}]`);
    });
    
    // Test Tower of Hanoi
    console.log("\n--- Tower of Hanoi ---");
    const moves = towerOfHanoi(3);
    console.log(`Solution for 3 disks (${moves.length} moves):`);
    moves.forEach((move, i) => {
        console.log(`  ${i + 1}. ${move}`);
    });
    
    // Test combination sum
    console.log("\n--- Combination Sum ---");
    const combinations = combinationSum([2, 3, 6, 7], 7);
    console.log(`Combinations that sum to 7:`);
    combinations.forEach((combo, i) => {
        console.log(`  ${i + 1}: [${combo.join(',')}] = ${combo.reduce((a, b) => a + b)}`);
    });
    
    // Test tree depth
    console.log("\n--- Binary Tree Depth ---");
    const root = new TreeNode(1,
        new TreeNode(2, new TreeNode(4), new TreeNode(5)),
        new TreeNode(3)
    );
    const depth = maxDepth(root);
    console.log(`Tree depth: ${depth}`);
    
    // Test memoized Fibonacci
    console.log("\n--- Memoized Fibonacci ---");
    const fibResult = fibonacciMemo(10);
    console.log(`Fibonacci(10) = ${fibResult}`);
}

// Performance comparison
function performanceComparison() {
    console.log("\n=== Performance Comparison ===");
    
    // Compare sorting algorithms
    const sizes = [100, 500, 1000];
    
    sizes.forEach(size => {
        console.log(`\nTesting with array size: ${size}`);
        const testArray = Array.from({ length: size }, () => Math.floor(Math.random() * 1000));
        
        // Merge Sort
        let start = performance.now();
        mergeSort([...testArray]);
        let end = performance.now();
        console.log(`Merge Sort: ${(end - start).toFixed(2)}ms`);
        
        // Quick Sort
        start = performance.now();
        const quickArray = [...testArray];
        quickSort(quickArray);
        end = performance.now();
        console.log(`Quick Sort: ${(end - start).toFixed(2)}ms`);
        
        // Native sort for comparison
        start = performance.now();
        [...testArray].sort((a, b) => a - b);
        end = performance.now();
        console.log(`Native Sort: ${(end - start).toFixed(2)}ms`);
    });
    
    // Compare Fibonacci implementations
    console.log("\n--- Fibonacci Performance ---");
    const n = 35;
    
    console.log(`Computing Fibonacci(${n}):`);
    
    // Memoized version
    let start = performance.now();
    const memoResult = fibonacciMemo(n);
    let end = performance.now();
    console.log(`Memoized: ${memoResult} (${(end - start).toFixed(2)}ms)`);
    
    // Note: Don't test naive recursive for large n - too slow!
    console.log("Note: Naive recursive Fibonacci would be exponentially slower");
}

// Educational explanations
function explainRecursiveAlgorithms() {
    console.log("\n=== Understanding Recursive Algorithms ===");
    
    console.log("🔄 DIVIDE AND CONQUER:");
    console.log("• Break problem into smaller subproblems");
    console.log("• Solve subproblems recursively");
    console.log("• Combine solutions to solve original problem");
    console.log("• Examples: Merge Sort, Quick Sort, Binary Search");
    console.log();
    
    console.log("🌳 TREE RECURSION:");
    console.log("• Multiple recursive calls per function call");
    console.log("• Creates tree-like call structure");
    console.log("• Often exponential time complexity without optimization");
    console.log("• Examples: Fibonacci, Tree Traversals, Permutations");
    console.log();
    
    console.log("🔙 BACKTRACKING:");
    console.log("• Explore all possible solutions systematically");
    console.log("• Make choices, explore consequences, undo if needed");
    console.log("• Use when you need to find all solutions");
    console.log("• Examples: N-Queens, Sudoku, Permutations, Subsets");
    console.log();
    
    console.log("⚡ OPTIMIZATION TECHNIQUES:");
    console.log("1. Memoization: Cache expensive function calls");
    console.log("2. Tail recursion: Last operation is recursive call");
    console.log("3. Dynamic programming: Bottom-up approach");
    console.log("4. Pruning: Skip impossible branches early");
    console.log();
    
    console.log("📊 COMPLEXITY ANALYSIS:");
    console.log("• Merge Sort: O(n log n) time, O(n) space");
    console.log("• Quick Sort: O(n log n) average, O(n²) worst");
    console.log("• Permutations: O(n!) time and space");
    console.log("• Subsets: O(2^n) time and space");
    console.log("• Tree operations: O(n) time, O(h) space");
    console.log();
    
    console.log("🎯 INTERVIEW STRATEGIES:");
    console.log("• Identify base cases first");
    console.log("• Think about what gets smaller each call");
    console.log("• Consider memoization for overlapping subproblems");
    console.log("• Draw recursion trees for complex problems");
    console.log("• Practice converting recursive to iterative solutions");
}

// Run all demonstrations
testRecursiveAlgorithms();
performanceComparison();
explainRecursiveAlgorithms();

/**
 * KEY CONCEPTS LEARNED:
 * 
 * 1. Divide and Conquer: Break problems into smaller subproblems
 * 2. Tree Recursion: Multiple recursive calls creating exponential complexity
 * 3. Backtracking: Systematic exploration with choice and undo
 * 4. Memoization: Optimization technique to cache expensive calls
 * 5. Recursive Data Structures: Trees and linked structures
 * 
 * INTERVIEW DISCUSSION POINTS:
 * 
 * Q: "Implement merge sort"
 * A: "Divide array in half, recursively sort both halves, merge sorted halves.
 *     O(n log n) time, O(n) space, stable sort."
 * 
 * Q: "Generate all permutations of an array"
 * A: "Use backtracking: for each position, try each remaining element,
 *     recurse with updated state, backtrack to try next option."
 * 
 * Q: "What's the difference between recursion and iteration?"
 * A: "Recursion uses function calls and stack, iteration uses loops.
 *     Recursion more elegant for tree/graph problems, iteration more efficient."
 * 
 * Q: "When would you use memoization?"
 * A: "When recursive function has overlapping subproblems (like Fibonacci).
 *     Trade space for time to avoid redundant calculations."
 * 
 * Q: "Explain backtracking"
 * A: "Try all possibilities systematically: make choice, explore consequences,
 *     if dead end then undo choice and try next option."
 * 
 * RECURSIVE PATTERNS:
 * 1. Linear recursion: One recursive call per invocation
 * 2. Tree recursion: Multiple recursive calls per invocation
 * 3. Tail recursion: Recursive call is last operation
 * 4. Mutual recursion: Functions call each other recursively
 * 5. Nested recursion: Recursive call as argument to another recursive call
 * 
 * RELATED CONCEPTS:
 * - Dynamic Programming
 * - Divide and Conquer
 * - Backtracking
 * - Tree and Graph Algorithms
 * - Mathematical Induction
 * - Stack-based Iteration Conversion
 */

module.exports = {
    mergeSort,
    quickSort,
    generatePermutations,
    generateSubsets,
    towerOfHanoi,
    combinationSum,
    maxDepth,
    fibonacciMemo,
    TreeNode
}; 