/**
 * PROBLEM: Container With Most Water
 * 
 * DESCRIPTION:
 * Given n non-negative integers representing heights of vertical lines,
 * find two lines that together with the x-axis forms a container that
 * holds the most water.
 * 
 * EXAMPLES:
 * Input: [1,8,6,2,5,4,8,3,7]
 * Output: 49 (lines at index 1 and 8: min(8,7) × (8-1) = 7 × 7 = 49)
 * 
 * Input: [1,1]
 * Output: 1 (min(1,1) × (1-0) = 1 × 1 = 1)
 * 
 * VISUAL REPRESENTATION:
 * Height: [1,8,6,2,5,4,8,3,7]
 * Index:   0 1 2 3 4 5 6 7 8
 * 
 * The container is formed by heights at index 1 (height 8) and index 8 (height 7)
 * Water level = min(8, 7) = 7
 * Width = 8 - 1 = 7
 * Area = 7 × 7 = 49
 */

// Method 1: Brute Force Approach
function maxAreaBruteForce(height) {
    /**
     * APPROACH: Check every possible pair of lines
     * 1. Use nested loops to check all combinations
     * 2. Calculate area for each pair
     * 3. Keep track of maximum area
     * 
     * TIME COMPLEXITY: O(n²) - nested loops
     * SPACE COMPLEXITY: O(1) - only using variables
     */
    
    console.log(`Finding max water area (brute force) for heights: [${height.join(', ')}]`);
    
    let maxArea = 0;
    let bestPair = [0, 0];
    
    for (let i = 0; i < height.length - 1; i++) {
        for (let j = i + 1; j < height.length; j++) {
            // Calculate area between lines i and j
            const width = j - i;
            const minHeight = Math.min(height[i], height[j]);
            const area = width * minHeight;
            
            console.log(`  Lines ${i}-${j}: heights [${height[i]}, ${height[j]}], width=${width}, area=${area}`);
            
            if (area > maxArea) {
                maxArea = area;
                bestPair = [i, j];
                console.log(`    New max area: ${maxArea}`);
            }
        }
    }
    
    console.log(`Best pair: lines ${bestPair[0]} and ${bestPair[1]} with area ${maxArea}`);
    return maxArea;
}

// Method 2: Two Pointers Approach (Optimal)
function maxAreaTwoPointers(height) {
    /**
     * APPROACH: Use two pointers from both ends
     * 1. Start with widest possible container (leftmost and rightmost lines)
     * 2. Move the pointer with smaller height inward
     * 3. Continue until pointers meet
     * 
     * WHY THIS WORKS:
     * - Moving the taller line inward cannot increase area (width decreases, height can't increase)
     * - Moving the shorter line inward might find a taller line and increase area
     * 
     * TIME COMPLEXITY: O(n) - single pass
     * SPACE COMPLEXITY: O(1) - only using pointers
     */
    
    console.log(`Finding max water area (two pointers) for heights: [${height.join(', ')}]`);
    
    let left = 0;
    let right = height.length - 1;
    let maxArea = 0;
    let bestPair = [0, 0];
    
    while (left < right) {
        // Calculate current area
        const width = right - left;
        const minHeight = Math.min(height[left], height[right]);
        const area = width * minHeight;
        
        console.log(`  Pointers ${left}-${right}: heights [${height[left]}, ${height[right]}], width=${width}, area=${area}`);
        
        if (area > maxArea) {
            maxArea = area;
            bestPair = [left, right];
            console.log(`    New max area: ${maxArea}`);
        }
        
        // Move the pointer with smaller height
        if (height[left] < height[right]) {
            console.log(`    Moving left pointer (${height[left]} < ${height[right]})`);
            left++;
        } else {
            console.log(`    Moving right pointer (${height[left]} >= ${height[right]})`);
            right--;
        }
    }
    
    console.log(`Best pair: lines ${bestPair[0]} and ${bestPair[1]} with area ${maxArea}`);
    return maxArea;
}

// Method 3: Two Pointers with Detailed Explanation
function maxAreaExplained(height) {
    /**
     * EDUCATIONAL VERSION: Shows why two pointers work
     * Demonstrates the logic behind moving pointers
     */
    
    console.log("=== Two Pointers Algorithm Explained ===");
    console.log(`Heights: [${height.join(', ')}]`);
    console.log("Strategy: Start wide, move shorter line inward\n");
    
    let left = 0;
    let right = height.length - 1;
    let maxArea = 0;
    let step = 1;
    
    while (left < right) {
        const width = right - left;
        const leftHeight = height[left];
        const rightHeight = height[right];
        const minHeight = Math.min(leftHeight, rightHeight);
        const area = width * minHeight;
        
        console.log(`Step ${step}:`);
        console.log(`  Left: index ${left}, height ${leftHeight}`);
        console.log(`  Right: index ${right}, height ${rightHeight}`);
        console.log(`  Width: ${width}, Water level: ${minHeight}`);
        console.log(`  Area: ${width} × ${minHeight} = ${area}`);
        
        if (area > maxArea) {
            maxArea = area;
            console.log(`  🎯 New maximum area: ${maxArea}`);
        } else {
            console.log(`  Current max: ${maxArea}`);
        }
        
        // Explain the movement decision
        if (leftHeight < rightHeight) {
            console.log(`  📈 Left height (${leftHeight}) < Right height (${rightHeight})`);
            console.log(`  → Move left pointer right to find potentially taller line`);
            left++;
        } else {
            console.log(`  📉 Right height (${rightHeight}) <= Left height (${leftHeight})`);
            console.log(`  → Move right pointer left to find potentially taller line`);
            right--;
        }
        
        console.log();
        step++;
    }
    
    console.log(`🏆 Maximum area found: ${maxArea}`);
    return maxArea;
}

