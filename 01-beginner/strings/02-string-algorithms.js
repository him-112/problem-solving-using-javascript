/**
 * PROBLEM: String Algorithms
 * 
 * DESCRIPTION:
 * Common string manipulation and analysis algorithms for interview preparation.
 * Covers pattern matching, character analysis, and string transformations.
 * 
 * KEY CONCEPTS:
 * - Character frequency counting
 * - Pattern matching and searching
 * - String comparison and validation
 * - Text processing and parsing
 * - Unicode and encoding considerations
 * 
 * EXAMPLES:
 * isAnagram("listen", "silent") = true
 * isPalindrome("racecar") = true
 * longestCommonPrefix(["flower","flow","flight"]) = "fl"
 */

// Method 1: Check if two strings are anagrams
function isAnagram(str1, str2) {
    /**
     * APPROACH: Compare character frequencies
     * Two strings are anagrams if they contain same characters with same frequency
     * 
     * TIME COMPLEXITY: O(n)
     * SPACE COMPLEXITY: O(k) where k is number of unique characters
     */
    
    console.log(`isAnagram("${str1}", "${str2}") called`);
    
    // Quick length check
    if (str1.length !== str2.length) {
        console.log(`  Length mismatch: ${str1.length} vs ${str2.length}`);
        return false;
    }
    
    // Normalize: convert to lowercase and remove spaces
    const normalize = s => s.toLowerCase().replace(/\s/g, '');
    const normalized1 = normalize(str1);
    const normalized2 = normalize(str2);
    
    console.log(`  Normalized: "${normalized1}" vs "${normalized2}"`);
    
    // Count character frequencies
    const freq1 = {};
    const freq2 = {};
    
    for (const char of normalized1) {
        freq1[char] = (freq1[char] || 0) + 1;
    }
    
    for (const char of normalized2) {
        freq2[char] = (freq2[char] || 0) + 1;
    }
    
    console.log(`  Frequency 1:`, freq1);
    console.log(`  Frequency 2:`, freq2);
    
    // Compare frequencies
    for (const char in freq1) {
        if (freq1[char] !== freq2[char]) {
            console.log(`  Mismatch for '${char}': ${freq1[char]} vs ${freq2[char] || 0}`);
            return false;
        }
    }
    
    console.log(`  ✓ Anagrams confirmed`);
    return true;
}

// Method 2: Alternative anagram check using sorting
function isAnagramSort(str1, str2) {
    /**
     * APPROACH: Sort characters and compare
     * If anagrams, sorted versions should be identical
     * 
     * TIME COMPLEXITY: O(n log n) - due to sorting
     * SPACE COMPLEXITY: O(n) - for sorted arrays
     */
    
    console.log(`isAnagramSort("${str1}", "${str2}") called`);
    
    if (str1.length !== str2.length) {
        console.log(`  Length mismatch`);
        return false;
    }
    
    const normalize = s => s.toLowerCase().replace(/\s/g, '').split('').sort().join('');
    const sorted1 = normalize(str1);
    const sorted2 = normalize(str2);
    
    console.log(`  Sorted 1: "${sorted1}"`);
    console.log(`  Sorted 2: "${sorted2}"`);
    
    const result = sorted1 === sorted2;
    console.log(`  Result: ${result}`);
    return result;
}

// Method 3: Check if string is palindrome
function isPalindrome(str) {
    /**
     * APPROACH: Compare characters from both ends moving inward
     * Ignore case, spaces, and punctuation
     * 
     * TIME COMPLEXITY: O(n)
     * SPACE COMPLEXITY: O(1)
     */
    
    console.log(`isPalindrome("${str}") called`);
    
    // Normalize: keep only alphanumeric characters in lowercase
    const normalized = str.toLowerCase().replace(/[^a-z0-9]/g, '');
    console.log(`  Normalized: "${normalized}"`);
    
    let left = 0;
    let right = normalized.length - 1;
    
    while (left < right) {
        console.log(`  Comparing '${normalized[left]}' at ${left} with '${normalized[right]}' at ${right}`);
        
        if (normalized[left] !== normalized[right]) {
            console.log(`  ✗ Not a palindrome`);
            return false;
        }
        
        left++;
        right--;
    }
    
    console.log(`  ✓ Palindrome confirmed`);
    return true;
}

