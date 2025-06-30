/**
 * PROBLEM: Binary Search Algorithm
 * 
 * DESCRIPTION:
 * Search for a target value in a sorted array using binary search.
 * Binary search is an efficient searching algorithm that repeatedly divides
 * the search space in half by comparing the target with the middle element.
 * 
 * PREREQUISITES: Array must be sorted!
 * 
 * WHY LEARN BINARY SEARCH:
 * - Fundamental divide-and-conquer algorithm
 * - Much faster than linear search for large datasets
 * - Foundation for many other algorithms
 * - Very common in technical interviews
 * 
 * TIME COMPLEXITY: O(log n) - divides search space in half each time
 * SPACE COMPLEXITY: O(1) iterative, O(log n) recursive (call stack)
 * 
 * EXAMPLES:
 * Array: [1, 3, 5, 7, 9, 11, 13, 15, 17, 19], Target: 7 → Output: 3 (index)
 * Array: [2, 4, 6, 8, 10], Target: 5 → Output: -1 (not found)
 */

// Method 1: Iterative Binary Search (most efficient)
function binarySearchIterative(arr, target) {
    /**
     * APPROACH: Use two pointers (left and right) to narrow search space
     * 1. Start with left = 0, right = array.length - 1
     * 2. Calculate middle index
     * 3. Compare target with middle element:
     *    - If equal: found! return index
     *    - If target < middle: search left half (right = middle - 1)
     *    - If target > middle: search right half (left = middle + 1)
     * 4. Repeat until found or left > right
     * 
     * WHY IT WORKS:
     * Since array is sorted, we can eliminate half the elements each iteration
     */
    
    let left = 0;
    let right = arr.length - 1;
    let iterations = 0;
    
    console.log(`Searching for ${target} in [${arr.join(', ')}]`);
    
    while (left <= right) {
        iterations++;
        
        // Calculate middle index (avoid overflow with large numbers)
        const middle = Math.floor((left + right) / 2);
        const middleValue = arr[middle];
        
        console.log(`Iteration ${iterations}:`);
        console.log(`  Left: ${left}, Right: ${right}, Middle: ${middle}`);
        console.log(`  Checking arr[${middle}] = ${middleValue}`);
        
        if (middleValue === target) {
            console.log(`  ✓ Found ${target} at index ${middle}!`);
            return middle;
        } else if (target < middleValue) {
            // Target is in left half
            right = middle - 1;
            console.log(`  → ${target} < ${middleValue}, searching left half`);
        } else {
            // Target is in right half
            left = middle + 1;
            console.log(`  → ${target} > ${middleValue}, searching right half`);
        }
    }
    
    console.log(`  ✗ ${target} not found after ${iterations} iterations`);
    return -1; // Target not found
}

// Method 2: Recursive Binary Search
function binarySearchRecursive(arr, target, left = 0, right = arr.length - 1, depth = 0) {
    /**
     * APPROACH: Same logic as iterative, but using recursion
     * Base case: left > right (not found) or arr[middle] === target (found)
     * Recursive case: search either left or right half
     * 
     * PROS: Clean, elegant code
     * CONS: Uses O(log n) space for call stack
     */
    
    // Indentation for visualization
    const indent = '  '.repeat(depth);
    console.log(`${indent}Recursive call: left=${left}, right=${right}`);
    
    // Base case: search space exhausted
    if (left > right) {
        console.log(`${indent}Base case: left > right, target not found`);
        return -1;
    }
    
    const middle = Math.floor((left + right) / 2);
    const middleValue = arr[middle];
    
    console.log(`${indent}Checking arr[${middle}] = ${middleValue}`);
    
    if (middleValue === target) {
        console.log(`${indent}Found ${target} at index ${middle}!`);
        return middle;
    } else if (target < middleValue) {
        console.log(`${indent}${target} < ${middleValue}, searching left half`);
        return binarySearchRecursive(arr, target, left, middle - 1, depth + 1);
    } else {
        console.log(`${indent}${target} > ${middleValue}, searching right half`);
        return binarySearchRecursive(arr, target, middle + 1, right, depth + 1);
    }
}

