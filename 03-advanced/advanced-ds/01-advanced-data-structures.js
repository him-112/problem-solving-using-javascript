/**
 * PROBLEM: Advanced Data Structures
 * 
 * DESCRIPTION:
 * Specialized data structures for complex algorithmic problems.
 * Essential for competitive programming and advanced system design.
 * 
 * KEY CONCEPTS:
 * - Trie (Prefix Tree) for string operations
 * - Segment Tree for range queries
 * - Fenwick Tree (Binary Indexed Tree) for prefix sums
 * - Disjoint Set Union (Union-Find) for connectivity
 * - LRU Cache for caching strategies
 * 
 * EXAMPLES:
 * Auto-complete, Range sum queries, Dynamic connectivity
 */

// Data Structure 1: Trie (Prefix Tree)
class Trie {
    /**
     * APPROACH: Tree where each node represents a character
     * Efficient for prefix-based operations
     * 
     * OPERATIONS:
     * - Insert: O(m) where m is key length
     * - Search: O(m)
     * - StartsWith: O(m)
     * - Space: O(ALPHABET_SIZE * N * M)
     */
    
    constructor() {
        this.root = {};
        console.log("Trie initialized");
    }
    
    insert(word) {
        console.log(`Inserting "${word}" into Trie`);
        let node = this.root;
        
        for (let i = 0; i < word.length; i++) {
            const char = word[i];
            if (!node[char]) {
                node[char] = {};
                console.log(`  Created new node for '${char}' at level ${i}`);
            }
            node = node[char];
        }
        
        node.isEndOfWord = true;
        console.log(`  Marked end of word for "${word}"`);
    }
    
    search(word) {
        console.log(`Searching for "${word}" in Trie`);
        let node = this.root;
        
        for (let i = 0; i < word.length; i++) {
            const char = word[i];
            if (!node[char]) {
                console.log(`  Character '${char}' not found at level ${i}`);
                return false;
            }
            node = node[char];
            console.log(`  Found '${char}' at level ${i}`);
        }
        
        const found = Boolean(node.isEndOfWord);
        console.log(`  Word "${word}" ${found ? 'found' : 'not found (prefix exists)'}`);
        return found;
    }
    
    startsWith(prefix) {
        console.log(`Checking if any word starts with "${prefix}"`);
        let node = this.root;
        
        for (let i = 0; i < prefix.length; i++) {
            const char = prefix[i];
            if (!node[char]) {
                console.log(`  Prefix "${prefix}" not found`);
                return false;
            }
            node = node[char];
        }
        
        console.log(`  Prefix "${prefix}" exists`);
        return true;
    }
    
    getAllWordsWithPrefix(prefix) {
        console.log(`Getting all words with prefix "${prefix}"`);
        let node = this.root;
        
        // Navigate to prefix
        for (const char of prefix) {
            if (!node[char]) {
                console.log(`  Prefix "${prefix}" not found`);
                return [];
            }
            node = node[char];
        }
        
        // DFS to find all words
        const words = [];
        
        function dfs(currentNode, currentWord) {
            if (currentNode.isEndOfWord) {
                words.push(currentWord);
                console.log(`    Found word: "${currentWord}"`);
            }
            
            for (const char in currentNode) {
                if (char !== 'isEndOfWord') {
                    dfs(currentNode[char], currentWord + char);
                }
            }
        }
        
        dfs(node, prefix);
        console.log(`  Found ${words.length} words with prefix "${prefix}"`);
        return words;
    }
}

// Data Structure 2: Segment Tree
class SegmentTree {
    /**
     * APPROACH: Binary tree for range queries and updates
     * Each node stores information about a range
     * 
     * OPERATIONS:
     * - Build: O(n)
     * - Query: O(log n)
     * - Update: O(log n)
     * - Space: O(4n)
     */
    
    constructor(arr) {
        this.n = arr.length;
        this.tree = new Array(4 * this.n);
        this.build(arr, 0, 0, this.n - 1);
        console.log(`Segment Tree built for array [${arr.join(',')}]`);
    }
    
