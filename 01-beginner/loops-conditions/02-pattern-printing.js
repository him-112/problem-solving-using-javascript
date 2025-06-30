/**
 * PROBLEM: Pattern Printing
 * 
 * DESCRIPTION:
 * Generate various patterns using nested loops and conditional logic.
 * Essential for understanding loop control and spatial reasoning.
 * 
 * KEY CONCEPTS:
 * - Nested loops for 2D patterns
 * - Conditional logic for pattern shapes
 * - String building and formatting
 * - Mathematical relationships in patterns
 * - Space and character positioning
 * 
 * EXAMPLES:
 * Triangle, Diamond, Number patterns, Pyramids
 */

// Method 1: Right Triangle with Stars
function rightTriangle(n) {
    /**
     * APPROACH: Outer loop for rows, inner loop for stars
     * Row i has i stars
     * 
     * Pattern for n=5:
     * *
     * **
     * ***
     * ****
     * *****
     * 
     * TIME COMPLEXITY: O(n²)
     * SPACE COMPLEXITY: O(1) - excluding output
     */
    
    console.log(`rightTriangle(${n}) - Right Triangle Pattern:`);
    
    for (let i = 1; i <= n; i++) {
        let row = '';
        for (let j = 1; j <= i; j++) {
            row += '*';
        }
        console.log(row);
    }
    console.log();
}

// Method 2: Left Triangle with Stars
function leftTriangle(n) {
    /**
     * APPROACH: Add spaces before stars for alignment
     * Row i has (n-i) spaces and i stars
     * 
     * Pattern for n=5:
     *     *
     *    **
     *   ***
     *  ****
     * *****
     * 
     * TIME COMPLEXITY: O(n²)
     * SPACE COMPLEXITY: O(1)
     */
    
    console.log(`leftTriangle(${n}) - Left Triangle Pattern:`);
    
    for (let i = 1; i <= n; i++) {
        let row = '';
        
        // Add spaces
        for (let j = 1; j <= n - i; j++) {
            row += ' ';
        }
        
        // Add stars
        for (let k = 1; k <= i; k++) {
            row += '*';
        }
        
        console.log(row);
    }
    console.log();
}

// Method 3: Pyramid Pattern
function pyramid(n) {
    /**
     * APPROACH: Center-aligned triangle
     * Row i has (n-i) spaces and (2*i-1) stars
     * 
     * Pattern for n=5:
     *     *
     *    ***
     *   *****
     *  *******
     * *********
     * 
     * TIME COMPLEXITY: O(n²)
     * SPACE COMPLEXITY: O(1)
     */
    
    console.log(`pyramid(${n}) - Pyramid Pattern:`);
    
    for (let i = 1; i <= n; i++) {
        let row = '';
        
        // Add leading spaces
        for (let j = 1; j <= n - i; j++) {
            row += ' ';
        }
        
        // Add stars
        for (let k = 1; k <= 2 * i - 1; k++) {
            row += '*';
        }
        
        console.log(row);
    }
    console.log();
}

// Method 4: Diamond Pattern
function diamond(n) {
    /**
     * APPROACH: Combine upper and lower triangles
     * Upper part: increasing stars, lower part: decreasing stars
     * 
     * Pattern for n=5:
     *     *
     *    ***
     *   *****
     *  *******
     * *********
     *  *******
     *   *****
     *    ***
     *     *
     * 
     * TIME COMPLEXITY: O(n²)
     * SPACE COMPLEXITY: O(1)
     */
    
    console.log(`diamond(${n}) - Diamond Pattern:`);
    
    // Upper part (including middle)
    for (let i = 1; i <= n; i++) {
        let row = '';
        
        // Leading spaces
        for (let j = 1; j <= n - i; j++) {
            row += ' ';
        }
        
        // Stars
        for (let k = 1; k <= 2 * i - 1; k++) {
            row += '*';
        }
        
        console.log(row);
    }
    
    // Lower part
    for (let i = n - 1; i >= 1; i--) {
        let row = '';
        
        // Leading spaces
        for (let j = 1; j <= n - i; j++) {
            row += ' ';
        }
        
        // Stars
        for (let k = 1; k <= 2 * i - 1; k++) {
            row += '*';
        }
        
        console.log(row);
    }
    console.log();
}