// Method 4: Find longest common prefix
function longestCommonPrefix(strings) {
    /**
     * APPROACH: Compare characters at each position across all strings
     * Stop when mismatch found or any string ends
     * 
     * TIME COMPLEXITY: O(S) where S is sum of all string lengths
     * SPACE COMPLEXITY: O(1)
     */
    
    console.log(`longestCommonPrefix([${strings.map(s => `"${s}"`).join(', ')}]) called`);
    
    if (!strings || strings.length === 0) {
        console.log(`  Empty input`);
        return "";
    }
    
    if (strings.length === 1) {
        console.log(`  Single string: "${strings[0]}"`);
        return strings[0];
    }
    
    let prefix = "";
    let charIndex = 0;
    
    // Check each character position
    while (true) {
        // Check if any string is too short
        if (charIndex >= strings[0].length) {
            console.log(`  First string ended at index ${charIndex}`);
            break;
        }
        
        const currentChar = strings[0][charIndex];
        console.log(`  Checking character '${currentChar}' at position ${charIndex}`);
        
        // Check if all strings have same character at this position
        for (let i = 1; i < strings.length; i++) {
            if (charIndex >= strings[i].length || strings[i][charIndex] !== currentChar) {
                console.log(`  Mismatch at string ${i}: expected '${currentChar}', got '${strings[i][charIndex] || 'END'}'`);
                console.log(`  Final prefix: "${prefix}"`);
                return prefix;
            }
        }
        
        // All strings match at this position
        prefix += currentChar;
        console.log(`  All match, prefix now: "${prefix}"`);
        charIndex++;
    }
    
    console.log(`  Final prefix: "${prefix}"`);
    return prefix;
}

// Method 5: Character frequency counter
function characterFrequency(str) {
    /**
     * APPROACH: Count occurrences of each character
     * Returns object with character -> count mapping
     * 
     * TIME COMPLEXITY: O(n)
     * SPACE COMPLEXITY: O(k) where k is unique characters
     */
    
    console.log(`characterFrequency("${str}") called`);
    
    const frequency = {};
    
    for (let i = 0; i < str.length; i++) {
        const char = str[i];
        frequency[char] = (frequency[char] || 0) + 1;
        console.log(`  '${char}' at ${i}: count now ${frequency[char]}`);
    }
    
    console.log(`  Final frequencies:`, frequency);
    return frequency;
}

// Method 6: Find first non-repeating character
function firstNonRepeatingChar(str) {
    /**
     * APPROACH: Count frequencies, then find first with count = 1
     * Two-pass algorithm
     * 
     * TIME COMPLEXITY: O(n)
     * SPACE COMPLEXITY: O(k) where k is unique characters
     */
    
    console.log(`firstNonRepeatingChar("${str}") called`);
    
    // First pass: count frequencies
    const frequency = characterFrequency(str);
    
    // Second pass: find first non-repeating
    for (let i = 0; i < str.length; i++) {
        const char = str[i];
        if (frequency[char] === 1) {
            console.log(`  First non-repeating: '${char}' at index ${i}`);
            return char;
        }
    }
    
    console.log(`  No non-repeating character found`);
    return null;
}

// Method 7: Check if string contains only unique characters
function hasUniqueCharacters(str) {
    /**
     * APPROACH: Use Set to track seen characters
     * Stop early if duplicate found
     * 
     * TIME COMPLEXITY: O(n)
     * SPACE COMPLEXITY: O(min(n, charset_size))
     */
    
    console.log(`hasUniqueCharacters("${str}") called`);
    
    const seen = new Set();
    
    for (let i = 0; i < str.length; i++) {
        const char = str[i];
        console.log(`  Checking '${char}' at index ${i}`);
        
        if (seen.has(char)) {
            console.log(`  ✗ Duplicate found: '${char}'`);
            return false;
        }
        
        seen.add(char);
        console.log(`  Added to set, size now: ${seen.size}`);
    }
    
    console.log(`  ✓ All characters unique`);
    return true;
}

// Method 8: String pattern matching (naive)
function findPattern(text, pattern) {
    /**
     * APPROACH: Check pattern at each position in text
     * Brute force approach
     * 
     * TIME COMPLEXITY: O(n * m) where n=text length, m=pattern length
     * SPACE COMPLEXITY: O(1)
     */
    
    console.log(`findPattern("${text}", "${pattern}") called`);
    
    const matches = [];
    
    for (let i = 0; i <= text.length - pattern.length; i++) {
        console.log(`  Checking position ${i}`);
        
        let match = true;
        for (let j = 0; j < pattern.length; j++) {
            if (text[i + j] !== pattern[j]) {
                console.log(`    Mismatch at ${i + j}: '${text[i + j]}' vs '${pattern[j]}'`);
                match = false;
                break;
            }
        }
        
        if (match) {
            console.log(`    ✓ Match found at position ${i}`);
            matches.push(i);
        }
    }
    
    console.log(`  All matches: [${matches.join(', ')}]`);
    return matches;
}

