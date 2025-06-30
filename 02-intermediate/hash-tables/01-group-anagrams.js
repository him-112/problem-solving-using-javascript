/**
 * PROBLEM: Group Anagrams
 * 
 * DESCRIPTION:
 * Given an array of strings, group anagrams together.
 * An anagram is a word formed by rearranging letters of another word.
 * 
 * EXAMPLES:
 * Input: ["eat","tea","tan","ate","nat","bat"]
 * Output: [["eat","tea","ate"],["tan","nat"],["bat"]]
 * 
 * Input: [""]
 * Output: [[""]]
 * 
 * Input: ["a"]
 * Output: [["a"]]
 * 
 * This problem showcases hash table usage for grouping and categorizing data
 * based on computed keys.
 */

// Method 1: Sort-based grouping
function groupAnagramsSort(strs) {
    /**
     * APPROACH: Use sorted string as hash key
     * 1. For each string, sort its characters
     * 2. Use sorted string as key in hash map
     * 3. Group strings with same sorted key
     * 
     * TIME COMPLEXITY: O(N * K log K) where N = number strings, K = max string length
     * SPACE COMPLEXITY: O(N * K) for storing strings and keys
     */
    
    console.log(`Grouping anagrams (sort): [${strs.join(', ')}]`);
    
    const groups = new Map();
    
    strs.forEach(str => {
        const sortedKey = str.split('').sort().join('');
        if (!groups.has(sortedKey)) {
            groups.set(sortedKey, []);
        }
        groups.get(sortedKey).push(str);
        console.log(`  "${str}" -> key: "${sortedKey}"`);
    });
    
    const result = Array.from(groups.values());
    console.log('Result:', result);
    return result;
}

// Method 2: Character frequency counting
function groupAnagramsFreq(strs) {
    /**
     * APPROACH: Use character frequency as hash key
     * 1. Count frequency of each character
     * 2. Convert frequency to string key
     * 3. Group strings with same frequency key
     * 
     * TIME COMPLEXITY: O(N * K) where N = number strings, K = max string length
     * SPACE COMPLEXITY: O(N * K) for storing strings and keys
     */
    
    console.log(`Grouping anagrams (frequency): [${strs.join(', ')}]`);
    
    const groups = new Map();
    
    function getFreqKey(str) {
        const freq = new Array(26).fill(0);
        for (let char of str) {
            freq[char.charCodeAt(0) - 'a'.charCodeAt(0)]++;
        }
        return freq.join(',');
    }
    
    strs.forEach(str => {
        const freqKey = getFreqKey(str);
        if (!groups.has(freqKey)) {
            groups.set(freqKey, []);
        }
        groups.get(freqKey).push(str);
        console.log(`  "${str}" -> freq: "${freqKey}"`);
    });
    
    const result = Array.from(groups.values());
    console.log('Result:', result);
    return result;
}

// Method 3: Prime number product (Mathematical approach)
function groupAnagramsPrime(strs) {
    /**
     * APPROACH: Use prime number products as unique keys
     * 1. Assign each letter a unique prime number
     * 2. Multiply primes for each character in string
     * 3. Anagrams will have same product (unique factorization)
     * 
     * TIME COMPLEXITY: O(N * K) where N = number strings, K = max string length
     * SPACE COMPLEXITY: O(N * K) for storing strings
     * 
     * NOTE: Can overflow for very long strings with repeated characters
     */
    
    console.log(`Grouping anagrams (prime product method) for: [${strs.map(s => `"${s}"`).join(', ')}]`);
    
    // Prime numbers for each letter a-z
    const primes = [
        2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47,
        53, 59, 61, 67, 71, 73, 79, 83, 89, 97, 101
    ];
    
    const groups = new Map();
    
    function getPrimeProduct(str) {
        let product = 1;
        for (let char of str) {
            const index = char.charCodeAt(0) - 'a'.charCodeAt(0);
            product *= primes[index];
        }
        return product;
    }
    
    strs.forEach(str => {
        const primeKey = getPrimeProduct(str);
        
        console.log(`  String "${str}" -> prime product: ${primeKey}`);
        
        if (!groups.has(primeKey)) {
            groups.set(primeKey, []);
            console.log(`    Created new group for product ${primeKey}`);
        }
        
        groups.get(primeKey).push(str);
        console.log(`    Added "${str}" to prime group`);
    });
    
    const result = Array.from(groups.values());
    console.log(`Final groups:`, result);
    return result;
}

