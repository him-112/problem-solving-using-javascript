/**
 * =================================================================
 * 📚 COMPLETE BEGINNER'S GUIDE TO TIME & SPACE COMPLEXITY
 * =================================================================
 * 
 * Think of this as your friendly neighborhood guide to understanding
 * how we measure how "fast" and how "memory-hungry" our code is!
 */

console.log("🎓 Welcome to Complexity Analysis for Self-Taught Developers!");
console.log("=" .repeat(60));

/**
 * 🤔 WHAT IS COMPLEXITY ANALYSIS?
 * 
 * Imagine you're a chef with different recipes:
 * - Recipe A: Takes 10 minutes for 1 person, 20 minutes for 2 people
 * - Recipe B: Takes 10 minutes no matter how many people
 * 
 * Complexity analysis is like asking:
 * "How does cooking time change when I cook for more people?"
 * 
 * In programming:
 * - TIME COMPLEXITY: How does running time change as input gets bigger?
 * - SPACE COMPLEXITY: How does memory usage change as input gets bigger?
 */

// Let's start with REAL examples you can relate to!

/**
 * 📖 EXAMPLE 1: Finding a Book in Different Ways
 */

console.log("\n📖 EXAMPLE 1: Finding a Book");
console.log("-".repeat(30));

// Method 1: Check every book one by one (Linear Search)
function findBookLinear(books, targetBook) {
    console.log(`Searching for "${targetBook}" by checking each book...`);
    
    for (let i = 0; i < books.length; i++) {
        console.log(`  Checking book ${i + 1}: "${books[i]}"`);
        
        if (books[i] === targetBook) {
            console.log(`  ✅ Found it at position ${i + 1}!`);
            return i;
        }
    }
    
    console.log("  ❌ Book not found");
    return -1;
}

// Method 2: If books are sorted, jump to middle and eliminate half
function findBookBinary(sortedBooks, targetBook) {
    console.log(`Searching for "${targetBook}" using smart binary search...`);
    
    let left = 0;
    let right = sortedBooks.length - 1;
    let steps = 0;
    
    while (left <= right) {
        steps++;
        const middle = Math.floor((left + right) / 2);
        const middleBook = sortedBooks[middle];
        
        console.log(`  Step ${steps}: Checking middle book "${middleBook}"`);
        
        if (middleBook === targetBook) {
            console.log(`  ✅ Found it in just ${steps} steps!`);
            return middle;
        } else if (middleBook < targetBook) {
            console.log(`    "${middleBook}" comes before "${targetBook}", search right half`);
            left = middle + 1;
        } else {
            console.log(`    "${middleBook}" comes after "${targetBook}", search left half`);
            right = middle - 1;
        }
    }
    
    console.log("  ❌ Book not found");
    return -1;
}

// Let's test this!
const books = ["Alice in Wonderland", "Harry Potter", "Lord of the Rings", "Pride and Prejudice", "The Great Gatsby"];
const sortedBooks = [...books].sort();

console.log("Books we have:", books);
console.log("Sorted books:", sortedBooks);

console.log("\n🔍 Method 1 - Check Every Book:");
findBookLinear(books, "Lord of the Rings");

console.log("\n🧠 Method 2 - Smart Binary Search:");
findBookBinary(sortedBooks, "Lord of the Rings");

/**
 * 🎯 KEY INSIGHT FROM BOOK EXAMPLE:
 * 
 * With 5 books:
 * - Linear search: Might check all 5 books (worst case)
 * - Binary search: Checks at most 3 books
 * 
 * With 1000 books:
 * - Linear search: Might check all 1000 books
 * - Binary search: Checks at most 10 books!
 * 
 * This is why complexity matters - it shows how algorithms scale!
 */

/**
 * 📏 BIG O NOTATION - The Universal Language
 * 
 * Big O is just a way to describe "how things grow"
 * Think of it as describing the "worst case scenario"
 */

console.log("\n📏 BIG O NOTATION EXPLAINED");
console.log("-".repeat(40));

