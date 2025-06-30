/**
 * PROBLEM: String Manipulation Techniques
 * 
 * DESCRIPTION:
 * Essential string operations for text processing and data manipulation.
 * Building blocks for more complex string algorithms and text analysis.
 * 
 * KEY CONCEPTS:
 * - Substring extraction and modification
 * - Case conversion and normalization
 * - String trimming and padding
 * - String building and concatenation
 * - Character-level operations
 * 
 * EXAMPLES:
 * extractSubstring("hello", 1, 3) = "el"
 * toTitleCase("hello world") = "Hello World"
 */

// Method 1: Substring Operations
function substringOperations(str) {
    /**
     * APPROACH: Demonstrate various ways to extract substrings
     * Show slice, substring, and substr methods
     * 
     * TIME COMPLEXITY: O(k) where k is substring length
     * SPACE COMPLEXITY: O(k)
     */
    
    console.log(`substringOperations("${str}") called`);
    
    if (typeof str !== 'string') {
        console.log(`  Error: Input must be a string, got ${typeof str}`);
        return null;
    }
    
    const length = str.length;
    console.log(`  String length: ${length}`);
    
    if (length === 0) {
        console.log(`  Empty string, no substrings to extract`);
        return { slices: [], substrings: [], operations: [] };
    }
    
    const results = {
        original: str,
        slices: [],
        substrings: [],
        operations: []
    };
    
    // Using slice() - negative indices allowed
    console.log(`\n  === slice() method ===`);
    const slice1 = str.slice(0, 3);
    console.log(`  slice(0, 3): "${slice1}"`);
    results.slices.push({ method: 'slice(0, 3)', result: slice1 });
    
    const slice2 = str.slice(2);
    console.log(`  slice(2): "${slice2}"`);
    results.slices.push({ method: 'slice(2)', result: slice2 });
    
    const slice3 = str.slice(-3);
    console.log(`  slice(-3): "${slice3}" (last 3 characters)`);
    results.slices.push({ method: 'slice(-3)', result: slice3 });
    
    // Using substring() - swaps arguments if start > end
    console.log(`\n  === substring() method ===`);
    const substr1 = str.substring(0, 3);
    console.log(`  substring(0, 3): "${substr1}"`);
    results.substrings.push({ method: 'substring(0, 3)', result: substr1 });
    
    const substr2 = str.substring(2);
    console.log(`  substring(2): "${substr2}"`);
    results.substrings.push({ method: 'substring(2)', result: substr2 });
    
    // Practical substring operations
    console.log(`\n  === Practical Operations ===`);
    
    // Get first character
    const firstChar = str.charAt(0) || str[0];
    console.log(`  First character: "${firstChar}"`);
    results.operations.push({ operation: 'first character', result: firstChar });
    
    // Get last character
    const lastChar = str.charAt(length - 1) || str[length - 1];
    console.log(`  Last character: "${lastChar}"`);
    results.operations.push({ operation: 'last character', result: lastChar });
    
    // Get middle part
    const start = Math.floor(length / 4);
    const end = Math.floor(3 * length / 4);
    const middle = str.slice(start, end);
    console.log(`  Middle part [${start}, ${end}): "${middle}"`);
    results.operations.push({ operation: 'middle part', result: middle });
    
    return results;
}

