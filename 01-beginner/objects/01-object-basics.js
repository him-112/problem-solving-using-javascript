/**
 * PROBLEM: Object Basics and Manipulation
 * 
 * DESCRIPTION:
 * Fundamental object operations for data management and structure.
 * Essential for understanding more complex data structures and algorithms.
 * 
 * KEY CONCEPTS:
 * - Object creation and initialization
 * - Property access and modification
 * - Object iteration techniques
 * - Object comparison and cloning
 * - Working with nested objects
 * 
 * EXAMPLES:
 * createPerson("Alice", 25) = {name: "Alice", age: 25}
 * getProperty(obj, "name") = "Alice"
 */

// Method 1: Object Creation Patterns
function createObjectExamples() {
    /**
     * APPROACH: Demonstrate different ways to create objects
     * Show various initialization patterns
     * 
     * TIME COMPLEXITY: O(1) for each creation
     * SPACE COMPLEXITY: O(n) where n is number of properties
     */
    
    console.log("=== Object Creation Patterns ===");
    
    // 1. Object literal
    const person1 = {
        name: "Alice",
        age: 25,
        city: "New York"
    };
    console.log("Object literal:", person1);
    
    // 2. Constructor function
    function Person(name, age, city) {
        this.name = name;
        this.age = age;
        this.city = city;
    }
    const person2 = new Person("Bob", 30, "London");
    console.log("Constructor function:", person2);
    
    // 3. Object.create()
    const personPrototype = {
        greet: function() {
            return `Hello, I'm ${this.name}`;
        }
    };
    const person3 = Object.create(personPrototype);
    person3.name = "Charlie";
    person3.age = 35;
    console.log("Object.create():", person3);
    console.log("Greeting:", person3.greet());
    
    // 4. Class syntax (ES6)
    class PersonClass {
        constructor(name, age, city) {
            this.name = name;
            this.age = age;
            this.city = city;
        }
        
        introduce() {
            return `I'm ${this.name}, ${this.age} years old from ${this.city}`;
        }
    }
    const person4 = new PersonClass("Diana", 28, "Paris");
    console.log("Class syntax:", person4);
    console.log("Introduction:", person4.introduce());
    
    return { person1, person2, person3, person4 };
}

// Method 2: Property Access Methods
function propertyAccess(obj, property) {
    /**
     * APPROACH: Demonstrate different ways to access object properties
     * Show dot notation vs bracket notation
     * 
     * TIME COMPLEXITY: O(1)
     * SPACE COMPLEXITY: O(1)
     */
    
    console.log(`\n=== Property Access for property: "${property}" ===`);
    console.log("Object:", obj);
    
    // Dot notation (when property name is known at compile time)
    if (property === "name") {
        console.log("Dot notation (obj.name):", obj.name);
    }
    
    // Bracket notation (dynamic property access)
    console.log("Bracket notation (obj[property]):", obj[property]);
    
    // Check if property exists
    console.log("Property exists (hasOwnProperty):", obj.hasOwnProperty(property));
    console.log("Property exists (in operator):", property in obj);
    console.log("Property exists (!=undefined):", obj[property] !== undefined);
    
    // Safe property access
    const safeValue = obj[property] ?? "Property not found";
    console.log("Safe access with nullish coalescing:", safeValue);
    
    return obj[property];
}

// Method 3: Object Property Modification
function modifyObject(obj, property, value) {
    /**
     * APPROACH: Show different ways to modify object properties
     * Demonstrate adding, updating, and deleting properties
     * 
     * TIME COMPLEXITY: O(1)
     * SPACE COMPLEXITY: O(1)
     */
    
    console.log(`\n=== Modifying Object ===`);
    console.log("Original object:", obj);
    
    // Create a copy to avoid modifying original
    const modified = { ...obj };
    
    // Add or update property
    console.log(`Setting property "${property}" to:`, value);
    modified[property] = value;
    console.log("After modification:", modified);
    
    // Add multiple properties
    Object.assign(modified, {
        lastModified: new Date().toISOString(),
        version: 1
    });
    console.log("After adding metadata:", modified);
    
    // Delete property
    console.log(`Deleting property "${property}"`);
    delete modified[property];
    console.log("After deletion:", modified);
    
    return modified;
}