    build(arr, node, start, end) {
        if (start === end) {
            // Leaf node
            this.tree[node] = arr[start];
            console.log(`  Leaf node ${node}: tree[${node}] = ${arr[start]} (index ${start})`);
        } else {
            const mid = Math.floor((start + end) / 2);
            const leftChild = 2 * node + 1;
            const rightChild = 2 * node + 2;
            
            // Build left and right subtrees
            this.build(arr, leftChild, start, mid);
            this.build(arr, rightChild, mid + 1, end);
            
            // Internal node stores sum of children
            this.tree[node] = this.tree[leftChild] + this.tree[rightChild];
            console.log(`  Internal node ${node}: tree[${node}] = ${this.tree[leftChild]} + ${this.tree[rightChild]} = ${this.tree[node]} (range ${start}-${end})`);
        }
    }
    
    rangeQuery(left, right) {
        console.log(`Range query: sum(${left}, ${right})`);
        const result = this._query(0, 0, this.n - 1, left, right);
        console.log(`  Result: ${result}`);
        return result;
    }
    
    _query(node, start, end, left, right) {
        console.log(`    _query(node=${node}, range=${start}-${end}, query=${left}-${right})`);
        
        // No overlap
        if (right < start || end < left) {
            console.log(`      No overlap, returning 0`);
            return 0;
        }
        
        // Complete overlap
        if (left <= start && end <= right) {
            console.log(`      Complete overlap, returning ${this.tree[node]}`);
            return this.tree[node];
        }
        
        // Partial overlap
        const mid = Math.floor((start + end) / 2);
        const leftSum = this._query(2 * node + 1, start, mid, left, right);
        const rightSum = this._query(2 * node + 2, mid + 1, end, left, right);
        
        console.log(`      Partial overlap: ${leftSum} + ${rightSum} = ${leftSum + rightSum}`);
        return leftSum + rightSum;
    }
    
    update(index, value) {
        console.log(`Updating index ${index} to value ${value}`);
        this._update(0, 0, this.n - 1, index, value);
    }
    
    _update(node, start, end, index, value) {
        console.log(`    _update(node=${node}, range=${start}-${end}, index=${index}, value=${value})`);
        
        if (start === end) {
            // Leaf node
            const oldValue = this.tree[node];
            this.tree[node] = value;
            console.log(`      Updated leaf: ${oldValue} -> ${value}`);
        } else {
            const mid = Math.floor((start + end) / 2);
            
            if (index <= mid) {
                this._update(2 * node + 1, start, mid, index, value);
            } else {
                this._update(2 * node + 2, mid + 1, end, index, value);
            }
            
            // Update internal node
            const oldValue = this.tree[node];
            this.tree[node] = this.tree[2 * node + 1] + this.tree[2 * node + 2];
            console.log(`      Updated internal: ${oldValue} -> ${this.tree[node]}`);
        }
    }
}

// Data Structure 3: Fenwick Tree (Binary Indexed Tree)
class FenwickTree {
    /**
     * APPROACH: Tree structure using binary representation
     * Efficient for prefix sum queries and updates
     * 
     * OPERATIONS:
     * - Update: O(log n)
     * - Prefix Sum: O(log n)
     * - Range Sum: O(log n)
     * - Space: O(n)
     */
    
    constructor(size) {
        this.size = size;
        this.tree = new Array(size + 1).fill(0);
        console.log(`Fenwick Tree initialized with size ${size}`);
    }
    
    update(index, delta) {
        console.log(`Updating index ${index} with delta ${delta}`);
        index++; // Convert to 1-indexed
        
        while (index <= this.size) {
            const oldValue = this.tree[index];
            this.tree[index] += delta;
            console.log(`  tree[${index}]: ${oldValue} + ${delta} = ${this.tree[index]}`);
            
            index += index & (-index); // Add LSB
            console.log(`  Next index: ${index}`);
        }
    }
    
