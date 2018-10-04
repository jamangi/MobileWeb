class Display {
	constructor(char) {
		this.character = char;
		this.map = char.map;
		this.displayDiv = document.getElementById("display");
		this.dialogueDiv = document.getElementById("dialogue");
		this.headshotImg = document.getElementById("headshotImg");
		this.consoleDiv = document.getElementById("console");
		this.scriptsDiv = document.getElementById("scripts");

		this.consoleButton = document.getElementById("consoleButton");
		this.materialButton = document.getElementById("materialButton");

	}

	
}