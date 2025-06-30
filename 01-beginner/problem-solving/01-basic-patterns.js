/**
 * PROBLEM: Basic Problem-Solving Patterns
 * 
 * DESCRIPTION:
 * Fundamental problem-solving techniques and patterns for beginners.
 * Essential thinking patterns that apply to all programming problems.
 * 
 * KEY CONCEPTS:
 * - Problem decomposition and analysis
 * - Input validation and edge cases
 * - Step-by-step algorithm design
 * - Common problem-solving patterns
 * - Debugging and testing strategies
 * 
 * EXAMPLES:
 * Counting, Finding, Filtering, Accumulating, Transforming
 */

// Pattern 1: Input Validation Pattern
function validateInput(input, requirements) {
    /**
     * APPROACH: Always check inputs before processing
     * Prevent errors and handle edge cases gracefully
     * 
     * TIME COMPLEXITY: O(1) typically
     * SPACE COMPLEXITY: O(1)
     */
    
    console.log(`validateInput(${JSON.stringify(input)}, ${JSON.stringify(requirements)}) called`);
    
    const errors = [];
    
    // Check if input exists
    if (input === null || input === undefined) {
        errors.push("Input cannot be null or undefined");
    }
    
    // Check type requirements
    if (requirements.type && typeof input !== requirements.type) {
        errors.push(`Expected type ${requirements.type}, got ${typeof input}`);
    }
    
    // Check for arrays
    if (requirements.isArray && !Array.isArray(input)) {
        errors.push("Input must be an array");
    }
    
    // Check array length
    if (Array.isArray(input)) {
        if (requirements.minLength && input.length < requirements.minLength) {
            errors.push(`Array length ${input.length} is less than minimum ${requirements.minLength}`);
        }
        if (requirements.maxLength && input.length > requirements.maxLength) {
            errors.push(`Array length ${input.length} exceeds maximum ${requirements.maxLength}`);
        }
    }
    
    // Check number ranges
    if (typeof input === 'number') {
        if (requirements.min !== undefined && input < requirements.min) {
            errors.push(`Value ${input} is less than minimum ${requirements.min}`);
        }
        if (requirements.max !== undefined && input > requirements.max) {
            errors.push(`Value ${input} exceeds maximum ${requirements.max}`);
        }
    }
    
    // Check string requirements
    if (typeof input === 'string') {
        if (requirements.notEmpty && input.trim().length === 0) {
            errors.push("String cannot be empty");
        }
    }
    
    if (errors.length > 0) {
        console.log(`  Validation failed:`);
        errors.forEach(error => console.log(`    - ${error}`));
        return { valid: false, errors };
    }
    
    console.log(`  ✓ Input validation passed`);
    return { valid: true, errors: [] };
}

// Pattern 2: Counting Pattern
function countingPattern(items, condition) {
    /**
     * APPROACH: Count items that meet specific criteria
     * Fundamental pattern for many problems
     * 
     * TIME COMPLEXITY: O(n)
     * SPACE COMPLEXITY: O(1)
     */
    
    console.log(`countingPattern called with ${items.length} items`);
    console.log(`Items: [${items.join(', ')}]`);
    
    // Validate input
    const validation = validateInput(items, { isArray: true, minLength: 0 });
    if (!validation.valid) {
        return { count: 0, errors: validation.errors };
    }
    
    let count = 0;
    const matchingItems = [];
    
    for (let i = 0; i < items.length; i++) {
        const item = items[i];
        console.log(`  Checking item ${i}: ${item}`);
        
        if (condition(item, i)) {
            count++;
            matchingItems.push(item);
            console.log(`    ✓ Matches condition, count now: ${count}`);
        } else {
            console.log(`    ✗ Does not match condition`);
        }
    }
    
    console.log(`Final count: ${count}`);
    console.log(`Matching items: [${matchingItems.join(', ')}]`);
    
    return { count, matchingItems };
}

