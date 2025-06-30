/**
 * PROBLEM: Recursion Basics
 * 
 * DESCRIPTION:
 * Learn fundamental recursion patterns through classic examples.
 * Recursion is a function calling itself with a smaller problem.
 * 
 * KEY CONCEPTS:
 * - Base case: condition to stop recursion
 * - Recursive case: function calls itself with modified input
 * - Call stack: how recursive calls are managed
 * 
 * EXAMPLES:
 * factorial(5) = 5 × 4 × 3 × 2 × 1 = 120
 * fibonacci(6) = 8 (sequence: 0,1,1,2,3,5,8...)
 * sum([1,2,3,4]) = 10
 */

// Method 1: Factorial (Classic recursion example)
function factorial(n) {
    /**
     * APPROACH: Multiply n by factorial of (n-1)
     * Base case: factorial(0) = 1, factorial(1) = 1
     * Recursive case: n × factorial(n-1)
     * 
     * TIME COMPLEXITY: O(n)
     * SPACE COMPLEXITY: O(n) - call stack depth
     */
    
    console.log(`factorial(${n}) called`);
    
    // Base cases
    if (n < 0) {
        throw new Error("Factorial not defined for negative numbers");
    }
    if (n === 0 || n === 1) {
        console.log(`  Base case: factorial(${n}) = 1`);
        return 1;
    }
    
    // Recursive case
    console.log(`  Recursive case: ${n} × factorial(${n-1})`);
    const result = n * factorial(n - 1);
    console.log(`  factorial(${n}) = ${result}`);
    return result;
}

// Method 2: Fibonacci (Multiple approaches)
function fibonacciRecursive(n) {
    /**
     * APPROACH: Classic recursive definition
     * fib(n) = fib(n-1) + fib(n-2)
     * 
     * TIME COMPLEXITY: O(2^n) - exponential!
     * SPACE COMPLEXITY: O(n) - maximum call stack depth
     */
    
    console.log(`fibonacciRecursive(${n}) called`);
    
    // Base cases
    if (n < 0) {
        throw new Error("Fibonacci not defined for negative numbers");
    }
    if (n === 0) {
        console.log(`  Base case: fib(0) = 0`);
        return 0;
    }
    if (n === 1) {
        console.log(`  Base case: fib(1) = 1`);
        return 1;
    }
    
    // Recursive case
    console.log(`  Recursive case: fib(${n-1}) + fib(${n-2})`);
    const result = fibonacciRecursive(n - 1) + fibonacciRecursive(n - 2);
    console.log(`  fib(${n}) = ${result}`);
    return result;
}

// Method 3: Optimized Fibonacci with memoization
function fibonacciMemo(n, memo = {}) {
    /**
     * APPROACH: Store previously computed results
     * Avoids redundant calculations
     * 
     * TIME COMPLEXITY: O(n)
     * SPACE COMPLEXITY: O(n) - memo object + call stack
     */
    
    console.log(`fibonacciMemo(${n}) called`);
    
    if (n in memo) {
        console.log(`  Found in memo: fib(${n}) = ${memo[n]}`);
        return memo[n];
    }
    
    // Base cases
    if (n === 0) return 0;
    if (n === 1) return 1;
    
    // Store result in memo
    memo[n] = fibonacciMemo(n - 1, memo) + fibonacciMemo(n - 2, memo);
    console.log(`  Computed and stored: fib(${n}) = ${memo[n]}`);
    return memo[n];
}

// Method 4: Array Sum (Recursion on arrays)
function arraySum(arr, index = 0) {
    /**
     * APPROACH: Add current element to sum of remaining array
     * Base case: empty array or past end
     * Recursive case: arr[index] + sum(rest of array)
     * 
     * TIME COMPLEXITY: O(n)
     * SPACE COMPLEXITY: O(n) - call stack
     */
    
    console.log(`arraySum([${arr.join(',')}], index=${index}) called`);
    
    // Base case: reached end of array
    if (index >= arr.length) {
        console.log(`  Base case: index ${index} >= length ${arr.length}, return 0`);
        return 0;
    }
    
    // Recursive case
    const current = arr[index];
    console.log(`  Current element: ${current}`);
    const remainingSum = arraySum(arr, index + 1);
    const result = current + remainingSum;
    console.log(`  ${current} + ${remainingSum} = ${result}`);
    return result;
}

