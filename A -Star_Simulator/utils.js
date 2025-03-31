// function to create a grid
export function gridCreation(){
    const width = parseInt(document.getElementById("x-axis").value);
    const height = parseInt(document.getElementById("y-axis").value);

    let grid = new Array(height); 
    for(let i = 0; i < height; i++){
        grid[i] = new Array(width);
    }
    for(let i = 0; i < height; i++){
        for(let j = 0; j < width; j++){
            grid[i][j] = 0; //0 for empty cell
        }
    }
    console.log("Grid Created: ", grid);
    return grid;
}

//returns list with x and y coordinates of starting cell
export function getStart(){
    const startX = parseInt(document.getElementById("x-axis_start").value);
    const startY = parseInt(document.getElementById("y-axis_start").value);
    return [startX, startY];
}

//returns list with x and y coordinates of starting end cell
export function getEnd(){
    const endX = parseInt(document.getElementById("x-axis_end").value);
    const endY = parseInt(document.getElementById("y-axis_end").value);
    return [endX, endY];
}

//function creates dict of lists of adjacent cells for each cell in the grid
export function adjacencyList(grid, start, end){
    let adjList = {};
    const height = grid.length;
    const width = grid[0].length;
    for(let i = 0; i < height; i++){
        for(let j = 0; j < width; j++){
            adjList[`${i},${j}`] = []; //initialize empty array for each cell
        }
    }
    for(let i = 0; i < height; i++){
        for(let j = 0; j < width; j++){
            if(grid[i][j] === 1){ //if cell is blocked
                continue;
            }
            //check all 4 directions
            if(i > 0 && grid[i-1][j] !== 1){ //up
                adjList[`${i},${j}`].push(`${i-1},${j}`);
            }
            if(i < height - 1 && grid[i+1][j] !== 1){ //down
                adjList[`${i},${j}`].push(`${i+1},${j}`);
            }
            if(j > 0 && grid[i][j-1] !== 1){ //left
                adjList[`${i},${j}`].push(`${i},${j-1}`);
            }
            if(j < width - 1 && grid[i][j+1] !== 1){ //right
                adjList[`${i},${j}`].push(`${i},${j+1}`);
            }
        }
    }
    return adjList;
}

//distance between 2 nodes on a grid (shortest distance between 2 points moving in 4 directions)
export function manhattanDistance(start, end){
    const [startX, startY] = start;
    const [endX, endY] = end;
    return Math.abs(startX - endX) + Math.abs(startY - endY); //manhattan distance

}

//returns path from start to end node
export function reconstructPath(camefrom, node){
    let path = []; 
    while(camefrom.has(node)){
        path.push(node);
        node = camefrom.get(node);
    }
    path.push (node); //camefrom does not have start node, so add it here
    return path.reverse(); //reverse path
}