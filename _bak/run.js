const sqlite3 = require('sqlite3').verbose();

let dbFrom = new sqlite3.Database('db/enDict12.db');
let db = new sqlite3.Database('enDict.db');

var html2bracket = function (line) {
  return line.replace(/<span class=\"super\">ə<\/span>/g, '(ə)');
};

var bracket2html = function (line) {
  return line.replace(/\(ə\)/g, '<span class=\"super\">ə<\/span>');
};

var createSQL;
createSQL  = 'create table if not exists words(';
createSQL += 'id integer primary key,';
createSQL += 'gb_word text not null,';
createSQL += 'us_word text default "",';
createSQL += 'ph_word text default "",';
createSQL += 'ir_word text default "",';
createSQL += 'pl_word text not null,';
createSQL += 'notes text default ""';
createSQL += ');';

var selectSQL = 'select gb_word, us_word, pl_word, notes, pronunciation, ir_word from words';
var insertSQL = 'insert into words (gb_word, us_word, ph_word, ir_word, pl_word, notes) values (?, ?, ?, ?, ?, ?)';

db.run(createSQL);

dbFrom.each(selectSQL, (err, row) => {
	if (err) { console.log(err.message); }
	
	db.run(insertSQL,
	[row.gb_word,
	row.us_word,
	html2bracket(row.pronunciation),
	row.ir_word,
	row.pl_word,
	row.notes],
	(err) => { 
		if (err) { console.log("insert: " + error.message); }
	});
	
});
