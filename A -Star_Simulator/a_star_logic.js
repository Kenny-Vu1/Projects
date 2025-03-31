import * as Utils from './utils.js';
import * as heap from './heap.js';
import { buildHeap } from './heap.js';

//logic for a_star algorithm

//runs a_star algorithm
function runAStar(){
    let start = Utils.getStart();
    let end = Utils.getEnd();
    const grid = Utils.gridCreation();
    const path = aStar(grid, start, end);
    console.log(path);
    document.getElementById("result").innerHTML = path.join(" -> ");
}

//function runs a_star algorithm
// fscore = gscore + hscore
// gscrore = real distance from start to current node
// hscore = heuristic distance from current node to end node
function aStar(grid, start, end){

    //initialize variables and sets
    const [startX, startY] = start;
    const [endX, endY] = end;
    const adjList = Utils.adjacencyList(grid, start, end);
    const openSet = []; 
    const closedSet = new Set(); 
    const gscores = new Map(); 
    const fscores = new Map(); 
    const cameFrom = new Map(); 

    buildHeap(openSet, fscores); //build heap from openSet
    //initalize gscores, fscores to infinity and unvisited set to all nodes
    for(let i = 0; i< grid.length; i++){    
        for(let j = 0; j< grid[0].length; j+=1){ 
            gscores.set(`${i},${j}`, Infinity); 
            fscores.set(`${i},${j}`, Infinity); 
            openSet.push(`${i},${j}`);
        }
    }

    //add root node to gscores and fscores
    gscores.set(`${startX},${startY}`, 0); 
    fscores.set(`${startX},${startY}`, Utils.manhattanDistance(start, end)); 

    //while there are nodes connected to root to be visited, continue
    while(openSet.length > 0){

        //get min, remove from openSet, add to closedSet
        let node = heap.extractMin(openSet, fscores); 
        closedSet.add(node); 
        if (node === `${endX},${endY}`){ //if node is end node, return path
            return Utils.reconstructPath(cameFrom, node); 
        }

        //for neighbors of node, check if they were vistited, update gscores and fscores if needed
        for(let neighbor of adjList[node]){
            if(closedSet.has(neighbor)){ //if neighbor has already been visited, skip it
                continue; 
            }
            let potentialGScore = gscores.get(node) + 1;
            if(potentialGScore < gscores.get(neighbor)){
                cameFrom.set(neighbor, node); 
                gscores.set(neighbor, potentialGScore); 
                fscores.set(neighbor, potentialGScore + Utils.manhattanDistance(neighbor.split(",").map(Number), end)); //split neighbor since it is a string and convert to list of numbers 
                if(!openSet.includes(neighbor)){ //if neibhor is not in the openset, add it
                    heap.insert(openSet, fscores, neighbor); //insert neighbor into heap
                } else{
                    const index = openSet.indexOf(neighbor); 
                    heap.up_heapify(openSet, fscores, index); //update heap to maintain heap property
                }
            }
        }
    }
    return []; //no path found
}

window.runAStar = runAStar; 