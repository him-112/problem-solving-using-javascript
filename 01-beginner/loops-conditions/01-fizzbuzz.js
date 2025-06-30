/**
 * PROBLEM: FizzBuzz
 * 
 * DESCRIPTION:
 * Print numbers from 1 to n, but replace multiples of 3 with "Fizz",
 * multiples of 5 with "Buzz", and multiples of both with "FizzBuzz".
 * 
 * EXAMPLES:
 * Input: 15
 * Output: 1, 2, Fizz, 4, Buzz, Fizz, 7, 8, Fizz, Buzz, 11, Fizz, 13, 14, FizzBuzz
 * 
 * This classic problem demonstrates loops, conditions, and modulo operations.
 */

// Method 1: Traditional If-Else
function fizzBuzzTraditional(n) {
    console.log(`FizzBuzz traditional (n=${n}):`);
    const result = [];
    
    for (let i = 1; i <= n; i++) {
        if (i % 3 === 0 && i % 5 === 0) {
            result.push("FizzBuzz");
        } else if (i % 3 === 0) {
            result.push("Fizz");
        } else if (i % 5 === 0) {
            result.push("Buzz");
        } else {
            result.push(i.toString());
        }
    }
    
    console.log(result.join(', '));
    return result;
}

// Method 2: String Concatenation
function fizzBuzzConcat(n) {
    console.log(`FizzBuzz concatenation (n=${n}):`);
    const result = [];
    
    for (let i = 1; i <= n; i++) {
        let output = "";
        if (i % 3 === 0) output += "Fizz";
        if (i % 5 === 0) output += "Buzz";
        if (output === "") output = i.toString();
        result.push(output);
    }
    
    console.log(result.join(', '));
    return result;
}

// Method 3: Extensible Version
function fizzBuzzExtensible(n, rules = [{divisor: 3, word: "Fizz"}, {divisor: 5, word: "Buzz"}]) {
    console.log(`FizzBuzz extensible (n=${n}):`, rules);
    const result = [];
    
    for (let i = 1; i <= n; i++) {
        let output = "";
        for (const rule of rules) {
            if (i % rule.divisor === 0) {
                output += rule.word;
            }
        }
        if (output === "") output = i.toString();
        result.push(output);
    }
    
    console.log(result.join(', '));
    return result;
}

// Test all methods
console.log("=== FizzBuzz Testing ===");
fizzBuzzTraditional(15);
fizzBuzzConcat(15);
fizzBuzzExtensible(15);

// Custom rules example
fizzBuzzExtensible(20, [
    {divisor: 3, word: "Fizz"},
    {divisor: 5, word: "Buzz"}, 
    {divisor: 7, word: "Bang"}
]);

module.exports = { fizzBuzzTraditional, fizzBuzzConcat, fizzBuzzExtensible }; 