// Method 4: Character count with Map
function groupAnagramsCharCount(strs) {
    /**
     * APPROACH: Use Map to count characters, then serialize
     * More readable than frequency array approach
     * 
     * TIME COMPLEXITY: O(N * K) where N = number strings, K = max string length
     * SPACE COMPLEXITY: O(N * K) for storing strings and maps
     */
    
    console.log(`Grouping anagrams (char count method) for: [${strs.map(s => `"${s}"`).join(', ')}]`);
    
    const groups = new Map();
    
    function getCharCountKey(str) {
        const charCount = new Map();
        
        for (let char of str) {
            charCount.set(char, (charCount.get(char) || 0) + 1);
        }
        
        // Sort and serialize the character counts
        const sortedEntries = Array.from(charCount.entries()).sort();
        return sortedEntries.map(([char, count]) => `${char}:${count}`).join('|');
    }
    
    strs.forEach(str => {
        const countKey = getCharCountKey(str);
        
        console.log(`  String "${str}" -> count key: "${countKey}"`);
        
        if (!groups.has(countKey)) {
            groups.set(countKey, []);
            console.log(`    Created new group for count "${countKey}"`);
        }
        
        groups.get(countKey).push(str);
        console.log(`    Added "${str}" to count group`);
    });
    
    const result = Array.from(groups.values());
    console.log(`Final groups:`, result);
    return result;
}

// Test all approaches
function testGroupAnagrams() {
    console.log("=== Testing Group Anagrams ===");
    
    const testCases = [
        ["eat", "tea", "tan", "ate", "nat", "bat"],
        [""],
        ["a"],
        ["abc", "bca", "cab", "xyz", "zyx", "yxz"],
        ["listen", "silent", "elbow", "below", "study", "dusty"]
    ];
    
    testCases.forEach((testCase, index) => {
        console.log(`\n--- Test Case ${index + 1}: [${testCase.map(s => `"${s}"`).join(', ')}] ---`);
        
        console.log("\nSort Method:");
        const sortResult = groupAnagramsSort([...testCase]);
        
        console.log("\nFrequency Method:");
        const freqResult = groupAnagramsFreq([...testCase]);
        
        console.log("\nPrime Product Method:");
        const primeResult = groupAnagramsPrime([...testCase]);
        
        console.log("\nChar Count Method:");
        const countResult = groupAnagramsCharCount([...testCase]);
        
        // Verify results (normalize by sorting)
        function normalizeResult(result) {
            return result.map(group => group.sort()).sort();
        }
        
        const normalized = [
            normalizeResult(sortResult),
            normalizeResult(freqResult),
            normalizeResult(primeResult),
            normalizeResult(countResult)
        ];
        
        const allMatch = normalized.every(result => 
            JSON.stringify(result) === JSON.stringify(normalized[0])
        );
        
        console.log(`\nAll methods agree: ${allMatch ? '✓' : '✗'}`);
    });
}

// Performance comparison
function performanceComparison() {
    console.log("\n=== Performance Comparison ===");
    
    // Generate test data
    function generateAnagrams(base, count) {
        const anagrams = [];
        for (let i = 0; i < count; i++) {
            const shuffled = base.split('').sort(() => Math.random() - 0.5).join('');
            anagrams.push(shuffled);
        }
        return anagrams;
    }
    
    const testData = [
        ...generateAnagrams("listen", 100),
        ...generateAnagrams("triangle", 100),
        ...generateAnagrams("algorithms", 100)
    ];
    
    console.log(`Testing with ${testData.length} strings...`);
    
    const methods = [
        { name: "Sort", fn: groupAnagramsSort },
        { name: "Frequency", fn: groupAnagramsFreq },
        { name: "Prime Product", fn: groupAnagramsPrime },
        { name: "Char Count", fn: groupAnagramsCharCount }
    ];
    
    methods.forEach(({ name, fn }) => {
        const start = performance.now();
        const result = fn([...testData]);
        const end = performance.now();
        
        console.log(`${name}: ${result.length} groups, ${(end - start).toFixed(4)}ms`);
    });
}

