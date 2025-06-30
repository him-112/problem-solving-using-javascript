/**
 * PROBLEM: Binary Tree Traversal
 * 
 * DESCRIPTION:
 * Implement the three main binary tree traversal algorithms:
 * 1. In-order (Left, Root, Right)
 * 2. Pre-order (Root, Left, Right) 
 * 3. Post-order (Left, Right, Root)
 * 
 * Also implement level-order (breadth-first) traversal.
 * 
 * WHY LEARN TREE TRAVERSALS:
 * - Fundamental tree algorithms
 * - Used in many tree-based problems
 * - Understanding recursion and iterative alternatives
 * - Common in technical interviews
 * 
 * EXAMPLE TREE:
 *       1
 *      / \
 *     2   3
 *    / \
 *   4   5
 * 
 * In-order: 4, 2, 5, 1, 3
 * Pre-order: 1, 2, 4, 5, 3
 * Post-order: 4, 5, 2, 3, 1
 * Level-order: 1, 2, 3, 4, 5
 */

// Binary Tree Node definition
class TreeNode {
    constructor(val, left = null, right = null) {
        this.val = val;
        this.left = left;
        this.right = right;
    }
}

// Helper function to create sample tree
function createSampleTree() {
    /**
     * Creates the tree:
     *       1
     *      / \
     *     2   3
     *    / \
     *   4   5
     */
    const root = new TreeNode(1);
    root.left = new TreeNode(2);
    root.right = new TreeNode(3);
    root.left.left = new TreeNode(4);
    root.left.right = new TreeNode(5);
    
    return root;
}

// ===============================
// IN-ORDER TRAVERSAL (Left, Root, Right)
// ===============================

// Method 1: Recursive In-order Traversal
function inOrderRecursive(root, result = []) {
    /**
     * APPROACH: Use recursion to visit nodes in order
     * 1. Traverse left subtree
     * 2. Process current node
     * 3. Traverse right subtree
     * 
     * TIME COMPLEXITY: O(n) - visit each node once
     * SPACE COMPLEXITY: O(h) - h is height of tree (recursion stack)
     * 
     * USE CASE: Binary Search Trees - gives sorted order!
     */
    
    if (root === null) {
        return result;
    }
    
    // 1. Traverse left subtree
    inOrderRecursive(root.left, result);
    
    // 2. Process current node
    result.push(root.val);
    console.log(`Visiting node: ${root.val}`);
    
    // 3. Traverse right subtree
    inOrderRecursive(root.right, result);
    
    return result;
}

// Method 2: Iterative In-order Traversal using Stack
function inOrderIterative(root) {
    /**
     * APPROACH: Use stack to simulate recursion
     * 1. Go left as far as possible, pushing nodes to stack
     * 2. When can't go left, pop and process node
     * 3. Go right and repeat
     * 
     * WHY USEFUL: Avoids recursion overhead, prevents stack overflow
     */
    
    const result = [];
    const stack = [];
    let current = root;
    
    console.log("In-order iterative traversal:");
    
    while (current !== null || stack.length > 0) {
        // Go to leftmost node, pushing all nodes to stack
        while (current !== null) {
            console.log(`Pushing ${current.val} to stack`);
            stack.push(current);
            current = current.left;
        }
        
        // Current is null, so we process the top of stack
        current = stack.pop();
        console.log(`Processing node: ${current.val}`);
        result.push(current.val);
        
        // Move to right subtree
        current = current.right;
    }
    
    return result;
}

// ===============================
// PRE-ORDER TRAVERSAL (Root, Left, Right)
// ===============================

// Method 1: Recursive Pre-order Traversal
function preOrderRecursive(root, result = []) {
    /**
     * APPROACH: Process root first, then left and right subtrees
     * 1. Process current node
     * 2. Traverse left subtree
     * 3. Traverse right subtree
     * 
     * USE CASE: Creating a copy of the tree, prefix expressions
     */
    
    if (root === null) {
        return result;
    }
    
    // 1. Process current node
    result.push(root.val);
    console.log(`Visiting node: ${root.val}`);
    
    // 2. Traverse left subtree
    preOrderRecursive(root.left, result);
    
    // 3. Traverse right subtree
    preOrderRecursive(root.right, result);
    
    return result;
}

// Method 2: Iterative Pre-order Traversal using Stack
function preOrderIterative(root) {
    /**
     * APPROACH: Use stack, process node immediately when popped
     * 1. Push root to stack
     * 2. While stack not empty:
     *    - Pop node and process it
     *    - Push right child first, then left child
     *    (Right first so left is processed first due to LIFO)
     */
    
    if (root === null) return [];
    
    const result = [];
    const stack = [root];
    
    console.log("Pre-order iterative traversal:");
    
    while (stack.length > 0) {
        const node = stack.pop();
        console.log(`Processing node: ${node.val}`);
        result.push(node.val);
        
        // Push right first, then left (so left is processed first)
        if (node.right) {
            console.log(`Pushing right child: ${node.right.val}`);
            stack.push(node.right);
        }
        if (node.left) {
            console.log(`Pushing left child: ${node.left.val}`);
            stack.push(node.left);
        }
    }
    
    return result;
}

