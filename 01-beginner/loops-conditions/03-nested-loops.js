/**
 * PROBLEM: Nested Loops and Multi-Dimensional Processing
 * 
 * DESCRIPTION:
 * Understanding nested loops for working with matrices, grids, and patterns.
 * Essential for 2D array processing and algorithmic problem solving.
 * 
 * KEY CONCEPTS:
 * - Nested loop structure and iteration
 * - Matrix and 2D array operations
 * - Pattern generation and printing
 * - Time complexity with nested loops
 * - Loop control and optimization
 * 
 * EXAMPLES:
 * printMatrix([[1,2],[3,4]]) prints a 2x2 matrix
 * generatePattern(5) creates a 5x5 pattern
 */

// Method 1: Basic Nested Loop Structure
function basicNestedLoops(rows, cols) {
    /**
     * APPROACH: Demonstrate basic nested loop structure
     * Outer loop for rows, inner loop for columns
     * 
     * TIME COMPLEXITY: O(rows * cols)
     * SPACE COMPLEXITY: O(1) for iteration, O(rows * cols) for result
     */
    
    console.log(`basicNestedLoops(${rows}, ${cols}) called`);
    
    if (rows <= 0 || cols <= 0) {
        console.log('Invalid dimensions: rows and cols must be positive');
        return [];
    }
    
    const result = [];
    
    console.log(`Creating ${rows}x${cols} matrix:`);
    
    for (let row = 0; row < rows; row++) {
        console.log(`  Processing row ${row}:`);
        const currentRow = [];
        
        for (let col = 0; col < cols; col++) {
            const value = row * cols + col + 1; // Simple numbering
            currentRow.push(value);
            console.log(`    Column ${col}: value = ${value}`);
        }
        
        result.push(currentRow);
        console.log(`    Row ${row} completed: [${currentRow.join(', ')}]`);
    }
    
    console.log(`Final matrix:`);
    result.forEach((row, index) => {
        console.log(`  Row ${index}: [${row.join(', ')}]`);
    });
    
    return result;
}

// Method 2: Matrix Operations
function matrixOperations(matrix) {
    /**
     * APPROACH: Common operations on 2D arrays/matrices
     * Show traversal patterns and calculations
     * 
     * TIME COMPLEXITY: O(rows * cols)
     * SPACE COMPLEXITY: O(1) for calculations, O(rows * cols) for results
     */
    
    console.log(`matrixOperations called with matrix:`);
    matrix.forEach((row, index) => {
        console.log(`  Row ${index}: [${row.join(', ')}]`);
    });
    
    if (!Array.isArray(matrix) || matrix.length === 0) {
        console.log('Invalid matrix: must be non-empty 2D array');
        return null;
    }
    
    const rows = matrix.length;
    const cols = matrix[0].length;
    
    console.log(`Matrix dimensions: ${rows}x${cols}`);
    
    const operations = {
        dimensions: { rows, cols },
        sum: 0,
        min: Infinity,
        max: -Infinity,
        diagonalSum: 0,
        rowSums: [],
        colSums: new Array(cols).fill(0)
    };
    
    // Process each element
    console.log(`\nProcessing matrix elements:`);
    
    for (let row = 0; row < rows; row++) {
        let rowSum = 0;
        console.log(`  Row ${row}:`);
        
        for (let col = 0; col < cols; col++) {
            const value = matrix[row][col];
            console.log(`    [${row}][${col}] = ${value}`);
            
            // Update calculations
            operations.sum += value;
            operations.min = Math.min(operations.min, value);
            operations.max = Math.max(operations.max, value);
            
            rowSum += value;
            operations.colSums[col] += value;
            
            // Add to diagonal sum if it's a diagonal element
            if (row === col) {
                operations.diagonalSum += value;
                console.log(`      Added to diagonal: ${operations.diagonalSum}`);
            }
        }
        
        operations.rowSums.push(rowSum);
        console.log(`    Row ${row} sum: ${rowSum}`);
    }
    
    console.log(`\nMatrix statistics:`);
    console.log(`  Total sum: ${operations.sum}`);
    console.log(`  Min value: ${operations.min}`);
    console.log(`  Max value: ${operations.max}`);
    console.log(`  Diagonal sum: ${operations.diagonalSum}`);
    console.log(`  Row sums: [${operations.rowSums.join(', ')}]`);
    console.log(`  Column sums: [${operations.colSums.join(', ')}]`);
    
    return operations;
}

