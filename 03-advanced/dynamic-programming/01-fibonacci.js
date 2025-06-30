/**
 * PROBLEM: Fibonacci Sequence
 * 
 * DESCRIPTION:
 * The Fibonacci sequence is defined as:
 * F(0) = 0, F(1) = 1
 * F(n) = F(n-1) + F(n-2) for n > 1
 * 
 * Sequence: 0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, ...
 * 
 * WHY STUDY FIBONACCI:
 * - Perfect example for understanding recursion and optimization
 * - Demonstrates the power of dynamic programming and memoization
 * - Shows exponential vs linear time complexity trade-offs
 * - Common interview question to test optimization skills
 * 
 * EXAMPLES:
 * fibonacci(0) → 0
 * fibonacci(1) → 1
 * fibonacci(5) → 5
 * fibonacci(10) → 55
 */

// Method 1: Naive Recursive Approach (VERY SLOW!)
function fibonacciNaive(n) {
    /**
     * APPROACH: Direct translation of mathematical definition
     * F(n) = F(n-1) + F(n-2)
     * 
     * TIME COMPLEXITY: O(2^n) - exponential! Each call spawns 2 more calls
     * SPACE COMPLEXITY: O(n) - recursion depth
     * 
     * WHY SO SLOW:
     * - Recalculates same values many times
     * - F(5) calls F(4) and F(3)
     * - F(4) calls F(3) and F(2)
     * - F(3) is calculated twice!
     * - Gets exponentially worse for larger n
     */
    
    console.log(`Computing fibonacci(${n}) naively...`);
    
    // Base cases
    if (n <= 1) {
        return n;
    }
    
    // Recursive case: F(n) = F(n-1) + F(n-2)
    return fibonacciNaive(n - 1) + fibonacciNaive(n - 2);
}

// Method 2: Memoized Recursive Approach (Top-down Dynamic Programming)
function fibonacciMemoized(n, memo = {}) {
    /**
     * APPROACH: Add memoization to avoid recalculating same values
     * Store computed results in a memo object/array
     * 
     * TIME COMPLEXITY: O(n) - each value calculated once
     * SPACE COMPLEXITY: O(n) - memo storage + recursion stack
     * 
     * WHY MUCH FASTER:
     * - Each F(i) calculated exactly once
     * - Subsequent calls return cached result in O(1)
     * - Transforms exponential to linear time!
     */
    
    // Check if already computed
    if (n in memo) {
        return memo[n];
    }
    
    // Base cases
    if (n <= 1) {
        return n;
    }
    
    // Compute and store result
    memo[n] = fibonacciMemoized(n - 1, memo) + fibonacciMemoized(n - 2, memo);
    return memo[n];
}

// Method 3: Tabulated Approach (Bottom-up Dynamic Programming)
function fibonacciTabulated(n) {
    /**
     * APPROACH: Build solution from bottom up using array
     * Start with base cases and build up to target
     * 
     * TIME COMPLEXITY: O(n) - single loop through n
     * SPACE COMPLEXITY: O(n) - array to store all values
     * 
     * ADVANTAGES:
     * - No recursion overhead
     * - Clear iterative logic
     * - Can easily see all intermediate values
     */
    
    if (n <= 1) {
        return n;
    }
    
    // Create array to store all fibonacci values up to n
    const dp = new Array(n + 1);
    
    // Base cases
    dp[0] = 0;
    dp[1] = 1;
    
    // Fill array from bottom up
    console.log(`Building fibonacci table up to ${n}:`);
    console.log(`dp[0] = ${dp[0]}, dp[1] = ${dp[1]}`);
    
    for (let i = 2; i <= n; i++) {
        dp[i] = dp[i - 1] + dp[i - 2];
        console.log(`dp[${i}] = dp[${i-1}] + dp[${i-2}] = ${dp[i-1]} + ${dp[i-2]} = ${dp[i]}`);
    }
    
    return dp[n];
}