// ===============================
// POST-ORDER TRAVERSAL (Left, Right, Root)
// ===============================

// Method 1: Recursive Post-order Traversal
function postOrderRecursive(root, result = []) {
    /**
     * APPROACH: Process children first, then root
     * 1. Traverse left subtree
     * 2. Traverse right subtree
     * 3. Process current node
     * 
     * USE CASE: Deleting tree, postfix expressions, calculating directory sizes
     */
    
    if (root === null) {
        return result;
    }
    
    // 1. Traverse left subtree
    postOrderRecursive(root.left, result);
    
    // 2. Traverse right subtree
    postOrderRecursive(root.right, result);
    
    // 3. Process current node
    result.push(root.val);
    console.log(`Visiting node: ${root.val}`);
    
    return result;
}

// Method 2: Iterative Post-order Traversal (More Complex)
function postOrderIterative(root) {
    /**
     * APPROACH: Use two stacks or track visited nodes
     * Post-order is trickier iteratively because we need to ensure
     * both children are processed before parent
     */
    
    if (root === null) return [];
    
    const result = [];
    const stack = [];
    let lastVisited = null;
    let current = root;
    
    console.log("Post-order iterative traversal:");
    
    while (stack.length > 0 || current !== null) {
        if (current !== null) {
            stack.push(current);
            current = current.left;
        } else {
            const peekNode = stack[stack.length - 1];
            
            // If right child exists and hasn't been processed yet
            if (peekNode.right !== null && lastVisited !== peekNode.right) {
                current = peekNode.right;
            } else {
                // Process the node
                console.log(`Processing node: ${peekNode.val}`);
                result.push(peekNode.val);
                lastVisited = stack.pop();
            }
        }
    }
    
    return result;
}

// ===============================
// LEVEL-ORDER TRAVERSAL (Breadth-First)
// ===============================

function levelOrderTraversal(root) {
    /**
     * APPROACH: Use queue for breadth-first traversal
     * 1. Start with root in queue
     * 2. While queue not empty:
     *    - Dequeue node and process it
     *    - Enqueue left and right children
     * 
     * TIME COMPLEXITY: O(n)
     * SPACE COMPLEXITY: O(w) where w is maximum width of tree
     * 
     * USE CASE: Finding shortest path, level-by-level processing
     */
    
    if (root === null) return [];
    
    const result = [];
    const queue = [root];
    
    console.log("Level-order traversal:");
    
    while (queue.length > 0) {
        const node = queue.shift(); // Dequeue from front
        console.log(`Processing node: ${node.val}`);
        result.push(node.val);
        
        // Enqueue children
        if (node.left) {
            console.log(`Enqueueing left child: ${node.left.val}`);
            queue.push(node.left);
        }
        if (node.right) {
            console.log(`Enqueueing right child: ${node.right.val}`);
            queue.push(node.right);
        }
    }
    
    return result;
}

// ===============================
// LEVEL-ORDER BY LEVELS (Returns 2D array)
// ===============================

function levelOrderByLevels(root) {
    /**
     * VARIATION: Return nodes grouped by level
     * Each level is a separate array
     * 
     * EXAMPLE: [[1], [2, 3], [4, 5]]
     */
    
    if (root === null) return [];
    
    const result = [];
    const queue = [root];
    
    while (queue.length > 0) {
        const levelSize = queue.length;
        const currentLevel = [];
        
        // Process all nodes at current level
        for (let i = 0; i < levelSize; i++) {
            const node = queue.shift();
            currentLevel.push(node.val);
            
            if (node.left) queue.push(node.left);
            if (node.right) queue.push(node.right);
        }
        
        result.push(currentLevel);
    }
    
    return result;
}

// ===============================
// TESTING FUNCTIONS
// ===============================

function testAllTraversals() {
    console.log("=== Testing All Tree Traversals ===");
    
    const tree = createSampleTree();
    console.log("Sample tree structure:");
    console.log("       1");
    console.log("      / \\");
    console.log("     2   3");
    console.log("    / \\");
    console.log("   4   5");
    
    console.log("\n--- In-Order Traversals ---");
    console.log("Recursive:");
    const inOrderRec = inOrderRecursive(tree);
    console.log(`Result: [${inOrderRec.join(', ')}]`);
    
    console.log("\nIterative:");
    const inOrderIter = inOrderIterative(tree);
    console.log(`Result: [${inOrderIter.join(', ')}]`);
    
    console.log("\n--- Pre-Order Traversals ---");
    console.log("Recursive:");
    const preOrderRec = preOrderRecursive(tree);
    console.log(`Result: [${preOrderRec.join(', ')}]`);
    
    console.log("\nIterative:");
    const preOrderIter = preOrderIterative(tree);
    console.log(`Result: [${preOrderIter.join(', ')}]`);
    
    console.log("\n--- Post-Order Traversals ---");
    console.log("Recursive:");
    const postOrderRec = postOrderRecursive(tree);
    console.log(`Result: [${postOrderRec.join(', ')}]`);
    
    console.log("\nIterative:");
    const postOrderIter = postOrderIterative(tree);
    console.log(`Result: [${postOrderIter.join(', ')}]`);
    
    console.log("\n--- Level-Order Traversals ---");
    const levelOrder = levelOrderTraversal(tree);
    console.log(`Result: [${levelOrder.join(', ')}]`);
    
    const levelOrderLevels = levelOrderByLevels(tree);
    console.log(`By levels: ${JSON.stringify(levelOrderLevels)}`);
}

