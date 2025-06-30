/**
 * PROBLEM: Remove Duplicates from Array
 * 
 * DESCRIPTION:
 * Given an array, return a new array with duplicate elements removed.
 * This problem tests understanding of data structures and different approaches.
 * 
 * EXAMPLES:
 * Input: [1, 2, 2, 3, 4, 4, 5] → Output: [1, 2, 3, 4, 5]
 * Input: ["a", "b", "a", "c", "b"] → Output: ["a", "b", "c"]
 * Input: [1, 1, 1, 1] → Output: [1]
 * Input: [] → Output: []
 * 
 * CONCEPTS:
 * - Set data structure
 * - Array filtering
 * - IndexOf method
 * - Object as hash map
 */

// Method 1: Using Set (most efficient for modern JavaScript)
function removeDuplicatesSet(arr) {
    /**
     * APPROACH: Use Set to automatically handle uniqueness
     * 1. Create a Set from array (Set only stores unique values)
     * 2. Convert Set back to array using spread operator
     * 
     * TIME COMPLEXITY: O(n) - single pass through array
     * SPACE COMPLEXITY: O(n) - Set can store up to n unique elements
     * 
     * PROS: Clean, efficient, maintains insertion order
     * CONS: Doesn't work in very old browsers (IE < 11)
     */
    
    return [...new Set(arr)];
}

// Method 2: Using filter with indexOf
function removeDuplicatesFilter(arr) {
    /**
     * APPROACH: Keep only first occurrence of each element
     * 1. Use filter to create new array
     * 2. For each element, check if current index is first occurrence
     * 3. indexOf returns the first index of an element
     * 
     * TIME COMPLEXITY: O(n²) - indexOf is O(n) for each element
     * SPACE COMPLEXITY: O(n) - for the filtered array
     * 
     * PROS: Works in all browsers, easy to understand
     * CONS: Slower for large arrays due to O(n²) complexity
     */
    
    return arr.filter((item, index) => {
        // Keep element only if this is its first occurrence
        return arr.indexOf(item) === index;
    });
}

// Method 3: Using reduce with accumulator array
function removeDuplicatesReduce(arr) {
    /**
     * APPROACH: Build result array by checking if element already exists
     * 1. Use reduce to build new array
     * 2. For each element, check if it's already in accumulator
     * 3. Add only if not already present
     * 
     * TIME COMPLEXITY: O(n²) - includes check is O(n) for each element
     * SPACE COMPLEXITY: O(n) - for the accumulator array
     */
    
    return arr.reduce((unique, item) => {
        // Add item only if it's not already in the unique array
        if (!unique.includes(item)) {
            unique.push(item);
        }
        return unique;
    }, []);
}

// Method 4: Using object as hash map
function removeDuplicatesObject(arr) {
    /**
     * APPROACH: Use object to track seen elements
     * 1. Create empty object to track seen items
     * 2. Create empty result array
     * 3. For each element, check if seen before
     * 4. Add to result only if not seen
     * 
     * TIME COMPLEXITY: O(n) - single pass, O(1) object lookups
     * SPACE COMPLEXITY: O(n) - object and result array
     * 
     * PROS: Fast, works in all browsers
     * CONS: Converts all values to strings (object keys are strings)
     */
    
    const seen = {};
    const result = [];
    
    for (let i = 0; i < arr.length; i++) {
        const item = arr[i];
        
        // Object keys are strings, so this works for primitives
        if (!seen[item]) {
            seen[item] = true;
            result.push(item);
        }
    }
    
    return result;
}

// Method 5: Using Map for better type handling
function removeDuplicatesMap(arr) {
    /**
     * APPROACH: Use Map to track seen elements with proper type handling
     * 1. Create Map to track seen items (preserves types)
     * 2. Create result array
     * 3. For each element, check if seen before
     * 4. Add to result only if not seen
     * 
     * TIME COMPLEXITY: O(n) - single pass, O(1) Map operations
     * SPACE COMPLEXITY: O(n) - Map and result array
     * 
     * PROS: Fast, preserves types, works with objects
     * CONS: Slightly more verbose than Set approach
     */
    
    const seen = new Map();
    const result = [];
    
    for (const item of arr) {
        if (!seen.has(item)) {
            seen.set(item, true);
            result.push(item);
        }
    }
    
    return result;
}

