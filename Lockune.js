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

		this.user = user;
		this.pathSearch = makeSimpleSearch(this);

			}
	}