// Method 4: Object Iteration Techniques
function iterateObject(obj) {
    /**
     * APPROACH: Demonstrate various ways to iterate over objects
     * Show keys, values, and entries iteration
     * 
     * TIME COMPLEXITY: O(n) where n is number of properties
     * SPACE COMPLEXITY: O(1) for iteration, O(n) for collecting results
     */
    
    console.log(`\n=== Object Iteration ===`);
    console.log("Object to iterate:", obj);
    
    // 1. for...in loop (includes inherited properties)
    console.log("\n1. for...in loop:");
    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            console.log(`  ${key}: ${obj[key]}`);
        }
    }
    
    // 2. Object.keys()
    console.log("\n2. Object.keys():");
    const keys = Object.keys(obj);
    console.log("Keys:", keys);
    keys.forEach(key => {
        console.log(`  ${key}: ${obj[key]}`);
    });
    
    // 3. Object.values()
    console.log("\n3. Object.values():");
    const values = Object.values(obj);
    console.log("Values:", values);
    
    // 4. Object.entries()
    console.log("\n4. Object.entries():");
    const entries = Object.entries(obj);
    console.log("Entries:", entries);
    entries.forEach(([key, value]) => {
        console.log(`  ${key}: ${value}`);
    });
    
    return { keys, values, entries };
}

// Method 5: Object Comparison
function compareObjects(obj1, obj2) {
    /**
     * APPROACH: Compare objects for equality (shallow and deep)
     * Demonstrate reference vs value comparison
     * 
     * TIME COMPLEXITY: O(n) for shallow, O(n*m) for deep comparison
     * SPACE COMPLEXITY: O(1)
     */
    
    console.log(`\n=== Object Comparison ===`);
    console.log("Object 1:", obj1);
    console.log("Object 2:", obj2);
    
    // Reference comparison (always false for different objects)
    const referenceEqual = obj1 === obj2;
    console.log("Reference equality (===):", referenceEqual);
    
    // Shallow comparison
    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);
    
    console.log("\nShallow comparison:");
    if (keys1.length !== keys2.length) {
        console.log("Different number of properties");
        return false;
    }
    
    for (const key of keys1) {
        if (obj1[key] !== obj2[key]) {
            console.log(`Property "${key}" differs: ${obj1[key]} vs ${obj2[key]}`);
            return false;
        }
        console.log(`Property "${key}" matches: ${obj1[key]}`);
    }
    
    console.log("Objects are shallowly equal");
    return true;
}

// Method 6: Object Cloning
function cloneObject(obj, deep = false) {
    /**
     * APPROACH: Create copies of objects (shallow and deep)
     * Show different cloning techniques
     * 
     * TIME COMPLEXITY: O(n) shallow, O(n*m) deep
     * SPACE COMPLEXITY: O(n) shallow, O(n*m) deep
     */
    
    console.log(`\n=== Object Cloning (deep: ${deep}) ===`);
    console.log("Original object:", obj);
    
    let clone;
    
    if (deep) {
        // Deep clone using JSON (limitations: no functions, dates become strings)
        console.log("Performing deep clone using JSON methods");
        clone = JSON.parse(JSON.stringify(obj));
        
        // Better deep clone function (recursive)
        function deepClone(source) {
            if (source === null || typeof source !== "object") {
                return source;
            }
            
            if (source instanceof Date) {
                return new Date(source.getTime());
            }
            
            if (Array.isArray(source)) {
                return source.map(item => deepClone(item));
            }
            
            const cloned = {};
            for (const key in source) {
                if (source.hasOwnProperty(key)) {
                    cloned[key] = deepClone(source[key]);
                }
            }
            return cloned;
        }
        
        clone = deepClone(obj);
    } else {
        // Shallow clone
        console.log("Performing shallow clone");
        
        // Method 1: Spread operator
        const spreadClone = { ...obj };
        console.log("Spread clone:", spreadClone);
        
        // Method 2: Object.assign
        const assignClone = Object.assign({}, obj);
        console.log("Object.assign clone:", assignClone);
        
        clone = spreadClone;
    }
    
    console.log("Cloned object:", clone);
    
    // Verify clone independence
    clone.testProperty = "modified";
    console.log("After modifying clone:");
    console.log("Original:", obj);
    console.log("Clone:", clone);
    
    return clone;
}

