/**
 * PROBLEM: Palindrome Number
 * 
 * DESCRIPTION:
 * Determine whether an integer is a palindrome. A palindrome reads the same 
 * backward as forward.
 * 
 * EXAMPLES:
 * 121 → true (reads same forwards and backwards)
 * -121 → false (negative numbers are not palindromes)
 * 10 → false (01 is not the same as 10)
 * 1221 → true
 * 7 → true (single digit)
 * 
 * CONSTRAINTS:
 * - Don't convert to string (follow-up challenge)
 * - Handle negative numbers
 * - Consider integer overflow
 */

// Method 1: Convert to String (Simple approach)
function isPalindromeString(x) {
    /**
     * APPROACH: Convert number to string and compare with reverse
     * 1. Handle negative numbers (return false)
     * 2. Convert to string
     * 3. Compare with reversed string
     * 
     * TIME COMPLEXITY: O(log n) - where n is the number (digits)
     * SPACE COMPLEXITY: O(log n) - string storage
     */
    
    // Negative numbers are not palindromes
    if (x < 0) return false;
    
    const str = x.toString();
    const reversedStr = str.split('').reverse().join('');
    
    console.log(`Number: ${x}, String: "${str}", Reversed: "${reversedStr}"`);
    return str === reversedStr;
}

// Method 2: Mathematical Approach (No String Conversion)
function isPalindromeMath(x) {
    /**
     * APPROACH: Reverse the number mathematically and compare
     * 1. Handle negative numbers and numbers ending in 0
     * 2. Reverse the number digit by digit
     * 3. Compare original with reversed
     * 
     * TIME COMPLEXITY: O(log n)
     * SPACE COMPLEXITY: O(1) - constant space
     */
    
    // Negative numbers and numbers ending in 0 (except 0) are not palindromes
    if (x < 0 || (x % 10 === 0 && x !== 0)) {
        return false;
    }
    
    const original = x;
    let reversed = 0;
    
    console.log(`Reversing ${x} mathematically:`);
    
    while (x > 0) {
        const digit = x % 10;
        reversed = reversed * 10 + digit;
        x = Math.floor(x / 10);
        console.log(`  Digit: ${digit}, Reversed so far: ${reversed}, Remaining: ${x}`);
    }
    
    console.log(`Original: ${original}, Reversed: ${reversed}`);
    return original === reversed;
}

// Method 3: Optimized - Only Reverse Half (Most Efficient)
function isPalindromeOptimized(x) {
    /**
     * APPROACH: Only reverse half the digits
     * Stop when we've processed half the digits
     * 
     * KEY INSIGHT: We only need to reverse half the number
     * - For even length: reversed == x
     * - For odd length: reversed == Math.floor(x / 10)
     * 
     * TIME COMPLEXITY: O(log n / 2) - only half the digits
     * SPACE COMPLEXITY: O(1)
     */
    
    // Handle edge cases
    if (x < 0 || (x % 10 === 0 && x !== 0)) {
        return false;
    }
    
    let reversed = 0;
    console.log(`Optimized palindrome check for ${x}:`);
    
    // Stop when x becomes less than or equal to reversed
    while (x > reversed) {
        const digit = x % 10;
        reversed = reversed * 10 + digit;
        x = Math.floor(x / 10);
        console.log(`  x: ${x}, reversed: ${reversed}`);
    }
    
    // For even length: x == reversed
    // For odd length: x == Math.floor(reversed / 10)
    const isEvenLength = x === reversed;
    const isOddLength = x === Math.floor(reversed / 10);
    
    console.log(`Even length check: ${x} === ${reversed} = ${isEvenLength}`);
    console.log(`Odd length check: ${x} === ${Math.floor(reversed / 10)} = ${isOddLength}`);
    
    return isEvenLength || isOddLength;
}

// Method 4: Recursive Approach
function isPalindromeRecursive(x) {
    /**
     * APPROACH: Use recursion to check digits from both ends
     * Helper function to get digits and compare recursively
     * 
     * Educational purpose - shows recursive thinking
     */
    
    if (x < 0) return false;
    if (x < 10) return true;
    
    function getDigitCount(num) {
        return num.toString().length;
    }
    
    function getDigitAt(num, position) {
        return Math.floor(num / Math.pow(10, position)) % 10;
    }
    
    function checkRecursive(num, left, right) {
        if (left >= right) return true;
        
        const leftDigit = getDigitAt(num, right);
        const rightDigit = getDigitAt(num, left);
        
        console.log(`Comparing position ${left} (digit ${rightDigit}) with position ${right} (digit ${leftDigit})`);
        
        if (leftDigit !== rightDigit) return false;
        
        return checkRecursive(num, left + 1, right - 1);
    }
    
    const digitCount = getDigitCount(x);
    return checkRecursive(x, 0, digitCount - 1);
}

