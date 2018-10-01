class Map {
	constructor(mapWidth, mapHeight, mapRows, mapCols, floorTileImg) {
		this.mapWidth = mapWidth;
		this.mapHeight = mapHeight;
		this.mapRows = mapRows;
		this.mapCols = mapCols;
		this.cellSize = mapWidth / mapCols;
		this.floorTileImg = floorTileImg;
		this.mapDiv = document.getElementById("map");
		this.mapDiv.map = this;
	}

	setTiles() {
		for (let i = 0; i < this.mapRows; i+=2)
			for (let j = 0; j < this.mapCols; j+=2)
				this.layTile(i, j, 2);
	}

	layTile(row, col, size) {
		let tile = document.createElement("div"); 
		tile.style.height = this.cellSize * size + "px"; 
		tile.style.width = this.cellSize * size + "px";
		tile.style.left = col * this.cellSize + "px";
		tile.style.top = row * this.cellSize + "px";
		tile.setAttribute("class", "tile"); 
		this.mapDiv.append(tile);
		let tileImg = document.createElement("img"); 
		tile.append(tileImg);
		tileImg.setAttribute("src", this.floorTileImg);

	}
}