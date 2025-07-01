/**
 * PROBLEM: Rotate Array to the Right by K Steps
 * 
 * Given an array, rotate the array to the right by k steps, where k is non-negative.
 * 
 * Example:
 * Input: [1,2,3,4,5,6,7], k = 3
 * Output: [5,6,7,1,2,3,4]
 * 
 * Explanation: 
 * rotate 1 step to the right: [7,1,2,3,4,5,6]
 * rotate 2 steps to the right: [6,7,1,2,3,4,5]
 * rotate 3 steps to the right: [5,6,7,1,2,3,4]
 * 
 * Constraints:
 * - 1 <= nums.length <= 10^5
 * - -2^31 <= nums[i] <= 2^31 - 1
 * - 0 <= k <= 10^5
 */

/**
 * APPROACH 1: Using Extra Array (Easiest to understand)
 * 
 * Algorithm:
 * 1. Create a new array of same size
 * 2. Calculate new position for each element: (i + k) % n
 * 3. Copy elements to their new positions
 * 
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 */
function rotateArrayExtraSpace(nums, k) {
    const n = nums.length;
    k = k % n; // Handle cases where k > n
    
    const rotated = new Array(n);
    
    for (let i = 0; i < n; i++) {
        const newIndex = (i + k) % n;
        rotated[newIndex] = nums[i];
    }
    
    // Copy back to original array
    for (let i = 0; i < n; i++) {
        nums[i] = rotated[i];
    }
    
    return nums;
}

/**
 * APPROACH 2: Using Array Reverse (Optimal)
 * 
 * Algorithm:
 * 1. Reverse the entire array
 * 2. Reverse the first k elements
 * 3. Reverse the remaining n-k elements
 * 
 * Example: [1,2,3,4,5,6,7], k = 3
 * Step 1: [7,6,5,4,3,2,1] (reverse entire array)
 * Step 2: [5,6,7,4,3,2,1] (reverse first 3 elements)
 * Step 3: [5,6,7,1,2,3,4] (reverse last 4 elements)
 * 
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
function rotateArray(nums, k) {
    const n = nums.length;
    k = k % n; // Handle cases where k > n
    
    if (k === 0) return nums; // No rotation needed
    
    // Helper function to reverse array between indices
    function reverse(start, end) {
        while (start < end) {
            [nums[start], nums[end]] = [nums[end], nums[start]];
            start++;
            end--;
        }
    }
    
    // Step 1: Reverse entire array
    reverse(0, n - 1);
    
    // Step 2: Reverse first k elements
    reverse(0, k - 1);
    
    // Step 3: Reverse remaining elements
    reverse(k, n - 1);
    
    return nums;
}

/**
 * APPROACH 3: Cyclic Replacements (Most Complex but Educational)
 * 
 * Algorithm:
 * 1. Start from index 0, place element at its final position
 * 2. Take displaced element and place it at its final position
 * 3. Continue until we complete all cycles
 * 
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
function rotateArrayCyclic(nums, k) {
    const n = nums.length;
    k = k % n;
    
    if (k === 0) return nums;
    
    let count = 0; // Number of elements moved
    
    for (let start = 0; count < n; start++) {
        let current = start;
        let prev = nums[start];
        
        do {
            const next = (current + k) % n;
            const temp = nums[next];
            nums[next] = prev;
            prev = temp;
            current = next;
            count++;
        } while (start !== current);
    }
    
    return nums;
}

/**
 * APPROACH 4: Multiple Steps (Brute Force - for understanding)
 * 
 * Rotate array one step at a time, k times
 * Time Complexity: O(n * k)
 * Space Complexity: O(1)
 */
function rotateArrayBruteForce(nums, k) {
    const n = nums.length;
    k = k % n;
    
    for (let i = 0; i < k; i++) {
        rotateOneStep(nums);
    }
    
    return nums;
}

function rotateOneStep(nums) {
    const last = nums[nums.length - 1];
    for (let i = nums.length - 1; i > 0; i--) {
        nums[i] = nums[i - 1];
    }
    nums[0] = last;
}

// Test cases
console.log("=== Rotate Array to Right ===");