// Method 4: Why Two Pointers Works - Proof
function explainTwoPointersLogic() {
    console.log("\n=== Why Two Pointers Algorithm Works ===");
    
    console.log("🧠 KEY INSIGHT:");
    console.log("Area = min(height[i], height[j]) × (j - i)");
    console.log();
    
    console.log("📏 Starting Position:");
    console.log("• Start with maximum possible width (left=0, right=n-1)");
    console.log("• This gives us the widest container");
    console.log();
    
    console.log("🔄 Movement Strategy:");
    console.log("• The area is limited by the shorter of the two lines");
    console.log("• Moving the taller line inward:");
    console.log("  - Decreases width by 1");
    console.log("  - Cannot increase height (still limited by shorter line)");
    console.log("  - Therefore, can only decrease or maintain area");
    console.log();
    console.log("• Moving the shorter line inward:");
    console.log("  - Decreases width by 1");
    console.log("  - Might find a taller line, potentially increasing area");
    console.log("  - This is our only chance to improve");
    console.log();
    
    console.log("✅ Proof of Correctness:");
    console.log("• We never miss the optimal solution because:");
    console.log("• If optimal solution uses the line we're moving away from,");
    console.log("• We would have already considered it in a previous iteration");
    console.log("• We systematically explore all potentially optimal solutions");
}

// Test and compare approaches
function testContainerProblem() {
    console.log("=== Testing Container With Most Water ===");
    
    const testCases = [
        [1, 8, 6, 2, 5, 4, 8, 3, 7], // Example from problem
        [1, 1],                      // Minimum case
        [4, 3, 2, 1, 4],            // Symmetric
        [1, 2, 1],                  // Small case
        [2, 3, 4, 5, 18, 17, 6],    // Larger example
        [1, 3, 2, 5, 25, 24, 5]     // Another example
    ];
    
    testCases.forEach((heights, index) => {
        console.log(`\n--- Test Case ${index + 1}: [${heights.join(', ')}] ---`);
        
        // Brute force approach
        console.log("\nBrute Force Method:");
        const bruteResult = maxAreaBruteForce(heights);
        
        console.log("\nTwo Pointers Method:");
        const twoPointersResult = maxAreaTwoPointers(heights);
        
        console.log("\nResults Comparison:");
        console.log(`Brute Force: ${bruteResult}`);
        console.log(`Two Pointers: ${twoPointersResult}`);
        console.log(`Results match: ${bruteResult === twoPointersResult ? '✓' : '✗'}`);
    });
}

// Performance comparison
function performanceComparison() {
    console.log("\n=== Performance Comparison ===");
    
    // Generate large test array
    const largeHeights = Array.from({ length: 1000 }, () => Math.floor(Math.random() * 100) + 1);
    
    console.log(`Testing with array of ${largeHeights.length} elements...`);
    
    // Brute force (only for smaller arrays due to O(n²) complexity)
    const smallHeights = largeHeights.slice(0, 100);
    
    let start = performance.now();
    const bruteResult = maxAreaBruteForce(smallHeights);
    let end = performance.now();
    console.log(`Brute Force (100 elements): ${(end - start).toFixed(4)}ms, Result: ${bruteResult}`);
    
    // Two pointers
    start = performance.now();
    const twoPointersResult = maxAreaTwoPointers(largeHeights);
    end = performance.now();
    console.log(`Two Pointers (1000 elements): ${(end - start).toFixed(4)}ms, Result: ${twoPointersResult}`);
    
    // Verify small array results match
    const smallTwoPointers = maxAreaTwoPointers(smallHeights);
    console.log(`Small array results match: ${bruteResult === smallTwoPointers ? '✓' : '✗'}`);
}

// Demonstrate the algorithm step by step
function demonstrateAlgorithm() {
    console.log("\n=== Step-by-Step Demonstration ===");
    const example = [1, 8, 6, 2, 5, 4, 8, 3, 7];
    maxAreaExplained(example);
    explainTwoPointersLogic();
}

// Run all demonstrations
testContainerProblem();
performanceComparison();
demonstrateAlgorithm();

/**
 * KEY CONCEPTS LEARNED:
 * 
 * 1. Two Pointers Technique: Moving pointers based on conditions
 * 2. Optimization: From O(n²) to O(n) using smart pointer movement
 * 3. Greedy Strategy: Always move the pointer that might improve the solution
 * 4. Mathematical Reasoning: Understanding why the algorithm works
 * 5. Trade-off Analysis: Width vs height in optimization problems
 * 
 * INTERVIEW DISCUSSION POINTS:
 * 
 * Q: "Find the container that holds the most water"
 * A: "I'll use the two pointers technique starting from both ends"
 * 
 * Q: "Why does moving the shorter line work?"
 * A: "Moving the taller line can only decrease area since width decreases and 
 *     height is still limited by the shorter line. Moving the shorter line 
 *     gives us a chance to find a taller line and increase area."
 * 
 * Q: "What's the time complexity?"
 * A: "O(n) with two pointers vs O(n²) with brute force"
 * 
 * Q: "How do you know you won't miss the optimal solution?"
 * A: "We systematically explore all potentially optimal solutions. If the 
 *     optimal uses a line we're moving away from, we already considered it."
 * 
 * TWO POINTERS PATTERN:
 * 1. Identify when you can eliminate part of search space
 * 2. Use conditions to determine which pointer to move
 * 3. Ensure you don't miss optimal solutions
 * 4. Often converts O(n²) to O(n) solutions
 * 
 * RELATED PROBLEMS:
 * - Trapping Rain Water
 * - 3Sum problem
 * - Remove duplicates from sorted array
 * - Valid palindrome
 */

module.exports = {
    maxAreaBruteForce,
    maxAreaTwoPointers,
    maxAreaExplained
}; 