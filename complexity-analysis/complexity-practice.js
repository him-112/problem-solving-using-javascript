/**
 * 🧪 HANDS-ON COMPLEXITY PRACTICE
 * 
 * Run this file to see complexity in action!
 * Each example shows how different algorithms behave as input grows.
 */

console.log("🎓 COMPLEXITY ANALYSIS - HANDS-ON PRACTICE");
console.log("=" .repeat(50));

/**
 * 📊 COMPARING DIFFERENT COMPLEXITIES
 */

// O(1) - Constant Time
function constantTimeExample(array) {
    const startTime = performance.now();
    
    // No matter how big the array, this always takes same time
    const result = array[0];
    
    const endTime = performance.now();
    return { result, time: endTime - startTime };
}

// O(n) - Linear Time
function linearTimeExample(array) {
    const startTime = performance.now();
    
    let sum = 0;
    for (let i = 0; i < array.length; i++) {
        sum += array[i];
    }
    
    const endTime = performance.now();
    return { result: sum, time: endTime - startTime };
}

// O(n²) - Quadratic Time
function quadraticTimeExample(array) {
    const startTime = performance.now();
    
    let pairCount = 0;
    for (let i = 0; i < array.length; i++) {
        for (let j = i + 1; j < array.length; j++) {
            // Just counting pairs, not actually doing anything
            pairCount++;
        }
    }
    
    const endTime = performance.now();
    return { result: pairCount, time: endTime - startTime };
}