// Method 9: Remove duplicate characters
function removeDuplicates(str) {
    /**
     * APPROACH: Track seen characters and build result
     * Maintains original order of first occurrence
     * 
     * TIME COMPLEXITY: O(n)
     * SPACE COMPLEXITY: O(n)
     */
    
    console.log(`removeDuplicates("${str}") called`);
    
    const seen = new Set();
    let result = "";
    
    for (let i = 0; i < str.length; i++) {
        const char = str[i];
        console.log(`  Processing '${char}' at ${i}`);
        
        if (!seen.has(char)) {
            seen.add(char);
            result += char;
            console.log(`    Added to result: "${result}"`);
        } else {
            console.log(`    Skipped (duplicate)`);
        }
    }
    
    console.log(`  Final result: "${result}"`);
    return result;
}

// Method 10: String compression
function compressString(str) {
    /**
     * APPROACH: Count consecutive characters
     * Format: "aabcccccaaa" -> "a2b1c5a3"
     * 
     * TIME COMPLEXITY: O(n)
     * SPACE COMPLEXITY: O(n)
     */
    
    console.log(`compressString("${str}") called`);
    
    if (str.length === 0) {
        return str;
    }
    
    let compressed = "";
    let currentChar = str[0];
    let count = 1;
    
    for (let i = 1; i < str.length; i++) {
        console.log(`  Processing '${str[i]}' at ${i}, current: '${currentChar}'×${count}`);
        
        if (str[i] === currentChar) {
            count++;
        } else {
            compressed += currentChar + count;
            console.log(`    Added to compressed: "${compressed}"`);
            currentChar = str[i];
            count = 1;
        }
    }
    
    // Add the last group
    compressed += currentChar + count;
    console.log(`  Final compressed: "${compressed}"`);
    
    // Return original if compression doesn't help
    const result = compressed.length < str.length ? compressed : str;
    console.log(`  Returning: "${result}" (${result === compressed ? 'compressed' : 'original'})`);
    return result;
}

// Test all string algorithms
function testStringAlgorithms() {
    console.log("=== Testing String Algorithms ===");
    
    // Test anagrams
    console.log("\n--- Anagram Tests ---");
    console.log(`isAnagram("listen", "silent"): ${isAnagram("listen", "silent")}`);
    console.log(`isAnagram("hello", "world"): ${isAnagram("hello", "world")}`);
    console.log(`isAnagramSort("evil", "vile"): ${isAnagramSort("evil", "vile")}`);
    
    // Test palindromes
    console.log("\n--- Palindrome Tests ---");
    console.log(`isPalindrome("racecar"): ${isPalindrome("racecar")}`);
    console.log(`isPalindrome("A man, a plan, a canal: Panama"): ${isPalindrome("A man, a plan, a canal: Panama")}`);
    console.log(`isPalindrome("hello"): ${isPalindrome("hello")}`);
    
    // Test common prefix
    console.log("\n--- Common Prefix Tests ---");
    console.log(`longestCommonPrefix(["flower","flow","flight"]): "${longestCommonPrefix(["flower","flow","flight"])}"`);
    console.log(`longestCommonPrefix(["dog","racecar","car"]): "${longestCommonPrefix(["dog","racecar","car"])}"`);
    
    // Test character operations
    console.log("\n--- Character Analysis ---");
    characterFrequency("hello world");
    console.log(`firstNonRepeatingChar("leetcode"): "${firstNonRepeatingChar("leetcode")}"`);
    console.log(`hasUniqueCharacters("abcdef"): ${hasUniqueCharacters("abcdef")}`);
    console.log(`hasUniqueCharacters("hello"): ${hasUniqueCharacters("hello")}`);
    
    // Test pattern matching
    console.log("\n--- Pattern Matching ---");
    findPattern("ababcababa", "aba");
    
    // Test string manipulation
    console.log("\n--- String Manipulation ---");
    console.log(`removeDuplicates("programming"): "${removeDuplicates("programming")}"`);
    console.log(`compressString("aabcccccaaa"): "${compressString("aabcccccaaa")}"`);
    console.log(`compressString("abc"): "${compressString("abc")}"`);
}