// Method 5: Number Triangle
function numberTriangle(n) {
    /**
     * APPROACH: Print numbers instead of stars
     * Row i contains numbers 1 to i
     * 
     * Pattern for n=5:
     * 1
     * 1 2
     * 1 2 3
     * 1 2 3 4
     * 1 2 3 4 5
     * 
     * TIME COMPLEXITY: O(n²)
     * SPACE COMPLEXITY: O(1)
     */
    
    console.log(`numberTriangle(${n}) - Number Triangle Pattern:`);
    
    for (let i = 1; i <= n; i++) {
        let row = '';
        for (let j = 1; j <= i; j++) {
            row += j + ' ';
        }
        console.log(row.trim());
    }
    console.log();
}

// Method 6: Multiplication Table
function multiplicationTable(n) {
    /**
     * APPROACH: Nested loops for rows and columns
     * Cell (i,j) contains i * j
     * 
     * Pattern for n=5:
     *  1  2  3  4  5
     *  2  4  6  8 10
     *  3  6  9 12 15
     *  4  8 12 16 20
     *  5 10 15 20 25
     * 
     * TIME COMPLEXITY: O(n²)
     * SPACE COMPLEXITY: O(1)
     */
    
    console.log(`multiplicationTable(${n}) - Multiplication Table:`);
    
    for (let i = 1; i <= n; i++) {
        let row = '';
        for (let j = 1; j <= n; j++) {
            const product = i * j;
            // Pad with spaces for alignment
            row += product.toString().padStart(3, ' ');
        }
        console.log(row);
    }
    console.log();
}

// Method 7: Hollow Rectangle
function hollowRectangle(rows, cols) {
    /**
     * APPROACH: Print stars only on borders
     * Fill interior with spaces
     * 
     * Pattern for (5,8):
     * ********
     * *      *
     * *      *
     * *      *
     * ********
     * 
     * TIME COMPLEXITY: O(rows * cols)
     * SPACE COMPLEXITY: O(1)
     */
    
    console.log(`hollowRectangle(${rows}, ${cols}) - Hollow Rectangle:`);
    
    for (let i = 1; i <= rows; i++) {
        let row = '';
        for (let j = 1; j <= cols; j++) {
            // Border conditions
            if (i === 1 || i === rows || j === 1 || j === cols) {
                row += '*';
            } else {
                row += ' ';
            }
        }
        console.log(row);
    }
    console.log();
}

// Method 8: Pascal's Triangle
function pascalTriangle(n) {
    /**
     * APPROACH: Each number is sum of two numbers above it
     * Use formula: C(n,k) = C(n,k-1) * (n-k+1) / k
     * 
     * Pattern for n=5:
     *     1
     *    1 1
     *   1 2 1
     *  1 3 3 1
     * 1 4 6 4 1
     * 
     * TIME COMPLEXITY: O(n²)
     * SPACE COMPLEXITY: O(n) for current row
     */
    
    console.log(`pascalTriangle(${n}) - Pascal's Triangle:`);
    
    for (let i = 0; i < n; i++) {
        let row = '';
        
        // Leading spaces for centering
        for (let j = 0; j < n - i - 1; j++) {
            row += ' ';
        }
        
        // Calculate Pascal's triangle values
        let value = 1;
        for (let k = 0; k <= i; k++) {
            row += value + ' ';
            value = value * (i - k) / (k + 1);
        }
        
        console.log(row.trim());
    }
    console.log();
}