// Method 3: Binary Search with detailed steps (educational)
function binarySearchVisualized(arr, target) {
    /**
     * EDUCATIONAL VERSION: Shows the search space shrinking
     * Helpful for understanding how binary search works
     */
    
    console.log("=== Binary Search Visualization ===");
    console.log(`Array: [${arr.join(', ')}]`);
    console.log(`Target: ${target}`);
    console.log(`Array length: ${arr.length}`);
    
    let left = 0;
    let right = arr.length - 1;
    let step = 1;
    
    while (left <= right) {
        console.log(`\n--- Step ${step} ---`);
        
        // Show current search space
        const searchSpace = arr.slice(left, right + 1);
        console.log(`Search space: [${searchSpace.join(', ')}] (indices ${left}-${right})`);
        
        const middle = Math.floor((left + right) / 2);
        const middleValue = arr[middle];
        
        console.log(`Middle index: ${middle}, Middle value: ${middleValue}`);
        
        // Show comparison
        if (middleValue === target) {
            console.log(`🎯 ${target} === ${middleValue} → FOUND at index ${middle}!`);
            return middle;
        } else if (target < middleValue) {
            console.log(`📉 ${target} < ${middleValue} → Search LEFT half`);
            right = middle - 1;
        } else {
            console.log(`📈 ${target} > ${middleValue} → Search RIGHT half`);
            left = middle + 1;
        }
        
        step++;
    }
    
    console.log(`\n❌ Target ${target} not found in array`);
    return -1;
}

// Method 4: Binary Search variations

// Find first occurrence of target (for arrays with duplicates)
function binarySearchFirst(arr, target) {
    /**
     * VARIATION: Find the FIRST occurrence of target
     * Useful when array has duplicate values
     * 
     * Key difference: when we find target, we continue searching left
     * to find the first occurrence
     */
    
    let left = 0;
    let right = arr.length - 1;
    let result = -1;
    
    while (left <= right) {
        const middle = Math.floor((left + right) / 2);
        
        if (arr[middle] === target) {
            result = middle; // Store this occurrence
            right = middle - 1; // Continue searching left for first occurrence
        } else if (target < arr[middle]) {
            right = middle - 1;
        } else {
            left = middle + 1;
        }
    }
    
    return result;
}

// Find last occurrence of target
function binarySearchLast(arr, target) {
    /**
     * VARIATION: Find the LAST occurrence of target
     */
    
    let left = 0;
    let right = arr.length - 1;
    let result = -1;
    
    while (left <= right) {
        const middle = Math.floor((left + right) / 2);
        
        if (arr[middle] === target) {
            result = middle; // Store this occurrence
            left = middle + 1; // Continue searching right for last occurrence
        } else if (target < arr[middle]) {
            right = middle - 1;
        } else {
            left = middle + 1;
        }
    }
    
    return result;
}

// Test all implementations
function testBinarySearch() {
    console.log("=== Testing Binary Search Implementations ===");
    
    const sortedArray = [1, 3, 5, 7, 9, 11, 13, 15, 17, 19];
    const testTargets = [7, 1, 19, 10, 0, 25]; // mix of existing and non-existing
    
    testTargets.forEach(target => {
        console.log(`\n${'='.repeat(50)}`);
        console.log(`SEARCHING FOR: ${target}`);
        console.log(`${'='.repeat(50)}`);
        
        console.log("\n--- Iterative Binary Search ---");
        const iterativeResult = binarySearchIterative([...sortedArray], target);
        
        console.log("\n--- Recursive Binary Search ---");
        const recursiveResult = binarySearchRecursive([...sortedArray], target);
        
        console.log("\n--- Results Comparison ---");
        console.log(`Iterative result: ${iterativeResult}`);
        console.log(`Recursive result: ${recursiveResult}`);
        console.log(`Results match: ${iterativeResult === recursiveResult ? '✓' : '✗'}`);
    });
}