/**
 * 🥇 O(1) - CONSTANT TIME
 * "No matter how big the input, always takes the same time"
 * 
 * Like: Looking up a word in a dictionary if you know the exact page number
 */

function getFirstElement(array) {
    // No matter if array has 5 or 5 million items,
    // getting first element always takes same time
    return array[0];
}

console.log("O(1) Example - Getting first element:");
console.log("Array with 3 items:", getFirstElement([1, 2, 3]));
console.log("Array with 1000 items:", getFirstElement(Array.from({length: 1000}, (_, i) => i)));
console.log("⏱️  Time taken: Same regardless of array size!");

/**
 * 📈 O(n) - LINEAR TIME
 * "Time grows directly with input size"
 * 
 * Like: Reading every page of a book - twice as many pages = twice as long
 */

function printAllElements(array) {
    console.log(`Printing all ${array.length} elements:`);
    for (let i = 0; i < array.length; i++) {
        // This comment represents doing work for each element
        // In real code, this might be console.log(array[i])
    }
    console.log(`⏱️  Time taken: Proportional to ${array.length} elements`);
}

console.log("\nO(n) Example - Printing all elements:");
printAllElements([1, 2, 3]);
printAllElements([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);

/**
 * 🚀 O(log n) - LOGARITHMIC TIME
 * "Time grows slowly even as input gets much bigger"
 * 
 * Like: Finding a word in a dictionary by opening to middle, then middle of half, etc.
 * This is what binary search does!
 */

function demonstrateLogTime(size) {
    let steps = 0;
    let n = size;
    
    console.log(`Finding item in sorted list of ${size} items:`);
    
    while (n > 1) {
        n = Math.floor(n / 2);  // Each step eliminates half
        steps++;
        console.log(`  Step ${steps}: Now checking ${n} items`);
    }
    
    console.log(`⏱️  Total steps needed: ${steps} (for ${size} items)`);
    return steps;
}

console.log("\nO(log n) Example - Binary search steps:");
demonstrateLogTime(8);
demonstrateLogTime(1000);

/**
 * 💥 O(n²) - QUADRATIC TIME
 * "Time grows with square of input size"
 * 
 * Like: Comparing every person with every other person in a room
 * 10 people = 100 comparisons, 100 people = 10,000 comparisons!
 */

function findDuplicatesPairs(array) {
    console.log(`Finding duplicates in array of ${array.length} items:`);
    let comparisons = 0;
    
    // For each element...
    for (let i = 0; i < array.length; i++) {
        // ...compare with every OTHER element
        for (let j = i + 1; j < array.length; j++) {
            comparisons++;
            
            if (array[i] === array[j]) {
                console.log(`  Found duplicate: ${array[i]} at positions ${i} and ${j}`);
            }
        }
    }
    
    console.log(`⏱️  Total comparisons made: ${comparisons}`);
    return comparisons;
}

console.log("\nO(n²) Example - Finding duplicates:");
findDuplicatesPairs([1, 2, 3, 2]);
findDuplicatesPairs([1, 2, 3, 4, 5, 6, 7, 8]);

/**
 * 📊 COMPLEXITY COMPARISON TABLE
 */

console.log("\n📊 HOW DIFFERENT COMPLEXITIES COMPARE");
console.log("-".repeat(50));

function compareComplexities() {
    const sizes = [10, 100, 1000, 10000];
    
    console.log("Input Size | O(1) | O(log n) | O(n)  | O(n²)");
    console.log("-----------|------|----------|-------|--------");
    
    sizes.forEach(n => {
        const constant = 1;
        const logarithmic = Math.ceil(Math.log2(n));
        const linear = n;
        const quadratic = n * n;
        
        console.log(`${n.toString().padStart(10)} | ${constant.toString().padStart(4)} | ${logarithmic.toString().padStart(8)} | ${linear.toString().padStart(5)} | ${quadratic.toString().padStart(6)}`);
    });
    
    console.log("\n💡 Notice how O(n²) grows MUCH faster than others!");
}

compareComplexities();

/**
 * 🧠 SPACE COMPLEXITY - How Much Memory Do We Use?
 * 
 * Just like time complexity, but for memory instead of time
 */

console.log("\n🧠 SPACE COMPLEXITY EXAMPLES");
console.log("-".repeat(35));

/**
 * O(1) Space - Constant Memory
 * "Uses same amount of memory regardless of input size"
 */

function sumArrayConstantSpace(numbers) {
    // Only using one variable regardless of array size
    let sum = 0;  // This is O(1) space
    
    for (let i = 0; i < numbers.length; i++) {
        sum += numbers[i];
    }
    
    return sum;
    // Memory used: Just one number (sum), regardless of input size
}

console.log("O(1) Space Example:");
console.log("Sum of [1,2,3,4,5]:", sumArrayConstantSpace([1, 2, 3, 4, 5]));
console.log("Memory used: Just 1 variable, no matter how big the array!");

/**
 * O(n) Space - Linear Memory
 * "Memory usage grows with input size"
 */

function doubleArrayLinearSpace(numbers) {
    // Creating new array same size as input
    const doubled = [];  // This grows with input size = O(n) space
    
    for (let i = 0; i < numbers.length; i++) {
        doubled.push(numbers[i] * 2);
    }
    
    return doubled;
    // Memory used: New array same size as input
}

console.log("\nO(n) Space Example:");
console.log("Double [1,2,3]:", doubleArrayLinearSpace([1, 2, 3]));
console.log("Memory used: New array same size as input");

/**
 * 🎯 ANALYZING REAL CODE FROM OUR PREVIOUS EXAMPLES
 */

console.log("\n🎯 ANALYZING OUR PREVIOUS PROBLEMS");
console.log("-".repeat(40));

/**
 * Let's analyze the "Move Zeros" problem we solved earlier
 */

console.log("📝 MOVE ZEROS ANALYSIS:");

// Original approach from our previous code
function moveZerosAnalysis(nums) {
    console.log("Analyzing moveZeros function...");
    
    let writeIndex = 0;  // O(1) space - just one variable
    
    // This loop runs n times, where n = nums.length
    for (let i = 0; i < nums.length; i++) {  // O(n) time
        if (nums[i] !== 0) {
            nums[writeIndex] = nums[i];  // O(1) operation
            writeIndex++;
        }
    }
    
    // This loop runs at most n times
    while (writeIndex < nums.length) {  // O(n) time
        nums[writeIndex] = 0;  // O(1) operation
        writeIndex++;
    }
    
    console.log("⏱️  Time Complexity: O(n) - we visit each element once");
    console.log("🧠 Space Complexity: O(1) - only use a few variables");
    
    return nums;
}

/**
 * Rotate Array Analysis
 */

console.log("\n📝 ROTATE ARRAY ANALYSIS:");

function rotateArrayAnalysis(nums, k) {
    console.log("Analyzing rotateArray function...");
    
    const n = nums.length;
    k = k % n;  // O(1) time and space
    
    // Three reverse operations
    console.log("Step 1: Reverse entire array");
    // reverse(0, n-1) takes O(n/2) = O(n) time
    
    console.log("Step 2: Reverse first k elements");
    // reverse(0, k-1) takes O(k/2) = O(k) time
    
    console.log("Step 3: Reverse remaining elements");
    // reverse(k, n-1) takes O((n-k)/2) = O(n-k) time
    
    console.log("⏱️  Time Complexity: O(n) - each element swapped once");
    console.log("🧠 Space Complexity: O(1) - only use a few variables");
}

/**
 * 🏆 PRACTICAL TIPS FOR ANALYZING YOUR OWN CODE
 */

console.log("\n🏆 HOW TO ANALYZE ANY CODE");
console.log("-".repeat(35));

console.log(`
📋 STEP-BY-STEP GUIDE:

1. 🔍 COUNT THE LOOPS:
   • One loop = O(n)
   • Loop inside loop = O(n²)
   • Loop that divides problem in half = O(log n)

2. 🧮 LOOK AT OPERATIONS:
   • Simple operations (=, +, -, <, >) = O(1)
   • Array access by index = O(1)
   • Searching unsorted array = O(n)

3. 🧠 COUNT MEMORY USAGE:
   • Few variables = O(1)
   • Array same size as input = O(n)
   • Matrix of size n×n = O(n²)

4. 🎯 FIND THE DOMINANT TERM:
   • O(n + n²) = O(n²)  (n² grows faster)
   • O(3n + 5) = O(n)   (constants don't matter for big inputs)
`);

/**
 * 🧪 PRACTICE EXERCISES
 */

console.log("\n🧪 PRACTICE EXERCISES");
console.log("-".repeat(25));

console.log(`
Try to analyze these functions:

🎯 EXERCISE 1:
function findMax(array) {
    let max = array[0];
    for (let i = 1; i < array.length; i++) {
        if (array[i] > max) {
            max = array[i];
        }
    }
    return max;
}

❓ What's the time and space complexity?
💡 Answer: Time O(n), Space O(1)

🎯 EXERCISE 2:
function bubbleSort(array) {
    for (let i = 0; i < array.length; i++) {
        for (let j = 0; j < array.length - 1; j++) {
            if (array[j] > array[j + 1]) {
                [array[j], array[j + 1]] = [array[j + 1], array[j]];
            }
        }
    }
    return array;
}

❓ What's the time and space complexity?
💡 Answer: Time O(n²), Space O(1)
`);

/**
 * 🎓 FINAL TIPS FOR SUCCESS
 */

console.log("\n🎓 FINAL TIPS FOR SUCCESS");
console.log("-".repeat(30));

console.log(`
✅ START SIMPLE:
   • Count loops first
   • Don't worry about constants
   • Focus on how things grow

✅ PRACTICE REGULARLY:
   • Analyze every function you write
   • Compare different solutions
   • Ask "what if input was 10x bigger?"

✅ REMEMBER THE BASICS:
   • O(1) = Same time/space always
   • O(n) = Grows with input
   • O(n²) = Avoid when possible!
   • O(log n) = Very efficient

✅ REAL-WORLD IMPACT:
   • O(n) vs O(n²) matters when n = 1,000,000
   • Good algorithms = faster apps
   • Users notice the difference!
`);

console.log("\n🎉 Congratulations! You now understand complexity analysis!");
console.log("Keep practicing and you'll get better at spotting patterns!");

/**
 * 📚 QUICK REFERENCE CARD
 */

console.log("\n📚 QUICK REFERENCE CARD");
console.log("=".repeat(30));
console.log(`
COMMON TIME COMPLEXITIES (best to worst):
• O(1)      - Instant: array[0], math operations
• O(log n)  - Very fast: binary search
• O(n)      - Good: single loop, linear search
• O(n log n)- Pretty good: good sorting algorithms
• O(n²)     - Slow: nested loops, bubble sort
• O(2^n)    - Very slow: some recursive algorithms

SPACE COMPLEXITY:
• O(1)      - Few variables
• O(n)      - Array/list same size as input
• O(n²)     - 2D array/matrix

ANALYSIS QUESTIONS TO ASK:
1. How many times does the main loop run?
2. Are there loops inside loops?
3. How much extra memory do I create?
4. What happens if input size doubles?
`);

// Let's run a final demonstration
console.log("\n🚀 FINAL DEMONSTRATION");
console.log("-".repeat(25));

function demonstrateGrowth() {
    const sizes = [10, 100, 1000];
    
    console.log("Seeing complexity in action:");
    
    sizes.forEach(size => {
        console.log(`\nFor input size ${size}:`);
        console.log(`  O(1):      ${1} operations`);
        console.log(`  O(log n):  ${Math.ceil(Math.log2(size))} operations`);
        console.log(`  O(n):      ${size} operations`);
        console.log(`  O(n²):     ${size * size} operations`);
    });
    
    console.log("\n💡 See how O(n²) explodes as input grows!");
}

demonstrateGrowth(); 