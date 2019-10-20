function errorDB(err) { alert("Error processing SQL: "+ err.code + " " + err.message); }
function successDB() {}
function errorFile(err) { alert("FileSystem Error: " + err); }

function createDB(tx){
  var createSQL;
  createSQL  = 'create table if not exists words(id integer primary key, gb_word text not null, us_word text default "", ph_word text default "", ir_word text default "", pl_word text not null, notes text default "",  rate integer default 0, added text default "", inpart integer default 0, unique(gb_word, pl_word) on conflict ignore)';
  tx.executeSql(createSQL);
  
  createSQL  = 'create table if not exists parts (';
  createSQL += 'id integer primary key,';
  createSQL += 'part txt not null,';
  createSQL += 'used integer default 0,';
  createSQL += 'lastused text default ""';
  createSQL += ');';
  tx.executeSql(createSQL); 
}

function countRecords (msg) {
  db.transaction(function(tx){
    tx.executeSql("select count(*) as myCount from words", [],function(tx1, result) {	 
      msg = msg.replace("?", result.rows.item(0).myCount);
      app.dbMessage(msg);
    }, errorDB);
  }, errorDB, successDB);
}

function shuffle(array) {
  var counter = array.length;
  while (counter > 0) {
    var index = Math.floor(Math.random() * counter);
    counter--;
    var temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }
}

function removeHTML(text) {
  return text.replace(/\</g,'[').replace(/\>/g,']')
}

var coma2pl = function (pl_line) {
  // male litery
  var line = pl_line.replace(/z\'\'/g, 'ź');
  line = line.replace(/z\'/g, 'ż');
  line = line.replace(/a\'/g, 'ą');
  line = line.replace(/c\'/g, 'ć');
  line = line.replace(/e\'/g, 'ę');
  line = line.replace(/l\'/g, 'ł');
  line = line.replace(/n\'/g, 'ń');
  line = line.replace(/o\'/g, 'ó');
  line = line.replace(/s\'/g, 'ś');
  // duze litery
  line = line.replace(/Z\'\'/g, 'Ź');
  line = line.replace(/Z\'/g, 'Ż');
  line = line.replace(/A\'/g, 'Ą');
  line = line.replace(/C\'/g, 'Ć');
  line = line.replace(/E\'/g, 'Ę');
  line = line.replace(/L\'/g, 'Ł');
  line = line.replace(/N\'/g, 'Ń');
  line = line.replace(/O\'/g, 'Ó');
  line = line.replace(/S\'/g, 'Ś');
  return line;
};

var bracket2html = function (line) {
  return line.replace(/\(ə\)/g, '<span class=\"super\">ə<\/span>');
};

var db = window.openDatabase("enWords.db", "1.0", "enWords", 1000000);
