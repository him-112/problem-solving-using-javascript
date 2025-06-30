/**
 * PROBLEM: Valid Parentheses
 * 
 * DESCRIPTION:
 * Given a string containing just the characters '(', ')', '{', '}', '[' and ']',
 * determine if the input string is valid. An input string is valid if:
 * 1. Open brackets must be closed by the same type of brackets
 * 2. Open brackets must be closed in the correct order
 * 3. Every close bracket has a corresponding open bracket of the same type
 * 
 * EXAMPLES:
 * "()" → true
 * "()[]{}" → true  
 * "(]" → false
 * "([)]" → false
 * "{[]}" → true
 * 
 * This is a classic stack problem that demonstrates LIFO (Last In, First Out) behavior.
 */

// Method 1: Stack with Array
function isValidStack(s) {
    /**
     * APPROACH: Use stack to track opening brackets
     * 1. Push opening brackets onto stack
     * 2. For closing brackets, check if they match top of stack
     * 3. String is valid if stack is empty at the end
     * 
     * TIME COMPLEXITY: O(n)
     * SPACE COMPLEXITY: O(n) - worst case all opening brackets
     */
    
    console.log(`Checking if "${s}" has valid parentheses (stack method):`);
    
    const stack = [];
    const pairs = {
        ')': '(',
        '}': '{',
        ']': '['
    };
    
    for (let i = 0; i < s.length; i++) {
        const char = s[i];
        
        if (char === '(' || char === '{' || char === '[') {
            // Opening bracket - push to stack
            stack.push(char);
            console.log(`  Step ${i + 1}: Found opening '${char}', stack: [${stack.join(', ')}]`);
        } else if (char === ')' || char === '}' || char === ']') {
            // Closing bracket - check if it matches top of stack
            if (stack.length === 0) {
                console.log(`  Step ${i + 1}: Found closing '${char}' but stack is empty - INVALID`);
                return false;
            }
            
            const top = stack.pop();
            const expected = pairs[char];
            
            console.log(`  Step ${i + 1}: Found closing '${char}', popped '${top}', expected '${expected}'`);
            
            if (top !== expected) {
                console.log(`    Mismatch! '${top}' !== '${expected}' - INVALID`);
                return false;
            }
            
            console.log(`    Match! Stack now: [${stack.join(', ')}]`);
        }
    }
    
    const isValid = stack.length === 0;
    console.log(`  Final stack: [${stack.join(', ')}], Valid: ${isValid}`);
    return isValid;
}

// Method 2: Counter-based approach (for simple parentheses only)
function isValidCounter(s) {
    /**
     * APPROACH: Simple counter for single type of brackets
     * Only works for strings with just '(' and ')' characters
     * 
     * TIME COMPLEXITY: O(n)
     * SPACE COMPLEXITY: O(1)
     */
    
    console.log(`Checking if "${s}" has valid parentheses (counter method - simple parentheses only):`);
    
    // Check if string contains only () brackets
    const hasOnlyParens = /^[()]*$/.test(s);
    if (!hasOnlyParens) {
        console.log("  Contains non-parentheses characters, using stack method instead");
        return isValidStack(s);
    }
    
    let count = 0;
    
    for (let i = 0; i < s.length; i++) {
        const char = s[i];
        
        if (char === '(') {
            count++;
            console.log(`  Step ${i + 1}: Found '(', count: ${count}`);
        } else if (char === ')') {
            count--;
            console.log(`  Step ${i + 1}: Found ')', count: ${count}`);
            
            if (count < 0) {
                console.log(`    Count went negative - INVALID`);
                return false;
            }
        }
    }
    
    const isValid = count === 0;
    console.log(`  Final count: ${count}, Valid: ${isValid}`);
    return isValid;
}

// Method 3: Replace Method (Alternative approach)
function isValidReplace(s) {
    /**
     * APPROACH: Repeatedly remove valid pairs
     * Keep removing "()", "{}", "[]" until no more can be removed
     * 
     * TIME COMPLEXITY: O(n²) in worst case
     * SPACE COMPLEXITY: O(n) for string operations
     * 
     * Note: Less efficient but demonstrates different thinking approach
     */
    
    console.log(`Checking if "${s}" has valid parentheses (replace method):`);
    
    let current = s;
    let step = 1;
    
    while (true) {
        const before = current;
        
        // Remove all valid pairs
        current = current.replace(/\(\)/g, '');
        current = current.replace(/\{\}/g, '');
        current = current.replace(/\[\]/g, '');
        
        console.log(`  Step ${step}: "${before}" -> "${current}"`);
        
        // If no change occurred, we're done
        if (current === before) {
            break;
        }
        
        step++;
    }
    
    const isValid = current.length === 0;
    console.log(`  Final string: "${current}", Valid: ${isValid}`);
    return isValid;
}

