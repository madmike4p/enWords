var bracket2html = function (line) {
  return line.replace(/\(ə\)/g, '<span class=\"super\">ə<\/span>');
};

function escape_html(str) {
  
 if ((str===null) || (str===''))
       return false;
 else
   str = str.toString();
  
  var map = {
    '&': '&amp;',
	'<': '&lt;',
	'>': '&gt;',
	'"': '&quot;',
	"'": '&#039;'
  };

  return str.replace(/[&<>"']/g, function(m) { return map[m]; });
}

var position = 0;
var lines;

var prev = document.getElementById("prev");
var next = document.getElementById("next");


function getWord(id) {
	var tab = lines[id].trim().split("|");
	console.log(tab);
	console.log(tab.length);
	var word = {
		gb_word: escape_html(tab[0]),
		us_word: tab[1],
		ph_word: bracket2html(tab[2]),
		ir_word: escape_html(tab[3]),
		pl_word: tab[4],
		notes:	 tab[5]
	};
	
	document.getElementById("gb_word").innerHTML = word.gb_word;
	document.getElementById("ph_word").innerHTML = word.ph_word;
	document.getElementById("ir_word").innerHTML = word.ir_word;
	document.getElementById("pl_word").innerHTML = word.pl_word;
	document.getElementById("notes").innerHTML = word.gb_notes;
}

$(document).ready(function () {
	$.get("data/enDict.txt", function (data) {
	var myDiv = document.getElementById("myDiv");
	lines = data.split("\n");

	getWord(position);
	});
	
	$("#next").on("click", function () {
	position += 1;
	getWord(position);
	});
	
	$("#prev").on("click", function () {
	position -= 1;
	getWord(position);
	});
});