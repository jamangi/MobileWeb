class Controller {
	constructor (char) {
		this.character = char;
		this.gb = document.getElementById("gamebox");
		this.map = char.map;
		this.selectedID = undefined;
		this.selectedImageObject = undefined;
		this.selectedDiv = undefined;
		this.runButton = document.getElementById("run");
		this.findButton = document.getElementById("find");
		this.gb.addEventListener("click", this.makeClickListener());
		this.runButton.addEventListener("click", this.makeRunToggle());
	}

	makeClickListener() {
		let home = this;
		function processClick() {
			let mapRow = Math.floor((event.clientY+home.gb.scrollTop) / home.character.map.cellSize); 
			let mapCol = Math.floor((event.clientX+home.gb.scrollLeft) / home.character.map.cellSize);
			home.character.go(mapRow, mapCol)

			home.selectedID = undefined;
			home.selectedImageObject = undefined;
			if (home.selectedDiv)
				home.selectedDiv.classList.remove("selected"); 
			home.selectedDiv = undefined;

			home.selectedImageObject = home.map.item(mapRow, mapCol);
			if (home.selectedImageObject){
				home.selectedID = home.selectedImageObject.ID;
				home.selectedDiv = document.getElementById(home.selectedID);
				home.selectedDiv.classList.add("selected");
			}
			//decide what was clicked - set selectedId
			console.log(home.selectedID);

		}
		return processClick;
	}

	makeFindListener() {
		let home = this;
		function find(char){ //char replaced with selectedId
			let midLeft = home.gb.scrollLeft + home.gb.offsetWidth / 2;
			home.gb.scrollLeft += char.left - midLeft;
			let midTop = home.gb.scrollTop + home.gb.offsetHeight / 2;
			home.gb.scrollLeft += char.top - midTop;
		}
		return find;
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