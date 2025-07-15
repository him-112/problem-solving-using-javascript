/**
 * PROBLEM: Basic Sorting Algorithms
 * 
 * DESCRIPTION:
 * Fundamental sorting techniques that every programmer should understand.
 * Foundation for more advanced sorting algorithms and algorithmic thinking.
 * 
 * KEY CONCEPTS:
 * - Comparison-based sorting
 * - In-place vs out-of-place sorting
 * - Stable vs unstable sorting
 * - Step-by-step algorithm execution
 * - Performance analysis and optimization
 * 
 * EXAMPLES:
 * bubbleSort([64,34,25,12]) = [12,25,34,64]
 * selectionSort([5,2,8,1]) = [1,2,5,8]
 */

// Method 1: Bubble Sort
function bubbleSort(arr) {
    /**
     * APPROACH: Compare adjacent elements and swap if in wrong order
     * "Bubble" largest elements to the end in each pass
     * 
     * TIME COMPLEXITY: O(n²)
     * SPACE COMPLEXITY: O(1)
     * STABLE: Yes
     */
    
    console.log(`bubbleSort([${arr.join(',')}]) called`);
    const result = [...arr]; // Create copy to avoid modifying original
    const n = result.length;
    
    console.log(`Starting Bubble Sort with ${n} elements`);
    
    for (let i = 0; i < n - 1; i++) {
        console.log(`\n--- Pass ${i + 1} ---`);
        let swapped = false;
        
        // Last i elements are already in place
        for (let j = 0; j < n - i - 1; j++) {
            console.log(`  Comparing ${result[j]} and ${result[j + 1]} at positions ${j} and ${j + 1}`);
            
            if (result[j] > result[j + 1]) {
                // Swap elements
                [result[j], result[j + 1]] = [result[j + 1], result[j]];
                swapped = true;
                console.log(`    ✓ Swapped! Array now: [${result.join(',')}]`);
            } else {
                console.log(`    No swap needed`);
            }
        }
        
        console.log(`  After pass ${i + 1}: [${result.join(',')}]`);
        
        // If no swapping occurred, array is sorted
        if (!swapped) {
            console.log(`  No swaps made, array is sorted!`);
            break;
        }
    }
    
    console.log(`Final sorted array: [${result.join(',')}]`);
    return result;
}

// Method 2: Selection Sort
function selectionSort(arr) {
    /**
     * APPROACH: Find minimum element and place at beginning
     * Repeatedly select smallest from unsorted portion
     * 
     * TIME COMPLEXITY: O(n²)
     * SPACE COMPLEXITY: O(1)
     * STABLE: No (can be made stable with modifications)
     */
    
    console.log(`selectionSort([${arr.join(',')}]) called`);
    const result = [...arr];
    const n = result.length;
    
    console.log(`Starting Selection Sort with ${n} elements`);
    
    for (let i = 0; i < n - 1; i++) {
        console.log(`\n--- Pass ${i + 1}: Finding minimum in range [${i}, ${n-1}] ---`);
        
        let minIndex = i;
        console.log(`  Starting with ${result[i]} at index ${i} as minimum`);
        
        // Find minimum element in remaining array
        for (let j = i + 1; j < n; j++) {
            console.log(`    Comparing ${result[j]} at index ${j} with current min ${result[minIndex]}`);
            
            if (result[j] < result[minIndex]) {
                minIndex = j;
                console.log(`      ✓ New minimum: ${result[minIndex]} at index ${minIndex}`);
            }
        }
        
        // Swap minimum with first element of unsorted part
        if (minIndex !== i) {
            console.log(`  Swapping ${result[i]} at index ${i} with ${result[minIndex]} at index ${minIndex}`);
            [result[i], result[minIndex]] = [result[minIndex], result[i]];
            console.log(`  After swap: [${result.join(',')}]`);
        } else {
            console.log(`  Minimum already in correct position`);
        }
        
        console.log(`  Sorted portion: [${result.slice(0, i + 1).join(',')}]`);
        console.log(`  Unsorted portion: [${result.slice(i + 1).join(',')}]`);
    }
    
    console.log(`Final sorted array: [${result.join(',')}]`);
    return result;
}