    prefixSum(index) {
        console.log(`Computing prefix sum up to index ${index}`);
        index++; // Convert to 1-indexed
        let sum = 0;
        
        while (index > 0) {
            sum += this.tree[index];
            console.log(`  tree[${index}] = ${this.tree[index]}, sum = ${sum}`);
            
            index -= index & (-index); // Subtract LSB
            console.log(`  Next index: ${index}`);
        }
        
        console.log(`  Prefix sum: ${sum}`);
        return sum;
    }
    
    rangeSum(left, right) {
        console.log(`Computing range sum [${left}, ${right}]`);
        const result = this.prefixSum(right) - (left > 0 ? this.prefixSum(left - 1) : 0);
        console.log(`  Range sum: ${result}`);
        return result;
    }
}

// Data Structure 4: Disjoint Set Union (Union-Find)
class DisjointSetUnion {
    /**
     * APPROACH: Forest of trees representing disjoint sets
     * Efficient for dynamic connectivity problems
     * 
     * OPERATIONS:
     * - Find: O(α(n)) where α is inverse Ackermann
     * - Union: O(α(n))
     * - Space: O(n)
     */
    
    constructor(size) {
        this.parent = Array.from({ length: size }, (_, i) => i);
        this.rank = new Array(size).fill(0);
        this.size = size;
        console.log(`Disjoint Set Union initialized with ${size} elements`);
    }
    
    find(x) {
        console.log(`Finding root of ${x}`);
        if (this.parent[x] !== x) {
            const oldParent = this.parent[x];
            this.parent[x] = this.find(this.parent[x]); // Path compression
            console.log(`  Path compression: parent[${x}] = ${oldParent} -> ${this.parent[x]}`);
        } else {
            console.log(`  ${x} is root`);
        }
        return this.parent[x];
    }
    
    union(x, y) {
        console.log(`Union of ${x} and ${y}`);
        const rootX = this.find(x);
        const rootY = this.find(y);
        
        if (rootX === rootY) {
            console.log(`  Already in same set (root: ${rootX})`);
            return false;
        }
        
        // Union by rank
        if (this.rank[rootX] < this.rank[rootY]) {
            this.parent[rootX] = rootY;
            console.log(`  Attached ${rootX} to ${rootY} (rank ${this.rank[rootX]} < ${this.rank[rootY]})`);
        } else if (this.rank[rootX] > this.rank[rootY]) {
            this.parent[rootY] = rootX;
            console.log(`  Attached ${rootY} to ${rootX} (rank ${this.rank[rootY]} < ${this.rank[rootX]})`);
        } else {
            this.parent[rootY] = rootX;
            this.rank[rootX]++;
            console.log(`  Attached ${rootY} to ${rootX} and increased rank to ${this.rank[rootX]}`);
        }
        
        return true;
    }
    
    connected(x, y) {
        const result = this.find(x) === this.find(y);
        console.log(`Are ${x} and ${y} connected? ${result}`);
        return result;
    }
    
    getComponents() {
        const components = {};
        for (let i = 0; i < this.size; i++) {
            const root = this.find(i);
            if (!components[root]) {
                components[root] = [];
            }
            components[root].push(i);
        }
        
        console.log("Connected components:");
        Object.entries(components).forEach(([root, members]) => {
            console.log(`  Component ${root}: [${members.join(', ')}]`);
        });
        
        return Object.values(components);
    }
}

// Data Structure 5: LRU Cache
class LRUCache {
    /**
     * APPROACH: Hash map + doubly linked list
     * Hash map for O(1) access, linked list for O(1) insertion/deletion
     * 
     * OPERATIONS:
     * - Get: O(1)
     * - Put: O(1)
     * - Space: O(capacity)
     */
    
    constructor(capacity) {
        this.capacity = capacity;
        this.cache = new Map();
        
        // Create dummy head and tail nodes
        this.head = { key: -1, value: -1, prev: null, next: null };
        this.tail = { key: -1, value: -1, prev: null, next: null };
        this.head.next = this.tail;
        this.tail.prev = this.head;
        
        console.log(`LRU Cache initialized with capacity ${capacity}`);
    }
    