// Method 9: Spiral Pattern
function spiralPattern(n) {
    /**
     * APPROACH: Fill matrix in spiral order
     * Move right → down → left → up → repeat
     * 
     * Pattern for n=4:
     *  1  2  3  4
     * 12 13 14  5
     * 11 16 15  6
     * 10  9  8  7
     * 
     * TIME COMPLEXITY: O(n²)
     * SPACE COMPLEXITY: O(n²) for matrix
     */
    
    console.log(`spiralPattern(${n}) - Spiral Pattern:`);
    
    // Create and initialize matrix
    const matrix = Array(n).fill().map(() => Array(n).fill(0));
    
    let top = 0, bottom = n - 1, left = 0, right = n - 1;
    let num = 1;
    
    while (top <= bottom && left <= right) {
        // Fill top row (left to right)
        for (let i = left; i <= right; i++) {
            matrix[top][i] = num++;
        }
        top++;
        
        // Fill right column (top to bottom)
        for (let i = top; i <= bottom; i++) {
            matrix[i][right] = num++;
        }
        right--;
        
        // Fill bottom row (right to left)
        if (top <= bottom) {
            for (let i = right; i >= left; i--) {
                matrix[bottom][i] = num++;
            }
            bottom--;
        }
        
        // Fill left column (bottom to top)
        if (left <= right) {
            for (let i = bottom; i >= top; i--) {
                matrix[i][left] = num++;
            }
            left++;
        }
    }
    
    // Print matrix
    for (let i = 0; i < n; i++) {
        let row = '';
        for (let j = 0; j < n; j++) {
            row += matrix[i][j].toString().padStart(3, ' ');
        }
        console.log(row);
    }
    console.log();
}

// Method 10: Zigzag Pattern
function zigzagPattern(rows, cols) {
    /**
     * APPROACH: Alternate direction each row
     * Even rows: left to right, Odd rows: right to left
     * 
     * Pattern for (4,5):
     *  1  2  3  4  5
     * 10  9  8  7  6
     * 11 12 13 14 15
     * 20 19 18 17 16
     * 
     * TIME COMPLEXITY: O(rows * cols)
     * SPACE COMPLEXITY: O(rows * cols)
     */
    
    console.log(`zigzagPattern(${rows}, ${cols}) - Zigzag Pattern:`);
    
    const matrix = Array(rows).fill().map(() => Array(cols).fill(0));
    let num = 1;
    
    for (let i = 0; i < rows; i++) {
        if (i % 2 === 0) {
            // Left to right
            for (let j = 0; j < cols; j++) {
                matrix[i][j] = num++;
            }
        } else {
            // Right to left
            for (let j = cols - 1; j >= 0; j--) {
                matrix[i][j] = num++;
            }
        }
    }
    
    // Print matrix
    for (let i = 0; i < rows; i++) {
        let row = '';
        for (let j = 0; j < cols; j++) {
            row += matrix[i][j].toString().padStart(3, ' ');
        }
        console.log(row);
    }
    console.log();
}

// Test all pattern functions
function testPatternPrinting() {
    console.log("=== Testing Pattern Printing ===\n");
    
    const n = 5;
    
    rightTriangle(n);
    leftTriangle(n);
    pyramid(n);
    diamond(n);
    numberTriangle(n);
    multiplicationTable(n);
    hollowRectangle(5, 8);
    pascalTriangle(n);
    spiralPattern(4);
    zigzagPattern(4, 5);
}

// Interactive pattern generator
function generateCustomPattern(patternType, size) {
    console.log(`\n=== Custom Pattern Generator ===`);
    console.log(`Pattern: ${patternType}, Size: ${size}\n`);
    
    switch (patternType.toLowerCase()) {
        case 'triangle':
            rightTriangle(size);
            break;
        case 'pyramid':
            pyramid(size);
            break;
        case 'diamond':
            diamond(size);
            break;
        case 'pascal':
            pascalTriangle(size);
            break;
        case 'spiral':
            spiralPattern(size);
            break;
        default:
            console.log(`Unknown pattern type: ${patternType}`);
            console.log('Available patterns: triangle, pyramid, diamond, pascal, spiral');
    }
}

