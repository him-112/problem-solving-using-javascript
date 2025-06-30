/**
 * PROBLEM: Reverse a String
 * 
 * DESCRIPTION:
 * Given a string, return the string with characters in reverse order.
 * This is a fundamental string manipulation problem.
 * 
 * EXAMPLES:
 * Input: "hello" → Output: "olleh"
 * Input: "JavaScript" → Output: "tpircSavaJ"
 * Input: "a" → Output: "a"
 * Input: "" → Output: ""
 * 
 * CONCEPTS TESTED:
 * - String manipulation
 * - Different iteration approaches
 * - Built-in methods vs manual implementation
 */

// Method 1: Using built-in methods (simplest)
function reverseStringBuiltIn(str) {
    /**
     * APPROACH: Use split, reverse, and join
     * 1. Split string into array of characters
     * 2. Reverse the array using built-in reverse()
     * 3. Join array back into string
     * 
     * TIME COMPLEXITY: O(n) - each operation goes through the string once
     * SPACE COMPLEXITY: O(n) - creates array of characters
     */
    
    return str.split('').reverse().join('');
}

// Method 2: Traditional for loop
function reverseStringLoop(str) {
    /**
     * APPROACH: Build new string from end to beginning
     * 1. Start with empty result string
     * 2. Loop from last character to first
     * 3. Append each character to result
     * 
     * TIME COMPLEXITY: O(n) - single pass through string
     * SPACE COMPLEXITY: O(n) - for the result string
     */
    
    let result = '';
    
    // Start from last character (length-1) and go to first (0)
    for (let i = str.length - 1; i >= 0; i--) {
        result += str[i];  // Append character to result
    }
    
    return result;
}

// Method 3: Recursion approach
function reverseStringRecursive(str) {
    /**
     * APPROACH: Recursive divide and conquer
     * 1. Base case: empty string or single character
     * 2. Recursive case: last character + reverse of remaining string
     * 
     * TIME COMPLEXITY: O(n) - each character processed once
     * SPACE COMPLEXITY: O(n) - recursion stack depth
     */
    
    // Base case: empty string or single character
    if (str.length <= 1) {
        return str;
    }
    
    // Recursive case: last character + reverse of rest
    // str.slice(0, -1) gets all characters except the last one
    // str.slice(-1) gets the last character
    return str.slice(-1) + reverseStringRecursive(str.slice(0, -1));
}

// Method 4: Two pointers (in-place for arrays)
function reverseStringTwoPointers(str) {
    /**
     * APPROACH: Convert to array and swap characters from both ends
     * Note: Strings are immutable in JavaScript, so we need to use array
     * 
     * 1. Convert string to array
     * 2. Use two pointers from start and end
     * 3. Swap characters and move pointers inward
     * 4. Convert back to string
     * 
     * TIME COMPLEXITY: O(n) - visit each character once
     * SPACE COMPLEXITY: O(n) - for the character array
     */
    
    // Convert to array since strings are immutable in JavaScript
    const chars = str.split('');
    
    let left = 0;
    let right = chars.length - 1;
    
    // Swap characters from both ends moving inward
    while (left < right) {
        // Swap characters at left and right positions
        [chars[left], chars[right]] = [chars[right], chars[left]];
        
        // Move pointers toward center
        left++;
        right--;
    }
    
    // Convert array back to string
    return chars.join('');
}

// Method 5: Using reduce (functional approach)
function reverseStringReduce(str) {
    /**
     * APPROACH: Use reduce to build string from right to left
     * 1. Split into array of characters
     * 2. Use reduce to accumulate characters in reverse order
     * 
     * TIME COMPLEXITY: O(n) - single pass through array
     * SPACE COMPLEXITY: O(n) - for character array and result
     */
    
    return str.split('').reduce((reversed, char) => {
        // Add current character to the beginning of accumulated string
        return char + reversed;
    }, '');
}