// Method 3: Pattern Generation
function generatePatterns(size) {
    /**
     * APPROACH: Create various patterns using nested loops
     * Show different iteration patterns and designs
     * 
     * TIME COMPLEXITY: O(size²)
     * SPACE COMPLEXITY: O(size²)
     */
    
    console.log(`generatePatterns(${size}) called`);
    
    if (size <= 0) {
        console.log('Size must be positive');
        return {};
    }
    
    const patterns = {};
    
    // Pattern 1: Number Square
    console.log(`\n--- Pattern 1: Number Square ---`);
    patterns.numberSquare = [];
    
    for (let row = 0; row < size; row++) {
        const currentRow = [];
        for (let col = 0; col < size; col++) {
            currentRow.push(row * size + col + 1);
        }
        patterns.numberSquare.push(currentRow);
    }
    
    console.log('Number Square:');
    patterns.numberSquare.forEach(row => {
        console.log('  ' + row.map(n => n.toString().padStart(2)).join(' '));
    });
    
    // Pattern 2: Multiplication Table
    console.log(`\n--- Pattern 2: Multiplication Table ---`);
    patterns.multiplicationTable = [];
    
    for (let row = 1; row <= size; row++) {
        const currentRow = [];
        for (let col = 1; col <= size; col++) {
            currentRow.push(row * col);
        }
        patterns.multiplicationTable.push(currentRow);
    }
    
    console.log('Multiplication Table:');
    patterns.multiplicationTable.forEach(row => {
        console.log('  ' + row.map(n => n.toString().padStart(3)).join(' '));
    });
    
    // Pattern 3: Identity Matrix
    console.log(`\n--- Pattern 3: Identity Matrix ---`);
    patterns.identityMatrix = [];
    
    for (let row = 0; row < size; row++) {
        const currentRow = [];
        for (let col = 0; col < size; col++) {
            currentRow.push(row === col ? 1 : 0);
        }
        patterns.identityMatrix.push(currentRow);
    }
    
    console.log('Identity Matrix:');
    patterns.identityMatrix.forEach(row => {
        console.log('  ' + row.join(' '));
    });
    
    // Pattern 4: Distance from Center
    console.log(`\n--- Pattern 4: Distance from Center ---`);
    patterns.distanceFromCenter = [];
    const center = Math.floor(size / 2);
    
    for (let row = 0; row < size; row++) {
        const currentRow = [];
        for (let col = 0; col < size; col++) {
            const distance = Math.max(Math.abs(row - center), Math.abs(col - center));
            currentRow.push(distance);
        }
        patterns.distanceFromCenter.push(currentRow);
    }
    
    console.log('Distance from Center:');
    patterns.distanceFromCenter.forEach(row => {
        console.log('  ' + row.join(' '));
    });
    
    return patterns;
}

// Method 4: Search in 2D Array
function searchIn2D(matrix, target) {
    /**
     * APPROACH: Search for a value in a 2D array
     * Demonstrate nested loop search patterns
     * 
     * TIME COMPLEXITY: O(rows * cols)
     * SPACE COMPLEXITY: O(1)
     */
    
    console.log(`searchIn2D looking for ${target} in matrix:`);
    matrix.forEach((row, index) => {
        console.log(`  Row ${index}: [${row.join(', ')}]`);
    });
    
    if (!Array.isArray(matrix) || matrix.length === 0) {
        console.log('Invalid matrix');
        return { found: false };
    }
    
    const results = {
        found: false,
        positions: [],
        searchSteps: []
    };
    
    console.log(`\nSearching for ${target}:`);
    
    for (let row = 0; row < matrix.length; row++) {
        for (let col = 0; col < matrix[row].length; col++) {
            const value = matrix[row][col];
            const step = `[${row}][${col}] = ${value}`;
            
            results.searchSteps.push(step);
            console.log(`  Checking ${step}`);
            
            if (value === target) {
                results.found = true;
                results.positions.push({ row, col });
                console.log(`    ✓ Found ${target} at position [${row}][${col}]`);
            }
        }
    }
    
    if (results.found) {
        console.log(`\nFound ${target} at ${results.positions.length} position(s):`);
        results.positions.forEach(pos => {
            console.log(`  [${pos.row}][${pos.col}]`);
        });
    } else {
        console.log(`\n${target} not found in matrix`);
    }
    
    return results;
}