// Method 4: Space-Optimized Iterative (Most Efficient!)
function fibonacciOptimized(n) {
    /**
     * APPROACH: Only keep track of last 2 values
     * We only need F(n-1) and F(n-2) to compute F(n)
     * 
     * TIME COMPLEXITY: O(n) - single loop
     * SPACE COMPLEXITY: O(1) - only 2 variables!
     * 
     * BEST APPROACH for most practical purposes:
     * - Linear time
     * - Constant space
     * - No recursion overhead
     * - Simple and readable
     */
    
    if (n <= 1) {
        return n;
    }
    
    let prev2 = 0; // F(0)
    let prev1 = 1; // F(1)
    
    console.log(`Computing fibonacci(${n}) iteratively:`);
    console.log(`F(0) = ${prev2}, F(1) = ${prev1}`);
    
    for (let i = 2; i <= n; i++) {
        const current = prev1 + prev2;
        console.log(`F(${i}) = F(${i-1}) + F(${i-2}) = ${prev1} + ${prev2} = ${current}`);
        
        // Shift values for next iteration
        prev2 = prev1;
        prev1 = current;
    }
    
    return prev1;
}

// Method 5: Matrix Exponentiation (Advanced - O(log n))
function fibonacciMatrix(n) {
    /**
     * APPROACH: Use matrix exponentiation for O(log n) solution
     * Based on the identity: [F(n+1), F(n)] = [[1,1],[1,0]]^n * [F(1), F(0)]
     * 
     * TIME COMPLEXITY: O(log n) - using fast exponentiation
     * SPACE COMPLEXITY: O(log n) - recursion for exponentiation
     * 
     * ADVANCED TECHNIQUE - mainly academic interest for fibonacci
     * But the technique is useful for other DP problems!
     */
    
    if (n <= 1) return n;
    
    function matrixMultiply(A, B) {
        return [
            [A[0][0] * B[0][0] + A[0][1] * B[1][0], A[0][0] * B[0][1] + A[0][1] * B[1][1]],
            [A[1][0] * B[0][0] + A[1][1] * B[1][0], A[1][0] * B[0][1] + A[1][1] * B[1][1]]
        ];
    }
    
    function matrixPower(matrix, power) {
        if (power === 1) return matrix;
        if (power % 2 === 0) {
            const half = matrixPower(matrix, power / 2);
            return matrixMultiply(half, half);
        } else {
            return matrixMultiply(matrix, matrixPower(matrix, power - 1));
        }
    }
    
    const baseMatrix = [[1, 1], [1, 0]];
    const resultMatrix = matrixPower(baseMatrix, n);
    
    return resultMatrix[0][1]; // This gives us F(n)
}

// Method 6: Golden Ratio Formula (Mathematical approach)
function fibonacciGoldenRatio(n) {
    /**
     * APPROACH: Use Binet's formula based on golden ratio
     * F(n) = (φ^n - ψ^n) / √5
     * where φ = (1 + √5) / 2 (golden ratio)
     * and ψ = (1 - √5) / 2
     * 
     * TIME COMPLEXITY: O(1) - constant time!
     * SPACE COMPLEXITY: O(1) - constant space
     * 
     * LIMITATION: Floating point precision issues for large n
     * Mainly theoretical interest
     */
    
    const sqrt5 = Math.sqrt(5);
    const phi = (1 + sqrt5) / 2;      // Golden ratio
    const psi = (1 - sqrt5) / 2;      // Conjugate
    
    const result = (Math.pow(phi, n) - Math.pow(psi, n)) / sqrt5;
    return Math.round(result); // Round to handle floating point errors
}

// Performance comparison function
function performanceComparison() {
    console.log("=== Fibonacci Performance Comparison ===");
    
    const testValues = [10, 20, 30, 35]; // Don't go too high with naive!
    
    testValues.forEach(n => {
        console.log(`\n--- Computing Fibonacci(${n}) ---`);
        
        // Optimized (always fast)
        let start = performance.now();
        const optimizedResult = fibonacciOptimized(n);
        let end = performance.now();
        const optimizedTime = end - start;
        
        // Memoized
        start = performance.now();
        const memoizedResult = fibonacciMemoized(n);
        end = performance.now();
        const memoizedTime = end - start;
        
        // Matrix (for demonstration)
        start = performance.now();
        const matrixResult = fibonacciMatrix(n);
        end = performance.now();
        const matrixTime = end - start;
        
        // Golden ratio
        start = performance.now();
        const goldenResult = fibonacciGoldenRatio(n);
        end = performance.now();
        const goldenTime = end - start;
        
        console.log(`Optimized: ${optimizedResult} (${optimizedTime.toFixed(4)}ms)`);
        console.log(`Memoized:  ${memoizedResult} (${memoizedTime.toFixed(4)}ms)`);
        console.log(`Matrix:    ${matrixResult} (${matrixTime.toFixed(4)}ms)`);
        console.log(`Golden:    ${goldenResult} (${goldenTime.toFixed(4)}ms)`);
        
        // Only test naive for small values (it gets too slow!)
        if (n <= 30) {
            start = performance.now();
            const naiveResult = fibonacciNaive(n);
            end = performance.now();
            const naiveTime = end - start;
            console.log(`Naive:     ${naiveResult} (${naiveTime.toFixed(4)}ms)`);
        }
    });
}

