class Lockune extends Character {
	constructor(user) {
		
		let ID = "lockune",
			imgFolder = "images/people/lockune/", 
			imgName="lockune",
			imgCellWidth = 1, 
			imgCellHeight = 1,  
			baseSpeed=125, 
			basePose="Stand",
			facing="Down", 
			mode="Walk",
			row = 2,
			col = 5,
			map = user.map;

		super(ID, imgFolder, imgName, imgCellWidth, imgCellHeight,
	    	  row, col, basePose, facing, baseSpeed, mode, map, null);

		// character mind
		this.user = user;
		this.context = 'training1';
		this.objective = 'roam';
		this.mood = "SmileSmall";
		this.expression = this.imgFolder + this.imgName + this.mood + '.png';
		this.pathSearch = makeSimpleSearch(this);

		// relavant html elements
		this.charDiv = document.getElementById(this.ID);
		this.dialogueDiv = document.getElementById("dialogue");
		this.headshotImg = document.getElementById("headshotImg");
		this.selectBox = document.getElementById("selectBox");
		this.infoBox = document.getElementById("infoBox");
		this.infoBoxName = document.getElementById("infoBoxName");
		this.infoBoxClose = document.getElementById("infoBoxClose");
		this.infoBoxGif = document.getElementById("infoBoxGif");

		/// interactive functions
		this.open = this.makeOpen();
		this.close = this.makeClose();
		this.hide = this.makeHide();
		this.toggle = this.makeToggle();
		this.nextText = this.makeNextText();
		this.talk = this.makeTalk();
		this.recover = this.makeRecover();
		this.menu = this.makeMenu();

		// dialogue flow
		this.textBlocks = {training1: ["Show me what you got."]};
		this.functions = {training1: [["menu", this.menu]]};
		this.textIndex = 0;
		this.functionIndex = 0;
		this.menuItems = [["Heal", this.recover],["Talk", this.talk]]

		// element control
		this.dialogueDiv.style.display = "none";
		this.charDiv.addEventListener("click", this.toggle, true);
		this.infoBox.addEventListener("click", this.hide, true);

	}

		execute(){
			this.clear();
			this.functions[this.context][this.functionIndex][1]();
		} 
		print(){
			this.clear();
			this.selectBox.innerHTML = this.textBlocks[this.context][this.textIndex];
		} //print textBlock[textIndex]
		makeNextText(){
			let home = this;
			function nextText(){
				home.textIndex++;
				if (home.textIndex >= home.textBlocks[home.context].length)
				{
					home.textIndex = 0;
					home.selectBox.removeEventListener("click", home.nextText, true);
					home.nextFunction();
				} else
					home.print()
			} //change textIndex, print or nextFunction

			return nextText;
		}
		nextFunction(){
			this.functionIndex++;
			if (this.functionIndex >= this.functions[this.context].length){
				if (this.objective === "roam")
					this.menu()
				else
					this.close();
			} else
				this.execute();
		} //remove next listener, increase functionIndex
		makeClose(){
			let home = this;
			function close(){ 
				// would need to undo positional functions
				// or set context
				home.functionIndex = 0;
				home.textIndex = 0;
				home.hide();
			}
			return close;
		}
		makeHide(){
			let home = this;
			function hide(){home.dialogueDiv.style.display = "none";}
			return hide;
		}
		makeToggle(){
			let home = this;
			function toggle(){
				if (home.dialogueDiv.style.display == "none")
					home.open();
				else
					home.hide();
			}
			return toggle;
		}
		makeOpen() {
			let home = this;
			function open(){ //might check context to decide expression
				home.headshotImg.setAttribute("src", home.expression);
				home.dialogueDiv.style.display = "block";
				if (home.functions[home.context][home.functionIndex][0] === "menu")
					home.execute();
			}
			return open;
		}
		makeTalk(){
			let home = this;
			function talk(){
				console.log("talk selected");
				home.textIndex = 0;
				home.print();
				home.infoBox.removeEventListener("click", home.close, true);
				home.infoBox.addEventListener("click", home.hide, true);
				home.infoBoxClose.innerHTML = "hide";
				home.selectBox.addEventListener("click", home.nextText, true);
			} //set textIndex to 0, print, add Next listener // replace close with hide from infobox
			return talk;
		}
		makeMenu(){
			let home = this;
			function menu(){
				home.clear();
				home.selectBox.removeEventListener("click", home.nextText, true);
				home.infoBox.addEventListener("click", home.close, true);
				home.infoBox.removeEventListener("click", home.hide, true);
				home.infoBoxClose.innerHTML = "close";

				for (let item of home.menuItems) {
					let selection = document.createElement("div");
					selection.setAttribute('id', item[0]); 
					selection.setAttribute('class', 'selectChoice');
					selection.innerHTML = item[0];

					selection.addEventListener("click", item[1], false);
					home.selectBox.append(selection);
				}
			} // replace hide with close listener in infoBox // add close listener
			return menu;
		}
		makeRecover(){
			let home = this;
			function recover(){
				console.log("recover selected");
			}
			return recover;
		}

		clear(){
			this.selectBox.innerHTML = "";
		}
		processSelection(){}
		teachFile(){} 
		teachConsume(){}


	}