/**
 * PROBLEM: Prime Numbers
 * 
 * DESCRIPTION:
 * A prime number is a natural number greater than 1 that has no positive 
 * divisors other than 1 and itself.
 * 
 * EXAMPLES:
 * 2 → true (smallest prime)
 * 3 → true
 * 4 → false (2 × 2)
 * 17 → true
 * 25 → false (5 × 5)
 * 
 * TASKS:
 * 1. Check if a number is prime
 * 2. Generate first N prime numbers
 * 3. Find all primes up to N (Sieve of Eratosthenes)
 */

// Method 1: Basic Prime Check
function isPrimeBasic(n) {
    /**
     * APPROACH: Check divisibility by all numbers from 2 to n-1
     * TIME COMPLEXITY: O(n)
     * SPACE COMPLEXITY: O(1)
     */
    
    if (n <= 1) return false;
    if (n <= 3) return true;
    
    console.log(`Checking if ${n} is prime (basic method):`);
    
    for (let i = 2; i < n; i++) {
        if (n % i === 0) {
            console.log(`  ${n} is divisible by ${i}, so not prime`);
            return false;
        }
    }
    
    console.log(`  ${n} is prime!`);
    return true;
}

// Method 2: Optimized Prime Check
function isPrimeOptimized(n) {
    /**
     * APPROACH: Only check up to √n and handle even numbers
     * KEY INSIGHT: If n has a divisor > √n, it must also have one < √n
     * 
     * TIME COMPLEXITY: O(√n)
     * SPACE COMPLEXITY: O(1)
     */
    
    if (n <= 1) return false;
    if (n <= 3) return true;
    if (n % 2 === 0 || n % 3 === 0) return false;
    
    console.log(`Checking if ${n} is prime (optimized):`);
    
    // Check for divisors from 5 to √n, skipping even numbers
    const limit = Math.sqrt(n);
    console.log(`  Only checking up to √${n} = ${limit.toFixed(2)}`);
    
    for (let i = 5; i <= limit; i += 6) {
        if (n % i === 0 || n % (i + 2) === 0) {
            console.log(`  ${n} is divisible by ${i} or ${i + 2}, so not prime`);
            return false;
        }
    }
    
    console.log(`  ${n} is prime!`);
    return true;
}

// Method 3: Generate First N Primes
function generatePrimes(count) {
    /**
     * APPROACH: Generate primes one by one using optimized check
     * TIME COMPLEXITY: O(n² log log n) approximately
     * SPACE COMPLEXITY: O(n) for storing primes
     */
    
    console.log(`Generating first ${count} prime numbers:`);
    const primes = [];
    let candidate = 2;
    
    while (primes.length < count) {
        if (isPrimeOptimized(candidate)) {
            primes.push(candidate);
            console.log(`  Found prime #${primes.length}: ${candidate}`);
        }
        candidate++;
    }
    
    return primes;
}

// Method 4: Sieve of Eratosthenes
function sieveOfEratosthenes(limit) {
    /**
     * APPROACH: Mark multiples of each prime as composite
     * Most efficient way to find all primes up to a limit
     * 
     * TIME COMPLEXITY: O(n log log n)
     * SPACE COMPLEXITY: O(n)
     */
    
    console.log(`Finding all primes up to ${limit} using Sieve of Eratosthenes:`);
    
    // Create boolean array "prime[0..limit]" and initialize all entries as true
    const prime = new Array(limit + 1).fill(true);
    prime[0] = prime[1] = false; // 0 and 1 are not prime
    
    for (let p = 2; p * p <= limit; p++) {
        // If prime[p] is not changed, then it is a prime
        if (prime[p]) {
            console.log(`  Marking multiples of prime ${p}:`);
            
            // Update all multiples of p
            for (let i = p * p; i <= limit; i += p) {
                if (prime[i]) {
                    console.log(`    Marking ${i} as composite (${p} × ${i/p})`);
                    prime[i] = false;
                }
            }
        }
    }
    
    // Collect all prime numbers
    const primes = [];
    for (let i = 2; i <= limit; i++) {
        if (prime[i]) {
            primes.push(i);
        }
    }
    
    console.log(`  Found ${primes.length} primes: ${primes.join(', ')}`);
    return primes;
}

