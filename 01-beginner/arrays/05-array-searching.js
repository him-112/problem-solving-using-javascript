/**
 * PROBLEM: Array Searching Algorithms
 * 
 * DESCRIPTION:
 * Basic searching techniques to find elements in arrays.
 * Essential foundation for understanding more complex search algorithms.
 * 
 * KEY CONCEPTS:
 * - Linear search through arrays
 * - Binary search on sorted arrays
 * - Finding multiple occurrences
 * - Index-based searching
 * - Search optimization techniques
 * 
 * EXAMPLES:
 * linearSearch([1,3,5,7], 5) = 2 (found at index 2)
 * binarySearch([1,3,5,7,9], 7) = 3 (found at index 3)
 */

// Method 1: Linear Search (Sequential Search)
function linearSearch(arr, target) {
    /**
     * APPROACH: Check each element one by one from start to end
     * Works on both sorted and unsorted arrays
     * 
     * TIME COMPLEXITY: O(n)
     * SPACE COMPLEXITY: O(1)
     */
    
    console.log(`linearSearch([${arr.join(',')}], ${target}) called`);
    
    for (let i = 0; i < arr.length; i++) {
        console.log(`  Checking index ${i}: ${arr[i]} vs ${target}`);
        
        if (arr[i] === target) {
            console.log(`  ✓ Found ${target} at index ${i}`);
            return i;
        }
    }
    
    console.log(`  ✗ ${target} not found in array`);
    return -1; // Not found
}

// Method 2: Linear Search - Find All Occurrences
function findAllOccurrences(arr, target) {
    /**
     * APPROACH: Continue searching after finding matches
     * Returns array of all indices where target is found
     * 
     * TIME COMPLEXITY: O(n)
     * SPACE COMPLEXITY: O(k) where k is number of occurrences
     */
    
    console.log(`findAllOccurrences([${arr.join(',')}], ${target}) called`);
    
    const indices = [];
    
    for (let i = 0; i < arr.length; i++) {
        console.log(`  Checking index ${i}: ${arr[i]} vs ${target}`);
        
        if (arr[i] === target) {
            indices.push(i);
            console.log(`  ✓ Found ${target} at index ${i}`);
        }
    }
    
    if (indices.length > 0) {
        console.log(`  Found ${indices.length} occurrences at indices: [${indices.join(',')}]`);
    } else {
        console.log(`  ✗ ${target} not found in array`);
    }
    
    return indices;
}

// Method 3: Binary Search (for sorted arrays)
function binarySearch(arr, target) {
    /**
     * APPROACH: Divide and conquer on sorted array
     * Compare with middle element and eliminate half
     * 
     * TIME COMPLEXITY: O(log n)
     * SPACE COMPLEXITY: O(1)
     */
    
    console.log(`binarySearch([${arr.join(',')}], ${target}) called`);
    console.log(`  Note: Array must be sorted for binary search to work`);
    
    let left = 0;
    let right = arr.length - 1;
    
    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        console.log(`  Searching range [${left}, ${right}], middle index: ${mid}, value: ${arr[mid]}`);
        
        if (arr[mid] === target) {
            console.log(`  ✓ Found ${target} at index ${mid}`);
            return mid;
        } else if (arr[mid] < target) {
            left = mid + 1;
            console.log(`  ${arr[mid]} < ${target}, searching right half [${left}, ${right}]`);
        } else {
            right = mid - 1;
            console.log(`  ${arr[mid]} > ${target}, searching left half [${left}, ${right}]`);
        }
    }
    
    console.log(`  ✗ ${target} not found in array`);
    return -1; // Not found
}

// Method 4: Find Minimum Element
function findMinimum(arr) {
    /**
     * APPROACH: Track minimum value while iterating
     * Return both value and index of minimum
     * 
     * TIME COMPLEXITY: O(n)
     * SPACE COMPLEXITY: O(1)
     */
    
    console.log(`findMinimum([${arr.join(',')}]) called`);
    
    if (arr.length === 0) {
        console.log(`  Empty array, no minimum`);
        return null;
    }
    
    let minValue = arr[0];
    let minIndex = 0;
    
    console.log(`  Starting with arr[0] = ${minValue} as minimum`);
    
    for (let i = 1; i < arr.length; i++) {
        console.log(`  Comparing arr[${i}] = ${arr[i]} with current min ${minValue}`);
        
        if (arr[i] < minValue) {
            minValue = arr[i];
            minIndex = i;
            console.log(`  ✓ New minimum: ${minValue} at index ${minIndex}`);
        }
    }
    
    console.log(`  Final minimum: ${minValue} at index ${minIndex}`);
    return { value: minValue, index: minIndex };
}