// Method 5: Matrix Traversal Patterns
function matrixTraversal(matrix) {
    /**
     * APPROACH: Different ways to traverse a matrix
     * Show various iteration patterns
     * 
     * TIME COMPLEXITY: O(rows * cols)
     * SPACE COMPLEXITY: O(rows * cols) for storing results
     */
    
    console.log(`matrixTraversal called with matrix:`);
    matrix.forEach((row, index) => {
        console.log(`  Row ${index}: [${row.join(', ')}]`);
    });
    
    if (!Array.isArray(matrix) || matrix.length === 0) {
        console.log('Invalid matrix');
        return {};
    }
    
    const rows = matrix.length;
    const cols = matrix[0].length;
    const traversals = {};
    
    // 1. Row-wise traversal (left to right, top to bottom)
    console.log(`\n--- Row-wise Traversal ---`);
    traversals.rowWise = [];
    
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            traversals.rowWise.push(matrix[row][col]);
        }
    }
    
    console.log(`Row-wise: [${traversals.rowWise.join(', ')}]`);
    
    // 2. Column-wise traversal (top to bottom, left to right)
    console.log(`\n--- Column-wise Traversal ---`);
    traversals.colWise = [];
    
    for (let col = 0; col < cols; col++) {
        for (let row = 0; row < rows; row++) {
            traversals.colWise.push(matrix[row][col]);
        }
    }
    
    console.log(`Column-wise: [${traversals.colWise.join(', ')}]`);
    
    // 3. Diagonal traversal (main diagonal)
    console.log(`\n--- Diagonal Traversal ---`);
    traversals.diagonal = [];
    
    const minDim = Math.min(rows, cols);
    for (let i = 0; i < minDim; i++) {
        traversals.diagonal.push(matrix[i][i]);
    }
    
    console.log(`Main diagonal: [${traversals.diagonal.join(', ')}]`);
    
    // 4. Anti-diagonal traversal
    console.log(`\n--- Anti-diagonal Traversal ---`);
    traversals.antiDiagonal = [];
    
    for (let i = 0; i < minDim; i++) {
        traversals.antiDiagonal.push(matrix[i][cols - 1 - i]);
    }
    
    console.log(`Anti-diagonal: [${traversals.antiDiagonal.join(', ')}]`);
    
    // 5. Spiral traversal (clockwise)
    console.log(`\n--- Spiral Traversal ---`);
    traversals.spiral = [];
    
    let top = 0, bottom = rows - 1;
    let left = 0, right = cols - 1;
    
    while (top <= bottom && left <= right) {
        // Traverse right
        for (let col = left; col <= right; col++) {
            traversals.spiral.push(matrix[top][col]);
        }
        top++;
        
        // Traverse down
        for (let row = top; row <= bottom; row++) {
            traversals.spiral.push(matrix[row][right]);
        }
        right--;
        
        // Traverse left (if we still have rows)
        if (top <= bottom) {
            for (let col = right; col >= left; col--) {
                traversals.spiral.push(matrix[bottom][col]);
            }
            bottom--;
        }
        
        // Traverse up (if we still have columns)
        if (left <= right) {
            for (let row = bottom; row >= top; row--) {
                traversals.spiral.push(matrix[row][left]);
            }
            left++;
        }
    }
    
    console.log(`Spiral: [${traversals.spiral.join(', ')}]`);
    
    return traversals;
}

// Method 6: Performance Analysis
function performanceAnalysis(sizes) {
    /**
     * APPROACH: Analyze performance of nested loops with different sizes
     * Show how nested loops scale with input size
     * 
     * TIME COMPLEXITY: O(n²) for each size
     * SPACE COMPLEXITY: O(n²) for each matrix
     */
    
    console.log(`performanceAnalysis called with sizes: [${sizes.join(', ')}]`);
    
    const results = [];
    
    sizes.forEach(size => {
        console.log(`\nTesting size ${size}x${size}:`);
        
        const start = performance.now();
        
        // Create and process matrix
        let operations = 0;
        const matrix = [];
        
        for (let row = 0; row < size; row++) {
            const currentRow = [];
            for (let col = 0; col < size; col++) {
                currentRow.push(row * size + col);
                operations++;
            }
            matrix.push(currentRow);
        }
        
        // Perform some operations
        let sum = 0;
        for (let row = 0; row < size; row++) {
            for (let col = 0; col < size; col++) {
                sum += matrix[row][col];
                operations++;
            }
        }
        
        const end = performance.now();
        const duration = end - start;
        
        const result = {
            size,
            operations,
            duration: duration.toFixed(4),
            operationsPerMs: Math.round(operations / duration)
        };
        
        results.push(result);
        
        console.log(`  Operations: ${operations}`);
        console.log(`  Duration: ${duration.toFixed(4)}ms`);
        console.log(`  Operations/ms: ${result.operationsPerMs}`);
        console.log(`  Sum: ${sum}`);
    });
    
    console.log(`\nPerformance Summary:`);
    results.forEach(result => {
        console.log(`  ${result.size}x${result.size}: ${result.operations} ops in ${result.duration}ms`);
    });
    
    return results;
}