// Method 5: Prime Factorization
function primeFactorization(n) {
    /**
     * APPROACH: Find all prime factors of a number
     * TIME COMPLEXITY: O(√n)
     * SPACE COMPLEXITY: O(log n) for factors
     */
    
    console.log(`Finding prime factorization of ${n}:`);
    const factors = [];
    let num = n;
    
    // Check for 2
    while (num % 2 === 0) {
        factors.push(2);
        num = num / 2;
        console.log(`  Factor: 2, remaining: ${num}`);
    }
    
    // Check for odd factors from 3 onwards
    for (let i = 3; i <= Math.sqrt(num); i += 2) {
        while (num % i === 0) {
            factors.push(i);
            num = num / i;
            console.log(`  Factor: ${i}, remaining: ${num}`);
        }
    }
    
    // If num is still > 2, it's a prime factor
    if (num > 2) {
        factors.push(num);
        console.log(`  Final prime factor: ${num}`);
    }
    
    console.log(`  Prime factorization of ${n}: ${factors.join(' × ')}`);
    return factors;
}

// Performance comparison
function performanceComparison() {
    console.log("\n=== Performance Comparison ===");
    
    const testNumbers = [97, 997, 9973]; // Large primes
    
    testNumbers.forEach(num => {
        console.log(`\nTesting ${num}:`);
        
        // Basic method
        let start = performance.now();
        const basicResult = isPrimeBasic(num);
        let end = performance.now();
        console.log(`Basic: ${basicResult} (${(end - start).toFixed(4)}ms)`);
        
        // Optimized method
        start = performance.now();
        const optimizedResult = isPrimeOptimized(num);
        end = performance.now();
        console.log(`Optimized: ${optimizedResult} (${(end - start).toFixed(4)}ms)`);
        
        if (num <= 1000) {
            // Sieve method (for comparison when finding multiple primes)
            start = performance.now();
            const sieveResults = sieveOfEratosthenes(num);
            const sieveResult = sieveResults.includes(num);
            end = performance.now();
            console.log(`Sieve: ${sieveResult} (${(end - start).toFixed(4)}ms)`);
        }
    });
}

// Educational examples
function primeExamples() {
    console.log("\n=== Prime Number Examples ===");
    
    console.log("First 10 primes:");
    const first10 = generatePrimes(10);
    console.log(first10.join(', '));
    
    console.log("\nAll primes up to 30:");
    const primesTo30 = sieveOfEratosthenes(30);
    
    console.log("\nPrime factorizations:");
    [12, 60, 100, 17].forEach(num => {
        primeFactorization(num);
    });
}

// Test all functions
function testPrimeFunctions() {
    console.log("=== Testing Prime Number Functions ===");
    
    const testCases = [2, 3, 4, 17, 25, 29, 100, 101];
    
    testCases.forEach(num => {
        console.log(`\n--- Testing ${num} ---`);
        
        const basicResult = isPrimeBasic(num);
        const optimizedResult = isPrimeOptimized(num);
        
        console.log(`Basic result: ${basicResult}`);
        console.log(`Optimized result: ${optimizedResult}`);
        console.log(`Results match: ${basicResult === optimizedResult ? '✓' : '✗'}`);
    });
}

// Run all demonstrations
testPrimeFunctions();
performanceComparison();
primeExamples();

/**
 * KEY CONCEPTS LEARNED:
 * 
 * 1. Mathematical Optimization: Only check up to √n
 * 2. Algorithm Efficiency: O(n) vs O(√n) vs O(n log log n)
 * 3. Sieve Algorithm: Efficient way to find multiple primes
 * 4. Prime Factorization: Breaking numbers into prime components
 * 5. Performance Analysis: Comparing different approaches
 * 
 * INTERVIEW DISCUSSION POINTS:
 * 
 * Q: "Check if a number is prime"
 * A: "I can use the optimized approach checking only up to √n"
 * 
 * Q: "Find all primes up to N"
 * A: "Sieve of Eratosthenes is most efficient for multiple primes"
 * 
 * Q: "Why only check up to √n?"
 * A: "If n = a × b and a > √n, then b < √n, so we'd find b first"
 * 
 * Q: "What's the time complexity?"
 * A: "Basic: O(n), Optimized: O(√n), Sieve: O(n log log n)"
 * 
 * COMMON APPLICATIONS:
 * - Cryptography (RSA encryption)
 * - Hash functions
 * - Random number generation
 * - Mathematical computations
 */

module.exports = {
    isPrimeBasic,
    isPrimeOptimized,
    generatePrimes,
    sieveOfEratosthenes,
    primeFactorization
}; 