// Method 2: Case Conversion
function caseConversion(str) {
    /**
     * APPROACH: Convert strings between different case formats
     * Handle various naming conventions and formatting
     * 
     * TIME COMPLEXITY: O(n)
     * SPACE COMPLEXITY: O(n)
     */
    
    console.log(`caseConversion("${str}") called`);
    
    if (typeof str !== 'string') {
        console.log(`  Error: Input must be a string`);
        return null;
    }
    
    const results = { original: str };
    
    // Basic case conversions
    console.log(`\n  === Basic Case Conversions ===`);
    
    results.lowercase = str.toLowerCase();
    console.log(`  Lowercase: "${results.lowercase}"`);
    
    results.uppercase = str.toUpperCase();
    console.log(`  Uppercase: "${results.uppercase}"`);
    
    // Title Case (First Letter of Each Word)
    console.log(`\n  === Title Case ===`);
    results.titleCase = str.toLowerCase().split(' ').map(word => {
        if (word.length === 0) return word;
        const capitalized = word.charAt(0).toUpperCase() + word.slice(1);
        console.log(`    "${word}" → "${capitalized}"`);
        return capitalized;
    }).join(' ');
    console.log(`  Title Case: "${results.titleCase}"`);
    
    // Sentence Case (First Letter of Sentence)
    console.log(`\n  === Sentence Case ===`);
    results.sentenceCase = str.toLowerCase();
    if (results.sentenceCase.length > 0) {
        results.sentenceCase = results.sentenceCase.charAt(0).toUpperCase() + 
                              results.sentenceCase.slice(1);
    }
    console.log(`  Sentence Case: "${results.sentenceCase}"`);
    
    // Camel Case (for programming)
    console.log(`\n  === Camel Case ===`);
    results.camelCase = str.toLowerCase()
        .split(/[\s-_]+/)
        .map((word, index) => {
            if (index === 0) return word;
            return word.charAt(0).toUpperCase() + word.slice(1);
        })
        .join('');
    console.log(`  Camel Case: "${results.camelCase}"`);
    
    // Pascal Case
    console.log(`\n  === Pascal Case ===`);
    results.pascalCase = str.toLowerCase()
        .split(/[\s-_]+/)
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join('');
    console.log(`  Pascal Case: "${results.pascalCase}"`);
    
    // Snake Case
    console.log(`\n  === Snake Case ===`);
    results.snakeCase = str.toLowerCase()
        .replace(/[\s-]+/g, '_')
        .replace(/[^a-z0-9_]/g, '');
    console.log(`  Snake Case: "${results.snakeCase}"`);
    
    return results;
}

// Method 3: String Trimming and Padding
function stringTrimmingPadding(str) {
    /**
     * APPROACH: Clean and format strings for consistent display
     * Handle whitespace and alignment operations
     * 
     * TIME COMPLEXITY: O(n)
     * SPACE COMPLEXITY: O(n)
     */
    
    console.log(`stringTrimmingPadding("${str}") called`);
    
    if (typeof str !== 'string') {
        console.log(`  Error: Input must be a string`);
        return null;
    }
    
    const results = { original: str, originalLength: str.length };
    
    // Trimming operations
    console.log(`\n  === Trimming Operations ===`);
    
    results.trimmed = str.trim();
    console.log(`  trim(): "${results.trimmed}" (length: ${results.trimmed.length})`);
    
    results.trimStart = str.trimStart(); // or trimLeft()
    console.log(`  trimStart(): "${results.trimStart}" (length: ${results.trimStart.length})`);
    
    results.trimEnd = str.trimEnd(); // or trimRight()
    console.log(`  trimEnd(): "${results.trimEnd}" (length: ${results.trimEnd.length})`);
    
    // Custom trimming
    function customTrim(string, chars = ' ') {
        const pattern = new RegExp(`^[${chars}]+|[${chars}]+$`, 'g');
        return string.replace(pattern, '');
    }
    
    results.customTrim = customTrim(str, ' \t\n');
    console.log(`  Custom trim: "${results.customTrim}"`);
    
    // Padding operations
    console.log(`\n  === Padding Operations ===`);
    
    const baseStr = results.trimmed;
    const targetLength = 20;
    
    results.padStart = baseStr.padStart(targetLength, ' ');
    console.log(`  padStart(${targetLength}): "${results.padStart}"`);
    
    results.padEnd = baseStr.padEnd(targetLength, ' ');
    console.log(`  padEnd(${targetLength}): "${results.padEnd}"`);
    
    results.padStartChar = baseStr.padStart(targetLength, '*');
    console.log(`  padStart with '*': "${results.padStartChar}"`);
    
    // Center padding (custom function)
    function centerPad(string, length, padChar = ' ') {
        if (string.length >= length) return string;
        
        const totalPadding = length - string.length;
        const leftPadding = Math.floor(totalPadding / 2);
        const rightPadding = totalPadding - leftPadding;
        
        return padChar.repeat(leftPadding) + string + padChar.repeat(rightPadding);
    }
    
    results.centered = centerPad(baseStr, targetLength, ' ');
    console.log(`  Centered: "${results.centered}"`);
    
    return results;
}

