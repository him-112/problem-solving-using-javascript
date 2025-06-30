/**
 * PROBLEM: Greedy Algorithms
 * 
 * DESCRIPTION:
 * Algorithms that make locally optimal choices at each step.
 * Essential for optimization problems where greedy approach works.
 * 
 * KEY CONCEPTS:
 * - Greedy choice property
 * - Optimal substructure
 * - Activity selection problems
 * - Scheduling and interval problems
 * - Minimum spanning trees
 * - Huffman coding
 * 
 * EXAMPLES:
 * Activity Selection, Coin Change, Fractional Knapsack
 */

// Method 1: Activity Selection Problem
function activitySelection(activities) {
    /**
     * APPROACH: Sort by finish time, greedily select non-overlapping activities
     * Choose activity that finishes earliest and doesn't conflict
     * 
     * TIME COMPLEXITY: O(n log n) - sorting
     * SPACE COMPLEXITY: O(1)
     */
    
    console.log("activitySelection called with:");
    activities.forEach((activity, i) => {
        console.log(`  Activity ${i}: start=${activity.start}, finish=${activity.finish}, name="${activity.name}"`);
    });
    
    // Sort by finish time
    const sorted = [...activities].sort((a, b) => a.finish - b.finish);
    console.log("\nSorted by finish time:");
    sorted.forEach((activity, i) => {
        console.log(`  ${i}: ${activity.name} (${activity.start}-${activity.finish})`);
    });
    
    const selected = [];
    let lastFinish = -1;
    
    for (let i = 0; i < sorted.length; i++) {
        const activity = sorted[i];
        console.log(`\nConsidering ${activity.name} (${activity.start}-${activity.finish})`);
        
        if (activity.start >= lastFinish) {
            selected.push(activity);
            lastFinish = activity.finish;
            console.log(`  ✓ Selected! Last finish time: ${lastFinish}`);
        } else {
            console.log(`  ✗ Conflicts with previous activity (starts at ${activity.start}, last finished at ${lastFinish})`);
        }
    }
    
    console.log(`\nSelected ${selected.length} activities:`);
    selected.forEach((activity, i) => {
        console.log(`  ${i + 1}: ${activity.name} (${activity.start}-${activity.finish})`);
    });
    
    return selected;
}

// Method 2: Fractional Knapsack
function fractionalKnapsack(items, capacity) {
    /**
     * APPROACH: Sort by value-to-weight ratio, take items greedily
     * Can take fractions of items (unlike 0/1 knapsack)
     * 
     * TIME COMPLEXITY: O(n log n)
     * SPACE COMPLEXITY: O(1)
     */
    
    console.log(`fractionalKnapsack called with capacity: ${capacity}`);
    console.log("Items:");
    items.forEach((item, i) => {
        console.log(`  ${i}: ${item.name} - weight: ${item.weight}, value: ${item.value}, ratio: ${(item.value/item.weight).toFixed(2)}`);
    });
    
    // Sort by value-to-weight ratio (descending)
    const sorted = [...items].sort((a, b) => (b.value / b.weight) - (a.value / a.weight));
    console.log("\nSorted by value-to-weight ratio:");
    sorted.forEach((item, i) => {
        console.log(`  ${i}: ${item.name} - ratio: ${(item.value/item.weight).toFixed(2)}`);
    });
    
    let totalValue = 0;
    let remainingCapacity = capacity;
    const solution = [];
    
    for (const item of sorted) {
        console.log(`\nConsidering ${item.name}:`);
        console.log(`  Weight: ${item.weight}, Value: ${item.value}, Remaining capacity: ${remainingCapacity}`);
        
        if (remainingCapacity === 0) {
            console.log(`  Knapsack full, stopping`);
            break;
        }
        
        if (item.weight <= remainingCapacity) {
            // Take whole item
            solution.push({ ...item, fraction: 1 });
            totalValue += item.value;
            remainingCapacity -= item.weight;
            console.log(`  ✓ Took whole item. Value added: ${item.value}, Remaining capacity: ${remainingCapacity}`);
        } else {
            // Take fraction of item
            const fraction = remainingCapacity / item.weight;
            const fractionalValue = item.value * fraction;
            solution.push({ ...item, fraction: fraction });
            totalValue += fractionalValue;
            remainingCapacity = 0;
            console.log(`  ✓ Took ${(fraction * 100).toFixed(1)}% of item. Value added: ${fractionalValue.toFixed(2)}`);
        }
    }
    
    console.log(`\nOptimal solution (Total value: ${totalValue.toFixed(2)}):`);
    solution.forEach((item, i) => {
        const percentage = (item.fraction * 100).toFixed(1);
        console.log(`  ${i + 1}: ${percentage}% of ${item.name} (value: ${(item.value * item.fraction).toFixed(2)})`);
    });
    
    return { solution, totalValue };
}

