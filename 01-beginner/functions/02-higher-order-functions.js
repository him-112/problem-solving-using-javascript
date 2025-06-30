/**
 * PROBLEM: Higher-Order Functions
 * 
 * DESCRIPTION:
 * Functions that take other functions as arguments or return functions.
 * Essential for functional programming and modern JavaScript.
 * 
 * KEY CONCEPTS:
 * - Functions as first-class citizens
 * - Callbacks and function passing
 * - Array methods: map, filter, reduce
 * - Function composition
 * - Currying and partial application
 * 
 * EXAMPLES:
 * map([1,2,3], x => x*2) = [2,4,6]
 * filter([1,2,3,4], x => x%2===0) = [2,4]
 * reduce([1,2,3,4], (sum,x) => sum+x, 0) = 10
 */

// Method 1: Custom Map Implementation
function customMap(array, callback) {
    /**
     * APPROACH: Apply callback to each element, return new array
     * Similar to Array.prototype.map but shows the underlying logic
     * 
     * TIME COMPLEXITY: O(n)
     * SPACE COMPLEXITY: O(n) - new array
     */
    
    console.log(`customMap called with array: [${array.join(',')}]`);
    
    if (!Array.isArray(array)) {
        throw new Error("First argument must be an array");
    }
    if (typeof callback !== 'function') {
        throw new Error("Second argument must be a function");
    }
    
    const result = [];
    for (let i = 0; i < array.length; i++) {
        const transformedValue = callback(array[i], i, array);
        console.log(`  Transforming ${array[i]} at index ${i} -> ${transformedValue}`);
        result.push(transformedValue);
    }
    
    console.log(`  Result: [${result.join(',')}]`);
    return result;
}

// Method 2: Custom Filter Implementation
function customFilter(array, predicate) {
    /**
     * APPROACH: Test each element with predicate, keep truthy results
     * Similar to Array.prototype.filter
     * 
     * TIME COMPLEXITY: O(n)
     * SPACE COMPLEXITY: O(k) where k is number of matching elements
     */
    
    console.log(`customFilter called with array: [${array.join(',')}]`);
    
    if (!Array.isArray(array)) {
        throw new Error("First argument must be an array");
    }
    if (typeof predicate !== 'function') {
        throw new Error("Second argument must be a function");
    }
    
    const result = [];
    for (let i = 0; i < array.length; i++) {
        const passes = predicate(array[i], i, array);
        console.log(`  Testing ${array[i]} at index ${i} -> ${passes ? 'PASS' : 'FAIL'}`);
        if (passes) {
            result.push(array[i]);
        }
    }
    
    console.log(`  Result: [${result.join(',')}]`);
    return result;
}

// Method 3: Custom Reduce Implementation
function customReduce(array, reducer, initialValue) {
    /**
     * APPROACH: Accumulate values using reducer function
     * Similar to Array.prototype.reduce
     * 
     * TIME COMPLEXITY: O(n)
     * SPACE COMPLEXITY: O(1) - single accumulator
     */
    
    console.log(`customReduce called with array: [${array.join(',')}], initial: ${initialValue}`);
    
    if (!Array.isArray(array)) {
        throw new Error("First argument must be an array");
    }
    if (typeof reducer !== 'function') {
        throw new Error("Second argument must be a function");
    }
    
    let accumulator = initialValue;
    let startIndex = 0;
    
    // If no initial value, use first element
    if (accumulator === undefined) {
        if (array.length === 0) {
            throw new Error("Reduce of empty array with no initial value");
        }
        accumulator = array[0];
        startIndex = 1;
        console.log(`  No initial value, using first element: ${accumulator}`);
    }
    
    for (let i = startIndex; i < array.length; i++) {
        const newAccumulator = reducer(accumulator, array[i], i, array);
        console.log(`  Step ${i}: ${accumulator} + ${array[i]} -> ${newAccumulator}`);
        accumulator = newAccumulator;
    }
    
    console.log(`  Final result: ${accumulator}`);
    return accumulator;
}