const test1 = [1, 2, 3, 4, 5, 6, 7];
const k1 = 3;
console.log("Input:", test1, "k =", k1);
console.log("Output (Reverse Method):", rotateArray([...test1], k1));
console.log("Output (Extra Space):", rotateArrayExtraSpace([...test1], k1));

const test2 = [-1, -100, 3, 99];
const k2 = 2;
console.log("\nInput:", test2, "k =", k2);
console.log("Output:", rotateArray([...test2], k2));

const test3 = [1, 2];
const k3 = 3; // k > array length
console.log("\nInput:", test3, "k =", k3);
console.log("Output:", rotateArray([...test3], k3));

const test4 = [1];
const k4 = 1;
console.log("\nInput:", test4, "k =", k4);
console.log("Output:", rotateArray([...test4], k4));

/**
 * VISUAL EXAMPLE of Reverse Method:
 * 
 * Original: [1, 2, 3, 4, 5, 6, 7], k = 3
 * 
 * Step 1 - Reverse entire array:
 * [1, 2, 3, 4, 5, 6, 7] → [7, 6, 5, 4, 3, 2, 1]
 * 
 * Step 2 - Reverse first k=3 elements:
 * [7, 6, 5, 4, 3, 2, 1] → [5, 6, 7, 4, 3, 2, 1]
 * 
 * Step 3 - Reverse remaining elements:
 * [5, 6, 7, 4, 3, 2, 1] → [5, 6, 7, 1, 2, 3, 4]
 * 
 * Result: [5, 6, 7, 1, 2, 3, 4] ✓
 */

console.log("\n=== Visual Step-by-step Example ===");
function rotateArrayWithSteps(nums, k) {
    const n = nums.length;
    k = k % n;
    
    console.log("Original array:", [...nums]);
    console.log("k =", k);
    
    if (k === 0) {
        console.log("No rotation needed");
        return nums;
    }
    
    function reverse(start, end) {
        while (start < end) {
            [nums[start], nums[end]] = [nums[end], nums[start]];
            start++;
            end--;
        }
    }
    
    // Step 1
    reverse(0, n - 1);
    console.log("Step 1 - Reverse entire array:", [...nums]);
    
    // Step 2
    reverse(0, k - 1);
    console.log(`Step 2 - Reverse first ${k} elements:`, [...nums]);
    
    // Step 3
    reverse(k, n - 1);
    console.log(`Step 3 - Reverse remaining elements:`, [...nums]);
    
    return nums;
}

rotateArrayWithSteps([1, 2, 3, 4, 5, 6, 7], 3);

/**
 * KEY INSIGHTS:
 * 
 * 1. Modulo Operation: Always use k % n to handle cases where k > array length
 * 
 * 2. Three Reverse Method: Most elegant and efficient in-place solution
 *    - Reverses are O(n/2) each, total still O(n)
 *    - No extra space needed
 *    - Easy to remember and implement
 * 
 * 3. Edge Cases:
 *    - k = 0 (no rotation)
 *    - k >= n (use modulo)
 *    - Single element array
 *    - Empty array
 * 
 * 4. Pattern Recognition: This problem teaches array manipulation fundamentals
 *    that appear in many other problems
 * 
 * 5. Trade-offs:
 *    - Extra space: Easy to understand, O(n) space
 *    - Reverse method: Optimal, O(1) space
 *    - Cyclic: Educational but complex to implement
 *    - Brute force: Simple but inefficient O(n*k) time
 */

// Performance comparison
function performanceComparison() {
    const largeArray = Array.from({length: 10000}, (_, i) => i);
    const k = 3000;
    
    console.log("\n=== Performance Comparison ===");
    console.log("Array size:", largeArray.length, "k:", k);
    
    const start1 = performance.now();
    rotateArray([...largeArray], k);
    const end1 = performance.now();
    console.log("Reverse method:", (end1 - start1).toFixed(4), "ms");
    
    const start2 = performance.now();
    rotateArrayExtraSpace([...largeArray], k);
    const end2 = performance.now();
    console.log("Extra space method:", (end2 - start2).toFixed(4), "ms");
}

// Uncomment to run performance test
// performanceComparison(); 