// Method 4: Stack with detailed tracking
function isValidDetailed(s) {
    /**
     * APPROACH: Enhanced stack method with detailed tracking
     * Shows the complete process step by step
     */
    
    console.log(`\n=== Detailed Valid Parentheses Check for "${s}" ===`);
    
    const stack = [];
    const pairs = { ')': '(', '}': '{', ']': '[' };
    const opening = new Set(['(', '{', '[']);
    const closing = new Set([')', '}', ']']);
    
    console.log("Processing each character:");
    
    for (let i = 0; i < s.length; i++) {
        const char = s[i];
        
        console.log(`\nPosition ${i}: Character '${char}'`);
        console.log(`Stack before: [${stack.join(', ')}]`);
        
        if (opening.has(char)) {
            stack.push(char);
            console.log(`→ Opening bracket: pushed '${char}' to stack`);
        } else if (closing.has(char)) {
            console.log(`→ Closing bracket: need to match with '${pairs[char]}'`);
            
            if (stack.length === 0) {
                console.log(`→ ERROR: No opening bracket to match!`);
                return false;
            }
            
            const top = stack.pop();
            if (top === pairs[char]) {
                console.log(`→ SUCCESS: '${char}' matches '${top}'`);
            } else {
                console.log(`→ ERROR: '${char}' doesn't match '${top}'!`);
                return false;
            }
        } else {
            console.log(`→ Not a bracket character, skipping`);
        }
        
        console.log(`Stack after: [${stack.join(', ')}]`);
    }
    
    console.log(`\nFinal check:`);
    console.log(`Stack: [${stack.join(', ')}]`);
    
    if (stack.length === 0) {
        console.log(`✅ All brackets matched - VALID`);
        return true;
    } else {
        console.log(`❌ Unmatched opening brackets - INVALID`);
        return false;
    }
}

// Test all approaches
function testValidParentheses() {
    console.log("=== Testing Valid Parentheses ===");
    
    const testCases = [
        "()",          // simple valid
        "()[]{}", // multiple valid
        "(]",          // mismatch
        "([)]",        // wrong order
        "{[]}",        // nested valid
        "(((",         // unmatched opening
        ")))",         // unmatched closing
        "",            // empty string
        "(())",        // nested simple
        "{[()]}",      // complex nested
        "(((",         // multiple unmatched
        "(){}[]",      // all types
    ];
    
    testCases.forEach((testCase, index) => {
        console.log(`\n--- Test Case ${index + 1}: "${testCase}" ---`);
        
        const stackResult = isValidStack(testCase);
        const counterResult = isValidCounter(testCase);
        const replaceResult = isValidReplace(testCase);
        
        console.log("\nResults Summary:");
        console.log(`Stack method: ${stackResult}`);
        console.log(`Counter method: ${counterResult}`);
        console.log(`Replace method: ${replaceResult}`);
        
        const allMatch = stackResult === counterResult && counterResult === replaceResult;
        console.log(`All methods agree: ${allMatch ? '✓' : '✗'}`);
        
        // Show detailed analysis for complex cases
        if (testCase.length > 2 && testCase.includes('[') || testCase.includes('{')) {
            isValidDetailed(testCase);
        }
    });
}

// Performance comparison
function performanceComparison() {
    console.log("\n=== Performance Comparison ===");
    
    // Generate test strings
    const balanced = "()".repeat(1000) + "{}".repeat(1000) + "[]".repeat(1000);
    const unbalanced = "(".repeat(1000) + ")".repeat(1000);
    const mixed = "({[()]})".repeat(500);
    
    const testCases = [
        { name: "Balanced (3000 chars)", str: balanced },
        { name: "Unbalanced (2000 chars)", str: unbalanced },
        { name: "Mixed nested (4000 chars)", str: mixed }
    ];
    
    testCases.forEach(({ name, str }) => {
        console.log(`\n${name}:`);
        
        // Stack method
        let start = performance.now();
        const stackResult = isValidStack(str);
        let end = performance.now();
        console.log(`Stack: ${stackResult} (${(end - start).toFixed(4)}ms)`);
        
        // Counter method (for simple parentheses)
        if (/^[()]*$/.test(str)) {
            start = performance.now();
            const counterResult = isValidCounter(str);
            end = performance.now();
            console.log(`Counter: ${counterResult} (${(end - start).toFixed(4)}ms)`);
        }
        
        // Replace method (only for shorter strings due to O(n²) complexity)
        if (str.length < 1000) {
            start = performance.now();
            const replaceResult = isValidReplace(str);
            end = performance.now();
            console.log(`Replace: ${replaceResult} (${(end - start).toFixed(4)}ms)`);
        }
    });
}

