// grid
let gb = document.getElementById('gamebox');
let footer = document.getElementById('footer');
let material = document.getElementById('material');
let fraction = 10;
let debugBorder = 2;
let gbheight;
let gbwidth;
let shortest;
let cellSize;
let gameCols;
let gameRows;
let cellCount;

//map
// let mapSize = [20, 20]
// let mapRows = mapSize[1];
// let mapCols = mapSize[0];
// let origin = [0, 0]
// let map = document.getElementById("map")
// let body = document.getElementById("body");

//character
// let currentCell = 0;
// let clickedCell = 0
// let done = true;
// let pathSearch = simpleShortestPath;
// let speed = 150;
// let facing = "Right";
// let lastMode = "Sleep"
// let mode = "Sleep"
// let modes = ["Walk", "Run", "Sit", "Sleep"]
// let dirs =  ["Up", "Down", "Left", "Right"]
// let myName = "titan"
// let character;

// exec
initGrid();
// initMapTiles("brownfloor_2_2.png");
// initCharacter("titan");
// updateCharacter("titan", currentCell);