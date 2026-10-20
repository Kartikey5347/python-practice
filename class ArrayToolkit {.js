class ArrayToolkit {
  static binarySearch(arr, target) {
    let left = 0;
    let right = arr.length - 1;

    while (left <= right) {
      const mid = Math.floor((left + right) / 2);

      if (arr[mid] === target) return mid;
      if (arr[mid] < target) left = mid + 1;
      else right = mid- 1;
    }

    return -1;
  }

  static mergeSort(arr) {
    if (arr.length <= 1) return arr;

    const middle = Math.floor(arr.length / 2);
    const left = this.mergeSort(arr.slice(0, middle));
    const right = this.mergeSort(arr.slice(middle));

    return this.merge(left, right);
  }

  static merge(left, right) {
    const result = [];
    let i = 0;
    let j = 0;

    while (i < left.length && j < right.length) {
      if (left[i] <= right[j]) {
        result.push(left[i]);
                i++;
      } else {
        result.push(right[j]);
        j++;
      }
    }

    return result.concat(left.slice(i), right.slice(j));
  }

  static rotateArray(arr, positions) {
    const n = arr.length;
    if (n === 0) return [];

    const k = ((positions % n) + n) % n;
    return arr.slice(n - k).concat(arr.slice(0, n - k));
  }

  static findDuplicates(arr) {
    const seen = new Set();
    const duplicates = new Set();

    for (const value of arr) {
      if (seen.has(value)) duplicates.add(value);
      else seen.add(value);
    }

    return [...duplicates];
  }

  static maxSubArraySum(arr) {
    let currentSum = arr[0];
    let maximumSum = arr[0];

    for (let i = 1; i < arr.length; i++) {
      currentSum = Math.max(arr[i], currentSum + arr[i]);
      maximumSum = Math.max(maximumSum, currentSum);
    }

    return maximumSum;
  }

  static twoSum(arr, target) {
    const indices = new Map();

    for (let i = 0; i < arr.length; i++) {
      const needed = target - arr[i];

      if (indices.has(needed)) {
        return [indices.get(needed), i];
      }

      indices.set(arr[i], i);
    }

    return [];
  }

  static rotateMatrix(matrix) {
    const size = matrix.length;
    const rotated = Array.from(
      { length: size },
      () => Array(size).fill(0)
    );

    for (let row = 0; row < size; row++) {
      for (let col = 0; col < size; col++) {
        rotated[col][size - 1 - row] = matrix[row][col];
      }
    }

    return rotated;
  }

  static longestUniqueSubarray(arr) {
    const lastSeen = new Map();
    let start = 0;
    let bestStart = 0;
    let bestLength = 0;

    for (let end = 0; end < arr.length; end++) {
      if (lastSeen.has(arr[end]) && lastSeen.get(arr[end]) >= start) {
        start = lastSeen.get(arr[end]) + 1;
      }

      lastSeen.set(arr[end], end);

      const currentLength = end - start + 1;
      if (currentLength > bestLength) {
        bestLength = currentLength;
        bestStart = start;
      }
    }

    return arr.slice(bestStart, bestStart + bestLength);
  }
}

const numbers = [8, 3, 1, 9, 3, -5, 7, 1, 12, -2];

console.log("Original:", numbers);
console.log("Sorted:", ArrayToolkit.mergeSort(numbers));
console.log("Index of 7:", ArrayToolkit.binarySearch(
  ArrayToolkit.mergeSort(numbers), 7
));
console.log("Rotated:", ArrayToolkit.rotateArray(numbers, 3));
console.log("Duplicates:", ArrayToolkit.findDuplicates(numbers));
console.log("Maximum subarray sum:", ArrayToolkit.maxSubArraySum(numbers));
console.log("Two sum indices for 10:", ArrayToolkit.twoSum(numbers, 10));

const matrix = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9]
];

console.log("Rotated matrix:", ArrayToolkit.rotateMatrix(matrix));
console.log(
  "Longest unique subarray:",
  ArrayToolkit.longestUniqueSubarray([1, 2, 3, 2, 4, 5, 3, 6])
);