// Method 5: Countdown (Simple recursion pattern)
function countdown(n) {
    /**
     * APPROACH: Print number and call with n-1
     * Demonstrates basic recursive pattern
     * 
     * TIME COMPLEXITY: O(n)
     * SPACE COMPLEXITY: O(n) - call stack
     */
    
    console.log(`countdown(${n}) called`);
    
    // Base case
    if (n <= 0) {
        console.log("  Blast off! 🚀");
        return;
    }
    
    // Print current number
    console.log(`  ${n}`);
    
    // Recursive case
    countdown(n - 1);
}

// Method 6: Power calculation
function power(base, exponent) {
    /**
     * APPROACH: base^exp = base × base^(exp-1)
     * More efficient than repeated multiplication
     * 
     * TIME COMPLEXITY: O(exp)
     * SPACE COMPLEXITY: O(exp) - call stack
     */
    
    console.log(`power(${base}, ${exponent}) called`);
    
    // Base cases
    if (exponent === 0) {
        console.log(`  Base case: ${base}^0 = 1`);
        return 1;
    }
    if (exponent === 1) {
        console.log(`  Base case: ${base}^1 = ${base}`);
        return base;
    }
    
    // Recursive case
    console.log(`  Recursive case: ${base} × ${base}^${exponent-1}`);
    const result = base * power(base, exponent - 1);
    console.log(`  ${base}^${exponent} = ${result}`);
    return result;
}

// Method 7: String reversal using recursion
function reverseString(str) {
    /**
     * APPROACH: Last character + reverse of remaining string
     * Base case: empty string or single character
     * Recursive case: str[last] + reverse(str without last)
     * 
     * TIME COMPLEXITY: O(n²) - string concatenation
     * SPACE COMPLEXITY: O(n) - call stack
     */
    
    console.log(`reverseString("${str}") called`);
    
    // Base cases
    if (str.length <= 1) {
        console.log(`  Base case: "${str}" (length ${str.length})`);
        return str;
    }
    
    // Recursive case
    const lastChar = str[str.length - 1];
    const remaining = str.slice(0, -1);
    console.log(`  Last char: "${lastChar}", Remaining: "${remaining}"`);
    
    const reversedRemaining = reverseString(remaining);
    const result = lastChar + reversedRemaining;
    console.log(`  "${lastChar}" + "${reversedRemaining}" = "${result}"`);
    return result;
}

// Test all recursive functions
function testRecursionBasics() {
    console.log("=== Testing Recursion Basics ===");
    
    // Test factorial
    console.log("\n--- Factorial ---");
    try {
        const factResult = factorial(5);
        console.log(`factorial(5) = ${factResult}`);
    } catch (error) {
        console.log(`Error: ${error.message}`);
    }
    
    // Test Fibonacci (be careful with large numbers for recursive version)
    console.log("\n--- Fibonacci Recursive (small number) ---");
    const fibRecResult = fibonacciRecursive(5);
    console.log(`fibonacciRecursive(5) = ${fibRecResult}`);
    
    console.log("\n--- Fibonacci Memoized ---");
    const fibMemoResult = fibonacciMemo(10);
    console.log(`fibonacciMemo(10) = ${fibMemoResult}`);
    
    // Test array sum
    console.log("\n--- Array Sum ---");
    const sumResult = arraySum([1, 2, 3, 4, 5]);
    console.log(`arraySum([1,2,3,4,5]) = ${sumResult}`);
    
    // Test countdown
    console.log("\n--- Countdown ---");
    countdown(5);
    
    // Test power
    console.log("\n--- Power ---");
    const powerResult = power(2, 4);
    console.log(`power(2, 4) = ${powerResult}`);
    
    // Test string reverse
    console.log("\n--- String Reverse ---");
    const reverseResult = reverseString("hello");
    console.log(`reverseString("hello") = "${reverseResult}"`);
}

