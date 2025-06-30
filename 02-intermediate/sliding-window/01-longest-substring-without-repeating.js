/**
 * PROBLEM: Longest Substring Without Repeating Characters
 * 
 * DESCRIPTION:
 * Given a string, find the length of the longest substring without repeating characters.
 * 
 * EXAMPLES:
 * "abcabcbb" → 3 (substring "abc")
 * "bbbbb" → 1 (substring "b")
 * "pwwkew" → 3 (substring "wke")
 * "abcdef" → 6 (entire string)
 * "" → 0 (empty string)
 * 
 * The sliding window technique is perfect for this type of problem where we need
 * to find optimal subarray/substring with certain properties.
 */

// Method 1: Brute Force Approach
function lengthOfLongestSubstringBrute(s) {
    /**
     * APPROACH: Check all possible substrings
     * 1. Generate all substrings
     * 2. Check if each substring has unique characters
     * 3. Track the maximum length
     * 
     * TIME COMPLEXITY: O(n³) - O(n²) substrings × O(n) uniqueness check
     * SPACE COMPLEXITY: O(min(m, n)) - where m is charset size
     */
    
    console.log(`Finding longest substring (brute force) in: "${s}"`);
    
    if (s.length === 0) return 0;
    
    function hasUniqueChars(str) {
        const seen = new Set();
        for (let char of str) {
            if (seen.has(char)) return false;
            seen.add(char);
        }
        return true;
    }
    
    let maxLength = 0;
    let bestSubstring = "";
    
    for (let i = 0; i < s.length; i++) {
        for (let j = i + 1; j <= s.length; j++) {
            const substring = s.slice(i, j);
            
            if (hasUniqueChars(substring)) {
                console.log(`  Unique substring: "${substring}" (length ${substring.length})`);
                if (substring.length > maxLength) {
                    maxLength = substring.length;
                    bestSubstring = substring;
                    console.log(`    New max: ${maxLength}`);
                }
            }
        }
    }
    
    console.log(`Best substring: "${bestSubstring}" with length ${maxLength}`);
    return maxLength;
}

// Method 2: Sliding Window with Set
function lengthOfLongestSubstringSet(s) {
    /**
     * APPROACH: Sliding window with expanding and contracting
     * 1. Expand window by moving right pointer
     * 2. When duplicate found, contract window from left
     * 3. Track maximum window size
     * 
     * TIME COMPLEXITY: O(2n) = O(n) - each character visited at most twice
     * SPACE COMPLEXITY: O(min(m, n)) - size of the set
     */
    
    console.log(`Finding longest substring (sliding window + set) in: "${s}"`);
    
    if (s.length === 0) return 0;
    
    let left = 0;
    let maxLength = 0;
    let currentChars = new Set();
    let bestWindow = "";
    
    for (let right = 0; right < s.length; right++) {
        const rightChar = s[right];
        
        console.log(`\nStep ${right + 1}: Trying to add '${rightChar}' at position ${right}`);
        console.log(`Current window: "${s.slice(left, right)}" (${left}, ${right - 1})`);
        console.log(`Characters in set: {${Array.from(currentChars).join(', ')}}`);
        
        // Contract window while we have duplicate
        while (currentChars.has(rightChar)) {
            const leftChar = s[left];
            console.log(`  Removing '${leftChar}' from left (position ${left})`);
            currentChars.delete(leftChar);
            left++;
        }
        
        // Add current character and expand window
        currentChars.add(rightChar);
        const currentLength = right - left + 1;
        
        console.log(`  Added '${rightChar}', window: "${s.slice(left, right + 1)}" (length ${currentLength})`);
        
        if (currentLength > maxLength) {
            maxLength = currentLength;
            bestWindow = s.slice(left, right + 1);
            console.log(`  New maximum length: ${maxLength}`);
        }
    }
    
    console.log(`\nBest window: "${bestWindow}" with length ${maxLength}`);
    return maxLength;
}

