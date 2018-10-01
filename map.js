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
		setValues(tile, col * this.cellSize, row * this.cellSize, 
				  this.cellSize * size, this.cellSize * size);
		tile.setAttribute("class", "tile"); 
		let tileImg = document.createElement("img"); 
		tileImg.setAttribute("src", this.floorTileImg);
		tile.append(tileImg);
		this.mapDiv.append(tile);
	}

	makeObject(imgObj, row, col){
		let imgDiv = document.createElement("div");
		setValues(imgDiv, this.cellSize * col, this.cellSize * row, 
				  this.cellSize * imgObj.objHeight, 
				  this.cellSize * imgObj.objHeight);
	}
}

class ImageObject{
	constructor(objWidth, objHeight, barrierList, img){
		this.objWidth = objWidth;
		this.objHeight = objHeight;
		this.barrierList = barrierList;
		this.img = img;
	}
}