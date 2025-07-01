/**
 * PROBLEM: Maximum Subarray Sum (Kadane's Algorithm)
 * 
 * Find the contiguous subarray within a one-dimensional array of numbers 
 * that has the largest sum.
 * 
 * Example:
 * Input: [-2,1,-3,4,-1,2,1,-5,4]
 * Output: 6 (subarray: [4,-1,2,1])
 * 
 * Constraints:
 * - 1 <= nums.length <= 10^5
 * - -10^4 <= nums[i] <= 10^4
 * 
 * Follow up: If you have figured out the O(n) solution, try coding another 
 * solution using the divide and conquer approach, which is more subtle.
 */

/**
 * APPROACH 1: Kadane's Algorithm (Classic Dynamic Programming)
 * 
 * Algorithm:
 * 1. Keep track of maximum sum ending at current position
 * 2. At each position, decide whether to extend existing subarray or start new one
 * 3. Update global maximum if current sum is better
 * 
 * Key insight: At each position, the maximum subarray ending here is either:
 * - Just the current element (start new subarray)
 * - Current element + maximum subarray ending at previous position
 * 
 * Time Complexity: O(n) - single pass
 * Space Complexity: O(1) - only using variables
 */
function maxSubarraySum(nums) {
    let maxSoFar = nums[0];      // Global maximum
    let maxEndingHere = nums[0]; // Maximum sum ending at current position
    
    for (let i = 1; i < nums.length; i++) {
        // Either extend existing subarray or start new one
        maxEndingHere = Math.max(nums[i], maxEndingHere + nums[i]);
        
        // Update global maximum
        maxSoFar = Math.max(maxSoFar, maxEndingHere);
    }
    
    return maxSoFar;
}

/**
 * APPROACH 2: Kadane's with Subarray Tracking
 * 
 * Same algorithm but also tracks the actual subarray that gives maximum sum
 */
function maxSubarrayWithIndices(nums) {
    let maxSum = nums[0];
    let currentSum = nums[0];
    let start = 0, end = 0, tempStart = 0;
    
    for (let i = 1; i < nums.length; i++) {
        if (currentSum < 0) {
            // Start new subarray
            currentSum = nums[i];
            tempStart = i;
        } else {
            // Extend existing subarray
            currentSum += nums[i];
        }
        
        if (currentSum > maxSum) {
            maxSum = currentSum;
            start = tempStart;
            end = i;
        }
    }
    
    return {
        maxSum,
        subarray: nums.slice(start, end + 1),
        startIndex: start,
        endIndex: end
    };
}

/**
 * APPROACH 3: Divide and Conquer Approach
 * 
 * Algorithm:
 * 1. Divide array into two halves
 * 2. Recursively find max subarray in left and right halves
 * 3. Find max subarray that crosses the middle
 * 4. Return maximum of the three
 * 
 * Time Complexity: O(n log n)
 * Space Complexity: O(log n) - recursion stack
 */
function maxSubarrayDivideConquer(nums) {
    function maxSubarrayHelper(nums, left, right) {
        // Base case
        if (left === right) {
            return nums[left];
        }
        
        const mid = Math.floor((left + right) / 2);
        
        // Find max subarray in left half
        const leftMax = maxSubarrayHelper(nums, left, mid);
        
        // Find max subarray in right half
        const rightMax = maxSubarrayHelper(nums, mid + 1, right);
        
        // Find max subarray crossing the middle
        let leftSum = Number.NEGATIVE_INFINITY;
        let sum = 0;
        for (let i = mid; i >= left; i--) {
            sum += nums[i];
            leftSum = Math.max(leftSum, sum);
        }
        
        let rightSum = Number.NEGATIVE_INFINITY;
        sum = 0;
        for (let i = mid + 1; i <= right; i++) {
            sum += nums[i];
            rightSum = Math.max(rightSum, sum);
        }
        
        const crossSum = leftSum + rightSum;
        
        // Return maximum of the three
        return Math.max(leftMax, rightMax, crossSum);
    }
    
    return maxSubarrayHelper(nums, 0, nums.length - 1);
}