// Method 4: String Building and Concatenation
function stringBuilding(parts) {
    /**
     * APPROACH: Efficiently build strings from multiple parts
     * Show different concatenation methods and performance
     * 
     * TIME COMPLEXITY: O(n*m) naive, O(n) with array join
     * SPACE COMPLEXITY: O(n*m)
     */
    
    console.log(`stringBuilding called with ${parts.length} parts`);
    console.log(`Parts: [${parts.map(p => `"${p}"`).join(', ')}]`);
    
    if (!Array.isArray(parts)) {
        console.log(`  Error: Input must be an array`);
        return null;
    }
    
    const results = { parts, methods: [] };
    
    // Method 1: Simple concatenation with +
    console.log(`\n  === Simple Concatenation (+) ===`);
    let result1 = '';
    for (let i = 0; i < parts.length; i++) {
        result1 += parts[i];
        console.log(`    Step ${i + 1}: "${result1}"`);
    }
    results.methods.push({ method: 'Simple +', result: result1 });
    
    // Method 2: Array join (most efficient)
    console.log(`\n  === Array Join ===`);
    const result2 = parts.join('');
    console.log(`    join(''): "${result2}"`);
    results.methods.push({ method: 'Array join', result: result2 });
    
    // Method 3: Template literals
    console.log(`\n  === Template Literals ===`);
    const result3 = `${parts.join('')}`;
    console.log(`    Template literal: "${result3}"`);
    results.methods.push({ method: 'Template literal', result: result3 });
    
    // Method 4: Join with separator
    console.log(`\n  === Join with Separators ===`);
    const separators = [' ', ', ', ' - ', ' | '];
    
    separators.forEach(sep => {
        const joined = parts.join(sep);
        console.log(`    join("${sep}"): "${joined}"`);
        results.methods.push({ method: `join("${sep}")`, result: joined });
    });
    
    return results;
}

// Method 5: Character-Level Operations
function characterOperations(str) {
    /**
     * APPROACH: Work with individual characters and codes
     * Foundation for character analysis and encoding
     * 
     * TIME COMPLEXITY: O(n)
     * SPACE COMPLEXITY: O(n)
     */
    
    console.log(`characterOperations("${str}") called`);
    
    if (typeof str !== 'string') {
        console.log(`  Error: Input must be a string`);
        return null;
    }
    
    const results = {
        original: str,
        length: str.length,
        characters: [],
        analysis: {}
    };
    
    console.log(`\n  === Character Analysis ===`);
    
    // Analyze each character
    for (let i = 0; i < str.length; i++) {
        const char = str.charAt(i);
        const code = str.charCodeAt(i);
        
        const charInfo = {
            index: i,
            character: char,
            code: code,
            isLetter: /[a-zA-Z]/.test(char),
            isDigit: /\d/.test(char),
            isWhitespace: /\s/.test(char),
            isUppercase: char === char.toUpperCase() && char !== char.toLowerCase(),
            isLowercase: char === char.toLowerCase() && char !== char.toUpperCase()
        };
        
        results.characters.push(charInfo);
        console.log(`    ${i}: '${char}' (code: ${code}) - ${Object.entries(charInfo)
            .filter(([key, value]) => typeof value === 'boolean' && value)
            .map(([key]) => key)
            .join(', ')}`);
    }
    
    // Summary statistics
    console.log(`\n  === Character Statistics ===`);
    results.analysis = {
        totalLength: str.length,
        letters: results.characters.filter(c => c.isLetter).length,
        digits: results.characters.filter(c => c.isDigit).length,
        whitespace: results.characters.filter(c => c.isWhitespace).length,
        uppercase: results.characters.filter(c => c.isUppercase).length,
        lowercase: results.characters.filter(c => c.isLowercase).length,
        other: results.characters.filter(c => !c.isLetter && !c.isDigit && !c.isWhitespace).length
    };
    
    Object.entries(results.analysis).forEach(([type, count]) => {
        console.log(`    ${type}: ${count}`);
    });
    
    return results;
}

