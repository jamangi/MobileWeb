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