// Method 3: Insertion Sort
function insertionSort(arr) {
    /**
     * APPROACH: Build sorted array one element at a time
     * Insert each element into its correct position in sorted portion
     * 
     * TIME COMPLEXITY: O(n²) worst case, O(n) best case
     * SPACE COMPLEXITY: O(1)
     * STABLE: Yes
     */
    
    console.log(`insertionSort([${arr.join(',')}]) called`);
    const result = [...arr];
    const n = result.length;
    
    console.log(`Starting Insertion Sort with ${n} elements`);
    console.log(`Initial: [${result[0]}] | [${result.slice(1).join(',')}]`);
    console.log(`         ↑sorted    ↑unsorted`);
    
    for (let i = 1; i < n; i++) {
        const key = result[i];
        console.log(`\n--- Pass ${i}: Inserting ${key} from index ${i} ---`);
        
        let j = i - 1;
        console.log(`  Current sorted portion: [${result.slice(0, i).join(',')}]`);
        console.log(`  Inserting ${key} into correct position`);
        
        // Move elements greater than key one position ahead
        while (j >= 0 && result[j] > key) {
            console.log(`    ${result[j]} > ${key}, shifting ${result[j]} right`);
            result[j + 1] = result[j];
            j--;
            console.log(`    Array now: [${result.join(',')}]`);
        }
        
        // Place key in its correct position
        console.log(`  Placed ${key} at index ${j + 1}`);
        result[j + 1] = key;
        console.log(`  After insertion: [${result.join(',')}]`);
        console.log(`  Sorted: [${result.slice(0, i + 1).join(',')}] | Unsorted: [${result.slice(i + 1).join(',')}]`);
    }
    
    console.log(`Final sorted array: [${result.join(',')}]`);
    return result;
}

// Method 4: Counting Sort (for small range of integers)
function countingSort(arr, maxValue = null) {
    /**
     * APPROACH: Count frequency of each element, then reconstruct
     * Non-comparison based sorting for integers
     * 
     * TIME COMPLEXITY: O(n + k) where k is range
     * SPACE COMPLEXITY: O(k)
     * STABLE: Yes
     */
    
    console.log(`countingSort([${arr.join(',')}]) called`);
    
    if (maxValue === null) {
        maxValue = Math.max(...arr);
    }
    
    console.log(`Maximum value: ${maxValue}`);
    
    // Create counting array
    const count = new Array(maxValue + 1).fill(0);
    console.log(`Created counting array of size ${maxValue + 1}`);
    
    // Count occurrences
    console.log(`\nCounting occurrences:`);
    for (let i = 0; i < arr.length; i++) {
        count[arr[i]]++;
        console.log(`  ${arr[i]} appears ${count[arr[i]]} time(s)`);
    }
    
    console.log(`Count array: [${count.join(',')}]`);
    
    // Reconstruct sorted array
    const result = [];
    console.log(`\nReconstructing sorted array:`);
    
    for (let i = 0; i <= maxValue; i++) {
        for (let j = 0; j < count[i]; j++) {
            result.push(i);
            console.log(`  Added ${i} to result: [${result.join(',')}]`);
        }
    }
    
    console.log(`Final sorted array: [${result.join(',')}]`);
    return result;
}

// Method 5: Simple Array Reversal
function reverseArray(arr) {
    /**
     * APPROACH: Swap elements from both ends moving inward
     * Two pointers technique
     * 
     * TIME COMPLEXITY: O(n)
     * SPACE COMPLEXITY: O(1)
     */
    
    console.log(`reverseArray([${arr.join(',')}]) called`);
    const result = [...arr];
    
    let left = 0;
    let right = result.length - 1;
    
    console.log(`Using two pointers: left=0, right=${right}`);
    
    while (left < right) {
        console.log(`  Swapping ${result[left]} at index ${left} with ${result[right]} at index ${right}`);
        [result[left], result[right]] = [result[right], result[left]];
        console.log(`  Array now: [${result.join(',')}]`);
        
        left++;
        right--;
        console.log(`  Moving pointers: left=${left}, right=${right}`);
    }
    
    console.log(`Final reversed array: [${result.join(',')}]`);
    return result;
}

