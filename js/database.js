/*
local storage database abstraction layer by Jeremy Clark (2014) (http://zombiearmy.net/)
All files licensed under the MIT license. http://www.opensource.org/licenses/mit-license.php

NOTE: Tables only support a single column.
Tables will resemble the following:

   "Animals"
 index | value
 -------------
  0000 | "dog"
  0001 | "cat"
  0002 | "pig"
  
  ToDo:
  Add a metatable for greater functionality/safety (no more localStorage.clear() to remove tables)
  Add support for multiple columns in each table.

*/

//(C) used to insert data into a table, or to initialize a table.
function database_insert(table, value) { 
	var db_array = localStorage.getItem(table);
	if (db_array !== null && db_array !== undefined){
		db_array = JSON.parse(db_array);
		if (db_array instanceof Array) {
			db_array.push(value);
			localStorage.setItem(table, JSON.stringify(db_array));
			return true;
		}
		return false;
	}
	else {
		var temp_array = [];
		temp_array[0] = value;
		localStorage.setItem(table, JSON.stringify(temp_array));
		return true;
	}
	return false;
}

//(U) update a column within a table with a specified value.
function database_column_update(table, position, value) {
	var db_array = localStorage.getItem(table);
	if (db_array !== null && db_array !== undefined){
		db_array = JSON.parse(db_array);
		if (db_array[position] !== null && db_array[position] !== undefined) {
			db_array[position] = value;
			localStorage.setItem(table, JSON.stringify(db_array));
			return true;
		}
	}
	return false;
}

//(R) return the number of columns in a table
function database_table_length(table) {
	var db_array = localStorage.getItem(table);
	if (db_array !== null && db_array !== undefined){
		db_array = JSON.parse(db_array);
		return db_array.length;
	}
	return false;
}

//write a function that returns all tables (localstorage values that are a JSON'd array) that have been created.
//to properly facilitate this, we may need to create a meta-table to identify tables against non-table arrays

//(R) returns the entire table as an array
function database_get_table(table) {
	var db_array = localStorage.getItem(table);
	if (db_array !== null && db_array !== undefined){
		db_array = JSON.parse(db_array);
		return db_array;
	}
	return false;
}

//(R) returns the value of one column in an table
function database_get_column(table, position) {
	var db_array = localStorage.getItem(table);
	if (db_array !== null && db_array !== undefined){
		db_array = JSON.parse(db_array);
		return db_array[position];
	}
	return false;
}

//(D) deletes a column from a table.
function database_delete_column(table, position) { //delete a value by index
	var db_array = localStorage.getItem(table);
	if (db_array !== null && db_array !== undefined){
		db_array = JSON.parse(db_array);
		db_array.splice(position,1);
		localStorage.setItem(table, JSON.stringify(db_array));
		return true;
	}
	return false;
}

//(D) removes a table and all of its values
function database_delete_table(table) {
	localStorage.removeItem(table);
	return true;
}

//(D) deletes every table stored on this domain space
function database_delete_all() {
	localStorage.clear();
	return true;
}
