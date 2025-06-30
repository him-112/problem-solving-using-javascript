/**
 * PROBLEM: Find the Maximum Element in an Array
 * 
 * DESCRIPTION:
 * Given an array of numbers, find and return the maximum element.
 * This is a fundamental problem that introduces basic array iteration.
 * 
 * EXAMPLES:
 * Input: [3, 7, 2, 9, 1] → Output: 9
 * Input: [-5, -2, -10, -1] → Output: -1
 * Input: [42] → Output: 42
 * 
 * APPROACH:
 * 1. Initialize max with the first element
 * 2. Iterate through the array starting from index 1
 * 3. Compare each element with current max
 * 4. Update max if current element is larger
 * 
 * TIME COMPLEXITY: O(n) - we visit each element once
 * SPACE COMPLEXITY: O(1) - only using a single variable for tracking max
 */

// Method 1: Traditional for loop approach
function findMaxTraditional(arr) {
    // Handle edge case: empty array
    if (arr.length === 0) {
        throw new Error("Array cannot be empty");
    }
    
    // Initialize max with first element
    let max = arr[0];
    
    // Start from index 1 since we already have arr[0]
    for (let i = 1; i < arr.length; i++) {
        // Compare current element with max
        if (arr[i] > max) {
            max = arr[i];  // Update max if current element is larger
        }
    }
    
    return max;
}

// Method 2: Using built-in Math.max with spread operator
function findMaxBuiltIn(arr) {
    // Handle edge case: empty array
    if (arr.length === 0) {
        throw new Error("Array cannot be empty");
    }
    
    // Spread operator unpacks array elements as arguments to Math.max
    // Math.max(3, 7, 2, 9, 1) returns 9
    return Math.max(...arr);
}

// Method 3: Using reduce method (functional approach)
function findMaxReduce(arr) {
    // Handle edge case: empty array
    if (arr.length === 0) {
        throw new Error("Array cannot be empty");
    }
    
    // reduce takes an accumulator and current value
    // accumulator starts with first element (arr[0])
    return arr.reduce((max, current) => {
        // Return the larger of max and current
        return current > max ? current : max;
    });
}

// Method 4: Using for...of loop (modern JavaScript)
function findMaxForOf(arr) {
    // Handle edge case: empty array
    if (arr.length === 0) {
        throw new Error("Array cannot be empty");
    }
    
    let max = arr[0];
    
    // for...of gives us the values directly, not indices
    for (const num of arr) {
        if (num > max) {
            max = num;
        }
    }
    
    return max;
}

// Test cases to verify our solutions
console.log("=== Testing Find Maximum Element ===");

const testCases = [
    [3, 7, 2, 9, 1],        // Mixed positive numbers
    [-5, -2, -10, -1],      // All negative numbers
    [42],                   // Single element
    [5, 5, 5, 5],          // All same elements
    [1, 2, 3, 4, 5]        // Ascending order
];

testCases.forEach((testCase, index) => {
    console.log(`\nTest Case ${index + 1}: [${testCase.join(', ')}]`);
    console.log(`Traditional: ${findMaxTraditional(testCase)}`);
    console.log(`Built-in: ${findMaxBuiltIn(testCase)}`);
    console.log(`Reduce: ${findMaxReduce(testCase)}`);
    console.log(`For...of: ${findMaxForOf(testCase)}`);
});

// Edge case testing
console.log("\n=== Testing Edge Cases ===");
try {
    findMaxTraditional([]);
} catch (error) {
    console.log("Empty array handled correctly:", error.message);
}

/**
 * KEY CONCEPTS LEARNED:
 * 
 * 1. Array Iteration: Different ways to loop through arrays
 * 2. Comparison Logic: Using conditional statements for comparisons
 * 3. Edge Case Handling: Always consider empty arrays, single elements
 * 4. Built-in Methods: Math.max() with spread operator
 * 5. Functional Programming: Using reduce() for array operations
 * 6. Modern JavaScript: for...of loops for cleaner code
 * 
 * INTERVIEW TIPS:
 * - Always ask about edge cases (empty array, single element)
 * - Discuss different approaches and their trade-offs
 * - Traditional loop is most memory efficient
 * - Built-in methods are concise but may have stack limitations for very large arrays
 * - Consider the context: performance vs readability
 */

// Export functions for testing in other files
module.exports = {
    findMaxTraditional,
    findMaxBuiltIn,
    findMaxReduce,
    findMaxForOf
}; 