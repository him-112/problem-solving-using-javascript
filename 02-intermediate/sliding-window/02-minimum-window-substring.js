/**
 * PROBLEM: Minimum Window Substring
 * 
 * Given two strings s and t, return the minimum window substring of s such that 
 * every character in t (including duplicates) is included in the window.
 * If there is no such window in s that covers all characters in t, return the empty string "".
 * 
 * Example:
 * Input: s = "ADOBECODEBANC", t = "ABC"
 * Output: "BANC"
 * 
 * Explanation: The minimum window substring "BANC" includes 'A', 'B', and 'C' from string t.
 * 
 * Constraints:
 * - 1 <= s.length, t.length <= 10^5
 * - s and t consist of uppercase and lowercase English letters
 * 
 * Follow up: Could you find an algorithm that runs in O(m + n) time?
 */

/**
 * APPROACH 1: Sliding Window with Hash Maps
 * 
 * Algorithm:
 * 1. Use two pointers (left, right) to maintain a sliding window
 * 2. Expand right pointer until window contains all characters of t
 * 3. Contract left pointer while maintaining validity
 * 4. Keep track of minimum valid window found
 * 
 * Time Complexity: O(|s| + |t|) - each character visited at most twice
 * Space Complexity: O(|s| + |t|) - for hash maps
 */
function minWindow(s, t) {
    if (s.length < t.length) return "";
    
    // Count characters in t
    const tCount = new Map();
    for (const char of t) {
        tCount.set(char, (tCount.get(char) || 0) + 1);
    }
    
    // Sliding window variables
    let left = 0;
    let minLen = Infinity;
    let minStart = 0;
    let required = tCount.size; // Number of unique characters in t
    let formed = 0; // Number of unique characters in current window with desired frequency
    
    // Current window character count
    const windowCount = new Map();
    
    for (let right = 0; right < s.length; right++) {
        // Expand window
        const rightChar = s[right];
        windowCount.set(rightChar, (windowCount.get(rightChar) || 0) + 1);
        
        // Check if frequency of current character matches desired count in t
        if (tCount.has(rightChar) && windowCount.get(rightChar) === tCount.get(rightChar)) {
            formed++;
        }
        
        // Contract window while valid
        while (left <= right && formed === required) {
            // Update minimum window if current is smaller
            if (right - left + 1 < minLen) {
                minLen = right - left + 1;
                minStart = left;
            }
            
            // Remove leftmost character from window
            const leftChar = s[left];
            windowCount.set(leftChar, windowCount.get(leftChar) - 1);
            
            // Check if removing this character makes window invalid
            if (tCount.has(leftChar) && windowCount.get(leftChar) < tCount.get(leftChar)) {
                formed--;
            }
            
            left++;
        }
    }
    
    return minLen === Infinity ? "" : s.substring(minStart, minStart + minLen);
}

/**
 * APPROACH 2: Optimized Sliding Window (Filtered String)
 * 
 * Optimization: Only consider characters that are in t
 * This reduces the number of characters we need to process
 */
function minWindowOptimized(s, t) {
    if (s.length < t.length) return "";
    
    // Count characters in t
    const tCount = new Map();
    for (const char of t) {
        tCount.set(char, (tCount.get(char) || 0) + 1);
    }
    
    // Create filtered string with only characters from t
    const filtered = [];
    for (let i = 0; i < s.length; i++) {
        if (tCount.has(s[i])) {
            filtered.push([i, s[i]]); // [original_index, character]
        }
    }
    
    let left = 0;
    let minLen = Infinity;
    let minStart = 0;
    let required = tCount.size;
    let formed = 0;
    const windowCount = new Map();
    
    for (let right = 0; right < filtered.length; right++) {
        const [rightIdx, rightChar] = filtered[right];
        windowCount.set(rightChar, (windowCount.get(rightChar) || 0) + 1);
        
        if (windowCount.get(rightChar) === tCount.get(rightChar)) {
            formed++;
        }
        
        while (left <= right && formed === required) {
            const [leftIdx, leftChar] = filtered[left];
            const currentLen = rightIdx - leftIdx + 1;
            
            if (currentLen < minLen) {
                minLen = currentLen;
                minStart = leftIdx;
            }
            
            windowCount.set(leftChar, windowCount.get(leftChar) - 1);
            if (windowCount.get(leftChar) < tCount.get(leftChar)) {
                formed--;
            }
            
            left++;
        }
    }
    
    return minLen === Infinity ? "" : s.substring(minStart, minStart + minLen);
}

/**
 * APPROACH 3: Using Array for Character Counting (when characters are limited)
 * 
 * If we know characters are limited (e.g., only English letters), 
 * we can use arrays instead of maps for better performance
 */