// Method 6: Traditional nested loop approach
function removeDuplicatesLoop(arr) {
    /**
     * APPROACH: Manual checking with nested loops
     * 1. Create result array
     * 2. For each element, check if it already exists in result
     * 3. Add only if not found
     * 
     * TIME COMPLEXITY: O(n²) - nested loop structure
     * SPACE COMPLEXITY: O(n) - for result array
     * 
     * PROS: Very explicit, works everywhere
     * CONS: Slowest approach, more code
     */
    
    const result = [];
    
    for (let i = 0; i < arr.length; i++) {
        let isDuplicate = false;
        
        // Check if current item is already in result
        for (let j = 0; j < result.length; j++) {
            if (arr[i] === result[j]) {
                isDuplicate = true;
                break;
            }
        }
        
        // Add only if not duplicate
        if (!isDuplicate) {
            result.push(arr[i]);
        }
    }
    
    return result;
}

// Test all approaches
function testRemoveDuplicates() {
    console.log("=== Testing Remove Duplicates Methods ===");
    
    const testCases = [
        [1, 2, 2, 3, 4, 4, 5],
        ["a", "b", "a", "c", "b"],
        [1, 1, 1, 1],
        [],
        [1],
        [1, 2, 3, 4, 5], // no duplicates
        [5, 4, 3, 2, 1, 1, 2, 3, 4, 5], // reverse with duplicates
        [null, undefined, null, 0, false, "", 0, false] // falsy values
    ];
    
    const methods = [
        { name: "Set", func: removeDuplicatesSet },
        { name: "Filter", func: removeDuplicatesFilter },
        { name: "Reduce", func: removeDuplicatesReduce },
        { name: "Object", func: removeDuplicatesObject },
        { name: "Map", func: removeDuplicatesMap },
        { name: "Loop", func: removeDuplicatesLoop }
    ];
    
    testCases.forEach((testCase, index) => {
        console.log(`\nTest Case ${index + 1}: [${testCase.join(', ')}]`);
        
        methods.forEach(method => {
            const result = method.func([...testCase]); // spread to avoid mutation
            console.log(`${method.name.padEnd(8)}: [${result.join(', ')}]`);
        });
    });
}

// Performance comparison
function performanceTest() {
    console.log("\n=== Performance Test ===");
    
    // Create large array with many duplicates
    const largeArray = [];
    for (let i = 0; i < 10000; i++) {
        largeArray.push(Math.floor(Math.random() * 1000)); // 0-999 range
    }
    
    const methods = [
        { name: "Set", func: removeDuplicatesSet },
        { name: "Filter", func: removeDuplicatesFilter },
        { name: "Object", func: removeDuplicatesObject },
        { name: "Map", func: removeDuplicatesMap }
        // Skip reduce and loop for performance test - they're too slow
    ];
    
    methods.forEach(method => {
        const start = performance.now();
        const result = method.func([...largeArray]);
        const end = performance.now();
        console.log(`${method.name}: ${(end - start).toFixed(2)}ms (${result.length} unique items)`);
    });
}

// Run tests
testRemoveDuplicates();
performanceTest();

/**
 * KEY CONCEPTS LEARNED:
 * 
 * 1. Set Data Structure: Automatically handles uniqueness
 * 2. Hash Maps: Object/Map for O(1) lookups
 * 3. Array Methods: filter, reduce, indexOf, includes
 * 4. Performance Trade-offs: Time vs space complexity
 * 5. Type Considerations: Objects convert keys to strings
 * 
 * INTERVIEW DISCUSSION:
 * 
 * Q: "How would you remove duplicates from an array?"
 * A: "I can think of several approaches with different trade-offs..."
 * 
 * 1. Set (recommended): [...new Set(arr)]
 *    - Pros: Cleanest, fastest for modern JS
 *    - Cons: Doesn't work in very old browsers
 * 
 * 2. Filter with indexOf: arr.filter((item, index) => arr.indexOf(item) === index)
 *    - Pros: Works everywhere, easy to understand
 *    - Cons: O(n²) complexity
 * 
 * 3. Object/Map for tracking: Manual loop with seen tracking
 *    - Pros: Fast, good control
 *    - Cons: More verbose
 * 
 * Q: "Which approach would you choose?"
 * A: "For modern browsers, Set is cleanest. For older browsers or when you need
 *     more control, I'd use the Map approach for performance."
 * 
 * Q: "What about edge cases?"
 * A: "Empty arrays, single elements, all duplicates, falsy values like null/undefined"
 * 
 * RECOMMENDATION FOR INTERVIEWS:
 * 1. Start with Set approach (shows you know modern JS)
 * 2. Discuss the filter approach (shows you understand the logic)
 * 3. Mention performance considerations
 * 4. Handle edge cases in your solution
 */

module.exports = {
    removeDuplicatesSet,
    removeDuplicatesFilter,
    removeDuplicatesReduce,
    removeDuplicatesObject,
    removeDuplicatesMap,
    removeDuplicatesLoop
}; 