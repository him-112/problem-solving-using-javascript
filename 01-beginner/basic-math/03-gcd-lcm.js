/**
 * PROBLEM: Greatest Common Divisor (GCD) and Least Common Multiple (LCM)
 * 
 * DESCRIPTION:
 * Fundamental number theory algorithms for finding GCD and LCM.
 * Essential for fraction operations, cryptography, and mathematical computations.
 * 
 * KEY CONCEPTS:
 * - Euclidean algorithm for GCD
 * - Relationship between GCD and LCM
 * - Prime factorization method
 * - Extended Euclidean algorithm
 * - Applications in real-world problems
 * 
 * EXAMPLES:
 * gcd(48, 18) = 6
 * lcm(48, 18) = 144
 * gcd(17, 13) = 1 (coprime numbers)
 */

// Method 1: GCD using Euclidean Algorithm (Iterative)
function gcdEuclidean(a, b) {
    /**
     * APPROACH: GCD(a,b) = GCD(b, a % b) until b becomes 0
     * Most efficient algorithm for GCD computation
     * 
     * TIME COMPLEXITY: O(log(min(a,b)))
     * SPACE COMPLEXITY: O(1)
     */
    
    console.log(`gcdEuclidean(${a}, ${b}) called`);
    
    // Handle negative numbers
    a = Math.abs(a);
    b = Math.abs(b);
    
    console.log(`  Working with absolute values: ${a}, ${b}`);
    
    while (b !== 0) {
        const remainder = a % b;
        console.log(`  ${a} = ${Math.floor(a/b)} × ${b} + ${remainder}`);
        
        a = b;
        b = remainder;
        console.log(`  New values: a=${a}, b=${b}`);
    }
    
    console.log(`  GCD result: ${a}`);
    return a;
}

// Method 2: GCD using Euclidean Algorithm (Recursive)
function gcdRecursive(a, b) {
    /**
     * APPROACH: Recursive implementation of Euclidean algorithm
     * Base case: GCD(a, 0) = a
     * 
     * TIME COMPLEXITY: O(log(min(a,b)))
     * SPACE COMPLEXITY: O(log(min(a,b))) - recursion stack
     */
    
    console.log(`gcdRecursive(${a}, ${b}) called`);
    
    // Handle negative numbers
    a = Math.abs(a);
    b = Math.abs(b);
    
    // Base case
    if (b === 0) {
        console.log(`  Base case: GCD(${a}, 0) = ${a}`);
        return a;
    }
    
    // Recursive case
    const remainder = a % b;
    console.log(`  Recursive call: GCD(${b}, ${remainder})`);
    return gcdRecursive(b, remainder);
}

// Method 3: GCD using Subtraction Method
function gcdSubtraction(a, b) {
    /**
     * APPROACH: GCD(a,b) = GCD(a-b, b) if a > b
     * Ancient method, less efficient than Euclidean
     * 
     * TIME COMPLEXITY: O(max(a,b))
     * SPACE COMPLEXITY: O(1)
     */
    
    console.log(`gcdSubtraction(${a}, ${b}) called`);
    
    a = Math.abs(a);
    b = Math.abs(b);
    
    console.log(`  Working with: ${a}, ${b}`);
    
    while (a !== b) {
        if (a > b) {
            a = a - b;
            console.log(`  a > b: new a = ${a}`);
        } else {
            b = b - a;
            console.log(`  b > a: new b = ${b}`);
        }
    }
    
    console.log(`  GCD result: ${a}`);
    return a;
}

