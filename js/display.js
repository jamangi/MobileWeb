class Display {
	constructor(char) {
		this.character = char;
		this.map = char.map;
		this.displayDiv = document.getElementById("display");
		this.displayDiv.display = this;

		this.dialogueDiv = document.getElementById("dialogue");
		this.dialogueVisual = document.getElementById("dialogueVisual");


		this.scriptDiv = document.getElementById("scriptDiv");
		this.dropScriptDiv = document.getElementById("dropScriptText");
		this.collectScriptDiv = document.getElementById("collectScriptText");

		this.userSelect = document.getElementById("userSelect");

		this.components = [this.dialogueDiv, this.dialogueVisual,
						   this.scriptDiv, this.dropScriptDiv, 
						   this.collectScriptDiv, this.userSelect,
						   this.displayDiv]
		this.dialogue = [this.dialogueDiv, this.dialogueVisual]
		this.drop = [this.userSelect, this.scriptDiv, this.dropScriptDiv]
		this.collect = [this.userSelect, this.scriptDiv, this.collectScriptDiv]
		this.stats = []

		this.off();

	}

	on(view){
		this.unset();
		for (let v of this[view])
			v.style.display = "block";
		this.displayDiv.style.display = "block";
		this.dropScriptDiv.focus();
	}

	off(){
		log("dsplay:off")
		this.unset();
	}

	toggle(view){
		let isOn = false;
		for (let v of this[view])
			if (v.style.display == "none")
				isOn = true;
			else
				isOn = false;
		if (isOn)
			this.on(view)
		else
			this.unset();
	}

	unset(){
		log("display:unset")
		for (let block of this.components)
			block.style.display = "none";
		this.unclick();
	}

	unclick(){
		log("display:unclick")
		let clicked = document.getElementsByClassName("clicked");
		log("display:clicked: "+clicked);
		if (clicked)
			for (let ele of clicked)
				ele.className = "";
	}

}