// Method 5: Find Maximum Element
function findMaximum(arr) {
    /**
     * APPROACH: Track maximum value while iterating
     * Return both value and index of maximum
     * 
     * TIME COMPLEXITY: O(n)
     * SPACE COMPLEXITY: O(1)
     */
    
    console.log(`findMaximum([${arr.join(',')}]) called`);
    
    if (arr.length === 0) {
        console.log(`  Empty array, no maximum`);
        return null;
    }
    
    let maxValue = arr[0];
    let maxIndex = 0;
    
    console.log(`  Starting with arr[0] = ${maxValue} as maximum`);
    
    for (let i = 1; i < arr.length; i++) {
        console.log(`  Comparing arr[${i}] = ${arr[i]} with current max ${maxValue}`);
        
        if (arr[i] > maxValue) {
            maxValue = arr[i];
            maxIndex = i;
            console.log(`  ✓ New maximum: ${maxValue} at index ${maxIndex}`);
        }
    }
    
    console.log(`  Final maximum: ${maxValue} at index ${maxIndex}`);
    return { value: maxValue, index: maxIndex };
}

// Method 6: Find Second Largest Element
function findSecondLargest(arr) {
    /**
     * APPROACH: Track both largest and second largest in one pass
     * Handle duplicates and edge cases
     * 
     * TIME COMPLEXITY: O(n)
     * SPACE COMPLEXITY: O(1)
     */
    
    console.log(`findSecondLargest([${arr.join(',')}]) called`);
    
    if (arr.length < 2) {
        console.log(`  Array too small, need at least 2 elements`);
        return null;
    }
    
    let largest = -Infinity;
    let secondLargest = -Infinity;
    
    for (let i = 0; i < arr.length; i++) {
        const current = arr[i];
        console.log(`  Processing arr[${i}] = ${current}`);
        
        if (current > largest) {
            secondLargest = largest;
            largest = current;
            console.log(`    New largest: ${largest}, second: ${secondLargest}`);
        } else if (current > secondLargest && current < largest) {
            secondLargest = current;
            console.log(`    New second largest: ${secondLargest}`);
        } else {
            console.log(`    No change: largest=${largest}, second=${secondLargest}`);
        }
    }
    
    if (secondLargest === -Infinity) {
        console.log(`  No second largest found (all elements might be equal)`);
        return null;
    }
    
    console.log(`  Second largest: ${secondLargest}`);
    return secondLargest;
}

// Method 7: Search in Range
function searchInRange(arr, target, startIndex, endIndex) {
    /**
     * APPROACH: Linear search within specified range
     * Useful for searching in subarrays
     * 
     * TIME COMPLEXITY: O(end - start)
     * SPACE COMPLEXITY: O(1)
     */
    
    console.log(`searchInRange([${arr.join(',')}], ${target}, ${startIndex}, ${endIndex}) called`);
    
    // Validate range
    if (startIndex < 0 || endIndex >= arr.length || startIndex > endIndex) {
        console.log(`  Invalid range: [${startIndex}, ${endIndex}]`);
        return -1;
    }
    
    console.log(`  Searching in range [${startIndex}, ${endIndex}]`);
    
    for (let i = startIndex; i <= endIndex; i++) {
        console.log(`  Checking index ${i}: ${arr[i]} vs ${target}`);
        
        if (arr[i] === target) {
            console.log(`  ✓ Found ${target} at index ${i}`);
            return i;
        }
    }
    
    console.log(`  ✗ ${target} not found in range [${startIndex}, ${endIndex}]`);
    return -1;
}