// Method 4: GCD for Multiple Numbers
function gcdMultiple(numbers) {
    /**
     * APPROACH: GCD(a,b,c) = GCD(GCD(a,b), c)
     * Apply GCD pairwise to array of numbers
     * 
     * TIME COMPLEXITY: O(n * log(max))
     * SPACE COMPLEXITY: O(1)
     */
    
    console.log(`gcdMultiple([${numbers.join(', ')}]) called`);
    
    if (numbers.length === 0) return 0;
    if (numbers.length === 1) return Math.abs(numbers[0]);
    
    let result = Math.abs(numbers[0]);
    console.log(`  Starting with: ${result}`);
    
    for (let i = 1; i < numbers.length; i++) {
        result = gcdEuclidean(result, Math.abs(numbers[i]));
        console.log(`  After including ${numbers[i]}: GCD = ${result}`);
        
        // Early termination if GCD becomes 1
        if (result === 1) {
            console.log(`  Early termination: GCD is 1`);
            break;
        }
    }
    
    console.log(`  Final GCD: ${result}`);
    return result;
}

// Method 5: LCM using GCD
function lcmUsingGcd(a, b) {
    /**
     * APPROACH: LCM(a,b) = (a * b) / GCD(a,b)
     * Use relationship between GCD and LCM
     * 
     * TIME COMPLEXITY: O(log(min(a,b)))
     * SPACE COMPLEXITY: O(1)
     */
    
    console.log(`lcmUsingGcd(${a}, ${b}) called`);
    
    if (a === 0 || b === 0) {
        console.log(`  One number is zero: LCM = 0`);
        return 0;
    }
    
    a = Math.abs(a);
    b = Math.abs(b);
    
    const gcd = gcdEuclidean(a, b);
    console.log(`  GCD(${a}, ${b}) = ${gcd}`);
    
    // Use (a/gcd) * b to avoid overflow
    const lcm = (a / gcd) * b;
    console.log(`  LCM = (${a} / ${gcd}) × ${b} = ${lcm}`);
    
    return lcm;
}

// Method 6: LCM for Multiple Numbers
function lcmMultiple(numbers) {
    /**
     * APPROACH: LCM(a,b,c) = LCM(LCM(a,b), c)
     * Apply LCM pairwise to array of numbers
     * 
     * TIME COMPLEXITY: O(n * log(max))
     * SPACE COMPLEXITY: O(1)
     */
    
    console.log(`lcmMultiple([${numbers.join(', ')}]) called`);
    
    if (numbers.length === 0) return 0;
    if (numbers.some(n => n === 0)) return 0;
    
    let result = Math.abs(numbers[0]);
    console.log(`  Starting with: ${result}`);
    
    for (let i = 1; i < numbers.length; i++) {
        result = lcmUsingGcd(result, Math.abs(numbers[i]));
        console.log(`  After including ${numbers[i]}: LCM = ${result}`);
    }
    
    console.log(`  Final LCM: ${result}`);
    return result;
}

// Method 7: Extended Euclidean Algorithm
function extendedGcd(a, b) {
    /**
     * APPROACH: Find integers x, y such that ax + by = gcd(a,b)
     * Returns [gcd, x, y] where gcd = ax + by
     * Used in modular arithmetic and cryptography
     * 
     * TIME COMPLEXITY: O(log(min(a,b)))
     * SPACE COMPLEXITY: O(log(min(a,b)))
     */
    
    console.log(`extendedGcd(${a}, ${b}) called`);
    
    // Base case
    if (b === 0) {
        console.log(`  Base case: gcd=${a}, x=1, y=0`);
        return [a, 1, 0];
    }
    
    // Recursive call
    const [gcd, x1, y1] = extendedGcd(b, a % b);
    
    const x = y1;
    const y = x1 - Math.floor(a / b) * y1;
    
    console.log(`  ${a} × ${x} + ${b} × ${y} = ${gcd}`);
    console.log(`  Verification: ${a * x + b * y} = ${gcd}`);
    
    return [gcd, x, y];
}