// Method 3: Huffman Coding
function huffmanCoding(text) {
    /**
     * APPROACH: Build optimal prefix-free encoding based on character frequency
     * Create binary tree where frequent chars have shorter codes
     * 
     * TIME COMPLEXITY: O(n log n)
     * SPACE COMPLEXITY: O(n)
     */
    
    console.log(`huffmanCoding called with text: "${text}"`);
    
    // Count character frequencies
    const freq = {};
    for (const char of text) {
        freq[char] = (freq[char] || 0) + 1;
    }
    
    console.log("Character frequencies:");
    Object.entries(freq).forEach(([char, count]) => {
        console.log(`  '${char}': ${count}`);
    });
    
    // Create priority queue (min-heap) of nodes
    class Node {
        constructor(char, freq, left = null, right = null) {
            this.char = char;
            this.freq = freq;
            this.left = left;
            this.right = right;
        }
        
        isLeaf() {
            return !this.left && !this.right;
        }
    }
    
    // Create initial nodes
    const heap = Object.entries(freq).map(([char, freq]) => new Node(char, freq));
    heap.sort((a, b) => a.freq - b.freq);
    
    console.log("\nBuilding Huffman tree:");
    
    // Build Huffman tree
    while (heap.length > 1) {
        const left = heap.shift();
        const right = heap.shift();
        
        const merged = new Node(null, left.freq + right.freq, left, right);
        console.log(`  Merged '${left.char || 'internal'}' (${left.freq}) + '${right.char || 'internal'}' (${right.freq}) = ${merged.freq}`);
        
        // Insert back in sorted order
        let inserted = false;
        for (let i = 0; i < heap.length; i++) {
            if (merged.freq <= heap[i].freq) {
                heap.splice(i, 0, merged);
                inserted = true;
                break;
            }
        }
        if (!inserted) heap.push(merged);
    }
    
    const root = heap[0];
    
    // Generate codes
    const codes = {};
    
    function generateCodes(node, code = '') {
        if (node.isLeaf()) {
            codes[node.char] = code || '0'; // Handle single character case
            console.log(`  Code for '${node.char}': ${codes[node.char]}`);
            return;
        }
        
        if (node.left) generateCodes(node.left, code + '0');
        if (node.right) generateCodes(node.right, code + '1');
    }
    
    console.log("\nGenerated Huffman codes:");
    generateCodes(root);
    
    // Encode text
    const encoded = text.split('').map(char => codes[char]).join('');
    console.log(`\nOriginal text: "${text}" (${text.length} chars, ${text.length * 8} bits)`);
    console.log(`Encoded: "${encoded}" (${encoded.length} bits)`);
    console.log(`Compression ratio: ${((text.length * 8 - encoded.length) / (text.length * 8) * 100).toFixed(1)}%`);
    
    return { codes, encoded, root };
}

// Method 4: Coin Change (Greedy - works for standard coin systems)
function coinChangeGreedy(coins, amount) {
    /**
     * APPROACH: Use largest denomination first, then next largest, etc.
     * Works for standard coin systems (e.g., US coins)
     * 
     * TIME COMPLEXITY: O(n) where n is number of coin types
     * SPACE COMPLEXITY: O(1)
     */
    
    console.log(`coinChangeGreedy([${coins.join(',')}], ${amount}) called`);
    
    // Sort coins in descending order
    const sortedCoins = [...coins].sort((a, b) => b - a);
    console.log(`Sorted coins: [${sortedCoins.join(',')}]`);
    
    const result = [];
    let remaining = amount;
    
    for (const coin of sortedCoins) {
        if (remaining === 0) break;
        
        const count = Math.floor(remaining / coin);
        if (count > 0) {
            result.push({ coin, count });
            remaining -= coin * count;
            console.log(`  Use ${count} × ${coin} = ${coin * count}, remaining: ${remaining}`);
        }
    }
    
    if (remaining > 0) {
        console.log(`  Cannot make exact change, remaining: ${remaining}`);
        return null;
    }
    
    const totalCoins = result.reduce((sum, { count }) => sum + count, 0);
    console.log(`\nOptimal solution (${totalCoins} coins):`);
    result.forEach(({ coin, count }) => {
        console.log(`  ${count} × ${coin}`);
    });
    
    return result;
}

