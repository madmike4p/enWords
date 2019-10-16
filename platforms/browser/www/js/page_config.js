function errorDB(err) { alert("Error processing SQL: "+ err.code + " " + err.message); }
function successDB() {}

function errorFile(err) { alert("FileSystem Error: " + err); }

function createDB(tx){
  var createSQL;
  createSQL  = 'create table if not exists words(id integer primary key, gb_word text not null, us_word text default "", ph_word text default "", ir_word text default "", pl_word text not null, rate integer default 0,notes text default "", added text default "", unique(gb_word, pl_word) on conflict ignore)';
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
    var insertSQL = 'insert into words (gb_word, us_word, ph_word, ir_word, pl_word, notes, rate, added) values (?, ?, ?, ?, ?, ?, ?, ?)';
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
      $("#updateAndClearDbBtnBox").click(function () {
        if ( $(this).prop("checked") == true ) {
          $('#updateAndClearDbBtn').removeAttr("disabled");
        } else {
          $('#updateAndClearDbBtn').attr("disabled", "");
        }
      });

      document.getElementById("updateDbBtn").addEventListener('click', app.updateDb, false);
      $("#updateDbBtnBox").click(function () {
        if ( $(this).prop("checked") == true ) {
          $('#updateDbBtn').removeAttr("disabled");
        } else {
          $('#updateDbBtn').attr("disabled", "");
        }
      });
      
      document.getElementById("saveAllDbBtn").addEventListener('click', app.saveAllToFile, false);
      $("#saveAllDbBtnBox").click(function () {
        if ( $(this).prop("checked") == true ) {
          $('#saveAllDbBtn').removeAttr("disabled");
        } else {
          $('#saveAllDbBtn').attr("disabled", "");
        }
      });

	
    }, // end onDeviceReady

    updateAndClearDb: function() {
      db.transaction(clearDB, errorDB, successDB);
      app.readFromFile();
    },
    
    updateDb: function() {
      app.readFromFile();
    },
    
    dbMessage: function(msg) {
      var ul = document.getElementById("list");
      var li = document.createElement("li");
      li.appendChild(document.createTextNode(msg));
      ul.appendChild(li);
    },
    
    readFromFile: function() {

    window.resolveLocalFileSystemURL(cordova.file.externalDataDirectory, function(dir) {
          dir.getFile("enWords.txt", {create:true}, function(file) {
            enWordsFile = file;
            app.readFromFileToDb();
          });
        }); 
        
    }, // end readFromFile
    
    readFromFileToDb: function() {
      enWordsFile.file(function(file) {
        var reader = new FileReader();
        reader.onloadend = function(e) {
          var value = this.result.trim();
          var lines = value.split("\n");
          
          for (var x = 0; x < lines.length; x++) {
            var words = lines[x].split("|");
            if (words.length == 8) db.transaction(insertRecord(words), errorDB, successDB);
          }
          
          app.countRecords();
 
        };
        
        reader.readAsText(file);
      }, errorFile);
      
    }, // end readFromFileToDb
    
    saveAllToFile: function() {
      window.resolveLocalFileSystemURL(cordova.file.externalDataDirectory, function(dir) {
          dir.getFile("enWordsDump.txt", {create:true}, function(file) {
            enWordsFile = file;
            alert('zapis');
            //app.readFromFileToDb();
          });
        }); 
    },
    
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