// Educational function: Show why memoization helps
function demonstrateMemoization() {
    console.log("\n=== Demonstrating Memoization Benefits ===");
    
    // Let's trace fibonacci(5) calls
    console.log("Computing fibonacci(5) naively shows repeated calculations:");
    console.log("fibonacci(5)");
    console.log("├── fibonacci(4)");
    console.log("│   ├── fibonacci(3)");
    console.log("│   │   ├── fibonacci(2) ├── fibonacci(1)");
    console.log("│   │   └── fibonacci(1)");
    console.log("│   └── fibonacci(2)");
    console.log("│       ├── fibonacci(1)");
    console.log("│       └── fibonacci(0)");
    console.log("└── fibonacci(3)          ← REPEATED!");
    console.log("    ├── fibonacci(2)      ← REPEATED!");
    console.log("    │   ├── fibonacci(1)");
    console.log("    │   └── fibonacci(0)");
    console.log("    └── fibonacci(1)");
    
    console.log("\nWith memoization, each value is calculated only once!");
}

// Test all approaches
function testAllApproaches() {
    console.log("=== Testing All Fibonacci Approaches ===");
    
    const testCases = [0, 1, 2, 5, 10, 15];
    
    testCases.forEach(n => {
        console.log(`\nFibonacci(${n}):`);
        console.log(`Optimized: ${fibonacciOptimized(n)}`);
        console.log(`Memoized:  ${fibonacciMemoized(n)}`);
        console.log(`Matrix:    ${fibonacciMatrix(n)}`);
        console.log(`Golden:    ${fibonacciGoldenRatio(n)}`);
        
        if (n <= 15) {
            console.log(`Naive:     ${fibonacciNaive(n)}`);
        }
    });
}

// Generate fibonacci sequence
function generateFibonacciSequence(count) {
    console.log(`\n=== First ${count} Fibonacci Numbers ===`);
    
    const sequence = [];
    for (let i = 0; i < count; i++) {
        sequence.push(fibonacciOptimized(i));
    }
    
    console.log(sequence.join(', '));
    return sequence;
}

// Run demonstrations
demonstrateMemoization();
testAllApproaches();
generateFibonacciSequence(20);
performanceComparison();

/**
 * KEY CONCEPTS LEARNED:
 * 
 * 1. Dynamic Programming: Breaking problems into overlapping subproblems
 * 2. Memoization: Top-down approach with caching
 * 3. Tabulation: Bottom-up approach building solution iteratively
 * 4. Space Optimization: Reducing space complexity when possible
 * 5. Time Complexity Analysis: Exponential vs Linear vs Logarithmic
 * 
 * INTERVIEW DISCUSSION POINTS:
 * 
 * Q: "Calculate the nth Fibonacci number"
 * A: "I can show several approaches with different trade-offs..."
 * 
 * 1. Naive Recursion: Simple but O(2^n) - too slow
 * 2. Memoization: Add caching to make it O(n) time, O(n) space
 * 3. Tabulation: Bottom-up DP, O(n) time, O(n) space
 * 4. Optimized: Only keep last 2 values, O(n) time, O(1) space
 * 
 * Q: "Which approach would you use?"
 * A: "For interviews, the optimized iterative approach is best:
 *     - O(n) time, O(1) space
 *     - Easy to understand and implement
 *     - No risk of stack overflow"
 * 
 * Q: "What if I asked for multiple fibonacci numbers?"
 * A: "Then tabulation might be better - compute once, query many times"
 * 
 * DYNAMIC PROGRAMMING PRINCIPLES:
 * 1. Optimal Substructure: Solution contains optimal solutions to subproblems
 * 2. Overlapping Subproblems: Same subproblems solved multiple times
 * 3. Memoization: Store solutions to avoid recomputation
 * 4. Tabulation: Build solution bottom-up
 * 
 * RELATED PROBLEMS:
 * - Climbing stairs (same recurrence relation!)
 * - House robber problem
 * - Minimum cost climbing stairs
 * - Tribonacci sequence
 */

module.exports = {
    fibonacciNaive,
    fibonacciMemoized,
    fibonacciTabulated,
    fibonacciOptimized,
    fibonacciMatrix,
    fibonacciGoldenRatio
}; 