// Method 6: Check if Array is Sorted
function isSorted(arr, ascending = true) {
    /**
     * APPROACH: Compare each adjacent pair
     * Return false if any pair is out of order
     * 
     * TIME COMPLEXITY: O(n)
     * SPACE COMPLEXITY: O(1)
     */
    
    console.log(`isSorted([${arr.join(',')}], ascending=${ascending}) called`);
    
    if (arr.length <= 1) {
        console.log(`  Array with ${arr.length} element(s) is trivially sorted`);
        return true;
    }
    
    for (let i = 0; i < arr.length - 1; i++) {
        const condition = ascending ? arr[i] > arr[i + 1] : arr[i] < arr[i + 1];
        console.log(`  Checking ${arr[i]} and ${arr[i + 1]}: ${ascending ? 'ascending' : 'descending'} order`);
        
        if (condition) {
            console.log(`  ✗ Found violation at indices ${i} and ${i + 1}`);
            return false;
        }
    }
    
    console.log(`  ✓ Array is sorted in ${ascending ? 'ascending' : 'descending'} order`);
    return true;
}

// Method 7: Partition Array (used in Quick Sort)
function partition(arr, low, high) {
    /**
     * APPROACH: Choose pivot and partition around it
     * Elements smaller than pivot go left, larger go right
     * 
     * TIME COMPLEXITY: O(n)
     * SPACE COMPLEXITY: O(1)
     */
    
    console.log(`partition([${arr.join(',')}], ${low}, ${high}) called`);
    
    const pivot = arr[high]; // Choose last element as pivot
    console.log(`Chosen pivot: ${pivot} at index ${high}`);
    
    let i = low - 1; // Index of smaller element
    console.log(`Starting with i = ${i}`);
    
    for (let j = low; j < high; j++) {
        console.log(`  Comparing ${arr[j]} with pivot ${pivot}`);
        
        if (arr[j] <= pivot) {
            i++;
            [arr[i], arr[j]] = [arr[j], arr[i]];
            console.log(`    ${arr[j]} <= ${pivot}, swapped positions ${i} and ${j}`);
            console.log(`    Array now: [${arr.join(',')}]`);
        } else {
            console.log(`    ${arr[j]} > ${pivot}, no swap`);
        }
    }
    
    // Place pivot in correct position
    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    console.log(`Placed pivot ${pivot} at index ${i + 1}`);
    console.log(`Final partitioned array: [${arr.join(',')}]`);
    
    return i + 1;
}

// Test all sorting algorithms
function testSortingAlgorithms() {
    console.log("=== Testing Basic Sorting Algorithms ===");
    
    const testArray = [64, 34, 25, 12, 22, 11, 90];
    const smallArray = [5, 2, 8, 1, 9];
    const sortedArray = [1, 2, 3, 4, 5];
    const reverseArray = [5, 4, 3, 2, 1];
    
    // Test Bubble Sort
    console.log("\n--- Bubble Sort ---");
    bubbleSort(smallArray);
    
    // Test Selection Sort
    console.log("\n--- Selection Sort ---");
    selectionSort(smallArray);
    
    // Test Insertion Sort
    console.log("\n--- Insertion Sort ---");
    insertionSort(smallArray);
    
    // Test Counting Sort
    console.log("\n--- Counting Sort ---");
    countingSort([4, 2, 2, 8, 3, 3, 1]);
    
    // Test Array Reversal
    console.log("\n--- Array Reversal ---");
    reverseArray([1, 2, 3, 4, 5]);
    
    // Test Sorted Check
    console.log("\n--- Check if Sorted ---");
    isSorted(sortedArray, true);
    isSorted(reverseArray, true);
    isSorted(reverseArray, false);
    
    // Test Partitioning
    console.log("\n--- Array Partitioning ---");
    const partitionTest = [10, 80, 30, 90, 40, 50, 70];
    const pivotIndex = partition(partitionTest, 0, partitionTest.length - 1);
    console.log(`Pivot placed at index ${pivotIndex}`);
}