/**
 * APPROACH 4: Brute Force (for understanding)
 * 
 * Check all possible subarrays and find maximum sum
 * Time Complexity: O(n²)
 * Space Complexity: O(1)
 */
function maxSubarrayBruteForce(nums) {
    let maxSum = Number.NEGATIVE_INFINITY;
    
    for (let i = 0; i < nums.length; i++) {
        let currentSum = 0;
        for (let j = i; j < nums.length; j++) {
            currentSum += nums[j];
            maxSum = Math.max(maxSum, currentSum);
        }
    }
    
    return maxSum;
}

/**
 * APPROACH 5: Prefix Sum Approach
 * 
 * Uses the fact that subarray sum from i to j = prefixSum[j] - prefixSum[i-1]
 * To maximize this, we want maximum prefixSum[j] - minimum prefixSum[i-1]
 */
function maxSubarrayPrefixSum(nums) {
    let maxSum = Number.NEGATIVE_INFINITY;
    let prefixSum = 0;
    let minPrefixSum = 0;
    
    for (let i = 0; i < nums.length; i++) {
        prefixSum += nums[i];
        
        // Current subarray sum ending at i
        const currentSum = prefixSum - minPrefixSum;
        maxSum = Math.max(maxSum, currentSum);
        
        // Update minimum prefix sum seen so far
        minPrefixSum = Math.min(minPrefixSum, prefixSum);
    }
    
    return maxSum;
}

// Test cases
console.log("=== Maximum Subarray Sum (Kadane's Algorithm) ===");

const test1 = [-2, 1, -3, 4, -1, 2, 1, -5, 4];
console.log("Input:", test1);
console.log("Kadane's Algorithm:", maxSubarraySum(test1));
console.log("With subarray details:", maxSubarrayWithIndices(test1));
console.log("Divide & Conquer:", maxSubarrayDivideConquer(test1));
console.log("Brute Force:", maxSubarrayBruteForce(test1));

const test2 = [1];
console.log("\nInput:", test2);
console.log("Output:", maxSubarraySum(test2));

const test3 = [5, 4, -1, 7, 8];
console.log("\nInput:", test3);
console.log("Output:", maxSubarraySum(test3));

const test4 = [-2, -1, -3, -4];
console.log("\nInput:", test4);
console.log("Output:", maxSubarraySum(test4));

/**
 * STEP-BY-STEP WALKTHROUGH
 * 
 * Array: [-2, 1, -3, 4, -1, 2, 1, -5, 4]
 * 
 * i=0: maxEndingHere = -2, maxSoFar = -2
 * i=1: maxEndingHere = max(1, -2+1) = 1, maxSoFar = max(-2, 1) = 1
 * i=2: maxEndingHere = max(-3, 1-3) = -2, maxSoFar = max(1, -2) = 1
 * i=3: maxEndingHere = max(4, -2+4) = 4, maxSoFar = max(1, 4) = 4
 * i=4: maxEndingHere = max(-1, 4-1) = 3, maxSoFar = max(4, 3) = 4
 * i=5: maxEndingHere = max(2, 3+2) = 5, maxSoFar = max(4, 5) = 5
 * i=6: maxEndingHere = max(1, 5+1) = 6, maxSoFar = max(5, 6) = 6
 * i=7: maxEndingHere = max(-5, 6-5) = 1, maxSoFar = max(6, 1) = 6
 * i=8: maxEndingHere = max(4, 1+4) = 5, maxSoFar = max(6, 5) = 6
 * 
 * Final answer: 6 (subarray [4, -1, 2, 1])
 */

