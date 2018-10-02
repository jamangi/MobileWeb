class Controller {
	constructor (char) {
		this.character = char;
		this.gb = document.getElementById("gamebox");
		this.runButton = document.getElementById("run");
		this.gb.addEventListener("click", this.makeClickListener());
		this.runButton.addEventListener("click", this.makeRunToggle());
	}

	makeClickListener() {
		let home = this;
		function processClick() {
			let mapRow = Math.floor((event.clientY+home.gb.scrollTop) / home.character.map.cellSize); 
			let mapCol = Math.floor((event.clientX+home.gb.scrollLeft) / home.character.map.cellSize);
			home.character.go(mapRow, mapCol)
		}
		return processClick;
	}


	makeRunToggle() {
		let home = this;
		function processClick() {
			if (home.runButton.className === "clicked"){
				home.runButton.className = "";
				home.character.mode = "Walk"
			}
			else{
				home.runButton.className = "clicked";
				home.character.mode = "Run"
			}
		}
		return processClick;
	}
}