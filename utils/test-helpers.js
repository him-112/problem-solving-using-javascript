/**
 * TEST HELPERS AND UTILITY FUNCTIONS
 * 
 * This file contains common testing utilities, patterns, and helper functions
 * used throughout the problem-solving examples. These utilities help with:
 * - Array testing and generation
 * - Performance measurement
 * - Result validation
 * - Common test case patterns
 * - Visualization helpers
 */

// ===============================
// ARRAY TESTING UTILITIES
// ===============================

/**
 * Generate array of random integers
 * @param {number} size - Size of array
 * @param {number} min - Minimum value (inclusive)
 * @param {number} max - Maximum value (inclusive)
 * @returns {number[]} Array of random integers
 */
function generateRandomArray(size, min = 0, max = 100) {
    return Array.from({ length: size }, () => 
        Math.floor(Math.random() * (max - min + 1)) + min
    );
}

/**
 * Generate sorted array
 * @param {number} size - Size of array
 * @param {number} start - Starting value
 * @param {number} step - Step between values
 * @returns {number[]} Sorted array
 */
function generateSortedArray(size, start = 0, step = 1) {
    return Array.from({ length: size }, (_, i) => start + i * step);
}

/**
 * Generate reverse sorted array
 * @param {number} size - Size of array
 * @param {number} start - Starting value (will be the largest)
 * @param {number} step - Step between values
 * @returns {number[]} Reverse sorted array
 */
function generateReverseSortedArray(size, start = 100, step = 1) {
    return Array.from({ length: size }, (_, i) => start - i * step);
}

/**
 * Generate array with duplicates
 * @param {number} size - Size of array
 * @param {number} numUnique - Number of unique values
 * @returns {number[]} Array with duplicates
 */
function generateArrayWithDuplicates(size, numUnique = 5) {
    const uniqueValues = Array.from({ length: numUnique }, (_, i) => i + 1);
    const result = [];
    
    for (let i = 0; i < size; i++) {
        result.push(uniqueValues[Math.floor(Math.random() * numUnique)]);
    }
    
    return result;
}

// ===============================
// PERFORMANCE TESTING UTILITIES
// ===============================

/**
 * Measure execution time of a function
 * @param {Function} func - Function to measure
 * @param {...any} args - Arguments to pass to function
 * @returns {Object} Result and execution time
 */
function measureTime(func, ...args) {
    const start = performance.now();
    const result = func(...args);
    const end = performance.now();
    
    return {
        result,
        time: end - start,
        timeFormatted: `${(end - start).toFixed(4)}ms`
    };
}

/**
 * Compare performance of multiple functions with same input
 * @param {Object[]} functions - Array of {name, func} objects
 * @param {...any} args - Arguments to pass to all functions
 * @returns {Object[]} Performance results
 */
function comparePerformance(functions, ...args) {
    console.log("=== Performance Comparison ===");
    const results = [];
    
    functions.forEach(({ name, func }) => {
        const measurement = measureTime(func, ...args);
        results.push({
            name,
            result: measurement.result,
            time: measurement.time,
            timeFormatted: measurement.timeFormatted
        });
        
        console.log(`${name}: ${measurement.timeFormatted}`);
    });
    
    // Find fastest and slowest
    const fastest = results.reduce((min, curr) => curr.time < min.time ? curr : min);
    const slowest = results.reduce((max, curr) => curr.time > max.time ? curr : max);
    
    if (fastest !== slowest) {
        const speedup = (slowest.time / fastest.time).toFixed(1);
        console.log(`${fastest.name} is ${speedup}x faster than ${slowest.name}`);
    }
    
    return results;
}

/**
 * Run algorithm with different input sizes to analyze complexity
 * @param {Function} func - Function to test
 * @param {Function} inputGenerator - Function that generates input of given size
 * @param {number[]} sizes - Array of input sizes to test
 * @returns {Object[]} Scaling results
 */
function analyzeComplexity(func, inputGenerator, sizes = [100, 500, 1000, 5000]) {
    console.log("=== Complexity Analysis ===");
    const results = [];
    
    sizes.forEach(size => {
        const input = inputGenerator(size);
        const measurement = measureTime(func, input);
        
        results.push({
            size,
            time: measurement.time,
            timeFormatted: measurement.timeFormatted
        });
        
        console.log(`Size ${size}: ${measurement.timeFormatted}`);
    });
    
    // Calculate growth ratios
    for (let i = 1; i < results.length; i++) {
        const prev = results[i - 1];
        const curr = results[i];
        const sizeRatio = curr.size / prev.size;
        const timeRatio = curr.time / prev.time;
        
        console.log(`Size ratio: ${sizeRatio}x, Time ratio: ${timeRatio.toFixed(2)}x`);
    }
    
    return results;
}