// Test all approaches
function testPalindromeCheckers() {
    console.log("=== Testing Palindrome Number Checkers ===");
    
    const testCases = [
        121,    // palindrome
        -121,   // negative
        10,     // ends with 0
        1221,   // even length palindrome
        12321,  // odd length palindrome
        7,      // single digit
        0,      // zero
        11,     // simple palindrome
        123,    // not palindrome
        1234321 // large palindrome
    ];
    
    testCases.forEach(testCase => {
        console.log(`\n--- Testing ${testCase} ---`);
        
        const stringResult = isPalindromeString(testCase);
        console.log(`String method: ${stringResult}`);
        
        const mathResult = isPalindromeMath(testCase);
        console.log(`Math method: ${mathResult}`);
        
        const optimizedResult = isPalindromeOptimized(testCase);
        console.log(`Optimized method: ${optimizedResult}`);
        
        const recursiveResult = isPalindromeRecursive(testCase);
        console.log(`Recursive method: ${recursiveResult}`);
        
        // Verify all methods agree
        const allAgree = [stringResult, mathResult, optimizedResult, recursiveResult]
            .every(result => result === stringResult);
        console.log(`All methods agree: ${allAgree ? '✓' : '✗'}`);
    });
}

// Performance comparison
function performanceComparison() {
    console.log("\n=== Performance Comparison ===");
    
    const largeNumbers = [
        1234567890987654321,
        1234567890123456789,
        9876543210123456789
    ];
    
    largeNumbers.forEach(num => {
        console.log(`\nTesting ${num}:`);
        
        // String method
        let start = performance.now();
        const stringResult = isPalindromeString(num);
        let end = performance.now();
        console.log(`String: ${stringResult} (${(end - start).toFixed(4)}ms)`);
        
        // Math method
        start = performance.now();
        const mathResult = isPalindromeMath(num);
        end = performance.now();
        console.log(`Math: ${mathResult} (${(end - start).toFixed(4)}ms)`);
        
        // Optimized method
        start = performance.now();
        const optimizedResult = isPalindromeOptimized(num);
        end = performance.now();
        console.log(`Optimized: ${optimizedResult} (${(end - start).toFixed(4)}ms)`);
    });
}

// Educational: Understanding the problem
function explainPalindromeLogic() {
    console.log("\n=== Understanding Palindrome Logic ===");
    
    console.log("📚 What makes a number a palindrome?");
    console.log("  ✓ Reads the same forwards and backwards");
    console.log("  ✓ First digit = Last digit, Second = Second-to-last, etc.");
    console.log("  ✓ Examples: 121, 1221, 7, 12321");
    
    console.log("\n🚫 What numbers are NOT palindromes?");
    console.log("  ✗ Negative numbers (by convention)");
    console.log("  ✗ Numbers ending in 0 (except 0 itself)");
    console.log("  ✗ Examples: -121, 10, 120");
    
    console.log("\n💡 Optimization insights:");
    console.log("  • Only need to check first half vs second half");
    console.log("  • Can stop reversing when we've done half the digits");
    console.log("  • Mathematical reversal avoids string conversion");
    
    console.log("\n🔢 Digit extraction math:");
    console.log("  • Last digit: num % 10");
    console.log("  • Remove last digit: Math.floor(num / 10)");
    console.log("  • Build reversed: reversed * 10 + digit");
}

// Run all demonstrations
testPalindromeCheckers();
performanceComparison();
explainPalindromeLogic();

/**
 * KEY CONCEPTS LEARNED:
 * 
 * 1. Mathematical Operations: Extracting digits without string conversion
 * 2. Optimization: Only processing half the digits saves time
 * 3. Edge Cases: Negative numbers, numbers ending in 0
 * 4. Multiple Approaches: String vs mathematical vs recursive
 * 5. Performance Analysis: Understanding trade-offs
 * 
 * INTERVIEW DISCUSSION POINTS:
 * 
 * Q: "Check if a number is a palindrome"
 * A: "I can think of several approaches, with different trade-offs..."
 * 
 * 1. String conversion: Simple but uses extra space
 * 2. Mathematical reversal: No extra space, more complex
 * 3. Half-reversal optimization: Best performance
 * 4. Recursive: Educational, shows pattern recognition
 * 
 * Q: "Can you do it without converting to string?"
 * A: "Yes, I can reverse the number mathematically using modulo operations"
 * 
 * Q: "How would you optimize further?"
 * A: "Only reverse half the digits - stop when reversed >= remaining number"
 * 
 * Q: "What about edge cases?"
 * A: "Negative numbers (false), numbers ending in 0 (false except 0), single digits (true)"
 * 
 * COMMON VARIATIONS:
 * - Palindrome string (similar logic)
 * - Palindrome linked list
 * - Longest palindromic substring
 * - Valid palindrome (ignoring spaces/punctuation)
 */

module.exports = {
    isPalindromeString,
    isPalindromeMath,
    isPalindromeOptimized,
    isPalindromeRecursive
}; 