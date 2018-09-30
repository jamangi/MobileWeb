class Character {
	constructor(id, imgFolder, imgName, imgCellWidth, imgCellHeight,
	            row, col, pose, basePose, facing, baseSpeed, mode, map, search) {
		this.uid = id; 
		this.map = map;     
		this.row = row; 
		this.col = col; 
		this.selectedRow = row; 
		this.selectedCol = col;
		this.facing = facing; 
		this.mode = mode;
		this.basePose = basePose;
		this.pose = pose;
		this.lastPose = pose;
		this.baseSpeed = baseSpeed; 
		this.speed = baseSpeed;
		this.charDiv = undefined; 
		this.charImgDiv = undefined;
		this.left = col * map.cellSize; 
		this.top = row * map.cellSize;  
		this.imgFolder = imgFolder;
		this.imgName = imgName;
		this.imgId = id + "Img";
		this.imgCellWidth = imgCellWidth; 
		this.imgCellHeight = imgCellHeight;
		this.pathSearch = search;
		this.done = true;
		//create character object
		let gb = document.getElementById("gamebox"); 
		let charDiv = document.createElement("div"); this.charDiv = charDiv;
		let img = document.createElement("img"); this.charImgDiv = img;
		charDiv.append(img); gb.append(charDiv)
		charDiv.setAttribute("id", this.uid); charDiv.setAttribute("class", "character");
		charDiv.style.left = this.left + "px"; charDiv.style.top = this.top + "px";
		charDiv.style.height = this.imgCellHeight * this.map.cellSize;
		charDiv.style.width = this.imgCellWidth * this.map.cellSize;
		charDiv.style["z-index"] = this.col;
		charDiv.style.transition = "left "+this.speed+"ms linear, top "+this.speed+"ms linear";
		img.setAttribute("src", this.imgFolder+"/"+this.imgName+this.pose+this.facing+".gif"); 
		img.setAttribute("id", this.imgId);

	}

	go(row, col){
		this.selectedRow = row, this.selectedCol = col;
		if (this.done){
			this.done = false;
			this.pathSearch();
		}
	}

	update(destRow, destCol){
		// pathSearch calculates destRow and destCol, but changes nothing
			// so update much change things: done*, pose*, col*, row*
			// and speed* (pathsearch using timeout(update,recur, speed))
		// might let characters have their own update functions later
		if (this.col < destCol) this.facing = "Right";
		else if (this.col > destCol) this.facing = "Left";
		else if (this.row < destRow) this.facing = "Up";
		else if (this.row > destRow) this.facing = "Down";
		else done = true;

		// 
		this.lastPose = this.pose;
		this.pose = this.mode;
		if (this.mode === "Run") this.speed = this.baseSpeed / 2;
		else this.speed = this.baseSpeed;

		// check for obstacle, change cell and change position only if no obstacle
		if(this.done === false){
			switch(this.facing){
				case "Right": this.col += 1; break;
				case "Left": this.col -= 1; break;
				case "Up": this.row -= 1; break;
				case "Down": this.row += 1; break;
			}	

		} else {this.pose = this.basePose;}
		// reposition
		this.reposition();
	}

	reposition(){
		this.left = this.col * this.map.cellSize;
		this.top = this.row * this.map.cellSize;
		this.charDiv.style.transition = "left "+this.speed+"ms linear, top "+this.speed+"ms linear";
		this.charDiv.style.left = this.left + "px";
		this.charDiv.style.top = this.top + "px";
		let src = this.imgFolder+this.imgName+this.pose+this.facing+".gif"
		if (this.lastPose !== this.pose)
			this.charImgDiv.setAttribute("src", src);
	}

}