// Method 3: Optimized Sliding Window with Map (Most Efficient)
function lengthOfLongestSubstringMap(s) {
    /**
     * APPROACH: Sliding window with HashMap for O(1) jumps
     * 1. Use map to store character -> index mapping
     * 2. When duplicate found, jump left pointer directly
     * 3. No need to move left pointer one by one
     * 
     * TIME COMPLEXITY: O(n) - each character visited exactly once
     * SPACE COMPLEXITY: O(min(m, n)) - size of the map
     */
    
    console.log(`Finding longest substring (optimized sliding window) in: "${s}"`);
    
    if (s.length === 0) return 0;
    
    let left = 0;
    let maxLength = 0;
    let charIndexMap = new Map();
    let bestWindow = "";
    
    for (let right = 0; right < s.length; right++) {
        const rightChar = s[right];
        
        console.log(`\nStep ${right + 1}: Processing '${rightChar}' at position ${right}`);
        
        // If character seen before and within current window
        if (charIndexMap.has(rightChar) && charIndexMap.get(rightChar) >= left) {
            const prevIndex = charIndexMap.get(rightChar);
            console.log(`  '${rightChar}' seen before at index ${prevIndex}`);
            console.log(`  Jumping left pointer from ${left} to ${prevIndex + 1}`);
            left = prevIndex + 1;
        }
        
        // Update character's latest index
        charIndexMap.set(rightChar, right);
        
        const currentLength = right - left + 1;
        const currentWindow = s.slice(left, right + 1);
        
        console.log(`  Current window: "${currentWindow}" (${left}, ${right}) length: ${currentLength}`);
        
        if (currentLength > maxLength) {
            maxLength = currentLength;
            bestWindow = currentWindow;
            console.log(`  New maximum length: ${maxLength}`);
        }
    }
    
    console.log(`\nBest window: "${bestWindow}" with length ${maxLength}`);
    return maxLength;
}

// Method 4: Sliding Window with Character Array (for ASCII)
function lengthOfLongestSubstringArray(s) {
    /**
     * APPROACH: Use array instead of map for ASCII characters
     * Faster than map for small character sets
     * 
     * TIME COMPLEXITY: O(n)
     * SPACE COMPLEXITY: O(1) - fixed size array (128 for ASCII)
     */
    
    console.log(`Finding longest substring (array optimization) in: "${s}"`);
    
    if (s.length === 0) return 0;
    
    let left = 0;
    let maxLength = 0;
    let charLastIndex = new Array(128).fill(-1); // ASCII character set
    
    for (let right = 0; right < s.length; right++) {
        const rightChar = s[right];
        const charCode = rightChar.charCodeAt(0);
        
        // If character seen before and within current window
        if (charLastIndex[charCode] >= left) {
            left = charLastIndex[charCode] + 1;
        }
        
        charLastIndex[charCode] = right;
        maxLength = Math.max(maxLength, right - left + 1);
    }
    
    console.log(`Maximum length found: ${maxLength}`);
    return maxLength;
}

// Test all approaches
function testLongestSubstring() {
    console.log("=== Testing Longest Substring Without Repeating Characters ===");
    
    const testCases = [
        "abcabcbb",    // "abc" = 3
        "bbbbb",       // "b" = 1
        "pwwkew",      // "wke" = 3
        "abcdef",      // entire string = 6
        "",            // empty = 0
        "au",          // "au" = 2
        "dvdf",        // "vdf" = 3
        "abba"         // "ab" = 2
    ];
    
    testCases.forEach((testStr, index) => {
        console.log(`\n--- Test Case ${index + 1}: "${testStr}" ---`);
        
        // Only run brute force for shorter strings
        if (testStr.length <= 8) {
            console.log("\nBrute Force Method:");
            const bruteResult = lengthOfLongestSubstringBrute(testStr);
        }
        
        console.log("\nSliding Window + Set:");
        const setResult = lengthOfLongestSubstringSet(testStr);
        
        console.log("\nOptimized Sliding Window + Map:");
        const mapResult = lengthOfLongestSubstringMap(testStr);
        
        console.log("\nArray Optimization:");
        const arrayResult = lengthOfLongestSubstringArray(testStr);
        
        console.log("\nResults Summary:");
        if (testStr.length <= 8) {
            console.log(`Brute Force: ${bruteResult || 'N/A'}`);
        }
        console.log(`Set Method: ${setResult}`);
        console.log(`Map Method: ${mapResult}`);
        console.log(`Array Method: ${arrayResult}`);
        
        const allMatch = setResult === mapResult && mapResult === arrayResult;
        console.log(`All optimized methods agree: ${allMatch ? '✓' : '✗'}`);
    });
}