// Method 6: String Replacement and Modification
function stringReplacement(str, replacements) {
    /**
     * APPROACH: Replace patterns and substrings in text
     * Show various replacement techniques
     * 
     * TIME COMPLEXITY: O(n*m) where m is number of replacements
     * SPACE COMPLEXITY: O(n)
     */
    
    console.log(`stringReplacement("${str}") called`);
    console.log(`Replacements:`, replacements);
    
    if (typeof str !== 'string' || !Array.isArray(replacements)) {
        console.log(`  Error: Invalid input types`);
        return null;
    }
    
    let result = str;
    const steps = [{ step: 0, description: 'Original', result: str }];
    
    console.log(`\n  === Replacement Steps ===`);
    console.log(`  Original: "${str}"`);
    
    for (let i = 0; i < replacements.length; i++) {
        const { find, replace, method = 'replace' } = replacements[i];
        
        console.log(`\n  Step ${i + 1}: Replace "${find}" with "${replace}"`);
        
        const previousResult = result;
        
        switch (method) {
            case 'replace':
                result = result.replace(find, replace);
                break;
            case 'replaceAll':
                result = result.replaceAll ? result.replaceAll(find, replace) : 
                         result.split(find).join(replace);
                break;
            case 'regex':
                const regex = new RegExp(find, 'g');
                result = result.replace(regex, replace);
                break;
            default:
                result = result.replace(find, replace);
        }
        
        console.log(`    Before: "${previousResult}"`);
        console.log(`    After:  "${result}"`);
        console.log(`    Method: ${method}`);
        
        steps.push({
            step: i + 1,
            description: `Replace "${find}" with "${replace}"`,
            method: method,
            result: result
        });
    }
    
    console.log(`\n  Final result: "${result}"`);
    
    return { original: str, final: result, steps };
}

// Test all string manipulation functions
function testStringManipulation() {
    console.log("=== Testing String Manipulation ===");
    
    // Test substring operations
    console.log("\n--- Substring Operations ---");
    substringOperations("Hello, World!");
    
    // Test case conversion
    console.log("\n--- Case Conversion ---");
    caseConversion("hello world programming");
    caseConversion("the-quick-brown_fox");
    
    // Test trimming and padding
    console.log("\n--- Trimming and Padding ---");
    stringTrimmingPadding("   Hello World   ");
    
    // Test string building
    console.log("\n--- String Building ---");
    stringBuilding(["Hello", " ", "beautiful", " ", "world", "!"]);
    
    // Test character operations
    console.log("\n--- Character Operations ---");
    characterOperations("Hello123 World!");
    
    // Test string replacement
    console.log("\n--- String Replacement ---");
    const replacements = [
        { find: "Hello", replace: "Hi", method: "replace" },
        { find: "World", replace: "Universe", method: "replace" },
        { find: "!", replace: "!!!", method: "replace" }
    ];
    stringReplacement("Hello World! Hello again!", replacements);
}