// Method 8: Find Element Closest to Target
function findClosest(arr, target) {
    /**
     * APPROACH: Track minimum difference while iterating
     * Return element with smallest absolute difference
     * 
     * TIME COMPLEXITY: O(n)
     * SPACE COMPLEXITY: O(1)
     */
    
    console.log(`findClosest([${arr.join(',')}], ${target}) called`);
    
    if (arr.length === 0) {
        console.log(`  Empty array`);
        return null;
    }
    
    let closestValue = arr[0];
    let closestIndex = 0;
    let minDiff = Math.abs(arr[0] - target);
    
    console.log(`  Starting with arr[0] = ${arr[0]}, diff = ${minDiff}`);
    
    for (let i = 1; i < arr.length; i++) {
        const diff = Math.abs(arr[i] - target);
        console.log(`  arr[${i}] = ${arr[i]}, diff = ${diff}`);
        
        if (diff < minDiff) {
            closestValue = arr[i];
            closestIndex = i;
            minDiff = diff;
            console.log(`  ✓ New closest: ${closestValue} at index ${closestIndex}, diff = ${minDiff}`);
        }
    }
    
    console.log(`  Closest to ${target}: ${closestValue} at index ${closestIndex}`);
    return { value: closestValue, index: closestIndex, difference: minDiff };
}

// Method 9: Check if Array Contains Element
function contains(arr, target) {
    /**
     * APPROACH: Simple boolean check using linear search
     * More readable than checking if index != -1
     * 
     * TIME COMPLEXITY: O(n)
     * SPACE COMPLEXITY: O(1)
     */
    
    console.log(`contains([${arr.join(',')}], ${target}) called`);
    
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === target) {
            console.log(`  ✓ Array contains ${target}`);
            return true;
        }
    }
    
    console.log(`  ✗ Array does not contain ${target}`);
    return false;
}

// Method 10: Count Occurrences
function countOccurrences(arr, target) {
    /**
     * APPROACH: Count matches while iterating
     * Simple frequency counting
     * 
     * TIME COMPLEXITY: O(n)
     * SPACE COMPLEXITY: O(1)
     */
    
    console.log(`countOccurrences([${arr.join(',')}], ${target}) called`);
    
    let count = 0;
    
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === target) {
            count++;
            console.log(`  Found ${target} at index ${i}, count now: ${count}`);
        }
    }
    
    console.log(`  Total occurrences of ${target}: ${count}`);
    return count;
}

// Method 11: Find Intersection of Intervals
function findIntersectionOfIntervals(intervals) {
    /**
     * APPROACH: Find common intersection of multiple intervals
     * Track maximum start and minimum end across all intervals
     * 
     * TIME COMPLEXITY: O(n)
     * SPACE COMPLEXITY: O(1)
     */
    
    console.log(`findIntersectionOfIntervals(${JSON.stringify(intervals)}) called`);
    
    if (intervals.length === 0) {
        console.log(`  Empty intervals array`);
        return null;
    }
    
    if (intervals.length === 1) {
        console.log(`  Single interval: [${intervals[0][0]}, ${intervals[0][1]}]`);
        return intervals[0];
    }
    
    let start = intervals[0][0];
    let end = intervals[0][1];
    
    console.log(`  Starting with interval [${start}, ${end}]`);
    
    for (let i = 1; i < intervals.length; i++) {
        const currentStart = intervals[i][0];
        const currentEnd = intervals[i][1];
        
        console.log(`  Processing interval [${currentStart}, ${currentEnd}]`);
        
        start = Math.max(start, currentStart);
        end = Math.min(end, currentEnd);
        
        console.log(`    Updated intersection: [${start}, ${end}]`);
    }
    
    if (start <= end) {
        console.log(`  ✓ Intersection found: [${start}, ${end}]`);
        return [start, end];
    } else {
        console.log(`  ✗ No intersection (start ${start} > end ${end})`);
        return null;
    }
}