// Educational: Stack concepts
function explainStackConcepts() {
    console.log("\n=== Understanding Stack Data Structure ===");
    
    console.log("📚 STACK FUNDAMENTALS:");
    console.log("• LIFO: Last In, First Out");
    console.log("• Push: Add element to top");
    console.log("• Pop: Remove element from top");
    console.log("• Peek/Top: Look at top element without removing");
    console.log("• Empty: Check if stack has no elements");
    console.log();
    
    console.log("🎯 WHY STACK WORKS FOR PARENTHESES:");
    console.log("• Opening brackets create 'contexts' that must be closed");
    console.log("• Most recent opening bracket must be closed first (LIFO)");
    console.log("• Stack naturally tracks the order of opening brackets");
    console.log("• Each closing bracket matches with top of stack");
    console.log();
    
    console.log("⚡ IMPLEMENTATION OPTIONS:");
    console.log("• Array: Use push() and pop() methods");
    console.log("• Linked List: Add/remove from head");
    console.log("• Counter: For single bracket type only");
    console.log();
    
    console.log("🔍 EDGE CASES TO CONSIDER:");
    console.log("• Empty string (valid)");
    console.log("• Only opening brackets (invalid)");
    console.log("• Only closing brackets (invalid)");
    console.log("• Wrong order: ([)] (invalid)");
    console.log("• Correct nesting: {[()]} (valid)");
    
    console.log("\n🛠️ STACK OPERATIONS DEMO:");
    const demo = "({[]})";
    console.log(`Demonstrating with: "${demo}"`);
    
    const stack = [];
    for (let char of demo) {
        if (['(', '{', '['].includes(char)) {
            stack.push(char);
            console.log(`Push '${char}': [${stack.join(', ')}]`);
        } else {
            const popped = stack.pop();
            console.log(`Pop '${popped}' for '${char}': [${stack.join(', ')}]`);
        }
    }
}

// Run all demonstrations
testValidParentheses();
performanceComparison();
explainStackConcepts();

/**
 * KEY CONCEPTS LEARNED:
 * 
 * 1. Stack Data Structure: LIFO behavior perfect for nested structures
 * 2. Pattern Matching: Using hash map to match opening/closing pairs
 * 3. State Tracking: Stack maintains order of unmatched opening brackets
 * 4. Early Exit: Return false as soon as invalid condition detected
 * 5. Edge Cases: Empty string, unmatched brackets, wrong order
 * 
 * INTERVIEW DISCUSSION POINTS:
 * 
 * Q: "Check if parentheses are balanced"
 * A: "I'll use a stack to track opening brackets and match them with closing ones"
 * 
 * Q: "Why use a stack?"
 * A: "Because the most recent unmatched opening bracket must be closed first - 
 *     this follows LIFO (Last In, First Out) behavior which stacks provide"
 * 
 * Q: "What about space complexity?"
 * A: "O(n) in worst case when all characters are opening brackets"
 * 
 * Q: "Can you optimize for simple parentheses?"
 * A: "Yes, for just () brackets, I can use a counter instead of a stack"
 * 
 * STACK PATTERNS:
 * 1. Matching pairs: Parentheses, quotes, tags
 * 2. Undo operations: Text editors, games
 * 3. Function calls: Call stack in programming
 * 4. Expression evaluation: Infix to postfix conversion
 * 5. Backtracking: DFS traversal, maze solving
 * 
 * RELATED PROBLEMS:
 * - Generate Parentheses
 * - Remove Invalid Parentheses
 * - Longest Valid Parentheses
 * - Score of Parentheses
 * - Minimum Remove to Make Valid Parentheses
 */

module.exports = {
    isValidStack,
    isValidCounter,
    isValidReplace,
    isValidDetailed
}; 