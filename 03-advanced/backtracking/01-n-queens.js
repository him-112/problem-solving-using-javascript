/**
 * PROBLEM: N-Queens
 * 
 * DESCRIPTION:
 * Place N queens on an N×N chessboard so that no two queens attack each other.
 * Queens can attack horizontally, vertically, and diagonally.
 * 
 * EXAMPLES:
 * N=4: Two solutions exist
 * Solution 1:     Solution 2:
 *  . Q . .         . . Q .
 *  . . . Q         Q . . .
 *  Q . . .         . . . Q
 *  . . Q .         . Q . .
 * 
 * This demonstrates backtracking algorithm patterns.
 */

// Method 1: Basic backtracking with array representation
function solveNQueens(n) {
    console.log(`Solving ${n}-Queens problem:`);
    const solutions = [];
    const board = Array(n).fill().map(() => Array(n).fill('.'));
    
    function isSafe(row, col) {
        // Check column
        for (let i = 0; i < row; i++) {
            if (board[i][col] === 'Q') return false;
        }
        
        // Check diagonal (top-left to bottom-right)
        for (let i = row - 1, j = col - 1; i >= 0 && j >= 0; i--, j--) {
            if (board[i][j] === 'Q') return false;
        }
        
        // Check diagonal (top-right to bottom-left)
        for (let i = row - 1, j = col + 1; i >= 0 && j < n; i--, j++) {
            if (board[i][j] === 'Q') return false;
        }
        
        return true;
    }
    
    function backtrack(row) {
        if (row === n) {
            // Found solution
            const solution = board.map(row => row.join(''));
            solutions.push(solution);
            console.log(`  Solution ${solutions.length}:`);
            solution.forEach(row => console.log(`    ${row}`));
            return;
        }
        
        for (let col = 0; col < n; col++) {
            if (isSafe(row, col)) {
                board[row][col] = 'Q';
                backtrack(row + 1);
                board[row][col] = '.'; // Backtrack
            }
        }
    }
    
    backtrack(0);
    console.log(`  Total solutions: ${solutions.length}`);
    return solutions;
}

// Method 2: Optimized with sets for O(1) conflict checking
function solveNQueensOptimized(n) {
    console.log(`Solving ${n}-Queens (optimized):`);
    const solutions = [];
    const cols = new Set();
    const diag1 = new Set(); // row - col
    const diag2 = new Set(); // row + col
    const board = Array(n).fill().map(() => Array(n).fill('.'));
    
    function backtrack(row) {
        if (row === n) {
            const solution = board.map(row => row.join(''));
            solutions.push(solution);
            console.log(`  Solution ${solutions.length}:`);
            solution.forEach(row => console.log(`    ${row}`));
            return;
        }
        
        for (let col = 0; col < n; col++) {
            if (cols.has(col) || diag1.has(row - col) || diag2.has(row + col)) {
                continue;
            }
            
            // Place queen
            board[row][col] = 'Q';
            cols.add(col);
            diag1.add(row - col);
            diag2.add(row + col);
            
            backtrack(row + 1);
            
            // Backtrack
            board[row][col] = '.';
            cols.delete(col);
            diag1.delete(row - col);
            diag2.delete(row + col);
        }
    }
    
    backtrack(0);
    console.log(`  Total solutions: ${solutions.length}`);
    return solutions;
}

// Method 3: Count solutions only (no board generation)
function totalNQueens(n) {
    console.log(`Counting ${n}-Queens solutions:`);
    let count = 0;
    const cols = new Set();
    const diag1 = new Set();
    const diag2 = new Set();
    
    function backtrack(row) {
        if (row === n) {
            count++;
            return;
        }
        
        for (let col = 0; col < n; col++) {
            if (cols.has(col) || diag1.has(row - col) || diag2.has(row + col)) {
                continue;
            }
            
            cols.add(col);
            diag1.add(row - col);
            diag2.add(row + col);
            
            backtrack(row + 1);
            
            cols.delete(col);
            diag1.delete(row - col);
            diag2.delete(row + col);
        }
    }
    
    backtrack(0);
    console.log(`  Total solutions: ${count}`);
    return count;
}

// Visualization helper
function visualizeBoard(solution) {
    console.log("Board visualization:");
    solution.forEach((row, i) => {
        console.log(`  ${i + 1} | ${row.split('').join(' ')}`);
    });
    console.log(`    ${'-'.repeat(solution.length * 2 + 1)}`);
    console.log(`      ${Array.from({length: solution.length}, (_, i) => String.fromCharCode(97 + i)).join(' ')}`);
}

// Test N-Queens
console.log("=== N-Queens Testing ===");

// Test with small values
[4, 8].forEach(n => {
    console.log(`\n--- N=${n} ---`);
    
    const solutions = solveNQueens(n);
    if (solutions.length > 0) {
        console.log("\nFirst solution visualization:");
        visualizeBoard(solutions[0]);
    }
    
    const optimizedSolutions = solveNQueensOptimized(n);
    const countOnly = totalNQueens(n);
    
    console.log(`Solutions match: ${solutions.length === optimizedSolutions.length && solutions.length === countOnly ? '✓' : '✗'}`);
});

module.exports = { solveNQueens, solveNQueensOptimized, totalNQueens }; 