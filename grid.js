window.onload = function() {

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

    function initGrid() {
        // fill the gamebox with divs

        gb = document.getElementById('gamebox');
        gbheight = gb.offsetHeight;
        gbwidth = gb.offsetWidth;
        shortest = gbheight < gbwidth? gbheight : gbwidth;

        // cellsize is a fraction of shortest dimension
        cellSize = (shortest / fraction);

        // calculate amount of expected cells
        gameCols = Math.floor(gbwidth / (cellSize + debugBorder));
        let gameColsRemainder = gbwidth % gameCols;
        gameRows = Math.floor(gbheight / (cellSize + debugBorder));
        let gameRowsRemainder = gbheight % gameRows;
        cellCount = gameCols * gameRows;

        for (let id = 0; id < cellCount; id++) {
            let cell = document.createElement("div");
            cell.setAttribute("class", "cell");
            cell.setAttribute("id", id);
            // cell.addEventListener("click", cellClick);
            cell.style.height = cellSize + (gameRowsRemainder / gameRows) + "px";
            cell.style.width = cellSize + (gameColsRemainder / gameCols) + "px";
            gb.appendChild(cell);
        }

    }
    


/*
function clearGrid() {
    // dispose of gamebox element

    let gb_parent = gb.parentNode;
    gb_parent.removeChild(gb);

    gb = document.createElement("article");
    gb.setAttribute("id", "gamebox");
    gb_parent.appendChild(gb);
    clearCharacter("titan");
}

function cellClick() {
    console.log(this.id);
    clickedCell = this.id;
    if (done === true)
        pathSearch(this.id);
}

function findCell(id){
    let col = id % gameCols;
    let row = Math.floor(id / gameCols);

    return {left: col * cellSize, top: row * cellSize};
}


window.onresize = function(event) {
    // clearGrid()
    // clearAll();
    // initMap();
    // initGrid();
    // initMapTiles("brownfloor_2_2.png");
    // initCharacter(myName);
}
*/

///////////////////////////////
////////////// MAP ////////////
//////////////////////////////

    let mapSize = [20, 20]
    let mapRows = mapSize[1];
    let mapCols = mapSize[0];
    let origin = [0, 0]
    let map = document.getElementById("map")
    let body = document.getElementById("body");



    function createObject(folder, name, size, mapCell){
    let obj = document.createElement("div");
    obj.style.width = (size[0] * cellSize + debugBorder) + "px";
    obj.style.height = (size[1] * cellSize + debugBorder) + "px";
    obj.style.position = "absolute";
    obj.setAttribute("class", "object mapTile");
    obj.mapCell = mapCell;
    setMapPosition(obj);

    // let helper = document.createElement("div");
    // helper.setAttribute("class", "helper")


    let img = document.createElement("img");
    img.setAttribute("src", "images/"+folder+"/"+name);


    obj.append(img);
    // obj.append(helper);
    map.append(obj);
}


function setMapPosition(obj) {
    let coordinates = findMapCoordinates(obj.mapCell);
    obj.style.left = origin[0] + coordinates.left + "px";
    obj.style.top = origin[1] + coordinates.top + "px";
}

function findMapCoordinates(mapCell) {
    let col = mapCell % mapSize[0];
    let row = Math.floor(mapCell / mapSize[0]);
    return {left: col * cellSize, top: row * cellSize};
}


function gameCellToMapCell(id) {
    return findMapCell(mapRow(gameRow(id)), mapCol(gameCol(id)));
}

function findMapCell(mapRow, mapCol){return (mapCols * mapRow) + mapCol;}
function mapRow(gameRow){return origin[1] + gameRow;}
function mapCol(gameCol){return origin[0] + gameCol;}
function gameRow(id) {return Math.floor(id / gameCols);}
function gameCol(id) {return id % gameCols;}

function clearAll(){
    body.removeChild(map);
    body.removeChild(footer)
}


function initMap() {
    map = document.createElement("main");
    map.setAttribute("id", "map");
    gb = document.createElement("article");
    gb.setAttribute("id", "gamebox");
    material = document.createElement("aside");
    material.setAttribute("id", "material");
    footer = document.createElement("footer");
    footer.setAttribute("id", "footer");
    map.append(gb);
    map.append(material);
    body.append(map);
    body.append(footer);

}

function initMapTiles(name) {
    for (let mapRow = 0; mapRow < mapSize[0]; mapRow+=2) {
        for(let mapCol = 0; mapCol < mapSize[1]; mapCol+=2){
            let x = findMapCell(mapRow, mapCol)
            createObject("map/floor", name, [2,2], x);
            console.log(x)
        }
    }
}

////////////////////////////////////
//////////// EXECUTION /////////////
////////////////////////////////////
initGrid();
initMapTiles("brownfloor_2_2.png");

}