// Method 4: Function Composition
function compose(...functions) {
    /**
     * APPROACH: Chain functions right to left
     * compose(f, g, h)(x) = f(g(h(x)))
     * 
     * TIME COMPLEXITY: O(n) where n is number of functions
     * SPACE COMPLEXITY: O(1)
     */
    
    console.log(`compose called with ${functions.length} functions`);
    
    if (functions.length === 0) {
        return x => x; // Identity function
    }
    
    return function(x) {
        console.log(`  Starting composition with input: ${x}`);
        let result = x;
        
        // Apply functions from right to left
        for (let i = functions.length - 1; i >= 0; i--) {
            const prevResult = result;
            result = functions[i](result);
            console.log(`    Applied function ${i}: ${prevResult} -> ${result}`);
        }
        
        console.log(`  Final composed result: ${result}`);
        return result;
    };
}

// Method 5: Pipe (left to right composition)
function pipe(...functions) {
    /**
     * APPROACH: Chain functions left to right
     * pipe(f, g, h)(x) = h(g(f(x)))
     * 
     * TIME COMPLEXITY: O(n) where n is number of functions
     * SPACE COMPLEXITY: O(1)
     */
    
    console.log(`pipe called with ${functions.length} functions`);
    
    if (functions.length === 0) {
        return x => x; // Identity function
    }
    
    return function(x) {
        console.log(`  Starting pipe with input: ${x}`);
        let result = x;
        
        // Apply functions from left to right
        for (let i = 0; i < functions.length; i++) {
            const prevResult = result;
            result = functions[i](result);
            console.log(`    Applied function ${i}: ${prevResult} -> ${result}`);
        }
        
        console.log(`  Final piped result: ${result}`);
        return result;
    };
}

// Method 6: Currying
function curry(fn) {
    /**
     * APPROACH: Transform f(a,b,c) to f(a)(b)(c)
     * Returns partially applied functions until all args provided
     * 
     * TIME COMPLEXITY: O(1) for each partial application
     * SPACE COMPLEXITY: O(n) where n is number of arguments
     */
    
    console.log(`curry called for function with ${fn.length} parameters`);
    
    return function curried(...args) {
        console.log(`  curried called with args: [${args.join(',')}]`);
        
        if (args.length >= fn.length) {
            console.log(`  All args provided, calling original function`);
            const result = fn.apply(this, args);
            console.log(`  Result: ${result}`);
            return result;
        } else {
            console.log(`  Partial application, need ${fn.length - args.length} more args`);
            return function(...nextArgs) {
                console.log(`    Next partial call with: [${nextArgs.join(',')}]`);
                return curried.apply(this, args.concat(nextArgs));
            };
        }
    };
}

// Method 7: Partial Application
function partial(fn, ...partialArgs) {
    /**
     * APPROACH: Pre-fill some arguments of a function
     * Returns new function that takes remaining arguments
     * 
     * TIME COMPLEXITY: O(1)
     * SPACE COMPLEXITY: O(k) where k is number of partial args
     */
    
    console.log(`partial called with ${partialArgs.length} pre-filled args: [${partialArgs.join(',')}]`);
    
    return function(...remainingArgs) {
        console.log(`  partial function called with remaining args: [${remainingArgs.join(',')}]`);
        const allArgs = partialArgs.concat(remainingArgs);
        console.log(`  Combined args: [${allArgs.join(',')}]`);
        const result = fn.apply(this, allArgs);
        console.log(`  Result: ${result}`);
        return result;
    };
}

// Method 8: Memoization (Higher-order function for optimization)
function memoize(fn) {
    /**
     * APPROACH: Cache function results to avoid recomputation
     * Returns memoized version of function
     * 
     * TIME COMPLEXITY: O(1) for cached results, original complexity for new
     * SPACE COMPLEXITY: O(n) where n is number of unique calls
     */
    
    console.log(`memoize called for function: ${fn.name}`);
    const cache = new Map();
    
    return function(...args) {
        const key = JSON.stringify(args);
        console.log(`  memoized function called with args: [${args.join(',')}]`);
        
        if (cache.has(key)) {
            console.log(`  Cache HIT: returning cached result`);
            return cache.get(key);
        }
        
        console.log(`  Cache MISS: computing new result`);
        const result = fn.apply(this, args);
        cache.set(key, result);
        console.log(`  Cached result: ${result}`);
        return result;
    };
}

// Helper functions for demonstrations
const double = x => x * 2;
const addOne = x => x + 1;
const square = x => x * x;
const isEven = x => x % 2 === 0;
const sum = (a, b) => a + b;
const multiply = (a, b, c) => a * b * c;

// Expensive function for memoization demo
function expensiveCalculation(n) {
    console.log(`    Performing expensive calculation for ${n}`);
    let result = 0;
    for (let i = 0; i < n * 1000000; i++) {
        result += i;
    }
    return result;
}