// Method 8: GCD using Prime Factorization
function gcdPrimeFactorization(a, b) {
    /**
     * APPROACH: Find prime factors and take minimum powers
     * Educational but inefficient for large numbers
     * 
     * TIME COMPLEXITY: O(sqrt(max(a,b)))
     * SPACE COMPLEXITY: O(number of prime factors)
     */
    
    console.log(`gcdPrimeFactorization(${a}, ${b}) called`);
    
    function getPrimeFactors(n) {
        const factors = {};
        let d = 2;
        
        while (d * d <= n) {
            while (n % d === 0) {
                factors[d] = (factors[d] || 0) + 1;
                n /= d;
            }
            d++;
        }
        
        if (n > 1) {
            factors[n] = (factors[n] || 0) + 1;
        }
        
        return factors;
    }
    
    const factorsA = getPrimeFactors(Math.abs(a));
    const factorsB = getPrimeFactors(Math.abs(b));
    
    console.log(`  Prime factors of ${a}:`, factorsA);
    console.log(`  Prime factors of ${b}:`, factorsB);
    
    let gcd = 1;
    
    // Find common prime factors and take minimum power
    for (const prime in factorsA) {
        if (factorsB[prime]) {
            const minPower = Math.min(factorsA[prime], factorsB[prime]);
            gcd *= Math.pow(parseInt(prime), minPower);
            console.log(`  Common prime ${prime}^${minPower}: GCD = ${gcd}`);
        }
    }
    
    console.log(`  GCD result: ${gcd}`);
    return gcd;
}

// Method 9: Binary GCD (Stein's Algorithm)
function binaryGcd(a, b) {
    /**
     * APPROACH: Use bitwise operations for efficiency
     * Replaces division with bit shifts
     * 
     * TIME COMPLEXITY: O(log(min(a,b)))
     * SPACE COMPLEXITY: O(1)
     */
    
    console.log(`binaryGcd(${a}, ${b}) called`);
    
    a = Math.abs(a);
    b = Math.abs(b);
    
    if (a === 0) return b;
    if (b === 0) return a;
    
    // Find power of 2 that divides both numbers
    let shift = 0;
    while (((a | b) & 1) === 0) {
        a >>= 1;
        b >>= 1;
        shift++;
        console.log(`  Both even: a=${a}, b=${b}, shift=${shift}`);
    }
    
    // Make a odd
    while ((a & 1) === 0) {
        a >>= 1;
        console.log(`  Making a odd: a=${a}`);
    }
    
    while (b !== 0) {
        // Make b odd
        while ((b & 1) === 0) {
            b >>= 1;
            console.log(`  Making b odd: b=${b}`);
        }
        
        // Ensure a <= b
        if (a > b) {
            [a, b] = [b, a];
            console.log(`  Swapped: a=${a}, b=${b}`);
        }
        
        b = b - a;
        console.log(`  b = b - a: b=${b}`);
    }
    
    const result = a << shift;
    console.log(`  Result: ${a} << ${shift} = ${result}`);
    return result;
}

// Test all GCD/LCM functions
function testGcdLcm() {
    console.log("=== Testing GCD and LCM Algorithms ===");
    
    const testCases = [
        [48, 18],
        [17, 13],
        [100, 25],
        [54, 24],
        [0, 5]
    ];
    
    testCases.forEach(([a, b]) => {
        console.log(`\n--- Testing with ${a} and ${b} ---`);
        
        // Test different GCD methods
        const gcd1 = gcdEuclidean(a, b);
        const gcd2 = gcdRecursive(a, b);
        const gcd3 = binaryGcd(a, b);
        
        console.log(`Euclidean: ${gcd1}, Recursive: ${gcd2}, Binary: ${gcd3}`);
        
        // Test LCM
        if (a !== 0 && b !== 0) {
            const lcm = lcmUsingGcd(a, b);
            console.log(`LCM: ${lcm}`);
            console.log(`Verification: ${gcd1} × ${lcm} = ${gcd1 * lcm}, ${a} × ${b} = ${a * b}`);
        }
    });
    
    // Test multiple numbers
    console.log("\n--- Testing Multiple Numbers ---");
    const numbers = [12, 18, 24, 30];
    const multiGcd = gcdMultiple(numbers);
    const multiLcm = lcmMultiple(numbers);
    console.log(`GCD of [${numbers.join(', ')}] = ${multiGcd}`);
    console.log(`LCM of [${numbers.join(', ')}] = ${multiLcm}`);
    
    // Test extended GCD
    console.log("\n--- Extended Euclidean Algorithm ---");
    const [gcd, x, y] = extendedGcd(48, 18);
    console.log(`Extended GCD(48, 18): gcd=${gcd}, x=${x}, y=${y}`);
    console.log(`Verification: 48×${x} + 18×${y} = ${48*x + 18*y}`);
}