// Method 7: Working with Nested Objects
function nestedObjectOperations() {
    /**
     * APPROACH: Demonstrate operations on nested object structures
     * Show safe navigation and modification
     * 
     * TIME COMPLEXITY: O(depth) for access
     * SPACE COMPLEXITY: O(1)
     */
    
    console.log(`\n=== Nested Object Operations ===`);
    
    const nestedObj = {
        user: {
            name: "Alice",
            profile: {
                age: 25,
                address: {
                    street: "123 Main St",
                    city: "New York",
                    country: "USA"
                }
            },
            preferences: {
                theme: "dark",
                notifications: true
            }
        },
        settings: {
            language: "en",
            timezone: "UTC"
        }
    };
    
    console.log("Nested object:", JSON.stringify(nestedObj, null, 2));
    
    // Safe property access with optional chaining
    console.log("\nSafe property access:");
    console.log("User name:", nestedObj.user?.name);
    console.log("User age:", nestedObj.user?.profile?.age);
    console.log("User city:", nestedObj.user?.profile?.address?.city);
    console.log("Non-existent property:", nestedObj.user?.profile?.nonExistent?.property);
    
    // Modifying nested properties
    console.log("\nModifying nested properties:");
    const modified = JSON.parse(JSON.stringify(nestedObj)); // Deep clone
    modified.user.profile.age = 26;
    modified.user.profile.address.city = "Boston";
    console.log("Modified age:", modified.user.profile.age);
    console.log("Modified city:", modified.user.profile.address.city);
    
    // Adding new nested properties
    modified.user.profile.skills = ["JavaScript", "Python", "React"];
    console.log("Added skills:", modified.user.profile.skills);
    
    return { original: nestedObj, modified };
}

// Method 8: Object Utility Functions
function objectUtilities() {
    /**
     * APPROACH: Useful utility functions for object manipulation
     * Common patterns for object processing
     * 
     * TIME COMPLEXITY: Varies by operation
     * SPACE COMPLEXITY: Varies by operation
     */
    
    console.log(`\n=== Object Utilities ===`);
    
    const testObj = {
        name: "Alice",
        age: 25,
        city: "New York",
        country: "USA",
        active: true
    };
    
    // 1. Get object size (number of properties)
    function getObjectSize(obj) {
        return Object.keys(obj).length;
    }
    console.log("Object size:", getObjectSize(testObj));
    
    // 2. Check if object is empty
    function isEmpty(obj) {
        return Object.keys(obj).length === 0;
    }
    console.log("Is empty:", isEmpty(testObj));
    console.log("Is empty (empty object):", isEmpty({}));
    
    // 3. Filter object properties
    function filterObject(obj, predicate) {
        const filtered = {};
        for (const [key, value] of Object.entries(obj)) {
            if (predicate(key, value)) {
                filtered[key] = value;
            }
        }
        return filtered;
    }
    
    const stringProps = filterObject(testObj, (key, value) => typeof value === 'string');
    console.log("String properties only:", stringProps);
    
    // 4. Map object values
    function mapObjectValues(obj, mapper) {
        const mapped = {};
        for (const [key, value] of Object.entries(obj)) {
            mapped[key] = mapper(value, key);
        }
        return mapped;
    }
    
    const uppercased = mapObjectValues(stringProps, value => 
        typeof value === 'string' ? value.toUpperCase() : value
    );
    console.log("Uppercased string values:", uppercased);
    
    // 5. Merge objects
    function mergeObjects(...objects) {
        return Object.assign({}, ...objects);
    }
    
    const obj1 = { a: 1, b: 2 };
    const obj2 = { c: 3, d: 4 };
    const obj3 = { b: 5, e: 6 }; // b will override
    const merged = mergeObjects(obj1, obj2, obj3);
    console.log("Merged objects:", merged);
    
    return {
        size: getObjectSize(testObj),
        filtered: stringProps,
        mapped: uppercased,
        merged
    };
}