// Method 5: Job Scheduling (Maximize Profit)
function jobScheduling(jobs) {
    /**
     * APPROACH: Sort by profit, select jobs greedily within deadlines
     * Use slot-based approach to track available time slots
     * 
     * TIME COMPLEXITY: O(n²)
     * SPACE COMPLEXITY: O(n)
     */
    
    console.log("jobScheduling called with jobs:");
    jobs.forEach((job, i) => {
        console.log(`  Job ${i}: ${job.name} - profit: ${job.profit}, deadline: ${job.deadline}`);
    });
    
    // Sort by profit (descending)
    const sortedJobs = [...jobs].sort((a, b) => b.profit - a.profit);
    console.log("\nSorted by profit:");
    sortedJobs.forEach((job, i) => {
        console.log(`  ${i}: ${job.name} - profit: ${job.profit}, deadline: ${job.deadline}`);
    });
    
    // Find maximum deadline
    const maxDeadline = Math.max(...jobs.map(job => job.deadline));
    console.log(`\nMaximum deadline: ${maxDeadline}`);
    
    // Initialize time slots
    const slots = new Array(maxDeadline).fill(null);
    const selectedJobs = [];
    let totalProfit = 0;
    
    for (const job of sortedJobs) {
        console.log(`\nConsidering ${job.name} (profit: ${job.profit}, deadline: ${job.deadline})`);
        
        // Find latest available slot before deadline
        for (let slot = job.deadline - 1; slot >= 0; slot--) {
            if (slots[slot] === null) {
                slots[slot] = job;
                selectedJobs.push(job);
                totalProfit += job.profit;
                console.log(`  ✓ Scheduled in slot ${slot + 1}. Total profit: ${totalProfit}`);
                break;
            }
        }
        
        if (!selectedJobs.includes(job)) {
            console.log(`  ✗ No available slot found`);
        }
    }
    
    console.log(`\nOptimal schedule (Total profit: ${totalProfit}):`);
    slots.forEach((job, i) => {
        if (job) {
            console.log(`  Slot ${i + 1}: ${job.name} (profit: ${job.profit})`);
        }
    });
    
    return { selectedJobs, totalProfit, schedule: slots };
}

