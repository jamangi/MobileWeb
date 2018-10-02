function setValues(obj, left, top, width, height){
	obj.style.left = left + "px";
	obj.style.top = top + "px";
	obj.style.width = width + "px";
	obj.style.height = height + "px";
}

function check(map, row, col){
	return map.barrierList[row +'-'+col] === undefined;
}

class Node {
	constructor(map, row, col) {
		this.map = map, this.row = row, this.col = col;
		if (this.map.search === undefined)
			this.map.search = []
	}
	mark(){this.map.search[row][col] = true;}
}