// Practical applications
function practicalApplications() {
    console.log("\n=== Practical Applications ===");
    
    // Example 1: Simplifying fractions
    console.log("\n--- Fraction Simplification ---");
    function simplifyFraction(numerator, denominator) {
        const gcd = gcdEuclidean(numerator, denominator);
        return [numerator / gcd, denominator / gcd];
    }
    
    const [num, den] = simplifyFraction(48, 72);
    console.log(`48/72 simplified = ${num}/${den}`);
    
    // Example 2: Finding common periods
    console.log("\n--- Common Periods (LCM Application) ---");
    function findCommonPeriod(periods) {
        return lcmMultiple(periods);
    }
    
    const periods = [4, 6, 8]; // Events that repeat every 4, 6, 8 days
    const commonPeriod = findCommonPeriod(periods);
    console.log(`Events with periods [${periods.join(', ')}] days align every ${commonPeriod} days`);
    
    // Example 3: Gear ratios
    console.log("\n--- Gear Ratios (GCD Application) ---");
    function gearRatio(teeth1, teeth2) {
        const gcd = gcdEuclidean(teeth1, teeth2);
        return [teeth1 / gcd, teeth2 / gcd];
    }
    
    const [ratio1, ratio2] = gearRatio(60, 40);
    console.log(`Gear with 60 teeth to gear with 40 teeth = ${ratio1}:${ratio2}`);
}

// Performance comparison
function performanceComparison() {
    console.log("\n=== Performance Comparison ===");
    
    const largeA = 123456789;
    const largeB = 987654321;
    
    console.log(`Testing with large numbers: ${largeA}, ${largeB}`);
    
    // Euclidean method
    let start = performance.now();
    const euclideanResult = gcdEuclidean(largeA, largeB);
    let end = performance.now();
    console.log(`Euclidean: ${euclideanResult} (${(end - start).toFixed(4)}ms)`);
    
    // Binary GCD
    start = performance.now();
    const binaryResult = binaryGcd(largeA, largeB);
    end = performance.now();
    console.log(`Binary GCD: ${binaryResult} (${(end - start).toFixed(4)}ms)`);
    
    // Subtraction method (only for smaller numbers)
    const smallA = 48, smallB = 18;
    start = performance.now();
    const subtractionResult = gcdSubtraction(smallA, smallB);
    end = performance.now();
    console.log(`Subtraction (${smallA}, ${smallB}): ${subtractionResult} (${(end - start).toFixed(4)}ms)`);
    
    console.log("\nNote: Euclidean algorithm is generally the most efficient");
}