function minWindowArray(s, t) {
    if (s.length < t.length) return "";
    
    // ASCII array for character counting (assuming only English letters)
    const tCount = new Array(128).fill(0);
    const windowCount = new Array(128).fill(0);
    
    let required = 0;
    for (const char of t) {
        if (tCount[char.charCodeAt(0)] === 0) {
            required++;
        }
        tCount[char.charCodeAt(0)]++;
    }
    
    let left = 0;
    let minLen = Infinity;
    let minStart = 0;
    let formed = 0;
    
    for (let right = 0; right < s.length; right++) {
        const rightCharCode = s.charCodeAt(right);
        windowCount[rightCharCode]++;
        
        if (tCount[rightCharCode] > 0 && windowCount[rightCharCode] === tCount[rightCharCode]) {
            formed++;
        }
        
        while (left <= right && formed === required) {
            if (right - left + 1 < minLen) {
                minLen = right - left + 1;
                minStart = left;
            }
            
            const leftCharCode = s.charCodeAt(left);
            windowCount[leftCharCode]--;
            
            if (tCount[leftCharCode] > 0 && windowCount[leftCharCode] < tCount[leftCharCode]) {
                formed--;
            }
            
            left++;
        }
    }
    
    return minLen === Infinity ? "" : s.substring(minStart, minStart + minLen);
}

/**
 * APPROACH 4: Brute Force (for understanding)
 * 
 * Check all possible substrings and find the minimum valid one
 * Time Complexity: O(|s|² * |t|)
 * Space Complexity: O(|t|)
 */
function minWindowBruteForce(s, t) {
    if (s.length < t.length) return "";
    
    function isValid(substring) {
        const tCount = new Map();
        for (const char of t) {
            tCount.set(char, (tCount.get(char) || 0) + 1);
        }
        
        for (const char of substring) {
            if (tCount.has(char)) {
                const count = tCount.get(char);
                if (count === 1) {
                    tCount.delete(char);
                } else {
                    tCount.set(char, count - 1);
                }
            }
        }
        
        return tCount.size === 0;
    }
    
    let minWindow = "";
    let minLen = Infinity;
    
    for (let i = 0; i < s.length; i++) {
        for (let j = i + t.length; j <= s.length; j++) {
            const substring = s.substring(i, j);
            if (isValid(substring) && substring.length < minLen) {
                minLen = substring.length;
                minWindow = substring;
            }
        }
    }
    
    return minWindow;
}

// Test cases
console.log("=== Minimum Window Substring ===");

const test1 = { s: "ADOBECODEBANC", t: "ABC" };
console.log(`Input: s = "${test1.s}", t = "${test1.t}"`);
console.log("Output (Sliding Window):", minWindow(test1.s, test1.t));
console.log("Output (Optimized):", minWindowOptimized(test1.s, test1.t));
console.log("Output (Array):", minWindowArray(test1.s, test1.t));

const test2 = { s: "a", t: "a" };
console.log(`\nInput: s = "${test2.s}", t = "${test2.t}"`);
console.log("Output:", minWindow(test2.s, test2.t));

const test3 = { s: "a", t: "aa" };
console.log(`\nInput: s = "${test3.s}", t = "${test3.t}"`);
console.log("Output:", minWindow(test3.s, test3.t));

const test4 = { s: "ab", t: "b" };
console.log(`\nInput: s = "${test4.s}", t = "${test4.t}"`);
console.log("Output:", minWindow(test4.s, test4.t));

/**
 * STEP-BY-STEP WALKTHROUGH
 * 
 * s = "ADOBECODEBANC", t = "ABC"
 * 
 * tCount: {A: 1, B: 1, C: 1}, required = 3
 * 
 * right=0: A, windowCount: {A: 1}, formed = 1
 * right=1: D, windowCount: {A: 1, D: 1}, formed = 1
 * right=2: O, windowCount: {A: 1, D: 1, O: 1}, formed = 1
 * right=3: B, windowCount: {A: 1, D: 1, O: 1, B: 1}, formed = 2
 * right=4: E, windowCount: {A: 1, D: 1, O: 1, B: 1, E: 1}, formed = 2
 * right=5: C, windowCount: {A: 1, D: 1, O: 1, B: 1, E: 1, C: 1}, formed = 3
 * 
 * Now formed === required, start contracting:
 * - Current window: "ADOBEC" (length 6)
 * - Contract left pointer until window becomes invalid
 * - Continue expanding right and contracting left...
 * 
 * Final answer: "BANC" (length 4)
 */

console.log("\n=== Step-by-step Walkthrough ===");
function minWindowWithSteps(s, t) {
    console.log(`Finding minimum window in "${s}" containing "${t}"`);
    
    const tCount = new Map();
    for (const char of t) {
        tCount.set(char, (tCount.get(char) || 0) + 1);
    }
    console.log("Target characters:", Object.fromEntries(tCount));
    
    let left = 0;
    let minLen = Infinity;
    let minStart = 0;
    let required = tCount.size;
    let formed = 0;
    const windowCount = new Map();
    
    for (let right = 0; right < s.length; right++) {
        const rightChar = s[right];
        windowCount.set(rightChar, (windowCount.get(rightChar) || 0) + 1);
        
        if (tCount.has(rightChar) && windowCount.get(rightChar) === tCount.get(rightChar)) {
            formed++;
        }
        
        console.log(`Expand right=${right}, char='${rightChar}', window="${s.substring(left, right + 1)}", formed=${formed}/${required}`);
        
        while (left <= right && formed === required) {
            const currentWindow = s.substring(left, right + 1);
            console.log(`  Valid window found: "${currentWindow}" (length ${currentWindow.length})`);
            
            if (right - left + 1 < minLen) {
                minLen = right - left + 1;
                minStart = left;
                console.log(`  New minimum: "${currentWindow}"`);
            }
            
            const leftChar = s[left];
            windowCount.set(leftChar, windowCount.get(leftChar) - 1);
            
            if (tCount.has(leftChar) && windowCount.get(leftChar) < tCount.get(leftChar)) {
                formed--;
            }
            
            left++;
            console.log(`  Contract left=${left}, removed='${leftChar}', formed=${formed}/${required}`);
        }
    }
    
    const result = minLen === Infinity ? "" : s.substring(minStart, minStart + minLen);
    console.log(`Final result: "${result}"`);
    return result;
}