// ===============================
// RESULT VALIDATION UTILITIES
// ===============================

/**
 * Check if array is sorted in ascending order
 * @param {number[]} arr - Array to check
 * @returns {boolean} True if sorted
 */
function isSorted(arr) {
    for (let i = 1; i < arr.length; i++) {
        if (arr[i] < arr[i - 1]) {
            return false;
        }
    }
    return true;
}

/**
 * Check if two arrays are equal
 * @param {any[]} arr1 - First array
 * @param {any[]} arr2 - Second array
 * @returns {boolean} True if equal
 */
function arraysEqual(arr1, arr2) {
    if (arr1.length !== arr2.length) return false;
    
    for (let i = 0; i < arr1.length; i++) {
        if (arr1[i] !== arr2[i]) return false;
    }
    return true;
}

/**
 * Validate that multiple algorithms produce same result
 * @param {Object[]} algorithms - Array of {name, func} objects
 * @param {any} input - Input to test with
 * @returns {boolean} True if all algorithms agree
 */
function validateAlgorithms(algorithms, input) {
    console.log("=== Algorithm Validation ===");
    const results = algorithms.map(({ name, func }) => {
        const result = func(Array.isArray(input) ? [...input] : input);
        console.log(`${name}: ${JSON.stringify(result)}`);
        return { name, result };
    });
    
    // Check if all results are equal
    const firstResult = results[0].result;
    const allEqual = results.every(({ result }) => {
        if (Array.isArray(result)) {
            return arraysEqual(result, firstResult);
        }
        return result === firstResult;
    });
    
    console.log(`All algorithms agree: ${allEqual ? '✓' : '✗'}`);
    return allEqual;
}

// ===============================
// VISUALIZATION HELPERS
// ===============================

/**
 * Create visual representation of array
 * @param {number[]} arr - Array to visualize
 * @param {number} maxLength - Maximum length to display
 * @returns {string} Visual representation
 */
function visualizeArray(arr, maxLength = 20) {
    if (arr.length <= maxLength) {
        return `[${arr.join(', ')}]`;
    } else {
        const start = arr.slice(0, 5);
        const end = arr.slice(-5);
        return `[${start.join(', ')}, ...(${arr.length - 10} more)..., ${end.join(', ')}]`;
    }
}

/**
 * Create ASCII bar chart for small arrays
 * @param {number[]} arr - Array to visualize
 * @param {number} maxWidth - Maximum width of bars
 * @returns {string} ASCII bar chart
 */
function createBarChart(arr, maxWidth = 20) {
    const max = Math.max(...arr);
    const min = Math.min(...arr);
    const range = max - min || 1; // Avoid division by zero
    
    let chart = '\n';
    arr.forEach((val, index) => {
        const normalizedVal = (val - min) / range;
        const barLength = Math.ceil(normalizedVal * maxWidth);
        const bar = '█'.repeat(barLength) || '▏'; // At least one character
        chart += `${index.toString().padStart(2)}: ${bar} ${val}\n`;
    });
    
    return chart;
}

// ===============================
// TESTING PATTERNS
// ===============================

/**
 * Standard test cases for array algorithms
 * @returns {Object[]} Array of test cases
 */
function getStandardArrayTestCases() {
    return [
        { name: "Empty array", input: [] },
        { name: "Single element", input: [42] },
        { name: "Two elements", input: [3, 1] },
        { name: "Already sorted", input: [1, 2, 3, 4, 5] },
        { name: "Reverse sorted", input: [5, 4, 3, 2, 1] },
        { name: "Random order", input: [3, 1, 4, 1, 5, 9, 2, 6] },
        { name: "Duplicates", input: [3, 3, 1, 1, 4, 4, 1, 1] },
        { name: "All same", input: [7, 7, 7, 7] },
        { name: "Negative numbers", input: [-3, -1, -4, -1, -5] },
        { name: "Mixed positive/negative", input: [-2, 5, -1, 8, 0, -3] }
    ];
}

/**
 * Run algorithm against standard test cases
 * @param {Function} algorithm - Algorithm to test
 * @param {string} algorithmName - Name for display
 * @returns {Object[]} Test results
 */