// Test all object operations
function testObjectBasics() {
    console.log("=== Testing Object Basics ===");
    
    // Test object creation
    const objects = createObjectExamples();
    
    // Test property access
    propertyAccess(objects.person1, "name");
    propertyAccess(objects.person1, "nonExistent");
    
    // Test object modification
    modifyObject(objects.person1, "email", "alice@example.com");
    
    // Test object iteration
    iterateObject(objects.person1);
    
    // Test object comparison
    const person1Copy = { name: "Alice", age: 25, city: "New York" };
    compareObjects(objects.person1, person1Copy);
    
    // Test object cloning
    cloneObject(objects.person1, false);
    cloneObject(objects.person1, true);
    
    // Test nested objects
    nestedObjectOperations();
    
    // Test utility functions
    objectUtilities();
}

// Educational explanations
function explainObjects() {
    console.log("\n=== Understanding Objects ===");
    
    console.log("🏗️ OBJECT CREATION:");
    console.log("• Object literal: {key: value} - most common");
    console.log("• Constructor function: new Function()");
    console.log("• Object.create(): create with specific prototype");
    console.log("• Class syntax: new Class() - modern approach");
    console.log();
    
    console.log("🔑 PROPERTY ACCESS:");
    console.log("• Dot notation: obj.property - static property names");
    console.log("• Bracket notation: obj['property'] - dynamic property names");
    console.log("• Optional chaining: obj?.property - safe access");
    console.log();
    
    console.log("🔄 ITERATION METHODS:");
    console.log("• for...in: iterates over enumerable properties");
    console.log("• Object.keys(): returns array of property names");
    console.log("• Object.values(): returns array of property values");
    console.log("• Object.entries(): returns array of [key, value] pairs");
    console.log();
    
    console.log("📊 COMPARISON:");
    console.log("• Reference comparison: obj1 === obj2 (usually false)");
    console.log("• Shallow comparison: compare each property");
    console.log("• Deep comparison: recursively compare nested objects");
    console.log();
    
    console.log("📋 CLONING:");
    console.log("• Shallow clone: {...obj} or Object.assign({}, obj)");
    console.log("• Deep clone: JSON.parse(JSON.stringify(obj)) - limitations");
    console.log("• Deep clone: recursive function - handles all types");
    console.log();
    
    console.log("🎯 BEST PRACTICES:");
    console.log("• Use const for objects that won't be reassigned");
    console.log("• Use optional chaining for safe property access");
    console.log("• Prefer Object.keys/values/entries over for...in");
    console.log("• Be careful with object mutation");
    console.log("• Understand reference vs value semantics");
}

// Run all demonstrations
testObjectBasics();
explainObjects();

/**
 * KEY CONCEPTS LEARNED:
 * 
 * 1. Object Creation: Multiple patterns for different use cases
 * 2. Property Access: Dot vs bracket notation, safe access
 * 3. Object Iteration: Various methods for processing properties
 * 4. Object Comparison: Reference vs shallow vs deep comparison
 * 5. Object Cloning: Shallow vs deep copying strategies
 * 
 * INTERVIEW DISCUSSION POINTS:
 * 
 * Q: "How do you create objects in JavaScript?"
 * A: "Object literals {}, constructor functions, Object.create(),
 *     class syntax, or factory functions. Choose based on needs."
 * 
 * Q: "What's the difference between dot and bracket notation?"
 * A: "Dot notation for static properties, bracket notation for
 *     dynamic properties or properties with special characters."
 * 
 * Q: "How do you clone an object?"
 * A: "Shallow: {...obj} or Object.assign(). Deep: recursive function
 *     or JSON.parse(JSON.stringify()) with limitations."
 * 
 * Q: "How do you iterate over object properties?"
 * A: "Object.keys/values/entries preferred. for...in includes
 *     inherited properties. Choose based on what you need."
 * 
 * OBJECT FUNDAMENTALS:
 * - Objects are reference types
 * - Properties can be added/deleted dynamically
 * - Property names are strings (or Symbols)
 * - Objects can have prototypes for inheritance
 * - Objects are mutable even when declared with const
 * 
 * RELATED CONCEPTS:
 * - Prototypal Inheritance
 * - Object-Oriented Programming
 * - JSON (JavaScript Object Notation)
 * - Map and Set data structures
 * - Object Destructuring
 * - Property Descriptors
 */

module.exports = {
    createObjectExamples,
    propertyAccess,
    modifyObject,
    iterateObject,
    compareObjects,
    cloneObject,
    nestedObjectOperations,
    objectUtilities
}; 