// Educational explanations
function explainPatternPrinting() {
    console.log("\n=== Understanding Pattern Printing ===");
    
    console.log("🔧 NESTED LOOP FUNDAMENTALS:");
    console.log("• Outer loop controls rows");
    console.log("• Inner loop controls columns/elements per row");
    console.log("• Pattern logic determines what to print");
    console.log("• Space management for alignment");
    console.log();
    
    console.log("📐 COMMON PATTERNS:");
    console.log("1. Right Triangle: Row i has i elements");
    console.log("2. Left Triangle: Row i has (n-i) spaces + i elements");
    console.log("3. Pyramid: Row i has (n-i) spaces + (2*i-1) elements");
    console.log("4. Diamond: Upper pyramid + lower inverted pyramid");
    console.log("5. Hollow shapes: Print only borders");
    console.log();
    
    console.log("🧮 MATHEMATICAL RELATIONSHIPS:");
    console.log("• Triangular numbers: 1, 3, 6, 10, 15... (n*(n+1)/2)");
    console.log("• Pascal's triangle: C(n,k) = C(n-1,k-1) + C(n-1,k)");
    console.log("• Spiral: Direction changes at boundaries");
    console.log("• Symmetry: Many patterns have reflective properties");
    console.log();
    
    console.log("💡 PROBLEM-SOLVING APPROACH:");
    console.log("1. Identify the pattern structure");
    console.log("2. Determine row-column relationships");
    console.log("3. Handle spacing and alignment");
    console.log("4. Consider edge cases and boundaries");
    console.log("5. Test with small examples first");
    console.log();
    
    console.log("🎯 INTERVIEW TIPS:");
    console.log("• Start with simple patterns before complex ones");
    console.log("• Think about the mathematical relationships");
    console.log("• Consider both time and space complexity");
    console.log("• Handle edge cases (n=0, n=1)");
    console.log("• Practice without looking at solutions");
}

// Performance analysis
function performanceAnalysis() {
    console.log("\n=== Performance Analysis ===");
    
    const sizes = [10, 50, 100];
    
    sizes.forEach(size => {
        console.log(`\nTesting with size: ${size}`);
        
        // Time simple triangle
        let start = performance.now();
        rightTriangle(size);
        let end = performance.now();
        console.log(`Right Triangle (${size}): ${(end - start).toFixed(2)}ms`);
        
        // Time complex spiral
        start = performance.now();
        spiralPattern(size);
        end = performance.now();
        console.log(`Spiral Pattern (${size}): ${(end - start).toFixed(2)}ms`);
    });
    
    console.log("\nNote: All pattern algorithms are O(n²) time complexity");
    console.log("Space complexity varies: O(1) for direct printing, O(n²) for matrix storage");
}

// Run demonstrations
testPatternPrinting();
generateCustomPattern('pyramid', 6);
generateCustomPattern('spiral', 5);
explainPatternPrinting();
performanceAnalysis();

/**
 * KEY CONCEPTS LEARNED:
 * 
 * 1. Nested Loops: Outer for rows, inner for columns
 * 2. Pattern Logic: Mathematical relationships between position and content
 * 3. Space Management: Proper alignment and formatting
 * 4. Matrix Operations: 2D array manipulation for complex patterns
 * 5. Algorithm Efficiency: Most patterns are O(n²) time complexity
 * 
 * INTERVIEW DISCUSSION POINTS:
 * 
 * Q: "Print a pyramid pattern with n rows"
 * A: "Use nested loops: outer for rows, inner for spaces and stars.
 *     Row i needs (n-i) spaces and (2*i-1) stars."
 * 
 * Q: "Create a spiral pattern in a matrix"
 * A: "Use four boundaries (top, bottom, left, right) and move in spiral order:
 *     right → down → left → up, adjusting boundaries after each direction."
 * 
 * Q: "What's the time complexity of printing a triangle?"
 * A: "O(n²) because we print roughly n²/2 characters total.
 *     Space complexity is O(1) if printing directly."
 * 
 * Q: "How would you optimize pattern printing for large n?"
 * A: "Use string builders instead of concatenation, consider buffering output,
 *     or generate patterns mathematically without storing intermediate results."
 * 
 * PRACTICAL APPLICATIONS:
 * 1. Game development: terrain generation, ASCII art
 * 2. Data visualization: charts, graphs, histograms
 * 3. Testing: generating test data patterns
 * 4. UI development: progress indicators, loading animations
 * 5. Educational: demonstrating algorithm concepts
 * 
 * RELATED CONCEPTS:
 * - Matrix operations
 * - 2D array manipulation
 * - Mathematical sequences
 * - Coordinate systems
 * - String formatting and alignment
 * - ASCII art generation
 */

module.exports = {
    rightTriangle,
    leftTriangle,
    pyramid,
    diamond,
    numberTriangle,
    multiplicationTable,
    hollowRectangle,
    pascalTriangle,
    spiralPattern,
    zigzagPattern,
    generateCustomPattern
}; 