// Pattern 3: Finding Pattern
function findingPattern(items, criteria) {
    /**
     * APPROACH: Find first, last, or all items meeting criteria
     * Common pattern for search operations
     * 
     * TIME COMPLEXITY: O(n)
     * SPACE COMPLEXITY: O(k) where k is number of matches
     */
    
    console.log(`findingPattern called with criteria: ${criteria.description || 'custom'}`);
    console.log(`Items: [${items.join(', ')}]`);
    
    const validation = validateInput(items, { isArray: true });
    if (!validation.valid) {
        return { found: false, errors: validation.errors };
    }
    
    const results = {
        first: null,
        last: null,
        all: [],
        indices: []
    };
    
    for (let i = 0; i < items.length; i++) {
        const item = items[i];
        console.log(`  Checking item ${i}: ${item}`);
        
        if (criteria.test(item, i)) {
            console.log(`    ✓ Matches criteria`);
            
            // Track first occurrence
            if (results.first === null) {
                results.first = { item, index: i };
                console.log(`    First match found at index ${i}`);
            }
            
            // Always update last occurrence
            results.last = { item, index: i };
            
            // Add to all matches
            results.all.push(item);
            results.indices.push(i);
        }
    }
    
    console.log(`Found ${results.all.length} matches`);
    if (results.first) {
        console.log(`First match: ${results.first.item} at index ${results.first.index}`);
        console.log(`Last match: ${results.last.item} at index ${results.last.index}`);
    }
    
    return results;
}

// Pattern 4: Accumulating Pattern
function accumulatingPattern(items, initialValue, operation) {
    /**
     * APPROACH: Build up a result by processing each item
     * Foundation for reduce operations and aggregations
     * 
     * TIME COMPLEXITY: O(n)
     * SPACE COMPLEXITY: O(1) for primitives, O(n) for collections
     */
    
    console.log(`accumulatingPattern called with initial value: ${initialValue}`);
    console.log(`Items: [${items.join(', ')}]`);
    
    const validation = validateInput(items, { isArray: true });
    if (!validation.valid) {
        return { result: initialValue, errors: validation.errors };
    }
    
    let accumulator = initialValue;
    console.log(`Starting accumulator: ${accumulator}`);
    
    for (let i = 0; i < items.length; i++) {
        const item = items[i];
        const previousValue = accumulator;
        
        accumulator = operation(accumulator, item, i);
        
        console.log(`  Step ${i}: ${previousValue} + ${item} = ${accumulator}`);
    }
    
    console.log(`Final result: ${accumulator}`);
    return { result: accumulator };
}

// Pattern 5: Transforming Pattern
function transformingPattern(items, transformer) {
    /**
     * APPROACH: Convert each item to a new form
     * Foundation for map operations and data transformation
     * 
     * TIME COMPLEXITY: O(n)
     * SPACE COMPLEXITY: O(n)
     */
    
    console.log(`transformingPattern called`);
    console.log(`Items: [${items.join(', ')}]`);
    
    const validation = validateInput(items, { isArray: true });
    if (!validation.valid) {
        return { result: [], errors: validation.errors };
    }
    
    const transformed = [];
    
    for (let i = 0; i < items.length; i++) {
        const item = items[i];
        const newItem = transformer(item, i);
        
        transformed.push(newItem);
        console.log(`  Transformed ${item} → ${newItem}`);
    }
    
    console.log(`Transformed array: [${transformed.join(', ')}]`);
    return { result: transformed };
}

// Pattern 6: Filtering Pattern
function filteringPattern(items, predicate) {
    /**
     * APPROACH: Keep only items that meet criteria
     * Foundation for filter operations and data selection
     * 
     * TIME COMPLEXITY: O(n)
     * SPACE COMPLEXITY: O(k) where k is number of matches
     */
    
    console.log(`filteringPattern called`);
    console.log(`Items: [${items.join(', ')}]`);
    
    const validation = validateInput(items, { isArray: true });
    if (!validation.valid) {
        return { result: [], errors: validation.errors };
    }
    
    const filtered = [];
    
    for (let i = 0; i < items.length; i++) {
        const item = items[i];
        const shouldKeep = predicate(item, i);
        
        console.log(`  Item ${item} at index ${i}: ${shouldKeep ? 'KEEP' : 'FILTER OUT'}`);
        
        if (shouldKeep) {
            filtered.push(item);
        }
    }
    
    console.log(`Filtered array: [${filtered.join(', ')}]`);
    console.log(`Kept ${filtered.length} out of ${items.length} items`);
    
    return { result: filtered };
}