// Test all higher-order functions
function testHigherOrderFunctions() {
    console.log("=== Testing Higher-Order Functions ===");
    
    const testArray = [1, 2, 3, 4, 5];
    
    // Test custom map
    console.log("\n--- Custom Map ---");
    const doubled = customMap(testArray, double);
    const squares = customMap(testArray, square);
    
    // Test custom filter
    console.log("\n--- Custom Filter ---");
    const evens = customFilter(testArray, isEven);
    const greaterThanThree = customFilter(testArray, x => x > 3);
    
    // Test custom reduce
    console.log("\n--- Custom Reduce ---");
    const total = customReduce(testArray, sum, 0);
    const product = customReduce(testArray, (acc, x) => acc * x, 1);
    
    // Test function composition
    console.log("\n--- Function Composition ---");
    const addThenDouble = compose(double, addOne);
    const composedResult = addThenDouble(5); // (5 + 1) * 2 = 12
    
    // Test pipe
    console.log("\n--- Pipe ---");
    const addThenDoubleByPipe = pipe(addOne, double);
    const pipedResult = addThenDoubleByPipe(5); // (5 + 1) * 2 = 12
    
    // Test currying
    console.log("\n--- Currying ---");
    const curriedMultiply = curry(multiply);
    const multiplyBy2 = curriedMultiply(2);
    const multiplyBy2And3 = multiplyBy2(3);
    const finalResult = multiplyBy2And3(4); // 2 * 3 * 4 = 24
    
    // Test partial application
    console.log("\n--- Partial Application ---");
    const addFive = partial(sum, 5);
    const partialResult = addFive(3); // 5 + 3 = 8
    
    // Test memoization
    console.log("\n--- Memoization ---");
    const memoizedExpensive = memoize(expensiveCalculation);
    
    console.log("First call:");
    const start1 = performance.now();
    const result1 = memoizedExpensive(5);
    const time1 = performance.now() - start1;
    console.log(`Result: ${result1}, Time: ${time1.toFixed(2)}ms`);
    
    console.log("Second call (should be cached):");
    const start2 = performance.now();
    const result2 = memoizedExpensive(5);
    const time2 = performance.now() - start2;
    console.log(`Result: ${result2}, Time: ${time2.toFixed(2)}ms`);
}

// Practical examples
function practicalExamples() {
    console.log("\n=== Practical Examples ===");
    
    const users = [
        { name: 'Alice', age: 25, active: true },
        { name: 'Bob', age: 30, active: false },
        { name: 'Charlie', age: 35, active: true },
        { name: 'Diana', age: 28, active: true }
    ];
    
    console.log("\n--- Data Processing Pipeline ---");
    console.log("Original users:", users);
    
    // Chain operations using native methods
    const result = users
        .filter(user => user.active)  // Only active users
        .map(user => ({ ...user, category: user.age >= 30 ? 'senior' : 'junior' }))  // Add category
        .reduce((acc, user) => {  // Group by category
            acc[user.category] = acc[user.category] || [];
            acc[user.category].push(user);
            return acc;
        }, {});
    
    console.log("Processed result:", result);
    
    // Using custom functions
    console.log("\n--- Using Custom Functions ---");
    const activeUsers = customFilter(users, user => user.active);
    const userNames = customMap(activeUsers, user => user.name);
    const totalAge = customReduce(activeUsers, (sum, user) => sum + user.age, 0);
    
    console.log(`Active users: ${userNames.join(', ')}`);
    console.log(`Total age: ${totalAge}`);
    console.log(`Average age: ${(totalAge / activeUsers.length).toFixed(1)}`);
}

// Performance comparison
function performanceComparison() {
    console.log("\n=== Performance Comparison ===");
    
    const largeArray = Array.from({ length: 100000 }, (_, i) => i + 1);
    
    console.log(`Testing with array of ${largeArray.length} elements`);
    
    // Native map vs custom map
    let start = performance.now();
    const nativeMapResult = largeArray.map(x => x * 2);
    let end = performance.now();
    console.log(`Native map: ${(end - start).toFixed(2)}ms`);
    
    start = performance.now();
    const customMapResult = customMap(largeArray.slice(0, 1000), x => x * 2); // Smaller for demo
    end = performance.now();
    console.log(`Custom map (1000 elements): ${(end - start).toFixed(2)}ms`);
    
    // Native filter vs custom filter
    start = performance.now();
    const nativeFilterResult = largeArray.filter(x => x % 2 === 0);
    end = performance.now();
    console.log(`Native filter: ${(end - start).toFixed(2)}ms`);
    
    start = performance.now();
    const customFilterResult = customFilter(largeArray.slice(0, 1000), x => x % 2 === 0);
    end = performance.now();
    console.log(`Custom filter (1000 elements): ${(end - start).toFixed(2)}ms`);
    
    console.log("\nNote: Native methods are optimized and typically faster than custom implementations");
}

