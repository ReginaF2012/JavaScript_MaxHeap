class MaxHeap {
    constructor() {
        this.values = [];
    }

    // index of the parent node
    parent(index) {
        return Math.floor((index - 1) / 2);
    }

    // index of the left child node
    leftChild(index) {
        return (index * 2) + 1;
    }

    // index of the right child node
    rightChild(index) {
        return (index * 2) + 2;
    }

    // returns true if index is of a node that has no children
    isLeaf(index) {
        return (
            index >= Math.floor(this.values.length / 2) && index <= this.values.length - 1
        )
    }

    // swap using ES6 destructuring
    swap(index1, index2) {
        [this.values[index1], this.values[index2]] = [this.values[index2], this.values[index1]];
    }


    heapifyDown(index) {

        // if the node at index has children
        if (!this.isLeaf(index)) {

            // get indices of children
            let leftChildIndex = this.leftChild(index),
                rightChildIndex = this.rightChild(index),

                // start out largest index at parent index
                largestIndex = index;

            // if the left child > parent
            if (this.values[leftChildIndex] > this.values[largestIndex]) {
                // reassign largest index to left child index
                largestIndex = leftChildIndex;
            }

            // if the right child > element at largest index (either parent or left child)
            if (this.values[rightChildIndex] >= this.values[largestIndex]) {
                // reassign largest index to right child index
                largestIndex = rightChildIndex;
            }

            // if the largest index is not the parent index
            if (largestIndex !== index) {
                // swap
                this.swap(index, largestIndex);
                // recursively move down the heap
                this.heapifyDown(largestIndex);
            }
        }
    }

    heapifyUp(index) {
        let currentIndex = index,
            parentIndex = this.parent(currentIndex);

        // while we haven't reached the root node and the current element is greater than its parent node
        while (currentIndex > 0 && this.values[currentIndex] > this.values[parentIndex]) {
            // swap
            this.swap(currentIndex, parentIndex);
            // move up the binary heap
            currentIndex = parentIndex;
            parentIndex = this.parent(parentIndex);
        }
    }

    add(element) {
        // add element to the end of the heap
        this.values.push(element);
        // move element up until it's in the correct position
        this.heapifyUp(this.values.length - 1);
    }

    // returns value of max without removing
    peek() {
        return this.values[0];
    }

    // removes and returns max element
    extractMax() {
        if (this.values.length < 1) return 'heap is empty';

        // get max and last element
        const max = this.values[0];
        const end = this.values.pop();
        
        if (this.values.length > 0) {
            // reassign first element to the last element
            this.values[0] = end;
            // heapify down until element is back in its correct position
            this.heapifyDown(0);
        }
        // return the max
        return max;
    }

    buildHeap(array) {
        this.values = array;
        // since leaves start at floor(nodes / 2) index, we work from the leaves up the heap
        for(let i = Math.floor(this.values.length / 2); i >= 0; i--){
            this.heapifyDown(i);
        }
    }

    print() {
        let i = 0;
        while (!this.isLeaf(i)) {
            console.log("PARENT:", this.values[i]);
            console.log("LEFT CHILD:", this.values[this.leftChild(i)]);
            console.log("RIGHT CHILD:", this.values[this.rightChild(i)]);
            i++;
        }      
    }
}