// Educational: Hash Table Concepts
function explainHashTableConcepts() {
    console.log("\n=== Hash Table Concepts in Anagram Grouping ===");
    
    console.log("🗝️ KEY GENERATION STRATEGIES:");
    console.log("1. Sorting: 'eat' -> 'aet' (canonical form)");
    console.log("2. Frequency: 'eat' -> 'a:1,e:1,t:1' (character counts)");
    console.log("3. Prime Product: 'eat' -> 2*7*83 (unique factorization)");
    console.log("4. Serialization: Convert data structure to string key");
    console.log();
    
    console.log("⚡ PERFORMANCE CHARACTERISTICS:");
    console.log("• Sort Method: O(N*K log K) - sorting dominates");
    console.log("• Frequency: O(N*K) - linear scan of characters");
    console.log("• Prime Product: O(N*K) - multiplication per character");
    console.log("• Char Count: O(N*K log K) - sorting for serialization");
    console.log();
    
    console.log("🎯 HASH TABLE DESIGN PRINCIPLES:");
    console.log("• Good hash function: uniform distribution of keys");
    console.log("• Collision handling: JavaScript Map handles this");
    console.log("• Key uniqueness: same anagrams must generate same key");
    console.log("• Memory efficiency: balance between time and space");
    console.log();
    
    console.log("🔍 CHOOSING THE RIGHT APPROACH:");
    console.log("• Small strings: Prime product (fastest for short strings)");
    console.log("• Large strings: Frequency counting (avoids sorting overhead)");
    console.log("• Unicode support: Frequency with Map (handles all characters)");
    console.log("• Memory constrained: Sort method (minimal extra space)");
}

// Demonstrate anagram detection logic
function demonstrateAnagramLogic() {
    console.log("\n=== Understanding Anagram Detection ===");
    
    const examples = [
        ["listen", "silent"],
        ["evil", "vile"],
        ["astronomer", "moon starer"],
        ["conversation", "voices rant on"]
    ];
    
    examples.forEach(([word1, word2]) => {
        console.log(`\nChecking if "${word1}" and "${word2}" are anagrams:`);
        
        // Clean words (remove spaces for fair comparison)
        const clean1 = word1.replace(/\s/g, '').toLowerCase();
        const clean2 = word2.replace(/\s/g, '').toLowerCase();
        
        console.log(`Cleaned: "${clean1}" vs "${clean2}"`);
        
        // Method 1: Sort and compare
        const sorted1 = clean1.split('').sort().join('');
        const sorted2 = clean2.split('').sort().join('');
        console.log(`Sorted: "${sorted1}" vs "${sorted2}"`);
        console.log(`Sort method: ${sorted1 === sorted2 ? '✓ Anagrams' : '✗ Not anagrams'}`);
        
        // Method 2: Character frequency
        function getFrequency(str) {
            const freq = {};
            for (let char of str) {
                freq[char] = (freq[char] || 0) + 1;
            }
            return freq;
        }
        
        const freq1 = getFrequency(clean1);
        const freq2 = getFrequency(clean2);
        
        console.log(`Frequency 1:`, freq1);
        console.log(`Frequency 2:`, freq2);
        
        const freqMatch = JSON.stringify(freq1) === JSON.stringify(freq2);
        console.log(`Frequency method: ${freqMatch ? '✓ Anagrams' : '✗ Not anagrams'}`);
    });
}

// Run all demonstrations
testGroupAnagrams();
performanceComparison();
explainHashTableConcepts();
demonstrateAnagramLogic();

/**
 * KEY CONCEPTS LEARNED:
 * 
 * 1. Hash Table Design: Choosing appropriate keys for grouping
 * 2. Key Generation: Multiple strategies for creating unique identifiers
 * 3. Time-Space Tradeoffs: Different approaches with varying complexities
 * 4. Collision Handling: JavaScript Map automatically handles hash collisions
 * 5. Algorithm Selection: Choosing optimal approach based on constraints
 * 
 * INTERVIEW DISCUSSION POINTS:
 * 
 * Q: "Group anagrams together"
 * A: "I'll use a hash table with sorted strings as keys to group anagrams"
 * 
 * Q: "What makes a good hash key?"
 * A: "A key that's unique for each group but identical for all members of that group.
 *     For anagrams, sorted characters work perfectly."
 * 
 * Q: "Can you optimize the sorting?"
 * A: "Yes, I can use character frequency counting which is O(K) instead of O(K log K)"
 * 
 * Q: "What about space complexity?"
 * A: "We need O(N*K) space to store all strings and their keys, where N is number
 *     of strings and K is average string length"
 * 
 * HASH TABLE PATTERNS:
 * 1. Grouping: Use hash table to collect items with same property
 * 2. Counting: Track frequency or occurrence of items
 * 3. Lookup: Fast O(1) access to related data
 * 4. Mapping: Transform one representation to another
 * 
 * RELATED PROBLEMS:
 * - Valid Anagram
 * - Find All Anagrams in a String
 * - Isomorphic Strings
 * - Word Pattern
 * - Substring with Concatenation of All Words
 */

module.exports = {
    groupAnagramsSort,
    groupAnagramsFreq,
    groupAnagramsPrime,
    groupAnagramsCharCount
}; 