// Test all nested loop functions
function testNestedLoops() {
    console.log("=== Testing Nested Loops ===");
    
    // Test basic nested loops
    console.log("\n--- Basic Nested Loops ---");
    basicNestedLoops(3, 4);
    
    // Test matrix operations
    console.log("\n--- Matrix Operations ---");
    const testMatrix = [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9]
    ];
    matrixOperations(testMatrix);
    
    // Test pattern generation
    console.log("\n--- Pattern Generation ---");
    generatePatterns(4);
    
    // Test 2D search
    console.log("\n--- 2D Array Search ---");
    searchIn2D(testMatrix, 5);
    searchIn2D(testMatrix, 10);
    
    // Test matrix traversal
    console.log("\n--- Matrix Traversal ---");
    matrixTraversal(testMatrix);
    
    // Test performance
    console.log("\n--- Performance Analysis ---");
    performanceAnalysis([10, 50, 100]);
}

// Educational explanations
function explainNestedLoops() {
    console.log("\n=== Understanding Nested Loops ===");
    
    console.log("🔄 NESTED LOOP STRUCTURE:");
    console.log("• Outer loop controls rows/major iterations");
    console.log("• Inner loop controls columns/minor iterations");
    console.log("• Total iterations = outer × inner");
    console.log("• Each outer iteration runs inner loop completely");
    console.log();
    
    console.log("⏱️ TIME COMPLEXITY:");
    console.log("• Two nested loops: O(n²)");
    console.log("• Three nested loops: O(n³)");
    console.log("• Different sizes: O(rows × cols)");
    console.log("• Be careful with large datasets!");
    console.log();
    
    console.log("🎯 COMMON PATTERNS:");
    console.log("• Matrix processing: for(row) for(col)");
    console.log("• Pattern generation: nested loops with formulas");
    console.log("• Search in 2D: check each element");
    console.log("• Comparisons: compare each with each");
    console.log();
    
    console.log("📊 MATRIX OPERATIONS:");
    console.log("• Row-wise: process left to right, top to bottom");
    console.log("• Column-wise: process top to bottom, left to right");
    console.log("• Diagonal: process elements where row == col");
    console.log("• Spiral: clockwise or counterclockwise traversal");
    console.log();
    
    console.log("⚡ OPTIMIZATION TIPS:");
    console.log("• Cache array lengths outside loops");
    console.log("• Use early termination when possible");
    console.log("• Consider loop unrolling for small fixed sizes");
    console.log("• Be aware of memory access patterns");
    console.log();
    
    console.log("🔧 INTERVIEW TIPS:");
    console.log("• Understand time complexity implications");
    console.log("• Practice matrix traversal patterns");
    console.log("• Know when to use different loop orders");
    console.log("• Be comfortable with index calculations");
    console.log("• Consider space vs time trade-offs");
}

// Run all demonstrations
testNestedLoops();
explainNestedLoops();

/**
 * KEY CONCEPTS LEARNED:
 * 
 * 1. Nested Loop Structure: Outer and inner loop coordination
 * 2. Matrix Operations: 2D array processing and calculations
 * 3. Pattern Generation: Creating structured output with loops
 * 4. Traversal Patterns: Different ways to visit matrix elements
 * 5. Performance Impact: O(n²) complexity and scaling issues
 * 
 * INTERVIEW DISCUSSION POINTS:
 * 
 * Q: "What's the time complexity of nested loops?"
 * A: "Depends on the loops - two nested loops are typically O(n²),
 *     three nested loops are O(n³). With different sizes, O(rows × cols)."
 * 
 * Q: "How do you traverse a matrix in different patterns?"
 * A: "Row-wise: outer loop for rows, inner for columns.
 *     Column-wise: outer loop for columns, inner for rows.
 *     Diagonal: use same index for both dimensions."
 * 
 * Q: "When would you use nested loops?"
 * A: "Matrix operations, 2D array processing, pattern generation,
 *     comparing all pairs, nested data structures."
 * 
 * Q: "How can you optimize nested loops?"
 * A: "Early termination, cache array lengths, minimize work in inner loop,
 *     consider alternative algorithms with better complexity."
 * 
 * NESTED LOOP PATTERNS:
 * 1. Basic Matrix Processing: for(row) for(col)
 * 2. Pattern Generation: loops with mathematical formulas
 * 3. Search Operations: check each element systematically
 * 4. Comparison Operations: compare each item with others
 * 5. Traversal Patterns: different ways to visit elements
 * 
 * RELATED CONCEPTS:
 * - 2D Arrays and Matrices
 * - Dynamic Programming
 * - Graph Traversal
 * - Image Processing
 * - Game Development (grids)
 * - Computational Geometry
 */

module.exports = {
    basicNestedLoops,
    matrixOperations,
    generatePatterns,
    searchIn2D,
    matrixTraversal,
    performanceAnalysis
}; 