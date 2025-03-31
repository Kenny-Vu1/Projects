//implements heap logic for a_star algorithm priority queue

//extract min from heap
export function extractMin(openSet, fscores) {
    //swap first and last element in openSet
    if (openSet.length === 0) {
        return null;
    }
    const min = openSet[0]; // store first element
    let last_index = openSet.length - 1;
    openSet[0] = openSet[last_index];
    openSet[last_index] = min;
    openSet.pop(); // remove last element
    down_heapify(openSet, fscores, 0); 

    return min;
    
}

//insert node into heap, maintaining heap property
export function insert(openSet, fscores, node) {
    openSet.push(node); 
    up_heapify(openSet, fscores, openSet.length - 1); 
}

//builds min heap from open set
export function buildHeap(openSet, fscores) {
    let size = openSet.length;
    let half = Math.floor(size / 2); 
    for (let i = half-1; i >= 0; i-=1) {
        down_heapify(openSet, fscores, i); // call down_heapify for each node
    }
    
}

// up_heapify to maintain heap property
export function up_heapify(openSet, fscores, i) {

    let parent = Math.floor((i - 1) / 2); // parent index
    if (i > 0 && fscores.get(openSet[i]) < fscores.get(openSet[parent])) {
        let temp = openSet[i]; 
        openSet[i] = openSet[parent];
        openSet[parent] = temp; 
        up_heapify(openSet, fscores, parent); // recursive call to up_heapify
    }
}

// down_heapify to maintain heap property
export function down_heapify(openSet, fscores, i) {

    let left = 2*i + 1; // left child index
    let right = 2*i + 2; // right child index
    let smallest = i; 
    let size = openSet.length; // size of heap

    // check if child nodes are smaller than current node, swap if so
    if (left < size && fscores.get(openSet[left]) < fscores.get(openSet[smallest])) {
        smallest = left; 
    }
    if (right < size && fscores.get(openSet[right]) < fscores.get(openSet[smallest])) {
        smallest = right; 
    }
    if (smallest !== i) {
        let temp = openSet[i]; 
        openSet[i] = openSet[smallest];
        openSet[smallest] = temp; 
        down_heapify(openSet, fscores, smallest);
    }
}