// Pattern 7: Two-Pointer Pattern (Basic)
function twoPointerPattern(items, target) {
    /**
     * APPROACH: Use two pointers moving from different positions
     * Useful for array problems involving pairs or ranges
     * 
     * TIME COMPLEXITY: O(n) or O(n²) depending on movement
     * SPACE COMPLEXITY: O(1)
     */
    
    console.log(`twoPointerPattern called with target: ${target}`);
    console.log(`Items: [${items.join(', ')}]`);
    
    const validation = validateInput(items, { isArray: true, minLength: 2 });
    if (!validation.valid) {
        return { found: false, errors: validation.errors };
    }
    
    // Example: Find pair that sums to target
    let left = 0;
    let right = items.length - 1;
    
    console.log(`Starting with left=0, right=${right}`);
    
    while (left < right) {
        const sum = items[left] + items[right];
        console.log(`  Checking ${items[left]} + ${items[right]} = ${sum} vs target ${target}`);
        
        if (sum === target) {
            console.log(`  ✓ Found pair: ${items[left]} + ${items[right]} = ${target}`);
            return {
                found: true,
                pair: [items[left], items[right]],
                indices: [left, right]
            };
        } else if (sum < target) {
            left++;
            console.log(`  Sum too small, moving left pointer to ${left}`);
        } else {
            right--;
            console.log(`  Sum too large, moving right pointer to ${right}`);
        }
    }
    
    console.log(`  No pair found that sums to ${target}`);
    return { found: false };
}

// Pattern 8: Problem Decomposition Example
function decomposeProblem(problem) {
    /**
     * APPROACH: Break complex problems into smaller parts
     * Systematic approach to problem solving
     * 
     * EXAMPLE: Find the second largest unique number in array
     */
    
    console.log(`=== Problem Decomposition ===`);
    console.log(`Problem: ${problem}`);
    
    // Step 1: Understand the problem
    console.log(`\nStep 1: Understanding the problem`);
    console.log(`- Input: Array of numbers`);
    console.log(`- Output: Second largest unique number`);
    console.log(`- Edge cases: Empty array, one element, all same elements`);
    
    // Step 2: Plan the approach
    console.log(`\nStep 2: Planning the approach`);
    console.log(`- Remove duplicates to get unique numbers`);
    console.log(`- Sort in descending order`);
    console.log(`- Return second element if it exists`);
    
    // Step 3: Implement step by step
    function findSecondLargestUnique(arr) {
        console.log(`\nStep 3: Implementation`);
        console.log(`Input: [${arr.join(', ')}]`);
        
        // Validate input
        if (!Array.isArray(arr) || arr.length === 0) {
            console.log(`Invalid input: empty or not an array`);
            return null;
        }
        
        // Remove duplicates
        const unique = [...new Set(arr)];
        console.log(`After removing duplicates: [${unique.join(', ')}]`);
        
        // Check if we have at least 2 unique numbers
        if (unique.length < 2) {
            console.log(`Not enough unique numbers (need at least 2)`);
            return null;
        }
        
        // Sort in descending order
        unique.sort((a, b) => b - a);
        console.log(`After sorting: [${unique.join(', ')}]`);
        
        // Return second largest
        const secondLargest = unique[1];
        console.log(`Second largest unique: ${secondLargest}`);
        
        return secondLargest;
    }
    
    return findSecondLargestUnique;
}

// Test all patterns
function testBasicPatterns() {
    console.log("=== Testing Basic Problem-Solving Patterns ===");
    
    const testArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    
    // Test Input Validation
    console.log("\n--- Input Validation Pattern ---");
    validateInput([1, 2, 3], { isArray: true, minLength: 2 });
    validateInput("hello", { type: "string", notEmpty: true });
    validateInput(null, { type: "number" });
    
    // Test Counting Pattern
    console.log("\n--- Counting Pattern ---");
    countingPattern(testArray, x => x % 2 === 0); // Count even numbers
    
    // Test Finding Pattern
    console.log("\n--- Finding Pattern ---");
    const criteria = {
        description: "numbers greater than 5",
        test: x => x > 5
    };
    findingPattern(testArray, criteria);
    
    // Test Accumulating Pattern
    console.log("\n--- Accumulating Pattern ---");
    accumulatingPattern(testArray, 0, (acc, item) => acc + item); // Sum
    accumulatingPattern(testArray, 1, (acc, item) => acc * item); // Product
    
    // Test Transforming Pattern
    console.log("\n--- Transforming Pattern ---");
    transformingPattern(testArray, x => x * x); // Square each number
    
    // Test Filtering Pattern
    console.log("\n--- Filtering Pattern ---");
    filteringPattern(testArray, x => x % 3 === 0); // Numbers divisible by 3
    
    // Test Two-Pointer Pattern
    console.log("\n--- Two-Pointer Pattern ---");
    const sortedArray = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    twoPointerPattern(sortedArray, 10); // Find pair that sums to 10
    
    // Test Problem Decomposition
    console.log("\n--- Problem Decomposition ---");
    const findSecondLargest = decomposeProblem("Find second largest unique number");
    const testData = [3, 1, 4, 1, 5, 9, 2, 6, 5];
    findSecondLargest(testData);
}

