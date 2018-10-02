class Controller {
	constructor (char) {
		this.character = char;
		this.gb = document.getElementById("gamebox");
		document.addEventListener("click", this.makeClickListener());
	}

	makeClickListener() {
		let home = this;
		function processClick(){
			let mapRow = Math.floor((event.clientY+home.gb.scrollTop) / home.character.map.cellSize); 
			let mapCol = Math.floor((event.clientX+home.gb.scrollLeft) / home.character.map.cellSize);
			home.character.go(mapRow, mapCol)
		}
		return processClick;
	}
}