// Test all searching functions
function testSearchingAlgorithms() {
    console.log("=== Testing Array Searching Algorithms ===");
    
    const unsortedArray = [64, 34, 25, 12, 22, 11, 90, 25];
    const sortedArray = [11, 12, 22, 25, 34, 64, 90];
    const duplicatesArray = [1, 2, 3, 2, 4, 2, 5];
    
    // Test Linear Search
    console.log("\n--- Linear Search ---");
    linearSearch(unsortedArray, 22);
    linearSearch(unsortedArray, 99);
    
    // Test Find All Occurrences
    console.log("\n--- Find All Occurrences ---");
    findAllOccurrences(duplicatesArray, 2);
    findAllOccurrences(duplicatesArray, 6);
    
    // Test Binary Search
    console.log("\n--- Binary Search ---");
    binarySearch(sortedArray, 25);
    binarySearch(sortedArray, 50);
    
    // Test Min/Max Finding
    console.log("\n--- Find Min/Max ---");
    findMinimum(unsortedArray);
    findMaximum(unsortedArray);
    findSecondLargest(unsortedArray);
    
    // Test Range Search
    console.log("\n--- Search in Range ---");
    searchInRange(unsortedArray, 25, 2, 5);
    searchInRange(unsortedArray, 99, 0, 3);
    
    // Test Closest Element
    console.log("\n--- Find Closest Element ---");
    findClosest([10, 20, 30, 40, 50], 35);
    findClosest([1, 3, 7, 15], 6);
    
    // Test Contains and Count
    console.log("\n--- Contains and Count ---");
    contains(duplicatesArray, 2);
    contains(duplicatesArray, 10);
    countOccurrences(duplicatesArray, 2);
    countOccurrences(duplicatesArray, 1);
    
    // Test Intersection of Intervals
    console.log("\n--- Find Intersection of Intervals ---");
    const intervals1 = [[1,3],[2,4],[3,5]];
    const intervals2 = [[1,2],[3,4],[5,6]];
    const intervals3 = [[1,5],[2,3]];
    
    findIntersectionOfIntervals(intervals1);
    findIntersectionOfIntervals(intervals2);
    findIntersectionOfIntervals(intervals3);
}

// Practical examples
function practicalExamples() {
    console.log("\n=== Practical Examples ===");
    
    // Example 1: Student Grade Search
    console.log("\n--- Student Grade Search ---");
    const grades = [85, 92, 78, 96, 88, 74, 90];
    const studentNames = ["Alice", "Bob", "Charlie", "Diana", "Eve", "Frank", "Grace"];
    
    function findStudentGrade(studentName) {
        const index = studentNames.indexOf(studentName);
        if (index !== -1) {
            console.log(`${studentName}'s grade: ${grades[index]}`);
            return grades[index];
        } else {
            console.log(`Student ${studentName} not found`);
            return null;
        }
    }
    
    findStudentGrade("Charlie");
    findStudentGrade("Henry");
    
    // Example 2: Inventory Search
    console.log("\n--- Inventory Search ---");
    const inventory = [
        { id: 101, name: "Laptop", quantity: 5 },
        { id: 102, name: "Mouse", quantity: 25 },
        { id: 103, name: "Keyboard", quantity: 15 },
        { id: 104, name: "Monitor", quantity: 8 }
    ];
    
    function findProduct(productId) {
        console.log(`Searching for product ID: ${productId}`);
        for (let i = 0; i < inventory.length; i++) {
            if (inventory[i].id === productId) {
                console.log(`Found: ${inventory[i].name}, Quantity: ${inventory[i].quantity}`);
                return inventory[i];
            }
        }
        console.log(`Product ID ${productId} not found`);
        return null;
    }
    
    findProduct(102);
    findProduct(105);
}

// Performance comparison
function performanceComparison() {
    console.log("\n=== Performance Comparison ===");
    
    // Create test arrays
    const smallArray = Array.from({ length: 100 }, (_, i) => i);
    const largeArray = Array.from({ length: 10000 }, (_, i) => i);
    const target = 7500;
    
    console.log("Testing search performance:");
    
    // Linear search on large array
    let start = performance.now();
    linearSearch(largeArray, target);
    let end = performance.now();
    console.log(`Linear search (10000 elements): ${(end - start).toFixed(4)}ms`);
    
    // Binary search on large array (already sorted)
    start = performance.now();
    binarySearch(largeArray, target);
    end = performance.now();
    console.log(`Binary search (10000 elements): ${(end - start).toFixed(4)}ms`);
    
    // Built-in methods for comparison
    start = performance.now();
    largeArray.indexOf(target);
    end = performance.now();
    console.log(`Built-in indexOf: ${(end - start).toFixed(4)}ms`);
    
    start = performance.now();
    largeArray.includes(target);
    end = performance.now();
    console.log(`Built-in includes: ${(end - start).toFixed(4)}ms`);
}