// Educational explanations
function explainProblemSolving() {
    console.log("\n=== Understanding Problem-Solving Patterns ===");
    
    console.log("🧠 PROBLEM-SOLVING PROCESS:");
    console.log("1. Understand the problem completely");
    console.log("2. Identify inputs, outputs, and constraints");
    console.log("3. Consider edge cases and error conditions");
    console.log("4. Break down into smaller subproblems");
    console.log("5. Choose appropriate patterns and algorithms");
    console.log("6. Implement step by step");
    console.log("7. Test with various inputs");
    console.log("8. Optimize if needed");
    console.log();
    
    console.log("📋 COMMON PATTERNS:");
    console.log("• Counting: Count items meeting criteria");
    console.log("• Finding: Locate items with specific properties");
    console.log("• Accumulating: Build result by processing each item");
    console.log("• Transforming: Convert items to new forms");
    console.log("• Filtering: Select items meeting criteria");
    console.log("• Two Pointers: Process from multiple positions");
    console.log();
    
    console.log("✅ INPUT VALIDATION:");
    console.log("• Always check for null/undefined inputs");
    console.log("• Validate data types and ranges");
    console.log("• Handle empty collections gracefully");
    console.log("• Provide meaningful error messages");
    console.log();
    
    console.log("🔍 EDGE CASES TO CONSIDER:");
    console.log("• Empty inputs (arrays, strings)");
    console.log("• Single element collections");
    console.log("• All elements the same");
    console.log("• Negative numbers, zero");
    console.log("• Very large or very small values");
    console.log("• Invalid input types");
    console.log();
    
    console.log("🎯 DEBUGGING STRATEGIES:");
    console.log("• Add console.log statements to trace execution");
    console.log("• Test with simple, known inputs first");
    console.log("• Check boundary conditions");
    console.log("• Verify loop conditions and array bounds");
    console.log("• Use debugger or step-through tools");
    console.log();
    
    console.log("⚡ OPTIMIZATION TIPS:");
    console.log("• Start with correct solution, optimize later");
    console.log("• Identify bottlenecks through profiling");
    console.log("• Consider time vs space trade-offs");
    console.log("• Use appropriate data structures");
    console.log("• Avoid premature optimization");
}

// Run all demonstrations
testBasicPatterns();
explainProblemSolving();

/**
 * KEY CONCEPTS LEARNED:
 * 
 * 1. Problem Decomposition: Break complex problems into smaller parts
 * 2. Input Validation: Always verify and handle invalid inputs
 * 3. Common Patterns: Counting, finding, filtering, transforming, accumulating
 * 4. Two Pointers: Efficient technique for array-based problems
 * 5. Systematic Approach: Understand → Plan → Implement → Test
 * 
 * INTERVIEW DISCUSSION POINTS:
 * 
 * Q: "How do you approach a new programming problem?"
 * A: "First understand requirements completely, identify inputs/outputs,
 *     consider edge cases, break into subproblems, then implement systematically."
 * 
 * Q: "What's your strategy for handling edge cases?"
 * A: "Always validate inputs first, consider empty/null inputs,
 *     boundary values, and invalid data types. Handle gracefully with clear errors."
 * 
 * Q: "How do you debug when your solution doesn't work?"
 * A: "Add logging to trace execution, test with simple inputs,
 *     check boundary conditions, and verify loop logic step by step."
 * 
 * FUNDAMENTAL PATTERNS:
 * 1. Input Validation → Error Prevention
 * 2. Counting → Frequency Analysis
 * 3. Finding → Search Operations
 * 4. Filtering → Data Selection
 * 5. Transforming → Data Conversion
 * 6. Accumulating → Aggregation Operations
 * 7. Two Pointers → Efficient Array Processing
 * 
 * RELATED CONCEPTS:
 * - Algorithm Design Patterns
 * - Error Handling and Validation
 * - Functional Programming Concepts
 * - Test-Driven Development
 * - Code Documentation and Logging
 * - Performance Analysis
 */

module.exports = {
    validateInput,
    countingPattern,
    findingPattern,
    accumulatingPattern,
    transformingPattern,
    filteringPattern,
    twoPointerPattern,
    decomposeProblem
}; 