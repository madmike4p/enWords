function clearDB(tx){
  tx.executeSql("delete from words where 1");
  tx.executeSql("delete from parts where 1"); 
}

function getShuffledRecords(param) {
  db.transaction(function(tx){
    tx.executeSql("delete from parts where 1");
    tx.executeSql("select id from words", [], function(tx1, result) {	 
      var len = result.rows.length;
      var tab = [];
      for (var x = 0; x < len; x++)  {
        tab.push(result.rows.item(x).id);
      }
      shuffle(tab);
      
      var countPart = 0;
      while (tab.length > 0) {
        var smallTab = tab.splice(0, param);
        countPart += 1;

        smallTab.forEach(function(item) {
          tx.executeSql("update words set inpart = ? where id = ?", [countPart, item]);
        });

        tx.executeSql("insert into parts (part) values(?)", [smallTab.join(" ")]);
      
      app.dbMessage('Created ' + countPart + ' parts per ' + param + ' items');
      }
    }, errorDB);
  }, errorDB, successDB);
}

function saveAllFromDbToFile(tx) {
  tx.executeSql("select gb_word, us_word, ph_word, ir_word, pl_word, notes, rate, added from words", [], function(tx1, result) {	 
    if(enWordsFile) {
      var lines = [];
      for (var x = 0; x < result.rows.length; x++)  {
        var tab = [
          result.rows.item(x).gb_word,
          result.rows.item(x).us_word,
          result.rows.item(x).ph_word,
          result.rows.item(x).ir_word,
          result.rows.item(x).pl_word,
          result.rows.item(x).notes,
          result.rows.item(x).rate,
          result.rows.item(x).added
          ];
          lines.push(tab.join('|'));
       }
      enWordsFile.createWriter(function(fileWriter) {
        fileWriter.write(lines.join("\n"));
        app.dbMessage('Db dump saved, ' + lines.length + ' records');
      }, errorFile);
    }
  }, errorDB); 
}

function insertRecord(param) {
  return function (tx) {
    var insertSQL = 'insert into words (gb_word, us_word, ph_word, ir_word, pl_word, notes, rate, added) values (?, ?, ?, ?, ?, ?, ?, ?)';
    tx.executeSql(insertSQL, param);
    _recordCount += 1 ;
    if (_recordCount % 50 == 0)  app.dbMessage("Adding: " + _recordCount + " z " + _linesCount);
  }
}


var enWordsFile;

var _linesCount = 0;
var _recordCount = 0;

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
    
      document.getElementById("preparePartsBtn").addEventListener('click', app.prepareParts, false);
	
    }, // end onDeviceReady

    disableAll: function() {
      $('#updateAndClearDbBtn').attr("disabled", "");
      $('#updateDbBtn').attr("disabled", "");
      $('#saveAllDbBtn').attr("disabled", "");
      
      $("#updateAndClearDbBtnBox").prop('checked', false).checkboxradio("refresh");
      $("#updateDbBtnBox").prop('checked', false).checkboxradio("refresh");
      $("#saveAllDbBtnBox").prop('checked', false).checkboxradio("refresh");
    },
    
    updateAndClearDb: function() {
      app.disableAll();
      db.transaction(clearDB, errorDB, successDB);
      app.readFromFile();
    },
    
    updateDb: function() {
      app.disableAll();
      app.readFromFile();
    },
    
    dbMessage: function(msg) {
      document.getElementById("divMsg").innerHTML = msg;
    }, // end dbMessage
    
    prepareParts: function() {
      var value = parseInt($("#preparePartsBtnBox :selected").val());
      getShuffledRecords(value);
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
          _linesCount = lines.length;
          _recordCount = 0;
          for (var x = 0; x < lines.length; x++) {
            var words = lines[x].split("|");
            if (words.length == 8) db.transaction(insertRecord(words), errorDB, successDB);
          }
          countRecords("End, records in db: ?");
        };
        
        reader.readAsText(file);
      }, errorFile);
    }, // end readFromFileToDb
    
    saveAllToFile: function() {
      app.disableAll();
      window.resolveLocalFileSystemURL(cordova.file.externalDataDirectory, function(dir) {
          dir.getFile("enWordsDump.txt", {create:true}, function(file) {
            enWordsFile = file;
            db.transaction(saveAllFromDbToFile, errorDB, successDB);
          });
        }); 
    }, // endsaveAllToFile
    
    receivedEvent: function(id) {
    } // end receivedEvent
};