// Performance comparison: Recursive vs Iterative
function performanceComparison() {
    console.log("\n=== Performance Comparison ===");
    
    // Iterative factorial for comparison
    function factorialIterative(n) {
        let result = 1;
        for (let i = 2; i <= n; i++) {
            result *= i;
        }
        return result;
    }
    
    // Iterative Fibonacci for comparison
    function fibonacciIterative(n) {
        if (n <= 1) return n;
        let a = 0, b = 1;
        for (let i = 2; i <= n; i++) {
            [a, b] = [b, a + b];
        }
        return b;
    }
    
    const n = 10;
    
    console.log(`\nTesting with n=${n}:`);
    
    // Factorial comparison
    let start = performance.now();
    const factRec = factorial(n);
    let end = performance.now();
    console.log(`Factorial Recursive: ${factRec} (${(end - start).toFixed(4)}ms)`);
    
    start = performance.now();
    const factIter = factorialIterative(n);
    end = performance.now();
    console.log(`Factorial Iterative: ${factIter} (${(end - start).toFixed(4)}ms)`);
    
    // Fibonacci comparison
    start = performance.now();
    const fibMemo = fibonacciMemo(n);
    end = performance.now();
    console.log(`Fibonacci Memoized: ${fibMemo} (${(end - start).toFixed(4)}ms)`);
    
    start = performance.now();
    const fibIter = fibonacciIterative(n);
    end = performance.now();
    console.log(`Fibonacci Iterative: ${fibIter} (${(end - start).toFixed(4)}ms)`);
}

// Educational: Understanding recursion
function explainRecursion() {
    console.log("\n=== Understanding Recursion ===");
    
    console.log("🔄 RECURSION FUNDAMENTALS:");
    console.log("• A function that calls itself");
    console.log("• Must have a base case to stop");
    console.log("• Each call works on a smaller problem");
    console.log("• Uses the call stack to manage function calls");
    console.log();
    
    console.log("📋 RECURSION CHECKLIST:");
    console.log("1. Base case(s): When to stop recursing");
    console.log("2. Recursive case: How to break down the problem");
    console.log("3. Progress: Each call should move toward base case");
    console.log("4. Combine: How to build result from subproblems");
    console.log();
    
    console.log("⚡ WHEN TO USE RECURSION:");
    console.log("• Tree/graph traversal");
    console.log("• Mathematical sequences (factorial, Fibonacci)");
    console.log("• Divide and conquer algorithms");
    console.log("• Backtracking problems");
    console.log("• When problem has recursive structure");
    console.log();
    
    console.log("⚠️ RECURSION PITFALLS:");
    console.log("• Stack overflow for deep recursion");
    console.log("• Redundant calculations (solve with memoization)");
    console.log("• Usually slower than iterative due to function call overhead");
    console.log("• Can be harder to debug");
    console.log();
    
    console.log("🎯 OPTIMIZATION TECHNIQUES:");
    console.log("• Memoization: Cache results of expensive function calls");
    console.log("• Tail recursion: Last operation is recursive call");
    console.log("• Convert to iteration when possible");
    console.log("• Use dynamic programming for overlapping subproblems");
}

// Run all demonstrations
testRecursionBasics();
performanceComparison();
explainRecursion();

/**
 * KEY CONCEPTS LEARNED:
 * 
 * 1. Base Case: Essential to prevent infinite recursion
 * 2. Recursive Case: How to break problem into smaller pieces
 * 3. Call Stack: How recursive calls are managed by the system
 * 4. Memoization: Optimization technique to avoid redundant calculations
 * 5. Time/Space Complexity: Recursive solutions often use O(n) space
 * 
 * INTERVIEW DISCUSSION POINTS:
 * 
 * Q: "Implement factorial recursively"
 * A: "I need a base case (n=0 or n=1 returns 1) and recursive case (n × factorial(n-1))"
 * 
 * Q: "What's the time complexity of recursive Fibonacci?"
 * A: "O(2^n) because each call spawns two more calls, creating exponential growth.
 *     Can optimize to O(n) with memoization."
 * 
 * Q: "When would you choose recursion over iteration?"
 * A: "When the problem has a naturally recursive structure (trees, graphs),
 *     or when the recursive solution is much clearer than iterative."
 * 
 * Q: "What are the risks of recursion?"
 * A: "Stack overflow for deep recursion, performance overhead from function calls,
 *     and potential for redundant calculations."
 * 
 * RECURSIVE PATTERNS:
 * 1. Linear recursion: factorial, countdown
 * 2. Tree recursion: Fibonacci, binary tree operations
 * 3. Tail recursion: can be optimized to iteration
 * 4. Mutual recursion: functions calling each other
 * 5. Indirect recursion: A calls B, B calls A
 * 
 * RELATED CONCEPTS:
 * - Dynamic Programming
 * - Divide and Conquer
 * - Backtracking
 * - Tree Traversals
 * - Mathematical Induction
 */

module.exports = {
    factorial,
    fibonacciRecursive,
    fibonacciMemo,
    arraySum,
    countdown,
    power,
    reverseString
}; 