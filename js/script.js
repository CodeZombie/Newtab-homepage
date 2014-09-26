//runs once the page is finished loading.
function start() {
	setTime();
	todo_display();
	setInterval("setTime()", 10000);
	document.getElementById("search").focus();
}

//retrieves, and formats time in a aesthetically pleasing way.
function setTime() {
	time = new Date();
	hours = time.getHours();
	minutes = time.getMinutes();
	appendage = "am"
	
	if (hours == 0) {
		hours = 24;
	}
	if (hours > 12 && hours < 24) {
		hours = hours - 12;
		appendage = "pm"
	}
	else if (hours == 12) {
		appendage = "noon"
	}
	else if (hours == 24) {
		hours = hours - 12;
		appendage = "mdnt"
	}
	if (minutes <= 9) {
		minutes = "0" + minutes;
	}
	
	document.getElementById("time").innerHTML = hours + ':' + minutes + appendage;
}

function pressed_enter(e, func) {
	if(!e || e.keyCode == 13) {
		func();
	}
}

//grabs text from the "search" field, and uses it for a duckduckgo query.
function search() {
	var query_text = document.getElementById("search").value;
	if (query_text != "") {
		document.location.href = "https://duckduckgo.com/?q=" + query_text;
		return true;
	}
}

//grabs text from the "todo" field and adds it to the todo_list database table
function todo_add(){
	var todo_text = document.getElementById("todo").value;
	if (todo_text != "") {
		database_insert("todo_list", todo_text);
		todo_display();
		document.getElementById("todo").value = "";
		return true;
	}
}

//deletes a todo item from the database table.
function todo_delete(index) {
	database_delete_column("todo_list", index);
	todo_display();
}

//clears the todo_container, and refills it with updated todo items
function todo_display() {
	var todo = database_get_table("todo_list");
	var container = document.getElementById("todo_container");
	document.getElementById("todo_container").innerHTML = "";
	for (var i = 0; i < todo.length; i++) {
		container.innerHTML = container.innerHTML + '<span class="item">' +	todo[i] + '<span class="close_button" onclick="javascript:todo_delete(' + i + ');">[X]</span></span>';
	}
}
