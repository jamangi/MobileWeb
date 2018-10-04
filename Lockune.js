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

		this.charDiv = document.getElementById(this.ID);
		this.user = user;
		this.pathSearch = makeSimpleSearch(this);
		this.dialogueDiv = document.getElementById("dialogue");
		this.headshotImg = document.getElementById("headshotImg");
		this.selectBox = document.getElementById("selectBox");
		this.infoBox = document.getElementById("infoBox");
		this.infoBoxName = document.getElementById("infoBoxName");
		this.infoBoxClose = document.getElementById("infoBoxClose");
		this.infoBoxGif = document.getElementById("infoBoxGif");




		this.context = 'training1';
		this.textBlocks = {training1: []};
		this.functions = {training1: []};
		this.textIndex = 0;
		this.functionIndex = 0;

		this.mood = "SmileSmall";
		this.expression = this.imgFolder + this.imgName + this.mood + '.png';

		/// interactive functions
		this.open = this.makeOpen();
		this.close = this.makeClose();
		this.hide = this.makeHide();
		this.toggle = this.makeToggle();
		this.nextText = this.makeNextText();
		this.talk = this.makeTalk();
		this.recover = this.makeRecover();

		this.menuItems = [["Talk", this.talk],["Heal", this.recover]]

		this.dialogueDiv.style.display = "none";
		
		this.charDiv.addEventListener("click", this.toggle, false);
		this.infoBox.addEventListener("click", this.hide, false);

		

	}

		execute(){
			this.functions[this.context][this.functionIndex]();
		} 
		print(){
			this.selectBox.innerHTML = this.textBlocks[this.context][this.textIndex];
		} //print textBlock[textIndex]
		makeNextText(){
			let home = this;
			function nextText(){
				home.textIndex++;
				if (home.textIndex >= home.textBlocks[home.context].length)
				{
					home.textIndex = 0;
					home.selectBox.removeEventListener("click", home.nextText, false);
					home.nextFunction();
				}
			} //change textIndex, print or nextFunction

			return nextText;
		}
		nextFunction(){
			this.functionIndex++;
			if (this.functionIndex >= this.functions[this.context].length){
				this.close();
			}
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
					home.dialogueDiv.style.display = "block";
				else
					home.dialogueDiv.style.display = "none";
			}
			return toggle;
		}
		makeOpen() {
			let home = this;
			function open(){ //might check context to decide expression
				home.headshotImg.setAttribute("src", home.expression);
				home.dialogueDiv.style.display = "block";
				home.execute();

			}
			return open;
		}
		makeTalk(){
			let home = this;
			function talk(){
				console.log("talk selected");
				hide.textIndex = 0;
				hide.print();
				hide.selectBox.addEventListener("click", hide.nextText, false);
				hide.infoBox.removeEventListener("click", hide.close, false);
				hide.infoBox.addEventListener("click", hide.hide, false);
				hide.infoBoxClose.innerHTML = "hide";
			} //set textIndex to 0, print, add Next listener // replace close with hide from infobox
			return talk;
		}
		menu(){
			this.selectBox.removeEventListener("click", this.nextText, false);
			this.infoBox.addEventListener("click", this.close, false);
			this.infoBox.removeEventListener("click", this.hide, false);
			this.infoBoxClose.innerHTML = "close";

			this.selectBox.innerHTML = "";
			for (let item in this.menuItems) {
				this.selectBox.innerHTML += "<div id="+item[0]+" class='selectChoice'>"+item[0]+"</div>"
				let selection = document.getElementById(item[0]);
				selection.addEventListener("click", item[1]);
			}
		} // replace hide with close listener in infoBox // add close listener
		makeRecover(){
			let home = this;
			function recover(){
				console.log("recover selected");
			}
			return recover;
		}
		processSelection(){}
		teachFile(){} 
		teachConsume(){}


	}