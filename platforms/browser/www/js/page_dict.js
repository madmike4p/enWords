function errorDB(err) { alert("Error processing SQL: "+ err.code + " " + err.message); }
function successDB() {}

function searchWordLike(param) {
  return function (tx) {
      tx.executeSql("select id, gb_word from words where gb_word like ?", [param], function(tx1, result) {	 
        
        var tab = [];
        for (var x = 0; x < result.rows.length; x++) {
          var line = '<a href="#" data-id="' + result.rows.item(x).id + '" class="enWord">' + result.rows.item(x).gb_word + '</a><br>';
          tab.push(line);
        }
        
        if (tab.length > 0) {
          document.getElementById("wordsEN").innerHTML = tab.join(" ");
        }
      }, errorDB);  
      
      tx.executeSql("select id, pl_word from words where pl_word like ?", [param], function(tx1, result) {	 
        
        var tab = [];
        for (var x = 0; x < result.rows.length; x++) {
          var line = '<a href="#" data-id="' + result.rows.item(x).id + '" class="enWord">' + result.rows.item(x).pl_word + '</a><br>';
          tab.push(line);
        }
        
        if (tab.length > 0) {
          document.getElementById("wordsPL").innerHTML = tab.join(" ");
        }
      }, errorDB);  
      
      app.bindWords();
  }
}


var db = window.openDatabase("enWords.db", "1.0", "enWords", 1000000);

var app = {

    initialize: function() {
        this.bindEvents();
    }, // end initialize

    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    }, // end bindEvents
    
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
        
        $(".enWord").click(function() {
          alert("enWord");
        });
        
        $("#search-1").on("input", function(){
          var searchString = $(this).val() + '%';
          if ($(this).val().length > 3) db.transaction(searchWordLike(searchString), errorDB, successDB);
        });
        
        
        
    }, // onDeviceReady

    bindWords: function() {
        $(".enWord").off();
        $(".enWord").click(function() {
          alert("...enWord " + $(this).attr("data-id"));
        });
    },
    
    receivedEvent: function(id) {
    } // receivedEvent
};