// Educational explanations
function explainGcdLcm() {
    console.log("\n=== Understanding GCD and LCM ===");
    
    console.log("🔢 DEFINITIONS:");
    console.log("• GCD: Largest positive integer that divides both numbers");
    console.log("• LCM: Smallest positive integer divisible by both numbers");
    console.log("• Relationship: GCD(a,b) × LCM(a,b) = a × b");
    console.log();
    
    console.log("⚡ EUCLIDEAN ALGORITHM:");
    console.log("• Based on: GCD(a,b) = GCD(b, a mod b)");
    console.log("• Most efficient algorithm for GCD");
    console.log("• Time complexity: O(log(min(a,b)))");
    console.log("• Works because GCD doesn't change when replacing larger number with remainder");
    console.log();
    
    console.log("🛠️ ALGORITHM VARIATIONS:");
    console.log("1. Iterative Euclidean: Uses while loop");
    console.log("2. Recursive Euclidean: Uses function calls");
    console.log("3. Binary GCD: Uses bit operations, good for binary computers");
    console.log("4. Subtraction: Ancient method, less efficient");
    console.log("5. Prime factorization: Educational but slow for large numbers");
    console.log();
    
    console.log("📊 COMPLEXITY COMPARISON:");
    console.log("• Euclidean: O(log n) - most efficient");
    console.log("• Binary GCD: O(log n) - good for binary systems");
    console.log("• Subtraction: O(max(a,b)) - inefficient for large differences");
    console.log("• Prime factorization: O(√n) - slow for large numbers");
    console.log();
    
    console.log("🎯 PRACTICAL APPLICATIONS:");
    console.log("1. Fraction simplification (reduce to lowest terms)");
    console.log("2. Cryptography (RSA algorithm, modular arithmetic)");
    console.log("3. Computer graphics (line drawing algorithms)");
    console.log("4. Music theory (harmonic relationships)");
    console.log("5. Scheduling (finding common periods)");
    console.log("6. Engineering (gear ratios, frequencies)");
}

// Run all demonstrations
testGcdLcm();
practicalApplications();
performanceComparison();
explainGcdLcm();

/**
 * KEY CONCEPTS LEARNED:
 * 
 * 1. Euclidean Algorithm: Most efficient method for GCD computation
 * 2. GCD-LCM Relationship: GCD(a,b) × LCM(a,b) = a × b
 * 3. Extended Euclidean: Finds coefficients for Bézout's identity
 * 4. Multiple Numbers: Apply algorithms pairwise to arrays
 * 5. Practical Applications: Fraction simplification, scheduling, cryptography
 * 
 * INTERVIEW DISCUSSION POINTS:
 * 
 * Q: "Implement GCD algorithm"
 * A: "Use Euclidean algorithm: GCD(a,b) = GCD(b, a%b) until b=0.
 *     Most efficient with O(log n) time complexity."
 * 
 * Q: "What's the relationship between GCD and LCM?"
 * A: "GCD(a,b) × LCM(a,b) = a × b. Can calculate LCM using GCD
 *     to avoid large intermediate calculations."
 * 
 * Q: "How to find GCD of multiple numbers?"
 * A: "Apply GCD pairwise: GCD(a,b,c) = GCD(GCD(a,b), c).
 *     Can optimize by early termination if GCD becomes 1."
 * 
 * Q: "What are practical applications of GCD/LCM?"
 * A: "Fraction simplification, finding common periods, gear ratios,
 *     cryptography (RSA), and many mathematical computations."
 * 
 * Q: "Why is Euclidean algorithm efficient?"
 * A: "Each step reduces the problem size exponentially on average.
 *     The number of steps is bounded by 5 times the number of digits."
 * 
 * MATHEMATICAL PROPERTIES:
 * - GCD(a,0) = a
 * - GCD(a,b) = GCD(b,a) (commutative)
 * - GCD(a,b) = GCD(a-b,b) (subtraction property)
 * - If GCD(a,b) = 1, then a and b are coprime
 * - GCD is associative: GCD(a,GCD(b,c)) = GCD(GCD(a,b),c)
 * 
 * RELATED CONCEPTS:
 * - Bézout's Identity (Extended Euclidean)
 * - Modular Arithmetic
 * - Number Theory
 * - Cryptography (RSA Algorithm)
 * - Continued Fractions
 * - Diophantine Equations
 */

module.exports = {
    gcdEuclidean,
    gcdRecursive,
    gcdSubtraction,
    gcdMultiple,
    lcmUsingGcd,
    lcmMultiple,
    extendedGcd,
    gcdPrimeFactorization,
    binaryGcd
}; 