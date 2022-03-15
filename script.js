function saveStickyNote() {
	var note_title = document.getElementById("sticky_note_title").value;
	var note_text = document.getElementById("sticky_note_text").value;
	
	if (note_title.length == 0 || note_text.length == 0) {
		return;
	}

	var storage_key = "stickynote-" + new Date().valueOf();
	var storage_item = note_title + "{{{" + note_text;
		
	localStorage.setItem(storage_key, storage_item);
	
	document.getElementById("sticky_note_title").value = "";
	document.getElementById("sticky_note_text").value = "";
	
	listStickyNotes();
}

function listStickyNotes() {

	var localstorage_array = new Array();
	for (var i = 0; i < localStorage.length; i++) {
		var storage_key = localStorage.key(i);

		if (storage_key.indexOf("stickynote-") == 0) {
			var storage_item = localStorage.getItem(storage_key);
			localstorage_array.push(storage_key + "{{{" + storage_item);
		}
	}
	var sorted_localstorage_array = localstorage_array.sort();

	var all_sticky_notes = "";
	for (var k = 0; k < sorted_localstorage_array.length; k++) {
		
		var localstorage_item = sorted_localstorage_array[k];
		
		var item_array = localstorage_item.split("{{{");
		var storage_key = item_array[0];
		var note_title = item_array[1];
		var note_text = item_array[2];

		var note = `<div class="delete_x" onclick="deleteStickyNote('${storage_key}')">X</div>`;
		note += "<h3>" + note_title + "</h3>";
		note += `<p contenteditable="true" onblur="updateStickyNote('${storage_key}', this)">${note_text}</p>`;
		//var css = "background-color:rgb(" + getRandomInt(150, 255) + "," + getRandomInt(150, 255) + "," + getRandomInt(150, 255) + ")";
		all_sticky_notes = all_sticky_notes + "<div id='note" + k + "' class='sticky_note_box'>" + note + "</div>";
	}

	document.getElementById("sticky_notes_container").innerHTML = all_sticky_notes;
	document.getElementById("sticky_note_title").focus();
}

function updateStickyNote(storage_key, paraElement) {
	var storage_item = localStorage.getItem(storage_key);
	var item_array = storage_item.split("{{{");
	var note_title = item_array[0];
	var note_text = paraElement.innerHTML;
	var storage_item = note_title + "{{{" + note_text;
	localStorage.setItem(storage_key, storage_item);
}

function deleteStickyNote(storage_key) {
	var storage_item = localStorage.getItem(storage_key);
	var note_title = storage_item.split("{{{")[0];
	var confirmed = confirm("Delete '" + note_title + "'?");
	if (confirmed) {
		localStorage.removeItem(storage_key);
		listStickyNotes();
	}			
}

function deleteAllStickyNotes() {
	var confirmed = confirm("Delete all notes?");
	if (confirmed) {
		for (var i = 0; i < localStorage.length; i++) {
			var storage_key = localStorage.key(i);
			if (storage_key.indexOf("stickynote-") == 0) {
				localStorage.removeItem(storage_key);
			}
		}		
		listStickyNotes();
	}			
}


function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1) ) + min;
}