// Test with duplicates
function testBinarySearchWithDuplicates() {
    console.log("\n=== Testing Binary Search with Duplicates ===");
    
    const arrayWithDuplicates = [1, 2, 2, 2, 3, 4, 4, 5, 5, 5, 5, 6];
    const target = 5;
    
    console.log(`Array: [${arrayWithDuplicates.join(', ')}]`);
    console.log(`Target: ${target}`);
    
    const anyOccurrence = binarySearchIterative(arrayWithDuplicates, target);
    const firstOccurrence = binarySearchFirst(arrayWithDuplicates, target);
    const lastOccurrence = binarySearchLast(arrayWithDuplicates, target);
    
    console.log(`Any occurrence: index ${anyOccurrence}`);
    console.log(`First occurrence: index ${firstOccurrence}`);
    console.log(`Last occurrence: index ${lastOccurrence}`);
}

// Performance comparison with linear search
function performanceComparison() {
    console.log("\n=== Performance Comparison ===");
    
    // Create large sorted array
    const size = 1000000;
    const largeArray = Array.from({ length: size }, (_, i) => i * 2); // [0, 2, 4, 6, ...]
    const target = size - 100; // near the end
    
    console.log(`Testing with array of ${size} elements...`);
    console.log(`Target: ${target} (near end of array)`);
    
    // Linear search
    const linearStart = performance.now();
    let linearResult = -1;
    for (let i = 0; i < largeArray.length; i++) {
        if (largeArray[i] === target) {
            linearResult = i;
            break;
        }
    }
    const linearEnd = performance.now();
    
    // Binary search
    const binaryStart = performance.now();
    let left = 0, right = largeArray.length - 1;
    let binaryResult = -1;
    while (left <= right) {
        const middle = Math.floor((left + right) / 2);
        if (largeArray[middle] === target) {
            binaryResult = middle;
            break;
        } else if (target < largeArray[middle]) {
            right = middle - 1;
        } else {
            left = middle + 1;
        }
    }
    const binaryEnd = performance.now();
    
    console.log(`Linear Search: ${(linearEnd - linearStart).toFixed(4)}ms`);
    console.log(`Binary Search: ${(binaryEnd - binaryStart).toFixed(4)}ms`);
    console.log(`Binary search is ${((linearEnd - linearStart) / (binaryEnd - binaryStart)).toFixed(0)}x faster`);
    console.log(`Both found target at index: ${linearResult === binaryResult ? linearResult : 'MISMATCH!'}`);
}

// Run all tests
testBinarySearch();
testBinarySearchWithDuplicates();
performanceComparison();

/**
 * KEY CONCEPTS LEARNED:
 * 
 * 1. Divide and Conquer: Breaking problem into smaller subproblems
 * 2. Logarithmic Complexity: How O(log n) scales much better than O(n)
 * 3. Preconditions: Algorithm requires sorted data
 * 4. Iterative vs Recursive: Trade-offs between approaches
 * 5. Edge Cases: Empty arrays, single elements, duplicates
 * 
 * INTERVIEW DISCUSSION POINTS:
 * 
 * Q: "Implement binary search"
 * A: "I'll implement both iterative and recursive versions..."
 * 
 * Q: "What's the time complexity?"
 * A: "O(log n) because we eliminate half the search space each iteration"
 * 
 * Q: "What if the array isn't sorted?"
 * A: "Binary search won't work. We'd need to sort first O(n log n) or use linear search O(n)"
 * 
 * Q: "Iterative or recursive?"
 * A: "Iterative is more efficient (O(1) space vs O(log n)), but recursive is more elegant"
 * 
 * Q: "What about duplicates?"
 * A: "Standard binary search finds any occurrence. For first/last occurrence, 
 *     we modify the algorithm to continue searching even after finding target"
 * 
 * COMMON PITFALLS:
 * - Forgetting array must be sorted
 * - Off-by-one errors with indices
 * - Integer overflow in (left + right) / 2 (use left + (right - left) / 2)
 * - Infinite loops when updating left/right incorrectly
 * 
 * VARIATIONS TO KNOW:
 * - Finding insertion point
 * - Finding range of duplicates
 * - Searching in rotated sorted array
 * - Finding peak element
 * - Square root using binary search
 */

module.exports = {
    binarySearchIterative,
    binarySearchRecursive,
    binarySearchVisualized,
    binarySearchFirst,
    binarySearchLast
}; 