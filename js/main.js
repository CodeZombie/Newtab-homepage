//runs once the page is finished loading.
function start() {
	note_display();
	document.getElementById("search_input").focus();
}

function pressed_enter(e, func) {
	if(!e || e.keyCode == 13) {
		func();
	}
}

//grabs text from the "search_input" field, and uses it for a google query.
function search() {
	var query_text = document.getElementById("search_input").value;
	if (query_text != "") {
		document.location.href = "https://www.google.ca/search?q=" + query_text;
		return true;
	}
}

//grabs text from the "note_input" field and adds it to the note_list table in the database
function note_add(){
	var note_text = document.getElementById("note_input").value;
	if (note_text != "") {
		database_insert("note_list", note_text);
		note_display();
		document.getElementById("note_input").value = "";
		return true;
	}
}

//deletes a note item from the database table.
function note_delete(index) {
	database_delete_column("note_list", index);
	note_display();
}

//clears the note_container, and refills it with updated note items
function note_display() {
	var note = database_get_table("note_list");
	var container = document.getElementById("note_container");
	document.getElementById("note_container").innerHTML = "";
	for (var i = 0; i < note.length; i++) {
		container.innerHTML = container.innerHTML + '<div class="row"><div class="note_text">' + note[i] + '</div><div class="note_control_button x" onclick="javascript:note_delete(' + i + ');">&nbsp;</div></div>';
	}
}