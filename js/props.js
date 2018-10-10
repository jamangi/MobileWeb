function loiterers(map, row, col){
	let ctop = {ID: "cabinetTop_0", objWidth: 2, objHeight: 1, barrierList: [], 
					 img: "images/map/material/cabinet_top.png"}
	let cbot = {ID: "cabinetBottom_0", objWidth: 2, objHeight: 1, barrierList: [[0,0],[0,1]], 
			 img: "images/map/material/cabinet_bottom.png"}
	let cabinetTop = new ImageObject(ctop.ID, ctop.objWidth, ctop.objHeight, ctop.barrierList, ctop.img);
	cabinetTop.zOffset = 1;
	let cabinetBot = new ImageObject(cbot.ID, cbot.objWidth, cbot.objHeight, cbot.barrierList, cbot.img);
	map.addObject(cabinetTop, row, col);
	map.addObject(cabinetBot, row + 1, col);

	let left = [row + 1, col + 2];
	let right = [row + 1, col + 4];
	let up = [row, col + 1];
	let down = [row + 2, col + 3];

	let loiterRight = {row: right[0], col: right[1], axis:"col", rangeLow:right[1], rangeHigh:right[1] + 1};
	let loiterLeft = {row: left[0], col: left[1], axis:"col", rangeLow:left[1]-1, rangeHigh:[1]}
	let loiterUp = {row: up[0], col: up[1], axis:"row", rangeLow:up[0]-1, rangeHigh:up[0]};
	let loiterDown = {row: down[0], col: down[1], axis:"row", rangeLow:down[0], rangeHigh:down[0]+1};
	let rotateDelay = 2000;

	makeLoiterer(loiterLeft, rotateDelay, rotateDelay * 0, map)();
	makeLoiterer(loiterUp, rotateDelay, rotateDelay * 1, map)();
	makeLoiterer(loiterRight, rotateDelay, rotateDelay * 2, map)();
	makeLoiterer(loiterDown, rotateDelay, rotateDelay * 3, map)();
}