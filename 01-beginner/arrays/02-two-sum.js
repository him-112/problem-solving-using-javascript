/**
 * PROBLEM: Two Sum
 * 
 * DESCRIPTION:
 * Given an array of integers and a target sum, return indices of two numbers
 * that add up to the target. You may assume exactly one solution exists.
 * 
 * EXAMPLES:
 * Input: nums = [2, 7, 11, 15], target = 9 → Output: [0, 1] (2 + 7 = 9)
 * Input: nums = [3, 2, 4], target = 6 → Output: [1, 2] (2 + 4 = 6)
 * Input: nums = [3, 3], target = 6 → Output: [0, 1] (3 + 3 = 6)
 * 
 * This is one of the most common interview questions!
 */

// Method 1: Brute Force Approach
function twoSumBruteForce(nums, target) {
    /**
     * APPROACH: Check every pair of numbers
     * 1. Use nested loops to check all combinations
     * 2. For each number, check if there's another number that sums to target
     * 
     * TIME COMPLEXITY: O(n²) - nested loops
     * SPACE COMPLEXITY: O(1) - only using a few variables
     */
    
    // Outer loop: pick first number
    for (let i = 0; i < nums.length - 1; i++) {
        // Inner loop: pick second number (start from i+1 to avoid same index)
        for (let j = i + 1; j < nums.length; j++) {
            // Check if the two numbers sum to target
            if (nums[i] + nums[j] === target) {
                return [i, j];  // Return indices
            }
        }
    }
    
    // If no solution found (shouldn't happen per problem statement)
    return [];
}

// Method 2: Hash Map Approach (Optimal)
function twoSumHashMap(nums, target) {
    /**
     * APPROACH: Use hash map to store numbers we've seen
     * 1. For each number, calculate what number we need to reach target
     * 2. Check if that needed number is in our hash map
     * 3. If yes, we found our pair! If no, store current number in hash map
     * 
     * TIME COMPLEXITY: O(n) - single pass through array
     * SPACE COMPLEXITY: O(n) - hash map can store up to n elements
     */
    
    // Hash map to store: number -> index
    const numToIndex = new Map();
    
    for (let i = 0; i < nums.length; i++) {
        const currentNum = nums[i];
        const neededNum = target - currentNum;  // What number do we need?
        
        // Check if we've seen the needed number before
        if (numToIndex.has(neededNum)) {
            // Found it! Return the indices
            return [numToIndex.get(neededNum), i];
        }
        
        // Store current number and its index for future lookups
        numToIndex.set(currentNum, i);
    }
    
    // No solution found
    return [];
}

// Method 3: Two Pointers (only works if we can modify the array)
function twoSumTwoPointers(nums, target) {
    /**
     * APPROACH: Sort array and use two pointers
     * NOTE: This changes the original indices, so we need to track them
     * 
     * 1. Create array of [value, originalIndex] pairs
     * 2. Sort by value
     * 3. Use two pointers from start and end
     * 4. Move pointers based on sum comparison
     * 
     * TIME COMPLEXITY: O(n log n) - due to sorting
     * SPACE COMPLEXITY: O(n) - for the paired array
     */
    
    // Create array of [value, index] pairs to preserve original indices
    const indexedNums = nums.map((num, index) => [num, index]);
    
    // Sort by value
    indexedNums.sort((a, b) => a[0] - b[0]);
    
    let left = 0;
    let right = indexedNums.length - 1;
    
    while (left < right) {
        const sum = indexedNums[left][0] + indexedNums[right][0];
        
        if (sum === target) {
            // Found the pair! Return original indices
            return [indexedNums[left][1], indexedNums[right][1]].sort((a, b) => a - b);
        } else if (sum < target) {
            left++;  // Need larger sum, move left pointer right
        } else {
            right--; // Need smaller sum, move right pointer left
        }
    }
    
    return [];
}

// Test function to compare all approaches
function testTwoSum() {
    console.log("=== Testing Two Sum Problem ===");
    
    const testCases = [
        { nums: [2, 7, 11, 15], target: 9, expected: [0, 1] },
        { nums: [3, 2, 4], target: 6, expected: [1, 2] },
        { nums: [3, 3], target: 6, expected: [0, 1] },
        { nums: [1, 5, 3, 8, 2], target: 10, expected: [1, 3] }, // 5 + 8 = 13? No, 3 + 8 = 11? No, 2 + 8 = 10? Yes
        { nums: [-1, -2, -3, -4, -5], target: -8, expected: [2, 4] } // -3 + -5 = -8
    ];
    
    testCases.forEach((test, index) => {
        console.log(`\nTest Case ${index + 1}:`);
        console.log(`Input: nums = [${test.nums.join(', ')}], target = ${test.target}`);
        
        // Test all three methods
        const result1 = twoSumBruteForce([...test.nums], test.target);
        const result2 = twoSumHashMap([...test.nums], test.target);
        const result3 = twoSumTwoPointers([...test.nums], test.target);
        
        console.log(`Brute Force: [${result1.join(', ')}]`);
        console.log(`Hash Map: [${result2.join(', ')}]`);
        console.log(`Two Pointers: [${result3.join(', ')}]`);
        
        // Verify results
        if (result1.length === 2) {
            const sum = test.nums[result1[0]] + test.nums[result1[1]];
            console.log(`Verification: ${test.nums[result1[0]]} + ${test.nums[result1[1]]} = ${sum}`);
        }
    });
}

// Run tests
testTwoSum();

/**
 * KEY CONCEPTS LEARNED:
 * 
 * 1. Hash Maps: Using Map for O(1) lookups to optimize algorithms
 * 2. Trade-offs: Time vs Space complexity considerations
 * 3. Two Pointers: Technique for sorted arrays (though not optimal here)
 * 4. Algorithm Optimization: From O(n²) to O(n) using additional space
 * 5. Edge Cases: Duplicate numbers, negative numbers
 * 
 * INTERVIEW DISCUSSION POINTS:
 * 
 * Q: "What's your first approach?"
 * A: "Brute force with nested loops - O(n²) time, O(1) space"
 * 
 * Q: "Can you optimize it?"
 * A: "Yes, use hash map - O(n) time, O(n) space. Trade space for time."
 * 
 * Q: "What if the array was sorted?"
 * A: "Two pointers approach would work, but we lose original indices"
 * 
 * Q: "What about edge cases?"
 * A: "Consider: duplicate numbers, negative numbers, no solution case"
 * 
 * WHICH APPROACH TO USE IN INTERVIEW:
 * 1. Start with brute force to show you understand the problem
 * 2. Immediately discuss the hash map optimization
 * 3. Implement the hash map solution (it's the expected answer)
 * 4. Mention two pointers as alternative for sorted arrays
 */

module.exports = {
    twoSumBruteForce,
    twoSumHashMap,
    twoSumTwoPointers
}; 