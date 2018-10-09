function setValues(obj, left, top, width, height){
	obj.style.left = left + "px";
	obj.style.top = top + "px";
	obj.style.width = width + "px";
	obj.style.height = height + "px";
}

function check(map, row, col){
	return map.barrierList[row +'-'+col] === undefined;
}

function ajaxRequest(endpoint, input, callback){
	let service = "http://localhost:9090/"+endpoint;
	console.log(service);
	let xhr = new XMLHttpRequest();
	xhr.open("POST", service, true);
	xhr.setRequestHeader("Content-Type", "application/json");
	xhr.onreadystatechange = function() {
		if (xhr.readyState === 4 && xhr.status === 200) {
        	let json = JSON.parse(xhr.responseText);
        	console.log("returned: "+json);
        	callback(json);
    	}
	}
	let data = JSON.stringify(input);
	console.log("data to send: "+data);
	xhr.send(data);

}

class HeartDebugger {
	constructor(){
		this.debugMode = true;
		this._log = [];
		this.footer = document.getElementById("debugError");
	}

	log(msg) {this._log.push(msg)}

	showLogs() {
		if (!this.debugMode)
			return
		this.footer.innerHTML = 'Debug';
		for (let msg of this._log)
			this.footer.innerHTML += " - "+msg;
	}
}

function log(msg) {
	if (window.heartDebugger === undefined)
		window.heartDebugger = new HeartDebugger();
	heartDebugger.log(msg); 
}

function showLogs() {
	heartDebugger.showLogs();
}