// Practical examples
function practicalStringExamples() {
    console.log("\n=== Practical String Examples ===");
    
    // Example 1: Format phone number
    console.log("\n--- Phone Number Formatting ---");
    function formatPhoneNumber(phone) {
        // Remove all non-digits
        const digits = phone.replace(/\D/g, '');
        console.log(`Digits only: "${digits}"`);
        
        if (digits.length === 10) {
            const formatted = `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
            console.log(`Formatted: "${formatted}"`);
            return formatted;
        }
        
        console.log(`Invalid phone number length: ${digits.length}`);
        return null;
    }
    
    formatPhoneNumber("1234567890");
    formatPhoneNumber("(123) 456-7890");
    formatPhoneNumber("123.456.7890");
    
    // Example 2: Extract file extension
    console.log("\n--- File Extension Extraction ---");
    function getFileExtension(filename) {
        console.log(`Processing filename: "${filename}"`);
        
        const lastDot = filename.lastIndexOf('.');
        if (lastDot === -1 || lastDot === filename.length - 1) {
            console.log(`No extension found`);
            return '';
        }
        
        const extension = filename.slice(lastDot + 1).toLowerCase();
        console.log(`Extension: "${extension}"`);
        return extension;
    }
    
    getFileExtension("document.pdf");
    getFileExtension("image.JPEG");
    getFileExtension("script.js");
    getFileExtension("README");
    
    // Example 3: Create initials
    console.log("\n--- Create Initials ---");
    function createInitials(fullName) {
        console.log(`Creating initials for: "${fullName}"`);
        
        const names = fullName.trim().split(/\s+/);
        const initials = names
            .filter(name => name.length > 0)
            .map(name => name.charAt(0).toUpperCase())
            .join('');
        
        console.log(`Initials: "${initials}"`);
        return initials;
    }
    
    createInitials("John Doe");
    createInitials("Mary Jane Watson");
    createInitials("   Alice   Bob   Charlie   ");
}

// Educational explanations
function explainStringManipulation() {
    console.log("\n=== Understanding String Manipulation ===");
    
    console.log("🧵 STRING BASICS:");
    console.log("• Strings are immutable in JavaScript");
    console.log("• String operations create new strings");
    console.log("• Zero-indexed like arrays");
    console.log("• Support Unicode characters");
    console.log();
    
    console.log("✂️ SUBSTRING METHODS:");
    console.log("• slice(start, end): Extracts section, allows negative indices");
    console.log("• substring(start, end): Similar to slice, swaps if start > end");
    console.log("• substr(start, length): Start position and length (deprecated)");
    console.log("• charAt(index): Get character at index");
    console.log();
    
    console.log("🔤 CASE CONVERSION:");
    console.log("• toLowerCase()/toUpperCase(): Basic case conversion");
    console.log("• Title Case: First letter of each word capitalized");
    console.log("• Camel Case: firstWordLowerCaseRestCapitalized");
    console.log("• Pascal Case: FirstLetterOfEveryWordCapitalized");
    console.log("• Snake Case: words_separated_by_underscores");
    console.log();
    
    console.log("🧹 TRIMMING AND PADDING:");
    console.log("• trim(): Remove whitespace from both ends");
    console.log("• trimStart()/trimEnd(): Remove from one end");
    console.log("• padStart()/padEnd(): Add padding to reach target length");
    console.log();
    
    console.log("🔧 STRING BUILDING:");
    console.log("• + operator: Simple but can be inefficient for many operations");
    console.log("• Array.join(): Most efficient for multiple concatenations");
    console.log("• Template literals: `${variable}` for interpolation");
    console.log();
    
    console.log("⚡ PERFORMANCE TIPS:");
    console.log("• Use array.join() for building long strings");
    console.log("• Prefer template literals for readability");
    console.log("• Cache string.length in loops");
    console.log("• Consider StringBuilder pattern for complex building");
    console.log();
    
    console.log("🎯 INTERVIEW TIPS:");
    console.log("• Know the difference between slice() and substring()");
    console.log("• Understand string immutability implications");
    console.log("• Practice case conversion algorithms");
    console.log("• Know character code operations");
    console.log("• Be familiar with regex for pattern matching");
}

// Run all demonstrations
testStringManipulation();
practicalStringExamples();
explainStringManipulation();

/**
 * KEY CONCEPTS LEARNED:
 * 
 * 1. Substring Extraction: slice(), substring(), charAt() methods
 * 2. Case Conversion: Converting between naming conventions
 * 3. String Cleaning: Trimming whitespace and padding for alignment
 * 4. String Building: Efficient concatenation techniques
 * 5. Character Analysis: Working with individual characters and codes
 * 
 * INTERVIEW DISCUSSION POINTS:
 * 
 * Q: "How do you extract a substring in JavaScript?"
 * A: "Use slice(start, end) for most cases - supports negative indices.
 *     substring() is similar but swaps arguments if start > end."
 * 
 * Q: "What's the most efficient way to build a long string?"
 * A: "Use array.join() for multiple concatenations. Avoid repeated +
 *     operations which create many intermediate strings."
 * 
 * Q: "How do you convert a string to title case?"
 * A: "Split by spaces, capitalize first letter of each word,
 *     then join back together. Handle edge cases like empty words."
 * 
 * Q: "What's the difference between trim() and trimStart()?"
 * A: "trim() removes whitespace from both ends, trimStart() only
 *     removes from the beginning, trimEnd() only from the end."
 * 
 * STRING MANIPULATION PATTERNS:
 * 1. Extract → slice(), substring(), charAt()
 * 2. Transform → toLowerCase(), toUpperCase(), replace()
 * 3. Clean → trim(), replace() with regex
 * 4. Build → array.join(), template literals
 * 5. Analyze → charAt(), charCodeAt(), regex tests
 * 6. Format → combination of above operations
 * 
 * RELATED CONCEPTS:
 * - Regular Expressions
 * - Unicode and Character Encoding
 * - Template Literals and Interpolation
 * - String Performance Optimization
 * - Text Processing Algorithms
 * - Internationalization (i18n)
 */

module.exports = {
    substringOperations,
    caseConversion,
    stringTrimmingPadding,
    stringBuilding,
    characterOperations,
    stringReplacement
}; 