// Performance comparison
function performanceComparison() {
    console.log("\n=== Performance Comparison ===");
    
    // Create test arrays of different sizes
    const sizes = [100, 500, 1000];
    
    sizes.forEach(size => {
        console.log(`\nTesting with array size: ${size}`);
        
        // Create random array
        const testArray = Array.from({ length: size }, () => Math.floor(Math.random() * 1000));
        
        // Bubble Sort
        let start = performance.now();
        bubbleSort(testArray.slice(0, Math.min(100, size))); // Limit size for bubble sort
        let end = performance.now();
        console.log(`Bubble Sort (first 100): ${(end - start).toFixed(2)}ms`);
        
        // Selection Sort
        start = performance.now();
        selectionSort(testArray.slice(0, Math.min(100, size))); // Limit size for selection sort
        end = performance.now();
        console.log(`Selection Sort (first 100): ${(end - start).toFixed(2)}ms`);
        
        // Insertion Sort
        start = performance.now();
        insertionSort(testArray.slice(0, Math.min(100, size))); // Limit size for insertion sort
        end = performance.now();
        console.log(`Insertion Sort (first 100): ${(end - start).toFixed(2)}ms`);
        
        // Native sort for comparison
        start = performance.now();
        [...testArray].sort((a, b) => a - b);
        end = performance.now();
        console.log(`Native Sort (full array): ${(end - start).toFixed(2)}ms`);
    });
}

// Educational explanations
function explainSorting() {
    console.log("\n=== Understanding Sorting Algorithms ===");
    
    console.log("📊 BASIC SORTING ALGORITHMS:");
    console.log("• Bubble Sort: Compare adjacent, swap if wrong order");
    console.log("• Selection Sort: Find minimum, place at beginning");
    console.log("• Insertion Sort: Insert each element in correct position");
    console.log("• Counting Sort: Count frequencies, reconstruct");
    console.log();
    
    console.log("⏱️ TIME COMPLEXITY:");
    console.log("• Bubble Sort: O(n²) average/worst, O(n) best");
    console.log("• Selection Sort: O(n²) all cases");
    console.log("• Insertion Sort: O(n²) worst, O(n) best");
    console.log("• Counting Sort: O(n + k) where k is range");
    console.log();
    
    console.log("💾 SPACE COMPLEXITY:");
    console.log("• Bubble, Selection, Insertion: O(1) - in-place");
    console.log("• Counting Sort: O(k) - requires extra space");
    console.log();
    
    console.log("🔄 STABILITY:");
    console.log("• Stable: Bubble, Insertion, Counting");
    console.log("• Unstable: Selection (can be made stable)");
    console.log("• Stable = equal elements maintain relative order");
    console.log();
    
    console.log("🎯 WHEN TO USE:");
    console.log("• Small arrays (n < 50): Insertion sort often fastest");
    console.log("• Educational purposes: All algorithms show key concepts");
    console.log("• Nearly sorted data: Insertion sort performs well");
    console.log("• Limited range integers: Counting sort is linear");
    console.log();
    
    console.log("⚡ OPTIMIZATION TIPS:");
    console.log("• Bubble Sort: Stop early if no swaps made");
    console.log("• Selection Sort: Track both min and max");
    console.log("• Insertion Sort: Use binary search for position");
    console.log("• All: Consider hybrid approaches for real-world use");
    console.log();
    
    console.log("🔧 INTERVIEW TIPS:");
    console.log("• Understand trade-offs between algorithms");
    console.log("• Be able to implement from scratch");
    console.log("• Know when each algorithm is appropriate");
    console.log("• Explain stability and in-place properties");
    console.log("• Practice optimizations and edge cases");
}

// Run all demonstrations
testSortingAlgorithms();
performanceComparison();
explainSorting();

