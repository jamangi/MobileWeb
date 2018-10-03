class Controller {
	constructor (char) {
		this.character = char;
		this.gb = document.getElementById("gamebox");
		this.runButton = document.getElementById("runButton");
		this.findButton = document.getElementById("findButton");
		this.consoleButton = document.getElementById("consoleButton");
		this.materialButton = document.getElementById("materialButton");
		this.map = char.map;
		this.selectedID = undefined;
		this.selectedImageObject = undefined;
		this.selectedDiv = undefined;
		this.gb.addEventListener("click", this.makeClickListener());
		this.runButton.addEventListener("click", this.makeToggle());
		this.findButton.addEventListener("click", this.makeToggle());
		this.consoleButton.addEventListener("click", this.makeToggle());
		this.materialButton.addEventListener("click", this.makeToggle());
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


	makeToggle() {
		let home = this;
		function processClick() {
			let id = this.getAttribute("id")
			if (this.className === "clicked"){
				this.className = "";
				if (id === "runButton")
					home.character.mode = "Walk"
			}
			else{
				this.className = "clicked";
				if (id === "runButton")
					home.character.mode = "Run"
			}
		}
		return processClick;
	}
}