// Method 6: Minimum Spanning Tree (Kruskal's Algorithm)
function kruskalMST(edges, vertices) {
    /**
     * APPROACH: Sort edges by weight, add edges that don't create cycles
     * Use Union-Find to detect cycles efficiently
     * 
     * TIME COMPLEXITY: O(E log E)
     * SPACE COMPLEXITY: O(V)
     */
    
    console.log(`kruskalMST called with ${vertices} vertices and edges:`);
    edges.forEach((edge, i) => {
        console.log(`  Edge ${i}: ${edge.from} -- ${edge.to} (weight: ${edge.weight})`);
    });
    
    // Sort edges by weight
    const sortedEdges = [...edges].sort((a, b) => a.weight - b.weight);
    console.log("\nSorted edges by weight:");
    sortedEdges.forEach((edge, i) => {
        console.log(`  ${i}: ${edge.from} -- ${edge.to} (${edge.weight})`);
    });
    
    // Union-Find data structure
    class UnionFind {
        constructor(n) {
            this.parent = Array.from({ length: n }, (_, i) => i);
            this.rank = new Array(n).fill(0);
        }
        
        find(x) {
            if (this.parent[x] !== x) {
                this.parent[x] = this.find(this.parent[x]); // Path compression
            }
            return this.parent[x];
        }
        
        union(x, y) {
            const rootX = this.find(x);
            const rootY = this.find(y);
            
            if (rootX === rootY) return false; // Already connected
            
            // Union by rank
            if (this.rank[rootX] < this.rank[rootY]) {
                this.parent[rootX] = rootY;
            } else if (this.rank[rootX] > this.rank[rootY]) {
                this.parent[rootY] = rootX;
            } else {
                this.parent[rootY] = rootX;
                this.rank[rootX]++;
            }
            return true;
        }
    }
    
    const uf = new UnionFind(vertices);
    const mst = [];
    let totalWeight = 0;
    
    console.log("\nBuilding MST:");
    
    for (const edge of sortedEdges) {
        console.log(`\nConsidering edge ${edge.from} -- ${edge.to} (${edge.weight})`);
        
        if (uf.union(edge.from, edge.to)) {
            mst.push(edge);
            totalWeight += edge.weight;
            console.log(`  ✓ Added to MST. Total weight: ${totalWeight}`);
        } else {
            console.log(`  ✗ Would create cycle, skipped`);
        }
        
        // Stop when we have V-1 edges
        if (mst.length === vertices - 1) {
            console.log(`  MST complete with ${mst.length} edges`);
            break;
        }
    }
    
    console.log(`\nMinimum Spanning Tree (Total weight: ${totalWeight}):`);
    mst.forEach((edge, i) => {
        console.log(`  ${i + 1}: ${edge.from} -- ${edge.to} (${edge.weight})`);
    });
    
    return { mst, totalWeight };
}

// Test all greedy algorithms
function testGreedyAlgorithms() {
    console.log("=== Testing Greedy Algorithms ===");
    
    // Test Activity Selection
    console.log("\n--- Activity Selection Problem ---");
    const activities = [
        { name: "Meeting A", start: 1, finish: 4 },
        { name: "Meeting B", start: 3, finish: 5 },
        { name: "Meeting C", start: 0, finish: 6 },
        { name: "Meeting D", start: 5, finish: 7 },
        { name: "Meeting E", start: 8, finish: 9 },
        { name: "Meeting F", start: 5, finish: 9 }
    ];
    activitySelection(activities);
    
    // Test Fractional Knapsack
    console.log("\n--- Fractional Knapsack ---");
    const items = [
        { name: "Gold", weight: 10, value: 60 },
        { name: "Silver", weight: 20, value: 100 },
        { name: "Diamond", weight: 30, value: 120 }
    ];
    fractionalKnapsack(items, 50);
    
    // Test Huffman Coding
    console.log("\n--- Huffman Coding ---");
    huffmanCoding("ABRACADABRA");
    
    // Test Coin Change
    console.log("\n--- Coin Change (Greedy) ---");
    coinChangeGreedy([25, 10, 5, 1], 67);
    
    // Test Job Scheduling
    console.log("\n--- Job Scheduling ---");
    const jobs = [
        { name: "Job A", profit: 100, deadline: 2 },
        { name: "Job B", profit: 10, deadline: 1 },
        { name: "Job C", profit: 15, deadline: 2 },
        { name: "Job D", profit: 27, deadline: 1 }
    ];
    jobScheduling(jobs);
    
    // Test Minimum Spanning Tree
    console.log("\n--- Minimum Spanning Tree (Kruskal) ---");
    const edges = [
        { from: 0, to: 1, weight: 10 },
        { from: 0, to: 2, weight: 6 },
        { from: 0, to: 3, weight: 5 },
        { from: 1, to: 3, weight: 15 },
        { from: 2, to: 3, weight: 4 }
    ];
    kruskalMST(edges, 4);
}