console.log("\n=== Step-by-step Walkthrough ===");
function kadaneWithSteps(nums) {
    console.log("Array:", nums);
    let maxSoFar = nums[0];
    let maxEndingHere = nums[0];
    
    console.log(`i=0: maxEndingHere = ${maxEndingHere}, maxSoFar = ${maxSoFar}`);
    
    for (let i = 1; i < nums.length; i++) {
        maxEndingHere = Math.max(nums[i], maxEndingHere + nums[i]);
        maxSoFar = Math.max(maxSoFar, maxEndingHere);
        
        console.log(`i=${i}: maxEndingHere = max(${nums[i]}, ${maxEndingHere - nums[i]}+${nums[i]}) = ${maxEndingHere}, maxSoFar = ${maxSoFar}`);
    }
    
    return maxSoFar;
}

kadaneWithSteps([-2, 1, -3, 4, -1, 2, 1, -5, 4]);

/**
 * VARIATIONS AND EXTENSIONS:
 */

// 1. Maximum Subarray Product (similar problem)
function maxSubarrayProduct(nums) {
    let maxProduct = nums[0];
    let minProduct = nums[0]; // Keep track of minimum for negative numbers
    let result = nums[0];
    
    for (let i = 1; i < nums.length; i++) {
        if (nums[i] < 0) {
            // Swap max and min when we encounter negative number
            [maxProduct, minProduct] = [minProduct, maxProduct];
        }
        
        maxProduct = Math.max(nums[i], maxProduct * nums[i]);
        minProduct = Math.min(nums[i], minProduct * nums[i]);
        
        result = Math.max(result, maxProduct);
    }
    
    return result;
}

// 2. Maximum Sum of K-length Subarray (Sliding Window)
function maxSumKLength(nums, k) {
    let windowSum = 0;
    
    // Calculate sum of first window
    for (let i = 0; i < k; i++) {
        windowSum += nums[i];
    }
    
    let maxSum = windowSum;
    
    // Slide the window
    for (let i = k; i < nums.length; i++) {
        windowSum = windowSum - nums[i - k] + nums[i];
        maxSum = Math.max(maxSum, windowSum);
    }
    
    return maxSum;
}

console.log("\n=== Variations ===");
console.log("Max Product Subarray [2,3,-2,4]:", maxSubarrayProduct([2, 3, -2, 4]));
console.log("Max Sum K=3 Length [1,2,3,4,5]:", maxSumKLength([1, 2, 3, 4, 5], 3));

/**
 * KEY INSIGHTS:
 * 
 * 1. Dynamic Programming State:
 *    - dp[i] = maximum sum ending at position i
 *    - dp[i] = max(nums[i], dp[i-1] + nums[i])
 *    - Answer = max(dp[0], dp[1], ..., dp[n-1])
 * 
 * 2. Space Optimization:
 *    - We only need previous state, so use variables instead of array
 * 
 * 3. Negative Numbers:
 *    - When current sum becomes negative, better to start fresh
 *    - This is the key insight that makes the algorithm work
 * 
 * 4. Edge Cases:
 *    - All negative numbers: return the maximum (least negative)
 *    - Single element: return that element
 *    - All positive: return sum of entire array
 * 
 * 5. Applications:
 *    - Stock market: maximum profit from buying and selling
 *    - Image processing: finding brightest region
 *    - Bioinformatics: finding conserved regions in DNA sequences
 * 
 * 6. Pattern Recognition:
 *    - This is a classic "optimal substructure" problem
 *    - The solution uses "local optimum leads to global optimum"
 *    - Similar pattern appears in many DP problems
 */

// Performance comparison
function performanceTest() {
    const largeArray = Array.from({length: 100000}, () => 
        Math.floor(Math.random() * 21) - 10); // Random numbers -10 to 10
    
    console.log("\n=== Performance Test ===");
    console.log("Array size:", largeArray.length);
    
    const start1 = performance.now();
    maxSubarraySum(largeArray);
    const end1 = performance.now();
    console.log("Kadane's O(n):", (end1 - start1).toFixed(4), "ms");
    
    const start2 = performance.now();
    maxSubarrayDivideConquer(largeArray);
    const end2 = performance.now();
    console.log("Divide & Conquer O(n log n):", (end2 - start2).toFixed(4), "ms");
}

// Uncomment to run performance test
// performanceTest(); 