function runStandardTests(algorithm, algorithmName) {
    console.log(`=== Testing ${algorithmName} ===`);
    const testCases = getStandardArrayTestCases();
    const results = [];
    
    testCases.forEach(({ name, input }) => {
        try {
            const result = algorithm([...input]); // Copy to avoid mutation
            console.log(`${name}: ${visualizeArray(input)} → ${visualizeArray(result)}`);
            results.push({ name, input, result, success: true });
        } catch (error) {
            console.log(`${name}: ERROR - ${error.message}`);
            results.push({ name, input, result: null, success: false, error });
        }
    });
    
    const successCount = results.filter(r => r.success).length;
    console.log(`\nPassed: ${successCount}/${results.length} test cases`);
    
    return results;
}

// ===============================
// MEMORY USAGE HELPERS
// ===============================

/**
 * Estimate memory usage of data structure
 * @param {any} data - Data to analyze
 * @returns {number} Estimated bytes
 */
function estimateMemoryUsage(data) {
    if (data === null || data === undefined) return 0;
    
    if (typeof data === 'number') return 8; // JavaScript numbers are 64-bit
    if (typeof data === 'string') return data.length * 2; // UTF-16
    if (typeof data === 'boolean') return 4;
    
    if (Array.isArray(data)) {
        return data.reduce((total, item) => total + estimateMemoryUsage(item), 0) + 
               data.length * 8; // Array overhead
    }
    
    if (typeof data === 'object') {
        return Object.keys(data).reduce((total, key) => 
            total + estimateMemoryUsage(key) + estimateMemoryUsage(data[key]), 0
        ) + Object.keys(data).length * 8; // Object overhead
    }
    
    return 0;
}

// ===============================
// COMMON ALGORITHM PATTERNS
// ===============================

/**
 * Two pointer pattern template
 * @param {any[]} arr - Input array
 * @param {Function} condition - Condition function
 * @returns {any} Result based on condition
 */
function twoPointerPattern(arr, condition) {
    let left = 0;
    let right = arr.length - 1;
    
    while (left < right) {
        const result = condition(arr[left], arr[right], left, right);
        
        if (result === 'found') {
            return { left, right, values: [arr[left], arr[right]] };
        } else if (result === 'moveLeft') {
            left++;
        } else if (result === 'moveRight') {
            right--;
        } else {
            // Move both or custom logic
            left++;
            right--;
        }
    }
    
    return null; // Not found
}

/**
 * Sliding window pattern template
 * @param {any[]} arr - Input array
 * @param {number} windowSize - Size of window
 * @param {Function} processor - Function to process each window
 * @returns {any[]} Results for each window
 */
function slidingWindowPattern(arr, windowSize, processor) {
    if (arr.length < windowSize) return [];
    
    const results = [];
    
    for (let i = 0; i <= arr.length - windowSize; i++) {
        const window = arr.slice(i, i + windowSize);
        const result = processor(window, i);
        results.push(result);
    }
    
    return results;
}

// Export all utilities
module.exports = {
    // Array generation
    generateRandomArray,
    generateSortedArray,
    generateReverseSortedArray,
    generateArrayWithDuplicates,
    
    // Performance testing
    measureTime,
    comparePerformance,
    analyzeComplexity,
    
    // Validation
    isSorted,
    arraysEqual,
    validateAlgorithms,
    
    // Visualization
    visualizeArray,
    createBarChart,
    
    // Testing patterns
    getStandardArrayTestCases,
    runStandardTests,
    
    // Memory and patterns
    estimateMemoryUsage,
    twoPointerPattern,
    slidingWindowPattern
};

/**
 * USAGE EXAMPLES:
 * 
 * // Generate test data
 * const randomData = generateRandomArray(1000, 1, 100);
 * const sortedData = generateSortedArray(100);
 * 
 * // Performance testing
 * const results = comparePerformance([
 *     { name: 'Algorithm A', func: algorithmA },
 *     { name: 'Algorithm B', func: algorithmB }
 * ], testInput);
 * 
 * // Validation
 * const isValid = validateAlgorithms([
 *     { name: 'Bubble Sort', func: bubbleSort },
 *     { name: 'Quick Sort', func: quickSort }
 * ], unsortedArray);
 * 
 * // Standard testing
 * runStandardTests(myAlgorithm, 'My Algorithm');
 * 
 * // Complexity analysis
 * analyzeComplexity(
 *     myAlgorithm,
 *     size => generateRandomArray(size),
 *     [100, 500, 1000, 5000]
 * );
 */ 