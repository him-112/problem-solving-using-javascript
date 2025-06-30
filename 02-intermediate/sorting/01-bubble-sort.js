/**
 * PROBLEM: Bubble Sort Algorithm
 * 
 * DESCRIPTION:
 * Implement bubble sort algorithm to sort an array in ascending order.
 * Bubble sort is a simple sorting algorithm that repeatedly steps through the list,
 * compares adjacent elements and swaps them if they're in wrong order.
 * 
 * WHY LEARN BUBBLE SORT:
 * - Fundamental sorting algorithm concept
 * - Easy to understand and implement
 * - Good for learning algorithm analysis
 * - Often asked in interviews to test basic understanding
 * 
 * TIME COMPLEXITY: 
 * - Best Case: O(n) - when array is already sorted (with optimization)
 * - Average Case: O(n²)
 * - Worst Case: O(n²) - when array is reverse sorted
 * 
 * SPACE COMPLEXITY: O(1) - sorts in place
 */

// Method 1: Basic Bubble Sort
function bubbleSortBasic(arr) {
    /**
     * APPROACH: Compare adjacent elements and swap if needed
     * 1. For each pass, go through the array
     * 2. Compare each pair of adjacent elements
     * 3. Swap if left element > right element
     * 4. After each pass, largest element "bubbles up" to the end
     * 
     * WHY IT WORKS:
     * - After 1st pass: largest element is in correct position
     * - After 2nd pass: 2nd largest element is in correct position
     * - Continue until all elements are in correct positions
     */
    
    // Create copy to avoid modifying original array
    const result = [...arr];
    const n = result.length;
    
    // Outer loop: number of passes needed
    for (let i = 0; i < n - 1; i++) {
        console.log(`Pass ${i + 1}:`);
        
        // Inner loop: compare adjacent elements
        // After each pass, last i elements are already sorted
        for (let j = 0; j < n - 1 - i; j++) {
            // Compare adjacent elements
            if (result[j] > result[j + 1]) {
                // Swap if they're in wrong order
                [result[j], result[j + 1]] = [result[j + 1], result[j]];
                console.log(`  Swapped ${result[j + 1]} and ${result[j]}: [${result.join(', ')}]`);
            }
        }
        console.log(`  After pass ${i + 1}: [${result.join(', ')}]`);
    }
    
    return result;
}

// Method 2: Optimized Bubble Sort (detects if array is already sorted)
function bubbleSortOptimized(arr) {
    /**
     * OPTIMIZATION: Stop early if no swaps are made
     * If we go through a complete pass without making any swaps,
     * the array is already sorted and we can stop early.
     * 
     * This improves best-case complexity from O(n²) to O(n)
     */
    
    const result = [...arr];
    const n = result.length;
    
    for (let i = 0; i < n - 1; i++) {
        let swapped = false; // Flag to track if any swaps were made
        
        for (let j = 0; j < n - 1 - i; j++) {
            if (result[j] > result[j + 1]) {
                // Swap elements
                [result[j], result[j + 1]] = [result[j + 1], result[j]];
                swapped = true; // Mark that we made a swap
            }
        }
        
        // If no swaps were made, array is sorted
        if (!swapped) {
            console.log(`Array sorted after ${i + 1} passes (early termination)`);
            break;
        }
    }
    
    return result;
}

// Method 3: Bubble Sort with step-by-step visualization
function bubbleSortVisual(arr) {
    /**
     * EDUCATIONAL VERSION: Shows each comparison and swap
     * This version is for learning - shows exactly what's happening
     */
    
    console.log("=== Bubble Sort Step by Step ===");
    console.log(`Starting array: [${arr.join(', ')}]`);
    
    const result = [...arr];
    const n = result.length;
    let totalComparisons = 0;
    let totalSwaps = 0;
    
    for (let i = 0; i < n - 1; i++) {
        console.log(`\n--- Pass ${i + 1} ---`);
        let passSwaps = 0;
        
        for (let j = 0; j < n - 1 - i; j++) {
            totalComparisons++;
            
            console.log(`Comparing ${result[j]} and ${result[j + 1]}`);
            
            if (result[j] > result[j + 1]) {
                // Swap needed
                [result[j], result[j + 1]] = [result[j + 1], result[j]];
                totalSwaps++;
                passSwaps++;
                console.log(`  → Swapped! Array: [${result.join(', ')}]`);
            } else {
                console.log(`  → No swap needed`);
            }
        }
        
        console.log(`Pass ${i + 1} complete. Swaps made: ${passSwaps}`);
        console.log(`Array after pass ${i + 1}: [${result.join(', ')}]`);
    }
    
    console.log(`\nSorting complete!`);
    console.log(`Total comparisons: ${totalComparisons}`);
    console.log(`Total swaps: ${totalSwaps}`);
    console.log(`Final sorted array: [${result.join(', ')}]`);
    
    return result;
}

