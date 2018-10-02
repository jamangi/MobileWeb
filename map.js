class Map {
	constructor(mapWidth, mapHeight, mapRows, mapCols, floorTileImg) {
		this.mapWidth = mapWidth;
		this.mapHeight = mapHeight;
		this.mapRows = mapRows;
		this.mapCols = mapCols;
		this.cellSize = mapWidth / mapCols;
		this.barrierList = {}
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

	addObject(imgObj, row, col){
		let imgDiv = document.createElement("div");
		setValues(imgDiv, this.cellSize * col, this.cellSize * row, 
				  this.cellSize * imgObj.objWidth, 
				  this.cellSize * imgObj.objHeight);
		imgDiv.setAttribute("class", "object");
		imgDiv.style['z-index'] = row+1;

		let img = document.createElement("img");
		img.setAttribute("src", imgObj.img);
		imgDiv.append(img);

		this.mapDiv.append(imgDiv);

		for (let barrier of imgObj.barrierList)
			this.barrierList[(barrier[0]+row) + "-" + (barrier[1]+col)] = true;
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

function makeSeaHorse() {
	let m = {mapHeight: 1200, 
			 mapWidth: 1200, 
			 mapRows: 40, 
			 mapCols: 40,
			 cellSize: 1200 / 40,
			 floorTileImg: "images/map/floor/brownfloor_2_2.png"};
	let map = new Map(m.mapWidth, m.mapHeight, m.mapRows, m.mapCols, m.floorTileImg);
	map.setTiles();

	let box = {objWidth: 1, objHeight: 1, barrierList: [[0,0]], 
			   img: "images/map/material/box.png"};
	
	let u = 'up', d = 'down', r = 'right', l = 'left', 
		ul = 'upleft', ur = 'upright', dl = "downleft", dr = "downright";
	let drawlist = [r,r,r,u,u,r,ur,u,r,r,d,d,l,d,d,r,d,d,r];


	drawlist = [r,u,r,u,r,r,u,u,r,r,r,d,l,d,r,d,r,
				d,r,d,r,r,d,l,l,d,l,d,l,d,r,d,l,d,l,d,l,d,d,r,d,d,d,
				l,d,l,l,l,u,u,u,r,r,d,l,d,r,u,r,u,l,u,u,l,
				u,l,u,l,u,l,u,l,u,u,r,u,r,u,r,r,r,u,l,u]


	let cursor = [10, 5];
	map.addObject(box, cursor[0], cursor[1]);
	for (let stroke of drawlist){
		for (let i = 0; i < 2; i++){
			switch(stroke){
				case u: cursor[0] -= 1; break;
				case d: cursor[0] += 1; break;
				case r: cursor[1] += 1; break;
				case l: cursor[1] -= 1; break;
				case ur: cursor[0] -= 1; cursor[1] += 1;
				case ul: cursor[0] -= 1; cursor[1] -= 1;
				case dr: cursor[0] += 1; cursor[1] += 1;
				case dl: cursor[0] += 1; cursor[1] -= 1;
			}
			map.addObject(box, cursor[0], cursor[1]);
		}
		
	}

	return map;

}