// Performance comparison
function performanceComparison() {
    console.log("\n=== Performance Comparison ===");
    
    const longString = "a".repeat(10000) + "b".repeat(10000);
    const pattern = "ab";
    
    console.log("Testing with strings of length 20,000");
    
    // Character frequency
    let start = performance.now();
    characterFrequency(longString);
    let end = performance.now();
    console.log(`Character frequency: ${(end - start).toFixed(2)}ms`);
    
    // Pattern matching
    start = performance.now();
    findPattern(longString, pattern);
    end = performance.now();
    console.log(`Pattern matching: ${(end - start).toFixed(2)}ms`);
    
    // String compression
    start = performance.now();
    compressString(longString);
    end = performance.now();
    console.log(`String compression: ${(end - start).toFixed(2)}ms`);
}

// Educational explanations
function explainStringAlgorithms() {
    console.log("\n=== Understanding String Algorithms ===");
    
    console.log("📝 STRING FUNDAMENTALS:");
    console.log("• Strings are immutable in JavaScript");
    console.log("• Each character access is O(1)");
    console.log("• String concatenation creates new strings");
    console.log("• Use StringBuilder pattern for multiple concatenations");
    console.log();
    
    console.log("🔍 PATTERN MATCHING:");
    console.log("• Naive: O(n*m) - check every position");
    console.log("• KMP: O(n+m) - preprocess pattern for efficiency");
    console.log("• Rabin-Karp: O(n) average - rolling hash technique");
    console.log("• Boyer-Moore: O(n/m) best case - skip characters");
    console.log();
    
    console.log("📊 CHARACTER ANALYSIS:");
    console.log("• Frequency counting: Use hash maps or arrays");
    console.log("• Anagram detection: Compare character frequencies");
    console.log("• Palindrome: Two pointers from ends");
    console.log("• Unique characters: Set or boolean array");
    console.log();
    
    console.log("⚡ OPTIMIZATION TIPS:");
    console.log("• Early termination for impossible cases");
    console.log("• Use appropriate data structures (Set vs Array)");
    console.log("• Consider Unicode and encoding issues");
    console.log("• Cache expensive computations");
    console.log();
    
    console.log("📚 COMMON INTERVIEW PATTERNS:");
    console.log("1. Two pointers: palindromes, comparisons");
    console.log("2. Hash maps: frequency counting, lookups");
    console.log("3. Sliding window: substring problems");
    console.log("4. Dynamic programming: edit distance, LCS");
    console.log("5. Preprocessing: KMP, suffix arrays");
}

// Run all demonstrations
testStringAlgorithms();
performanceComparison();
explainStringAlgorithms();

/**
 * KEY CONCEPTS LEARNED:
 * 
 * 1. Anagram Detection: Character frequency comparison
 * 2. Palindrome Checking: Two pointers technique
 * 3. Pattern Matching: Various algorithms with different complexities
 * 4. Character Analysis: Frequency counting and uniqueness
 * 5. String Manipulation: Compression, deduplication
 * 
 * INTERVIEW DISCUSSION POINTS:
 * 
 * Q: "Check if two strings are anagrams"
 * A: "Count character frequencies in both strings and compare.
 *     Alternative: sort both strings and check equality."
 * 
 * Q: "Find the longest common prefix of an array of strings"
 * A: "Compare characters at each position across all strings,
 *     stop when mismatch found or any string ends."
 * 
 * Q: "Check if a string is a palindrome"
 * A: "Use two pointers from both ends, ignore non-alphanumeric.
 *     Compare characters moving inward until pointers meet."
 * 
 * Q: "Find the first non-repeating character"
 * A: "Two-pass: first count frequencies, then find first with count=1.
 *     Alternative: use Map to preserve insertion order."
 * 
 * Q: "Implement string compression"
 * A: "Count consecutive characters, format as char+count.
 *     Return original if compression doesn't reduce length."
 * 
 * ALGORITHM COMPLEXITIES:
 * - Character frequency: O(n) time, O(k) space
 * - Anagram check: O(n) time, O(k) space
 * - Palindrome: O(n) time, O(1) space
 * - Pattern matching: O(n*m) naive, O(n+m) KMP
 * - Common prefix: O(S) where S is sum of lengths
 * 
 * RELATED CONCEPTS:
 * - Hash Tables and Maps
 * - Two Pointers Technique
 * - Sliding Window
 * - Dynamic Programming
 * - Regular Expressions
 * - Unicode and Encoding
 */

module.exports = {
    isAnagram,
    isAnagramSort,
    isPalindrome,
    longestCommonPrefix,
    characterFrequency,
    firstNonRepeatingChar,
    hasUniqueCharacters,
    findPattern,
    removeDuplicates,
    compressString
}; 