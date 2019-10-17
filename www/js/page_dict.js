function searchWordLike(param) {
  param = coma2pl(param);
  
  return function (tx) {
      
      tx.executeSql("select id, gb_word, ir_word, ph_word, pl_word, notes from words where gb_word like ?", [param], function(tx1, result) {	 
        
        var tab = [];
        for (var x = 0; x < result.rows.length; x++) {
          var line = '<a href="#" data-id="' + result.rows.item(x).id + '" class="enWord">' + result.rows.item(x).gb_word + '</a><br>';
          tab.push(line);
        }
        
        
        if (tab.length > 0) {
          document.getElementById("wordsEN").innerHTML = tab.join(" ");
        }
      app.bindWords();
      }, errorDB);  
      
      tx.executeSql("select id, gb_word, ir_word, ph_word, pl_word, notes from words where pl_word like ?", [param], function(tx1, result) {	 
        
        var tab = [];
        for (var x = 0; x < result.rows.length; x++) {
          var line = '<a href="#" data-id="' + result.rows.item(x).id + '" class="plWord">' + result.rows.item(x).pl_word + '</a><br>';
          tab.push(line);
        }
        
        document.getElementById("wordsPL").innerHTML = '';
        if (tab.length > 0) {
          document.getElementById("wordsPL").innerHTML = tab.join(" ");
          
        app.bindWords();
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
          document.getElementById("wordsEN").innerHTML = '';
          document.getElementById("wordsPL").innerHTML = '';
          var searchString = '%' + $(this).val() + '%';
          if ($(this).val().length > 2) db.transaction(searchWordLike(searchString), errorDB, successDB);
        });

        document.getElementById('search-1');
        document.getElementById('search-1').focus();
        document.getElementById('search-1').onblur= function() {
          setTimeout(function() {
            document.getElementById('search-1').focus();
          }, 0);
        };

        
        
        
    }, // onDeviceReady

    bindWords: function() {
        $(".enWord").off();
        $(".plWord").off();
        
        $(".enWord").click(function() {
          app.getWord($(this).attr("data-id"));
        });
        
         $(".plWord").click(function() {
          app.getWord($(this).attr("data-id"));
        });
    },
    
    getWord: function(id) {
      db.transaction(function(tx){

      tx.executeSql("select * from words where id = ?", [id], function(tx1, result) {	 
        document.getElementById("gb_word").innerHTML = (result.rows.item(0).gb_word);
        document.getElementById("pl_word").innerHTML = result.rows.item(0).pl_word;
        document.getElementById("ph_word").innerHTML = bracket2html(result.rows.item(0).ph_word);

      }, errorDB);
    }, errorDB, successDB);
},
    
    receivedEvent: function(id) {
    } // receivedEvent
};