// O(log n) - Logarithmic Time (Binary Search)
function logarithmicTimeExample(sortedArray, target) {
    const startTime = performance.now();
    
    let left = 0;
    let right = sortedArray.length - 1;
    let steps = 0;
    
    while (left <= right) {
        steps++;
        const mid = Math.floor((left + right) / 2);
        
        if (sortedArray[mid] === target) {
            break;
        } else if (sortedArray[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    
    const endTime = performance.now();
    return { result: steps, time: endTime - startTime };
}

/**
 * 🔬 RUNNING THE EXPERIMENTS
 */

function runComplexityExperiment() {
    console.log("\n🔬 COMPLEXITY EXPERIMENT");
    console.log("-".repeat(30));
    
    const sizes = [100, 1000, 10000];
    
    console.log("Size\t| O(1)\t\t| O(n)\t\t| O(log n)\t| O(n²)");
    console.log("-".repeat(60));
    
    sizes.forEach(size => {
        // Create test arrays
        const array = Array.from({length: size}, (_, i) => i + 1);
        const sortedArray = [...array];
        
        // Test each complexity
        const constantResult = constantTimeExample(array);
        const linearResult = linearTimeExample(array);
        const logResult = logarithmicTimeExample(sortedArray, size / 2);
        const quadraticResult = quadraticTimeExample(array.slice(0, Math.min(size, 100))); // Limit for O(n²)
        
        console.log(`${size}\t| ${constantResult.time.toFixed(2)}ms\t| ${linearResult.time.toFixed(2)}ms\t| ${logResult.result} steps\t| ${quadraticResult.time.toFixed(2)}ms`);
    });
    
    console.log("\n💡 Notice how O(n²) time grows much faster!");
}

/**
 * 🎯 ANALYZING REAL ALGORITHM EXAMPLES
 */

console.log("\n🎯 ANALYZING REAL ALGORITHMS");
console.log("-".repeat(35));

// Example 1: Finding duplicates (different approaches)

// O(n²) approach - nested loops
function findDuplicatesQuadratic(array) {
    console.log("\n📊 Finding Duplicates - O(n²) Approach:");
    const startTime = performance.now();
    const duplicates = [];
    
    for (let i = 0; i < array.length; i++) {
        for (let j = i + 1; j < array.length; j++) {
            if (array[i] === array[j] && !duplicates.includes(array[i])) {
                duplicates.push(array[i]);
            }
        }
    }
    
    const endTime = performance.now();
    console.log(`Found duplicates: [${duplicates}]`);
    console.log(`Time taken: ${(endTime - startTime).toFixed(2)}ms`);
    console.log(`Time Complexity: O(n²) - nested loops`);
    console.log(`Space Complexity: O(k) where k = number of duplicates`);
    
    return duplicates;
}

// O(n) approach - using Set
function findDuplicatesLinear(array) {
    console.log("\n📊 Finding Duplicates - O(n) Approach:");
    const startTime = performance.now();
    const seen = new Set();
    const duplicates = new Set();
    
    for (let i = 0; i < array.length; i++) {
        if (seen.has(array[i])) {
            duplicates.add(array[i]);
        } else {
            seen.add(array[i]);
        }
    }
    
    const endTime = performance.now();
    const result = Array.from(duplicates);
    console.log(`Found duplicates: [${result}]`);
    console.log(`Time taken: ${(endTime - startTime).toFixed(2)}ms`);
    console.log(`Time Complexity: O(n) - single loop`);
    console.log(`Space Complexity: O(n) - using Set for storage`);
    
    return result;
}

// Test with sample data
const testArray = [1, 2, 3, 2, 4, 5, 3, 6, 1];
console.log(`Test array: [${testArray}]`);

findDuplicatesQuadratic(testArray);
findDuplicatesLinear(testArray);

/**
 * 🎓 PRACTICE EXERCISES WITH SOLUTIONS
 */

console.log("\n🎓 PRACTICE EXERCISES");
console.log("-".repeat(25));

console.log("\n📝 Exercise 1: Analyze this function");
console.log(`
function mysteryFunction1(array) {
    let count = 0;
    for (let i = 0; i < array.length; i++) {
        if (array[i] > 0) {
            count++;
        }
    }
    return count;
}
`);

function analyzeFunction1() {
    console.log("Analysis:");
    console.log("• One loop that runs n times where n = array.length");
    console.log("• Each operation inside loop is O(1)");
    console.log("• Only using one variable 'count'");
    console.log("⏱️  Time Complexity: O(n)");
    console.log("🧠 Space Complexity: O(1)");
}

analyzeFunction1();

console.log("\n📝 Exercise 2: Analyze this function");
console.log(`
function mysteryFunction2(matrix) {
    let sum = 0;
    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[i].length; j++) {
            sum += matrix[i][j];
        }
    }
    return sum;
}
`);

function analyzeFunction2() {
    console.log("Analysis:");
    console.log("• Outer loop runs n times (number of rows)");
    console.log("• Inner loop runs m times (number of columns)");
    console.log("• If matrix is n×n, total operations = n × n = n²");
    console.log("• Only using one variable 'sum'");
    console.log("⏱️  Time Complexity: O(n×m) or O(n²) for square matrix");
    console.log("🧠 Space Complexity: O(1)");
}

analyzeFunction2();

/**
 * 🚀 SPACE COMPLEXITY EXAMPLES
 */

console.log("\n🚀 SPACE COMPLEXITY EXAMPLES");
console.log("-".repeat(35));

// O(1) Space
function reverseStringConstantSpace(str) {
    console.log("\n📊 Reverse String - O(1) Space:");
    console.log(`Input: "${str}"`);
    
    // Convert to array for swapping (this is O(n) space, but let's show the concept)
    const chars = str.split('');
    let left = 0;
    let right = chars.length - 1;
    
    while (left < right) {
        // Swap characters
        [chars[left], chars[right]] = [chars[right], chars[left]];
        left++;
        right--;
    }
    
    const result = chars.join('');
    console.log(`Output: "${result}"`);
    console.log("🧠 Space used: Only a few variables (left, right)");
    console.log("Space Complexity: O(1) - ignoring input storage");
    
    return result;
}

// O(n) Space
function reverseStringLinearSpace(str) {
    console.log("\n📊 Reverse String - O(n) Space:");
    console.log(`Input: "${str}"`);
    
    const reversed = [];
    for (let i = str.length - 1; i >= 0; i--) {
        reversed.push(str[i]);
    }
    
    const result = reversed.join('');
    console.log(`Output: "${result}"`);
    console.log("🧠 Space used: New array same size as input");
    console.log("Space Complexity: O(n) - new array created");
    
    return result;
}

reverseStringConstantSpace("hello");
reverseStringLinearSpace("hello");

/**
 * 🎪 INTERACTIVE COMPLEXITY CALCULATOR
 */

function complexityCalculator(n) {
    console.log(`\n🎪 COMPLEXITY CALCULATOR for n = ${n}`);
    console.log("-".repeat(40));
    
    const results = {
        "O(1)": 1,
        "O(log n)": Math.ceil(Math.log2(n)),
        "O(n)": n,
        "O(n log n)": n * Math.ceil(Math.log2(n)),
        "O(n²)": n * n,
        "O(n³)": n * n * n,
        "O(2^n)": n <= 20 ? Math.pow(2, n) : "Too large!"
    };
    
    Object.entries(results).forEach(([complexity, operations]) => {
        console.log(`${complexity.padEnd(10)} | ${operations.toLocaleString().padStart(15)} operations`);
    });
    
    console.log(`\n💡 For ${n.toLocaleString()} items:`);
    console.log(`• O(1) is always instant`);
    console.log(`• O(log n) is very efficient`);
    console.log(`• O(n) scales linearly`);
    console.log(`• O(n²) starts becoming expensive`);
}

// Try different input sizes
[10, 100, 1000, 10000].forEach(size => {
    complexityCalculator(size);
});

/**
 * 🎯 FINAL CHALLENGE
 */

console.log("\n🎯 FINAL CHALLENGE");
console.log("-".repeat(20));

console.log(`
Can you determine the complexity of this function?

function challengeFunction(arr1, arr2) {
    const result = [];
    
    for (let i = 0; i < arr1.length; i++) {          // Loop 1
        for (let j = 0; j < arr2.length; j++) {      // Loop 2
            if (arr1[i] === arr2[j]) {               // O(1) operation
                result.push(arr1[i]);                // O(1) operation
                break;                               // Exit inner loop
            }
        }
    }
    
    return result;
}

Think about it, then check your answer below...
`);

function challengeSolution() {
    console.log("🎯 CHALLENGE SOLUTION:");
    console.log("-".repeat(20));
    console.log("• Outer loop: runs n times (length of arr1)");
    console.log("• Inner loop: runs at most m times (length of arr2)");
    console.log("• Break statement exits inner loop early when match found");
    console.log("• Worst case: no matches found, so n × m comparisons");
    console.log("• result array: stores at most min(n, m) elements");
    console.log("");
    console.log("⏱️  Time Complexity: O(n × m)");
    console.log("🧠 Space Complexity: O(min(n, m))");
    console.log("");
    console.log("💡 This function finds common elements between two arrays!");
}

// Run the experiment
console.log("\n🔬 Running all experiments...");
runComplexityExperiment();

// Show challenge solution
setTimeout(() => {
    challengeSolution();
    
    console.log("\n🎉 CONGRATULATIONS!");
    console.log("You've completed the complexity analysis practice!");
    console.log("Keep practicing with real code to master this skill! 🚀");
}, 100);

/**
 * 📚 ADDITIONAL RESOURCES
 */

console.log("\n📚 WHAT TO PRACTICE NEXT:");
console.log("-".repeat(30));
console.log("1. Analyze every function you write");
console.log("2. Compare different solutions to same problem");
console.log("3. Use online algorithm visualizers");
console.log("4. Practice with LeetCode/HackerRank problems");
console.log("5. Study common algorithms (sorting, searching)");
console.log("");
console.log("Remember: Understanding complexity helps you:");
console.log("✅ Write faster code");
console.log("✅ Make better design decisions");
console.log("✅ Debug performance issues");
console.log("✅ Ace technical interviews");
console.log("");
console.log("Happy coding! 🎯"); 