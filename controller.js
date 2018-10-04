class Controller {
	constructor (char) {
		this.character = char;
		this.gb = document.getElementById("gamebox");
		this.runButton = document.getElementById("runButton");
		this.findButton = document.getElementById("findButton");
		this.consoleButton = document.getElementById("consoleButton");
		this.findInterval = undefined;

		this.userSelect = document.getElementById("userSelect");
		this.userHeadshot = document.getElementById("userHeadshot");
		this.userCollected = document.getElementById("userCollected");
		this.userDefeats = document.getElementById("userDefeats");
		this.userLocation = document.getElementById("userLocation");
		this.userGif = document.getElementById("userGif");

		this.collectDiv = document.getElementById("collect");
		this.dropDiv = document.getElementById("drop");

		this.materialButton = document.getElementById("materialButton");
		this.map = char.map;
		this.selectedIDs = [];
		this.selectedImageObject = undefined;
		this.selectedDiv = undefined;


		this.gb.addEventListener("click", this.makeClickListener());

		this.runButton.addEventListener("click", this.makeToggle());
	
		this.findButton.addEventListener("click", this.makeFind());

		this.consoleButton.addEventListener("click", this.makeToggle());
		this.materialButton.addEventListener("click", this.makeToggle());

		this.userSelect.style.display = 'none';
		this.dropDiv.style.display = 'none';
		this.collectDiv.style.display = 'none';

		this.scrollToLeft = 0;
		this.scrollToTop = 0;
		this.midpoint = [];
		this.midpoint[0] = Math.floor(this.gb.offsetWidth / 2);
		this.midpoint[1] = Math.floor(this.gb.offsetHeight / 2);


	}

	makeClickListener() {
		let home = this;
		function processClick() {
			//reset display - display class

			let mapRow = Math.floor((event.clientY+home.gb.scrollTop) / home.character.map.cellSize); 
			let mapCol = Math.floor((event.clientX+home.gb.scrollLeft) / home.character.map.cellSize);
			home.character.go(mapRow, mapCol)
			//home.selectedImageObject = home.map.items(mapRow, mapCol);
			// reset display
			let objs = home.map.getItems(mapRow, mapCol); // if its a character, display
			for (let obj of objs)
				if (obj.constructor.name == "Character"){
					home.selectedIDs = []
					home.selectedIDs.push(obj.ID);
				}
			//decide what was clicked - set selectedId

		}
		return processClick;
	}

	makeFind() {
		let home = this;
		function findUser(){ //char replaced with selectedId
			home.find(home.character, home);

		}
		return findUser;
	}

	find(char, home){
		let midpoint = [];
		

		let left = home.character.left - home.midpoint[0];
		let top = home.character.top - home.midpoint[1];
		home.gb.scrollTo(left, top)
	}


	makeToggle() {
		let home = this;
		function processClick() {
			let id = this.getAttribute("id")
			if (this.className === "clicked"){
				this.className = "";
				if (id === "runButton")
					home.character.mode = "Walk";
				if (id === "consoleButton")
					home.userSelect.style.display = "none";
					
			}
			else{
				this.className = "clicked";
				if (id === "runButton")
					home.character.mode = "Run";
				if (id === "consoleButton")
					home.userSelect.style.display = "block";
					
			}
		}
		return processClick;
	}
}