    get(key) {
        console.log(`Getting key ${key}`);
        
        if (this.cache.has(key)) {
            const node = this.cache.get(key);
            console.log(`  Found: ${key} -> ${node.value}`);
            
            // Move to front (most recently used)
            this._moveToFront(node);
            console.log(`  Moved ${key} to front`);
            
            return node.value;
        }
        
        console.log(`  Key ${key} not found`);
        return -1;
    }
    
    put(key, value) {
        console.log(`Putting key ${key} -> ${value}`);
        
        if (this.cache.has(key)) {
            // Update existing key
            const node = this.cache.get(key);
            node.value = value;
            console.log(`  Updated existing key ${key}`);
            
            this._moveToFront(node);
            console.log(`  Moved ${key} to front`);
        } else {
            // Add new key
            if (this.cache.size >= this.capacity) {
                // Remove least recently used (tail.prev)
                const lru = this.tail.prev;
                this._removeNode(lru);
                this.cache.delete(lru.key);
                console.log(`  Evicted LRU key: ${lru.key}`);
            }
            
            // Create new node and add to front
            const newNode = { key, value, prev: null, next: null };
            this.cache.set(key, newNode);
            this._addToFront(newNode);
            console.log(`  Added new key ${key} to front`);
        }
        
        console.log(`  Cache size: ${this.cache.size}/${this.capacity}`);
    }
    
    _moveToFront(node) {
        this._removeNode(node);
        this._addToFront(node);
    }
    
    _removeNode(node) {
        node.prev.next = node.next;
        node.next.prev = node.prev;
    }
    
    _addToFront(node) {
        node.prev = this.head;
        node.next = this.head.next;
        this.head.next.prev = node;
        this.head.next = node;
    }
    
    display() {
        const items = [];
        let current = this.head.next;
        while (current !== this.tail) {
            items.push(`${current.key}:${current.value}`);
            current = current.next;
        }
        console.log(`  Cache contents (MRU to LRU): [${items.join(', ')}]`);
    }
}

// Test all advanced data structures
function testAdvancedDataStructures() {
    console.log("=== Testing Advanced Data Structures ===");
    
    // Test Trie
    console.log("\n--- Trie (Prefix Tree) ---");
    const trie = new Trie();
    const words = ["apple", "app", "application", "apply", "banana"];
    
    words.forEach(word => trie.insert(word));
    
    console.log("\nSearching words:");
    ["app", "apple", "appl", "banana", "ban"].forEach(word => {
        trie.search(word);
    });
    
    console.log("\nChecking prefixes:");
    ["app", "ban", "cat"].forEach(prefix => {
        trie.startsWith(prefix);
    });
    
    console.log("\nAuto-complete for 'app':");
    trie.getAllWordsWithPrefix("app");
    
    // Test Segment Tree
    console.log("\n--- Segment Tree ---");
    const arr = [1, 3, 5, 7, 9, 11];
    const segTree = new SegmentTree(arr);
    
    console.log("\nRange queries:");
    segTree.rangeQuery(1, 3); // Sum of elements from index 1 to 3
    segTree.rangeQuery(2, 5); // Sum of elements from index 2 to 5
    
    console.log("\nUpdating and querying:");
    segTree.update(1, 10);
    segTree.rangeQuery(1, 3);
    
    // Test Fenwick Tree
    console.log("\n--- Fenwick Tree ---");
    const fenwick = new FenwickTree(6);
    
    console.log("\nBuilding tree with updates:");
    [1, 3, 5, 7, 9, 11].forEach((val, i) => {
        fenwick.update(i, val);
    });
    
    console.log("\nPrefix sum queries:");
    fenwick.prefixSum(3); // Sum of first 4 elements
    fenwick.rangeSum(1, 3); // Sum from index 1 to 3
    
    // Test Disjoint Set Union
    console.log("\n--- Disjoint Set Union ---");
    const dsu = new DisjointSetUnion(6);
    
    console.log("\nPerforming unions:");
    dsu.union(0, 1);
    dsu.union(1, 2);
    dsu.union(3, 4);
    
    console.log("\nConnectivity queries:");
    dsu.connected(0, 2);
    dsu.connected(0, 3);
    
    dsu.getComponents();
    
    // Test LRU Cache
    console.log("\n--- LRU Cache ---");
    const lru = new LRUCache(3);
    
    console.log("\nCache operations:");
    lru.put(1, "one");
    lru.display();
    
    lru.put(2, "two");
    lru.display();
    
    lru.put(3, "three");
    lru.display();
    
    lru.get(1); // Access key 1 (move to front)
    lru.display();
    
    lru.put(4, "four"); // Should evict key 2
    lru.display();
}