// Educational explanations
function explainGreedyAlgorithms() {
    console.log("\n=== Understanding Greedy Algorithms ===");
    
    console.log("🎯 GREEDY STRATEGY:");
    console.log("• Make locally optimal choice at each step");
    console.log("• Hope that local optimum leads to global optimum");
    console.log("• Never reconsider previous choices");
    console.log("• Fast and simple when applicable");
    console.log();
    
    console.log("✅ GREEDY CHOICE PROPERTY:");
    console.log("• Locally optimal choice leads to globally optimal solution");
    console.log("• Must prove this property for each greedy algorithm");
    console.log("• Examples: Activity selection, MST, Huffman coding");
    console.log();
    
    console.log("🏗️ OPTIMAL SUBSTRUCTURE:");
    console.log("• Optimal solution contains optimal solutions to subproblems");
    console.log("• Shared with dynamic programming");
    console.log("• Required for greedy approach to work");
    console.log();
    
    console.log("⚠️ WHEN GREEDY FAILS:");
    console.log("• 0/1 Knapsack (fractional works, 0/1 doesn't)");
    console.log("• Longest path in graph");
    console.log("• Coin change with arbitrary denominations");
    console.log("• Traveling salesman problem");
    console.log();
    
    console.log("📊 COMPLEXITY PATTERNS:");
    console.log("• Often O(n log n) due to sorting");
    console.log("• Sometimes O(n) with specialized data structures");
    console.log("• Generally more efficient than dynamic programming");
    console.log("• Space complexity usually O(1) or O(n)");
    console.log();
    
    console.log("🛠️ COMMON TECHNIQUES:");
    console.log("1. Sort by greedy criterion");
    console.log("2. Make greedy choice at each step");
    console.log("3. Reduce to smaller subproblem");
    console.log("4. Use appropriate data structures (heap, union-find)");
    console.log();
    
    console.log("🎯 INTERVIEW TIPS:");
    console.log("• Identify if problem has greedy choice property");
    console.log("• Prove greedy choice leads to optimal solution");
    console.log("• Consider counterexamples where greedy fails");
    console.log("• Compare with dynamic programming approach");
    console.log("• Think about sorting strategy");
    console.log();
    
    console.log("💡 REAL-WORLD APPLICATIONS:");
    console.log("1. CPU scheduling algorithms");
    console.log("2. Network routing protocols");
    console.log("3. Data compression (Huffman)");
    console.log("4. Resource allocation");
    console.log("5. Financial portfolio optimization");
    console.log("6. Load balancing");
}

// Run demonstrations
testGreedyAlgorithms();
explainGreedyAlgorithms();

/**
 * KEY CONCEPTS LEARNED:
 * 
 * 1. Greedy Choice Property: Local optimum leads to global optimum
 * 2. Optimal Substructure: Problem can be broken down optimally
 * 3. Activity Selection: Schedule maximum non-overlapping activities
 * 4. Fractional Knapsack: Maximize value with weight constraint
 * 5. Huffman Coding: Optimal prefix-free encoding
 * 6. MST Algorithms: Find minimum cost spanning tree
 * 
 * INTERVIEW DISCUSSION POINTS:
 * 
 * Q: "When does greedy algorithm work?"
 * A: "When problem has greedy choice property and optimal substructure.
 *     Must prove local optimal choices lead to global optimum."
 * 
 * Q: "Difference between 0/1 and fractional knapsack?"
 * A: "Fractional allows taking parts of items, solvable with greedy.
 *     0/1 requires taking whole items, needs dynamic programming."
 * 
 * Q: "Explain activity selection algorithm"
 * A: "Sort activities by finish time, greedily select earliest finishing
 *     activity that doesn't conflict with previously selected."
 * 
 * Q: "How does Huffman coding work?"
 * A: "Build binary tree based on character frequencies, assign shorter
 *     codes to frequent characters for optimal compression."
 * 
 * Q: "What's the greedy choice in MST algorithms?"
 * A: "Always add minimum weight edge that doesn't create cycle (Kruskal)
 *     or add minimum weight edge to growing tree (Prim)."
 * 
 * GREEDY ALGORITHM EXAMPLES:
 * - Activity/Interval Scheduling
 * - Fractional Knapsack
 * - Huffman Coding
 * - Minimum Spanning Tree (Kruskal, Prim)
 * - Dijkstra's Shortest Path
 * - Job Scheduling
 * - Coin Change (for standard systems)
 * 
 * RELATED CONCEPTS:
 * - Dynamic Programming (optimal substructure)
 * - Graph Algorithms (MST, shortest path)
 * - Optimization Theory
 * - Proof Techniques
 * - Data Structures (heaps, union-find)
 * - Approximation Algorithms
 */

module.exports = {
    activitySelection,
    fractionalKnapsack,
    huffmanCoding,
    coinChangeGreedy,
    jobScheduling,
    kruskalMST
}; 