/**
 * PROBLEM: Move All Zeros to End
 * 
 * Move all zeros in an array to the end while maintaining the relative order
 * of non-zero elements.
 * 
 * Example:
 * Input: [0,1,0,3,12]
 * Output: [1,3,12,0,0]
 * 
 * Constraints:
 * - Must maintain relative order of non-zero elements
 * - Should modify array in-place
 * - Time complexity: O(n)
 * - Space complexity: O(1)
 */

/**
 * APPROACH 1: Two Pointers Technique
 * 
 * Algorithm:
 * 1. Use two pointers - one for reading (i) and one for writing (writeIndex)
 * 2. When we find a non-zero element, write it to writeIndex position
 * 3. After processing all elements, fill remaining positions with zeros
 * 
 * Time Complexity: O(n) - single pass through array
 * Space Complexity: O(1) - only using pointers
 */
function moveZerosToEnd(nums) {
    let writeIndex = 0;
    
    // Move all non-zero elements to the front
    for (let i = 0; i < nums.length; i++) {
        if (nums[i] !== 0) {
            nums[writeIndex] = nums[i];
            writeIndex++;
        }
    }
    
    // Fill remaining positions with zeros
    while (writeIndex < nums.length) {
        nums[writeIndex] = 0;
        writeIndex++;
    }
    
    return nums;
}

/**
 * APPROACH 2: Swap-based Two Pointers
 * 
 * Algorithm:
 * 1. Use left pointer to track position for next non-zero element
 * 2. Use right pointer to scan through array
 * 3. When right finds non-zero, swap with left position
 * 
 * This approach maintains order and does fewer writes
 */
function moveZerosToEndSwap(nums) {
    let left = 0;
    
    for (let right = 0; right < nums.length; right++) {
        if (nums[right] !== 0) {
            // Swap only if positions are different (optimization)
            if (left !== right) {
                [nums[left], nums[right]] = [nums[right], nums[left]];
            }
            left++;
        }
    }
    
    return nums;
}

/**
 * APPROACH 3: Using Extra Space (for understanding)
 * 
 * This approach creates a new array but helps understand the logic
 * Not optimal for space, but good for learning
 */
function moveZerosToEndExtraSpace(nums) {
    const result = [];
    let zeroCount = 0;
    
    // First pass: collect non-zero elements
    for (let num of nums) {
        if (num !== 0) {
            result.push(num);
        } else {
            zeroCount++;
        }
    }
    
    // Second pass: add zeros at the end
    for (let i = 0; i < zeroCount; i++) {
        result.push(0);
    }
    
    return result;
}

// Test cases
console.log("=== Move Zeros to End ===");

const test1 = [0, 1, 0, 3, 12];
console.log("Input:", test1);
console.log("Output (Two Pointers):", moveZerosToEnd([...test1]));
console.log("Output (Swap Method):", moveZerosToEndSwap([...test1]));

const test2 = [0, 0, 1];
console.log("\nInput:", test2);
console.log("Output:", moveZerosToEnd([...test2]));

const test3 = [1, 2, 3];
console.log("\nInput:", test3);
console.log("Output:", moveZerosToEnd([...test3]));

const test4 = [0, 0, 0];
console.log("\nInput:", test4);
console.log("Output:", moveZerosToEnd([...test4]));

/**
 * KEY INSIGHTS:
 * 
 * 1. Two Pointers Pattern: This problem uses the classic two-pointers technique
 *    where one pointer reads and another writes.
 * 
 * 2. Order Preservation: We maintain relative order by processing elements
 *    from left to right.
 * 
 * 3. In-place Modification: We modify the original array without using
 *    significant extra space.
 * 
 * 4. Edge Cases to Consider:
 *    - Array with no zeros
 *    - Array with all zeros
 *    - Array with single element
 *    - Empty array
 * 
 * 5. Optimization: The swap-based approach does fewer operations when there
 *    are fewer non-zero elements.
 */

// Additional test with performance comparison
function performanceTest() {
    const largeArray = Array(10000).fill(0).map((_, i) => i % 3 === 0 ? 0 : i);
    
    console.log("\n=== Performance Test ===");
    console.log("Array size:", largeArray.length);
    
    const start1 = performance.now();
    moveZerosToEnd([...largeArray]);
    const end1 = performance.now();
    console.log("Two Pointers method:", (end1 - start1).toFixed(4), "ms");
    
    const start2 = performance.now();
    moveZerosToEndSwap([...largeArray]);
    const end2 = performance.now();
    console.log("Swap method:", (end2 - start2).toFixed(4), "ms");
}

// Uncomment to run performance test
// performanceTest(); 