// Performance analysis
function performanceAnalysis() {
    console.log("\n=== Performance Analysis ===");
    
    // Trie vs Array search
    console.log("\n--- Trie vs Array Search ---");
    const words = Array.from({ length: 1000 }, (_, i) => `word${i}`);
    const trie = new Trie();
    
    // Build trie
    let start = performance.now();
    words.forEach(word => trie.insert(word));
    let end = performance.now();
    console.log(`Trie construction: ${(end - start).toFixed(2)}ms`);
    
    // Trie search
    start = performance.now();
    trie.search("word500");
    end = performance.now();
    console.log(`Trie search: ${(end - start).toFixed(4)}ms`);
    
    // Array search
    start = performance.now();
    words.includes("word500");
    end = performance.now();
    console.log(`Array search: ${(end - start).toFixed(4)}ms`);
    
    // Segment Tree vs naive range sum
    console.log("\n--- Segment Tree vs Naive Range Sum ---");
    const largeArr = Array.from({ length: 10000 }, (_, i) => i + 1);
    
    // Build segment tree
    start = performance.now();
    const segTree = new SegmentTree(largeArr);
    end = performance.now();
    console.log(`Segment Tree build: ${(end - start).toFixed(2)}ms`);
    
    // Segment tree query
    start = performance.now();
    segTree.rangeQuery(1000, 2000);
    end = performance.now();
    console.log(`Segment Tree query: ${(end - start).toFixed(4)}ms`);
    
    // Naive range sum
    start = performance.now();
    let sum = 0;
    for (let i = 1000; i <= 2000; i++) {
        sum += largeArr[i];
    }
    end = performance.now();
    console.log(`Naive range sum: ${(end - start).toFixed(4)}ms`);
}