// Method 6: Using a stack (demonstrates stack data structure)
function reverseStringStack(str) {
    /**
     * APPROACH: Use stack's LIFO (Last In, First Out) property
     * 1. Push all characters onto stack
     * 2. Pop all characters to build reversed string
     * 
     * TIME COMPLEXITY: O(n) - push and pop each character once
     * SPACE COMPLEXITY: O(n) - for the stack
     */
    
    const stack = [];
    
    // Push all characters onto stack
    for (let char of str) {
        stack.push(char);
    }
    
    let result = '';
    // Pop characters from stack (LIFO order gives us reverse)
    while (stack.length > 0) {
        result += stack.pop();
    }
    
    return result;
}

// Test all approaches
function testStringReverse() {
    console.log("=== Testing String Reverse Methods ===");
    
    const testCases = [
        "hello",
        "JavaScript",
        "a",
        "",
        "12345",
        "racecar",  // palindrome
        "A man a plan a canal Panama"
    ];
    
    testCases.forEach((testCase, index) => {
        console.log(`\nTest Case ${index + 1}: "${testCase}"`);
        
        // Test all methods
        console.log(`Built-in:    "${reverseStringBuiltIn(testCase)}"`);
        console.log(`Loop:        "${reverseStringLoop(testCase)}"`);
        console.log(`Recursive:   "${reverseStringRecursive(testCase)}"`);
        console.log(`Two Pointers:"${reverseStringTwoPointers(testCase)}"`);
        console.log(`Reduce:      "${reverseStringReduce(testCase)}"`);
        console.log(`Stack:       "${reverseStringStack(testCase)}"`);
    });
}

// Performance comparison for larger strings
function performanceTest() {
    console.log("\n=== Performance Test ===");
    
    // Create a large string for testing
    const largeString = "a".repeat(10000);
    const methods = [
        { name: "Built-in", func: reverseStringBuiltIn },
        { name: "Loop", func: reverseStringLoop },
        { name: "Two Pointers", func: reverseStringTwoPointers },
        { name: "Reduce", func: reverseStringReduce },
        { name: "Stack", func: reverseStringStack }
        // Skip recursive for large strings to avoid stack overflow
    ];
    
    methods.forEach(method => {
        const start = performance.now();
        method.func(largeString);
        const end = performance.now();
        console.log(`${method.name}: ${(end - start).toFixed(2)}ms`);
    });
}

// Run tests
testStringReverse();
performanceTest();

/**
 * KEY CONCEPTS LEARNED:
 * 
 * 1. String Immutability: Strings can't be modified in place in JavaScript
 * 2. Multiple Approaches: Many ways to solve the same problem
 * 3. Built-in Methods: split(), reverse(), join() make it easy
 * 4. Algorithm Patterns: Two pointers, recursion, stack
 * 5. Performance Considerations: Different approaches have different performance
 * 
 * INTERVIEW DISCUSSION:
 * 
 * Q: "How would you reverse a string?"
 * A: "I can think of several approaches..."
 * 
 * 1. Built-in methods (simplest): str.split('').reverse().join('')
 * 2. Manual loop (more control): iterate backwards building new string
 * 3. Two pointers (optimal for arrays): swap from both ends
 * 4. Recursion (elegant): base case + recursive case
 * 
 * Q: "Which is most efficient?"
 * A: "For JavaScript strings, built-in methods or manual loop are typically fastest.
 *     Two pointers is great for mutable character arrays.
 *     Recursion risks stack overflow for very long strings."
 * 
 * Q: "What about edge cases?"
 * A: "Empty string, single character, very long strings, Unicode characters"
 * 
 * BEST PRACTICES:
 * - Use built-in methods for simplicity and readability
 * - Use manual loop if you need to understand the mechanics
 * - Consider recursion limits for very long strings
 * - Always test edge cases
 */

module.exports = {
    reverseStringBuiltIn,
    reverseStringLoop,
    reverseStringRecursive,
    reverseStringTwoPointers,
    reverseStringReduce,
    reverseStringStack
}; 