// Performance comparison
function performanceComparison() {
    console.log("\n=== Performance Comparison ===");
    
    // Create larger tree for performance testing
    function createLargerTree(depth, value = 1) {
        if (depth <= 0) return null;
        
        const node = new TreeNode(value);
        node.left = createLargerTree(depth - 1, value * 2);
        node.right = createLargerTree(depth - 1, value * 2 + 1);
        return node;
    }
    
    const largeTree = createLargerTree(10); // Binary tree with depth 10
    
    console.log("Testing with binary tree of depth 10...");
    
    // Test recursive vs iterative in-order
    let start = performance.now();
    inOrderRecursive(largeTree);
    let end = performance.now();
    console.log(`In-order recursive: ${(end - start).toFixed(4)}ms`);
    
    start = performance.now();
    inOrderIterative(largeTree);
    end = performance.now();
    console.log(`In-order iterative: ${(end - start).toFixed(4)}ms`);
}

// Educational function: Understanding when to use each traversal
function explainTraversalUseCases() {
    console.log("\n=== When to Use Each Traversal ===");
    
    console.log("📊 IN-ORDER (Left, Root, Right):");
    console.log("  ✓ Binary Search Trees → gives sorted order");
    console.log("  ✓ Expression trees → infix notation");
    console.log("  ✓ When you need elements in sorted order");
    
    console.log("\n📋 PRE-ORDER (Root, Left, Right):");
    console.log("  ✓ Creating copy of tree");
    console.log("  ✓ Prefix expression evaluation");
    console.log("  ✓ Tree serialization");
    console.log("  ✓ When you need to process parent before children");
    
    console.log("\n🏗️ POST-ORDER (Left, Right, Root):");
    console.log("  ✓ Deleting tree (delete children before parent)");
    console.log("  ✓ Postfix expression evaluation");
    console.log("  ✓ Calculating directory sizes");
    console.log("  ✓ When you need to process children before parent");
    
    console.log("\n🌊 LEVEL-ORDER (Breadth-First):");
    console.log("  ✓ Finding shortest path in unweighted tree");
    console.log("  ✓ Level-by-level processing");
    console.log("  ✓ Finding nodes at specific level");
    console.log("  ✓ Tree width/diameter calculations");
}

// Run all demonstrations
testAllTraversals();
performanceComparison();
explainTraversalUseCases();

/**
 * KEY CONCEPTS LEARNED:
 * 
 * 1. Tree Structure: Understanding parent-child relationships
 * 2. Recursion: Natural fit for tree problems
 * 3. Stack vs Queue: DFS uses stack, BFS uses queue
 * 4. Iterative Alternatives: Converting recursion to iteration
 * 5. Problem-Specific Traversals: Different traversals for different use cases
 * 
 * INTERVIEW DISCUSSION POINTS:
 * 
 * Q: "Implement tree traversals"
 * A: "I'll implement all main types: in-order, pre-order, post-order, and level-order"
 * 
 * Q: "Recursive or iterative?"
 * A: "Recursive is more natural and easier to understand. Iterative avoids
 *     stack overflow for very deep trees and can be more memory efficient."
 * 
 * Q: "When would you use each traversal?"
 * A: "In-order for BST (sorted), pre-order for copying, post-order for 
 *     deletion, level-order for level-by-level processing"
 * 
 * Q: "Space complexity?"
 * A: "Recursive: O(h) for call stack. Iterative: O(h) for explicit stack.
 *     Level-order: O(w) where w is maximum width of tree"
 * 
 * COMMON VARIATIONS:
 * - Reverse in-order (Right, Root, Left)
 * - Morris traversal (O(1) space)
 * - Zigzag level order
 * - Vertical order traversal
 * - Boundary traversal
 * 
 * TREE TRAVERSAL PATTERNS:
 * 1. DFS (Depth-First): In/Pre/Post-order using recursion or stack
 * 2. BFS (Breadth-First): Level-order using queue
 * 3. Choose based on problem requirements
 */

module.exports = {
    TreeNode,
    createSampleTree,
    inOrderRecursive,
    inOrderIterative,
    preOrderRecursive,
    preOrderIterative,
    postOrderRecursive,
    postOrderIterative,
    levelOrderTraversal,
    levelOrderByLevels
}; 