// Educational explanations
function explainAdvancedDataStructures() {
    console.log("\n=== Understanding Advanced Data Structures ===");
    
    console.log("🌳 TRIE (PREFIX TREE):");
    console.log("• Tree where each node represents a character");
    console.log("• Efficient for prefix-based operations");
    console.log("• Applications: Auto-complete, spell checkers, IP routing");
    console.log("• Time: O(m) for operations, Space: O(ALPHABET_SIZE * N * M)");
    console.log();
    
    console.log("📊 SEGMENT TREE:");
    console.log("• Binary tree for range queries and updates");
    console.log("• Each node stores information about a range");
    console.log("• Applications: Range sum/min/max queries, lazy propagation");
    console.log("• Time: O(log n) for query/update, Space: O(4n)");
    console.log();
    
    console.log("🔢 FENWICK TREE (BIT):");
    console.log("• Compact representation using binary indexing");
    console.log("• Efficient for prefix sum queries and updates");
    console.log("• Applications: Frequency counting, inversion counting");
    console.log("• Time: O(log n) for operations, Space: O(n)");
    console.log();
    
    console.log("🔗 DISJOINT SET UNION:");
    console.log("• Forest of trees representing disjoint sets");
    console.log("• Efficient for dynamic connectivity problems");
    console.log("• Applications: Kruskal's MST, network connectivity");
    console.log("• Time: O(α(n)) amortized, Space: O(n)");
    console.log();
    
    console.log("💾 LRU CACHE:");
    console.log("• Hash map + doubly linked list combination");
    console.log("• Constant time access and eviction");
    console.log("• Applications: CPU caches, web caches, database buffers");
    console.log("• Time: O(1) for all operations, Space: O(capacity)");
    console.log();
    
    console.log("🎯 CHOOSING THE RIGHT DATA STRUCTURE:");
    console.log("• Trie: String prefix operations, dictionary lookups");
    console.log("• Segment Tree: Range queries with updates, 2D problems");
    console.log("• Fenwick Tree: Simple range sum queries, competitive programming");
    console.log("• DSU: Dynamic connectivity, graph algorithms");
    console.log("• LRU Cache: Memory management, caching systems");
    console.log();
    
    console.log("⚡ OPTIMIZATION TECHNIQUES:");
    console.log("1. Path compression in DSU for better amortized complexity");
    console.log("2. Lazy propagation in Segment Tree for range updates");
    console.log("3. Coordinate compression for large value ranges");
    console.log("4. Persistent data structures for historical queries");
    console.log();
    
    console.log("🚀 INTERVIEW TIPS:");
    console.log("• Understand the trade-offs between different data structures");
    console.log("• Practice implementing from scratch, not just using libraries");
    console.log("• Know when to use each data structure based on operations needed");
    console.log("• Consider memory constraints and cache-friendly implementations");
}

// Run all demonstrations
testAdvancedDataStructures();
performanceAnalysis();
explainAdvancedDataStructures();

/**
 * KEY CONCEPTS LEARNED:
 * 
 * 1. Trie: Efficient prefix-based string operations
 * 2. Segment Tree: Range queries and updates in logarithmic time
 * 3. Fenwick Tree: Compact range sum queries with binary indexing
 * 4. Disjoint Set Union: Dynamic connectivity with path compression
 * 5. LRU Cache: Constant time cache operations with hash map + linked list
 * 
 * INTERVIEW DISCUSSION POINTS:
 * 
 * Q: "When would you use a Trie vs HashMap?"
 * A: "Trie for prefix operations, auto-complete, pattern matching.
 *     HashMap for exact key lookups. Trie uses more memory but supports prefixes."
 * 
 * Q: "Explain Segment Tree vs Fenwick Tree"
 * A: "Segment Tree more versatile (min/max/sum), Fenwick Tree more compact.
 *     Both O(log n) queries, Segment Tree uses more memory but handles more operations."
 * 
 * Q: "How does Union-Find achieve near-constant time?"
 * A: "Path compression flattens trees, union by rank keeps trees balanced.
 *     Amortized complexity is O(α(n)) where α is inverse Ackermann function."
 * 
 * Q: "Design an LRU Cache"
 * A: "Hash map for O(1) access + doubly linked list for O(1) insertion/deletion.
 *     Move accessed items to front, evict from back when capacity exceeded."
 * 
 * Q: "What are the space-time trade-offs?"
 * A: "These structures use extra memory for faster operations.
 *     Segment Tree: 4n space for O(log n) queries vs O(n) naive approach."
 * 
 * COMPLEXITY SUMMARY:
 * - Trie: O(m) operations, O(ALPHABET_SIZE * N * M) space
 * - Segment Tree: O(log n) query/update, O(4n) space
 * - Fenwick Tree: O(log n) operations, O(n) space
 * - DSU: O(α(n)) amortized, O(n) space
 * - LRU Cache: O(1) all operations, O(capacity) space
 * 
 * RELATED CONCEPTS:
 * - Tree Algorithms
 * - Hash Tables
 * - Linked Lists
 * - Binary Indexing
 * - Amortized Analysis
 * - Cache Replacement Policies
 */

module.exports = {
    Trie,
    SegmentTree,
    FenwickTree,
    DisjointSetUnion,
    LRUCache
}; 