// Educational explanations  
function explainSearching() {
    console.log("\n=== Understanding Array Searching ===");
    
    console.log("🔍 SEARCH ALGORITHM TYPES:");
    console.log("• Linear Search: Check each element sequentially");
    console.log("• Binary Search: Divide and conquer on sorted arrays");
    console.log("• Interpolation Search: Estimate position based on value");
    console.log("• Jump Search: Skip elements in fixed steps");
    console.log();
    
    console.log("⚡ WHEN TO USE EACH:");
    console.log("• Linear Search: Small arrays, unsorted data, simple implementation");
    console.log("• Binary Search: Large sorted arrays, frequent searches");
    console.log("• Built-in methods: When performance isn't critical");
    console.log();
    
    console.log("📊 COMPLEXITY COMPARISON:");
    console.log("• Linear Search: O(n) time, O(1) space");
    console.log("• Binary Search: O(log n) time, O(1) space");
    console.log("• Finding min/max: O(n) time, O(1) space");
    console.log();
    
    console.log("🎯 OPTIMIZATION TIPS:");
    console.log("• Sort array first if doing multiple searches"); 
    console.log("• Use early termination when possible");
    console.log("• Consider hash tables for O(1) lookup");
    console.log("• Cache results for repeated searches");
    console.log();
    
    console.log("💡 COMMON PATTERNS:");
    console.log("1. Find element → Return index or -1");
    console.log("2. Find all → Return array of indices");
    console.log("3. Find min/max → Track while iterating");
    console.log("4. Find closest → Track minimum difference");
    console.log("5. Count occurrences → Increment counter");
    console.log();
    
    console.log("🔧 INTERVIEW TIPS:");
    console.log("• Ask if array is sorted");
    console.log("• Clarify what to return if not found");
    console.log("• Consider edge cases (empty array, duplicates)");
    console.log("• Explain time/space complexity");
    console.log("• Know when binary search applies");
}

// Run all demonstrations
testSearchingAlgorithms();
practicalExamples();
performanceComparison();
explainSearching();

/**
 * KEY CONCEPTS LEARNED:
 * 
 * 1. Linear Search: Sequential checking, works on any array
 * 2. Binary Search: Efficient for sorted arrays, divide and conquer
 * 3. Min/Max Finding: Single pass algorithms with tracking
 * 4. Multiple Occurrences: Continue searching after finding matches
 * 5. Range Searching: Search within specified bounds
 * 
 * INTERVIEW DISCUSSION POINTS:
 * 
 * Q: "How do you search for an element in an array?"
 * A: "If unsorted, use linear search O(n). If sorted, use binary search O(log n).
 *     Consider frequency of searches - worth sorting first if many searches."
 * 
 * Q: "What's the difference between linear and binary search?"
 * A: "Linear checks each element sequentially, works on any array.
 *     Binary divides search space in half, requires sorted array."
 * 
 * Q: "How do you find the second largest element?"
 * A: "Single pass: track both largest and second largest values.
 *     Update both when finding new maximum, update second when appropriate."
 * 
 * Q: "What if you need to find all occurrences?"
 * A: "Continue searching after finding matches, store all indices.
 *     Don't return early like basic search."
 * 
 * SEARCH PATTERNS:
 * 1. Single element: Return first occurrence index
 * 2. All occurrences: Return array of all indices  
 * 3. Min/Max: Track extremes during iteration
 * 4. Closest match: Track minimum difference
 * 5. Count: Increment counter for matches
 * 6. Range search: Limit search to bounds
 * 
 * RELATED CONCEPTS:
 * - Sorting Algorithms
 * - Hash Tables for O(1) lookup
 * - Two Pointers Technique
 * - Binary Search Tree
 * - Interpolation Search
 * - Jump Search
 */

module.exports = {
    linearSearch,
    findAllOccurrences,
    binarySearch,
    findMinimum,
    findMaximum,
    findSecondLargest,
    searchInRange,
    findClosest,
    contains,
    countOccurrences,
    findIntersectionOfIntervals
}; 