// Method 4: Recursive Bubble Sort
function bubbleSortRecursive(arr, n = arr.length) {
    /**
     * RECURSIVE APPROACH: Using recursion instead of loops
     * Base case: if n = 1, array is sorted
     * Recursive case: make one pass, then recursively sort n-1 elements
     * 
     * This is more of an academic exercise - iterative version is preferred
     */
    
    // Base case: if size is 1 or less, array is sorted
    if (n <= 1) {
        return arr;
    }
    
    // Make one pass through the array
    for (let i = 0; i < n - 1; i++) {
        if (arr[i] > arr[i + 1]) {
            // Swap elements
            [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
        }
    }
    
    // Recursively sort first n-1 elements
    return bubbleSortRecursive(arr, n - 1);
}

// Test function
function testBubbleSort() {
    console.log("=== Testing Bubble Sort Implementations ===");
    
    const testCases = [
        [64, 34, 25, 12, 22, 11, 90],    // Random order
        [5, 2, 8, 6, 1, 9, 4],           // Another random
        [1, 2, 3, 4, 5],                 // Already sorted (best case)
        [5, 4, 3, 2, 1],                 // Reverse sorted (worst case)
        [3, 3, 3, 3],                    // All same elements
        [42],                            // Single element
        [],                              // Empty array
        [3, 1]                           // Two elements
    ];
    
    testCases.forEach((testCase, index) => {
        console.log(`\n--- Test Case ${index + 1}: [${testCase.join(', ')}] ---`);
        
        if (testCase.length <= 5) {
            // Use visual version for small arrays
            const result = bubbleSortVisual([...testCase]);
        } else {
            // Use optimized version for larger arrays
            const result = bubbleSortOptimized([...testCase]);
            console.log(`Sorted: [${result.join(', ')}]`);
        }
    });
}

// Performance comparison with built-in sort
function performanceComparison() {
    console.log("\n=== Performance Comparison ===");
    
    // Generate random array
    const size = 1000;
    const randomArray = Array.from({ length: size }, () => Math.floor(Math.random() * 1000));
    
    // Test bubble sort
    console.log(`Testing with array of ${size} elements...`);
    
    const start1 = performance.now();
    bubbleSortOptimized([...randomArray]);
    const end1 = performance.now();
    
    // Test built-in sort
    const start2 = performance.now();
    [...randomArray].sort((a, b) => a - b);
    const end2 = performance.now();
    
    console.log(`Bubble Sort: ${(end1 - start1).toFixed(2)}ms`);
    console.log(`Built-in Sort: ${(end2 - start2).toFixed(2)}ms`);
    console.log(`Built-in is ${((end1 - start1) / (end2 - start2)).toFixed(1)}x faster`);
}

// Educational function: Why bubble sort is inefficient
function explainComplexity() {
    console.log("\n=== Understanding Time Complexity ===");
    
    const sizes = [5, 10, 20, 50];
    
    sizes.forEach(size => {
        const comparisons = ((size - 1) * size) / 2; // n(n-1)/2 comparisons
        console.log(`Array size ${size}: ~${comparisons} comparisons needed`);
    });
    
    console.log("\nThis is why bubble sort is O(n²) - comparisons grow quadratically!");
    console.log("For 100 elements: ~4,950 comparisons");
    console.log("For 1000 elements: ~499,500 comparisons");
}

// Run all tests and examples
testBubbleSort();
performanceComparison();
explainComplexity();

/**
 * KEY CONCEPTS LEARNED:
 * 
 * 1. Algorithm Analysis: Understanding time and space complexity
 * 2. Optimization Techniques: Early termination when array is sorted
 * 3. Comparison-based Sorting: How elements are ordered through comparisons
 * 4. In-place Sorting: Modifying array without using extra space
 * 5. Algorithm Visualization: Understanding step-by-step execution
 * 
 * INTERVIEW DISCUSSION POINTS:
 * 
 * Q: "Implement bubble sort"
 * A: "I'll implement the basic version first, then show an optimization..."
 * 
 * Q: "What's the time complexity?"
 * A: "O(n²) average and worst case, but O(n) best case with optimization"
 * 
 * Q: "Why is it called bubble sort?"
 * A: "Because smaller elements 'bubble up' to the beginning, like air bubbles in water"
 * 
 * Q: "Is bubble sort practical?"
 * A: "No, it's mainly educational. For real applications, use built-in sort() 
 *     or algorithms like quicksort/mergesort"
 * 
 * Q: "When might you use bubble sort?"
 * A: "Only for very small datasets or when simplicity is more important than efficiency"
 * 
 * VARIATIONS TO DISCUSS:
 * - Cocktail sort (bidirectional bubble sort)
 * - Odd-even sort (parallel version)
 * - Comparison with other O(n²) algorithms like selection sort
 * 
 * OPTIMIZATION IDEAS:
 * - Early termination (implemented above)
 * - Reduce range after each pass (implemented above)
 * - Remember position of last swap to optimize next pass
 */

module.exports = {
    bubbleSortBasic,
    bubbleSortOptimized,
    bubbleSortVisual,
    bubbleSortRecursive
}; 