// Educational explanations
function explainHigherOrderFunctions() {
    console.log("\n=== Understanding Higher-Order Functions ===");
    
    console.log("🔧 HIGHER-ORDER FUNCTION DEFINITION:");
    console.log("A function that either:");
    console.log("• Takes one or more functions as arguments, OR");
    console.log("• Returns a function as its result");
    console.log();
    
    console.log("📋 COMMON PATTERNS:");
    console.log("1. Array methods: map, filter, reduce, forEach");
    console.log("2. Event handlers: addEventListener(event, callback)");
    console.log("3. Async operations: setTimeout, Promise.then");
    console.log("4. Function composition: combining multiple functions");
    console.log("5. Decorators: adding functionality to existing functions");
    console.log();
    
    console.log("⚡ BENEFITS:");
    console.log("• Code reusability and modularity");
    console.log("• Separation of concerns");
    console.log("• More expressive and declarative code");
    console.log("• Enables functional programming patterns");
    console.log("• Easier testing and debugging");
    console.log();
    
    console.log("🎯 BEST PRACTICES:");
    console.log("• Keep functions pure when possible (no side effects)");
    console.log("• Use descriptive names for callback functions");
    console.log("• Consider performance implications of function calls");
    console.log("• Leverage built-in array methods before custom implementations");
    console.log("• Use currying for creating specialized functions");
    console.log();
    
    console.log("📚 FUNCTIONAL PROGRAMMING CONCEPTS:");
    console.log("• Immutability: Don't modify original data");
    console.log("• Pure functions: Same input always produces same output");
    console.log("• Function composition: Build complex operations from simple ones");
    console.log("• Currying: Transform multi-argument functions to single-argument");
    console.log("• Partial application: Pre-fill some function arguments");
}

// Run all demonstrations
testHigherOrderFunctions();
practicalExamples();
performanceComparison();
explainHigherOrderFunctions();

/**
 * KEY CONCEPTS LEARNED:
 * 
 * 1. Functions as Values: JavaScript treats functions as first-class citizens
 * 2. Callbacks: Functions passed as arguments to other functions
 * 3. Array Methods: map, filter, reduce are higher-order functions
 * 4. Function Composition: Combining simple functions to create complex behavior
 * 5. Currying: Converting functions to accept one argument at a time
 * 
 * INTERVIEW DISCUSSION POINTS:
 * 
 * Q: "What is a higher-order function?"
 * A: "A function that takes other functions as parameters or returns a function.
 *     Examples include map, filter, reduce, and addEventListener."
 * 
 * Q: "Implement your own map function"
 * A: "Create a function that takes an array and callback, iterate through array,
 *     apply callback to each element, return new array with results."
 * 
 * Q: "What's the difference between map and forEach?"
 * A: "map returns a new array with transformed elements, forEach just executes
 *     a function for each element and returns undefined."
 * 
 * Q: "Explain function composition"
 * A: "Combining multiple functions where output of one becomes input of next.
 *     compose applies right-to-left, pipe applies left-to-right."
 * 
 * Q: "When would you use currying?"
 * A: "Creating specialized functions, partial application, functional programming,
 *     or when you need to configure a function in stages."
 * 
 * COMMON USE CASES:
 * 1. Data transformation: map, filter, reduce
 * 2. Event handling: addEventListener
 * 3. Async operations: callbacks, promises
 * 4. Configuration: currying for specialized functions
 * 5. Optimization: memoization
 * 6. Validation: filter predicates
 * 7. Aggregation: reduce operations
 * 
 * RELATED CONCEPTS:
 * - Functional Programming
 * - Closures
 * - Arrow Functions
 * - Array Methods
 * - Callbacks and Promises
 * - Design Patterns (Observer, Strategy)
 */

module.exports = {
    customMap,
    customFilter,
    customReduce,
    compose,
    pipe,
    curry,
    partial,
    memoize
}; 