minWindowWithSteps("ADOBECODEBANC", "ABC");

/**
 * RELATED PROBLEMS AND VARIATIONS:
 */

// 1. Find All Anagrams in a String
function findAnagrams(s, p) {
    const result = [];
    if (s.length < p.length) return result;
    
    const pCount = new Map();
    for (const char of p) {
        pCount.set(char, (pCount.get(char) || 0) + 1);
    }
    
    const windowCount = new Map();
    let left = 0;
    
    for (let right = 0; right < s.length; right++) {
        const rightChar = s[right];
        windowCount.set(rightChar, (windowCount.get(rightChar) || 0) + 1);
        
        if (right - left + 1 === p.length) {
            if (mapsEqual(windowCount, pCount)) {
                result.push(left);
            }
            
            const leftChar = s[left];
            windowCount.set(leftChar, windowCount.get(leftChar) - 1);
            if (windowCount.get(leftChar) === 0) {
                windowCount.delete(leftChar);
            }
            left++;
        }
    }
    
    return result;
}

function mapsEqual(map1, map2) {
    if (map1.size !== map2.size) return false;
    for (const [key, value] of map1) {
        if (map2.get(key) !== value) return false;
    }
    return true;
}

// 2. Longest Substring with At Most K Distinct Characters
function lengthOfLongestSubstringKDistinct(s, k) {
    if (k === 0) return 0;
    
    const charCount = new Map();
    let left = 0;
    let maxLen = 0;
    
    for (let right = 0; right < s.length; right++) {
        const rightChar = s[right];
        charCount.set(rightChar, (charCount.get(rightChar) || 0) + 1);
        
        while (charCount.size > k) {
            const leftChar = s[left];
            charCount.set(leftChar, charCount.get(leftChar) - 1);
            if (charCount.get(leftChar) === 0) {
                charCount.delete(leftChar);
            }
            left++;
        }
        
        maxLen = Math.max(maxLen, right - left + 1);
    }
    
    return maxLen;
}

console.log("\n=== Related Problems ===");
console.log("Find Anagrams 'cbaebabacd', 'ab':", findAnagrams("cbaebabacd", "ab"));
console.log("Longest Substring K=2 Distinct 'eceba':", lengthOfLongestSubstringKDistinct("eceba", 2));

/**
 * KEY INSIGHTS:
 * 
 * 1. Sliding Window Pattern:
 *    - Use two pointers to maintain a window
 *    - Expand right pointer to include more characters
 *    - Contract left pointer when window becomes invalid or to optimize
 * 
 * 2. Hash Map for Character Counting:
 *    - Track frequency of characters in target string
 *    - Track frequency of characters in current window
 *    - Use "formed" counter to check if window is valid
 * 
 * 3. Optimization Techniques:
 *    - Filter string to only include relevant characters
 *    - Use arrays instead of maps when character set is limited
 *    - Early termination when impossible to find valid window
 * 
 * 4. Edge Cases:
 *    - s shorter than t
 *    - No valid window exists
 *    - t contains duplicate characters
 *    - s and t are equal
 * 
 * 5. Common Mistakes:
 *    - Forgetting to handle duplicate characters in t
 *    - Not properly contracting the window
 *    - Incorrect window validity checking
 * 
 * 6. Applications:
 *    - Text processing and pattern matching
 *    - DNA sequence analysis
 *    - Finding optimal subarrays/substrings
 *    - Resource allocation problems
 */

// Performance comparison
function performanceComparison() {
    const longString = "A".repeat(10000) + "B".repeat(10000) + "C".repeat(10000);
    const target = "ABC";
    
    console.log("\n=== Performance Comparison ===");
    console.log("String length:", longString.length, "Target:", target);
    
    const start1 = performance.now();
    minWindow(longString, target);
    const end1 = performance.now();
    console.log("Sliding Window:", (end1 - start1).toFixed(4), "ms");
    
    const start2 = performance.now();
    minWindowOptimized(longString, target);
    const end2 = performance.now();
    console.log("Optimized:", (end2 - start2).toFixed(4), "ms");
    
    const start3 = performance.now();
    minWindowArray(longString, target);
    const end3 = performance.now();
    console.log("Array-based:", (end3 - start3).toFixed(4), "ms");
}

// Uncomment to run performance test
// performanceComparison(); 