// Performance comparison
function performanceComparison() {
    console.log("\n=== Performance Comparison ===");
    
    // Generate test strings
    const shortString = "abcdefghijklmnop".repeat(5); // 80 chars
    const longString = "abcdefghijklmnopqrstuvwxyz".repeat(100); // 2600 chars
    
    const testStrings = [
        { name: "Short string (80 chars)", str: shortString },
        { name: "Long string (2600 chars)", str: longString }
    ];
    
    testStrings.forEach(({ name, str }) => {
        console.log(`\n${name}:`);
        
        // Sliding window with set
        let start = performance.now();
        const setResult = lengthOfLongestSubstringSet(str);
        let end = performance.now();
        console.log(`Set method: ${setResult} (${(end - start).toFixed(4)}ms)`);
        
        // Optimized sliding window with map
        start = performance.now();
        const mapResult = lengthOfLongestSubstringMap(str);
        end = performance.now();
        console.log(`Map method: ${mapResult} (${(end - start).toFixed(4)}ms)`);
        
        // Array optimization
        start = performance.now();
        const arrayResult = lengthOfLongestSubstringArray(str);
        end = performance.now();
        console.log(`Array method: ${arrayResult} (${(end - start).toFixed(4)}ms)`);
    });
}

// Educational: Sliding Window Pattern Explanation
function explainSlidingWindow() {
    console.log("\n=== Understanding Sliding Window Pattern ===");
    
    console.log("🎯 SLIDING WINDOW TECHNIQUE:");
    console.log("A two-pointer approach where we maintain a 'window' of elements");
    console.log("and slide it through the array/string to find optimal subarray/substring");
    console.log();
    
    console.log("📏 TWO MAIN TYPES:");
    console.log("1. Fixed Size Window: Window size remains constant");
    console.log("2. Variable Size Window: Window expands and contracts");
    console.log();
    
    console.log("🔄 VARIABLE WINDOW STRATEGY (our problem):");
    console.log("• Expand: Move right pointer to include new elements");
    console.log("• Contract: Move left pointer to exclude elements when condition violated");
    console.log("• Track: Keep track of best window seen so far");
    console.log();
    
    console.log("⚡ OPTIMIZATION TECHNIQUES:");
    console.log("1. Set/Map: Quick lookup for duplicates");
    console.log("2. Jump Strategy: Move left pointer directly instead of one-by-one");
    console.log("3. Array: Use array instead of map for small character sets");
    console.log();
    
    console.log("🎮 WHEN TO USE SLIDING WINDOW:");
    console.log("• Finding optimal subarray/substring");
    console.log("• Problems involving consecutive elements");
    console.log("• Maximum/minimum window problems");
    console.log("• Substring problems with constraints");
}

// Run all demonstrations
testLongestSubstring();
performanceComparison();
explainSlidingWindow();

/**
 * KEY CONCEPTS LEARNED:
 * 
 * 1. Sliding Window Pattern: Variable size window for substring problems
 * 2. Two Pointers: Left and right pointers define window boundaries
 * 3. Hash Map Optimization: O(1) lookup and direct jumping
 * 4. Space-Time Tradeoffs: Map vs Set vs Array for different use cases
 * 5. Algorithm Evolution: From O(n³) brute force to O(n) optimal
 * 
 * INTERVIEW DISCUSSION POINTS:
 * 
 * Q: "Find longest substring without repeating characters"
 * A: "I'll use sliding window technique with two pointers"
 * 
 * Q: "How do you handle duplicates?"
 * A: "When I find a duplicate, I move the left pointer to skip the previous 
 *     occurrence and continue from there"
 * 
 * Q: "What's the time complexity?"
 * A: "O(n) - each character is visited at most twice (once by right, once by left)"
 * 
 * Q: "Can you optimize further?"
 * A: "Yes, instead of moving left pointer one by one, I can jump directly 
 *     using a HashMap that stores character -> index mapping"
 * 
 * SLIDING WINDOW PATTERN CHECKLIST:
 * 1. Two pointers (left, right) to define window
 * 2. Expand window by moving right pointer
 * 3. Contract window by moving left pointer when condition violated
 * 4. Track optimal window during the process
 * 5. Use appropriate data structure (Set/Map/Array) for lookups
 * 
 * RELATED PROBLEMS:
 * - Minimum Window Substring
 * - Longest Repeating Character Replacement
 * - Permutation in String
 * - Maximum Average Subarray
 * - Fruit Into Baskets
 */

module.exports = {
    lengthOfLongestSubstringBrute,
    lengthOfLongestSubstringSet,
    lengthOfLongestSubstringMap,
    lengthOfLongestSubstringArray
}; 