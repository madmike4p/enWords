function errorDB(err) { alert("Error processing SQL: "+ err.code + " " + err.message); }
function successDB() { alert('Success'); }

function errorFile(err) { alert("FileSystem Error: " + err); }

function createDB(tx){
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
  tx.executeSql(createSQL);
  
  createSQL  = 'create table if not exists test(';
  createSQL += 'id integer primary key,';
  createSQL += 'gb_word text not null,';
  createSQL += 'us_word text default "",';
  createSQL += 'ph_word text default "",';
  createSQL += 'ir_word text default "",';
  createSQL += 'pl_word text not null,';
  createSQL += 'notes text default ""';
  createSQL += ');';
  tx.executeSql(createSQL); 
}

function clearDB(tx){
  tx.executeSql("delete from words where 1");
  tx.executeSql("delete from test where 1"); 
}

function insertRecord(param) {
  return function (tx) {
    var insertSQL = 'insert into words (gb_word, us_word, ph_word, ir_word, pl_word, notes) values (?, ?, ?, ?, ?, ?)';
    tx.executeSql(insertSQL, param);
  }
}

/*
function writeLog(str) {
	if(!logOb) return;
	var log = str + " [" + (new Date()) + "]\n";
	logOb.createWriter(function(fileWriter) {
		fileWriter.seek(fileWriter.length);
		fileWriter.write("some sample text, i moze jeszcze troch, i jeszcze troche");
	}, fail);
}


function justForTesting() {
	//alert(logOb.file);
	logOb.file(function(file) {
		var reader = new FileReader();

		reader.onloadend = function(e) {
			//alert(this.result);
			//alert(this.result);
			
			//var tab = String(result);
			var value = this.result.trim();
			var lines = value.split("\n");
			// alert(this.result.toUpperCase());
			alert(lines.length);
			alert(lines[0]);
			
		};

		reader.readAsText(file);
	}, fail);

}

          //writeLog("App started");	
          //justForTesting();
*/

var db = window.openDatabase("enWords.db", "1.0", "enWords", 1000000);
var enWordsFile;

var app = {
    initialize: function() {
        this.bindEvents();
    }, // end initialize
    
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    }, //end bindEvents

    onDeviceReady: function() {
      app.receivedEvent('deviceready');
      db.transaction(createDB, errorDB, successDB);
      document.getElementById("updateAndClearDbBtn").addEventListener('click', app.updateAndClearDb, false);

      

	
    }, // end onDeviceReady

    updateAndClearDb: function() {
      db.transaction(clearDB, errorDB, successDB);
      app.readFromFile();
    },
    
    readFromFile: function() {

    window.resolveLocalFileSystemURL(cordova.file.externalDataDirectory, function(dir) {
          alert('1');
          dir.getFile("enWords.txt", {create:true}, function(file) {
            alert('2');
            enWordsFile = file;
            app.readFromFileToDb();
            alert('3');
          });
        }); 
        
    }, // end readFromFile
    
    readFromFileToDb: function() {
      alert('4');
      enWordsFile.file(function(file) {
        alert('5');
        var reader = new FileReader();
        alert('6');
        reader.onloadend = function(e) {
          alert('7');
          var value = this.result.trim();
          var lines = value.split("\n");
          
          for (var x = 0; x < lines.length; x++) {
            var words = lines[x].split("|");
            db.transaction(insertRecord(words), errorDB, successDB);
          }
          
          app.countRecords();
 
        };
        
        reader.readAsText(file);
      }, errorFile);
      
    }, // end readFromFileToDb
    
    countRecords: function (msg) {
      db.transaction(function(tx){
        tx.executeSql("select count(*) as myCount from words", [],function(tx1, result) {	 
          alert(result.rows.item(0).myCount); 
        }, errorDB);
        }, errorDB, successDB
      );
    }, // end countRecords
    
    
    receivedEvent: function(id) {
    } // end receivedEvent
};