/**
 * KEY CONCEPTS LEARNED:
 * 
 * 1. Bubble Sort: Simple but inefficient, good for learning
 * 2. Selection Sort: Find extremes, consistent O(n²) performance
 * 3. Insertion Sort: Efficient for small/nearly sorted arrays
 * 4. Counting Sort: Linear time for limited range integers
 * 5. Algorithm Properties: Stability, in-place sorting, adaptivity
 * 
 * INTERVIEW DISCUSSION POINTS:
 * 
 * Q: "Explain how bubble sort works"
 * A: "Compare adjacent elements, swap if wrong order. Largest element
 *     'bubbles' to end each pass. Continue until no swaps needed."
 * 
 * Q: "What's the difference between stable and unstable sorting?"
 * A: "Stable sorting maintains relative order of equal elements.
 *     Important when sorting objects with multiple keys."
 * 
 * Q: "Which basic sorting algorithm is most efficient?"
 * A: "Depends on input. Insertion sort best for small/nearly sorted.
 *     Counting sort linear for limited integer ranges."
 * 
 * Q: "When would you use insertion sort over quicksort?"
 * A: "Small arrays (< 50 elements), nearly sorted data, or when
 *     simplicity and stability are more important than worst-case performance."
 * 
 * ALGORITHM CHARACTERISTICS:
 * - Bubble Sort: Simple, stable, adaptive, O(n²)
 * - Selection Sort: Simple, unstable, non-adaptive, O(n²)
 * - Insertion Sort: Simple, stable, adaptive, O(n²) worst, O(n) best
 * - Counting Sort: Not comparison-based, stable, O(n+k)
 * 
 * RELATED CONCEPTS:
 * - Advanced Sorting (Merge, Quick, Heap Sort)
 * - Comparison Functions
 * - Algorithm Stability
 * - In-place vs Out-of-place
 * - Adaptive vs Non-adaptive
 * - Lower Bounds for Comparison Sorting
 */

module.exports = {
    bubbleSort,
    selectionSort,
    insertionSort,
    countingSort,
    reverseArray,
    isSorted,
    partition
};

function bubbleSort(arr) {
    let n = arr.length;
    for (let i = 0; i < n - 1; i++) {
      for (let j = 0; j < n - i - 1; j++) {
        if (arr[j] > arr[j + 1]) {
          // Swap
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        }
      }
    }
    return arr;
  }

  function selectionSort(arr) {
    let n = arr.length;
    for (let i = 0; i < n; i++) {
      let minIdx = i;
      for (let j = i + 1; j < n; j++) {
        if (arr[j] < arr[minIdx]) {
          minIdx = j;
        }
      }
      // Swap
      [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
    }
    return arr;
  }

  function insertionSort(arr) {
    for (let i = 1; i < arr.length; i++) {
      let key = arr[i];
      let j = i - 1;
  
      // Peeche wale elements ko shift karo
      while (j >= 0 && arr[j] > key) {
        arr[j + 1] = arr[j];
        j--;
      }
      arr[j + 1] = key;
    }
    return arr;
  }

  function mergeSort(arr) {
    if (arr.length <= 1) return arr;
  
    let mid = Math.floor(arr.length / 2);
    let left = mergeSort(arr.slice(0, mid));
    let right = mergeSort(arr.slice(mid));
  
    return merge(left, right);
  }
  
  function merge(left, right) {
    let result = [];
    let i = 0, j = 0;
  
    while (i < left.length && j < right.length) {
      if (left[i] < right[j]) {
        result.push(left[i]);
        i++;
      } else {
        result.push(right[j]);
        j++;
      }
    }
    return result.concat(left.slice(i)).concat(right.slice(j));
  }

  function quickSort(arr) {
    if (arr.length <= 1) return arr;
  
    let pivot = arr[arr.length - 1];
    let left = [];
    let right = [];
  
    for (let i = 0; i < arr.length - 1; i++) {
      if (arr[i] < pivot) left.push(arr[i]);
      else right.push(arr[i]);
    }
  
    return [...quickSort(left), pivot, ...quickSort(right)];
  }