function searchWordLike(param) {
  param = coma2pl(param);
  
  return function (tx) {
      
      tx.executeSql("select id, gb_word, ir_word, ph_word, pl_word, notes from words where gb_word like ?", [param], function(tx1, result) {	 
        var tab = [];
 
        for (var x = 0; x < result.rows.length; x++) {
          var line = '<a href="#" data-id="{id}" class="enWord tag" style="color: white">{word}</a>';
          line = line.replace('{id}', result.rows.item(x).id);
          line = line.replace('{word}', result.rows.item(x).gb_word);
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
          
          var line = '<a href="#" data-id="{id}" class="enWord tag" style="color: white">{word}</a>';
          line = line.replace('{id}', result.rows.item(x).id);
          line = line.replace('{word}', result.rows.item(x).pl_word);
          
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

        $("#search").on("input", function(){
          document.getElementById("wordsEN").innerHTML = '';
          document.getElementById("wordsPL").innerHTML = '';
          var searchString = '%' + $(this).val() + '%';
          if ($(this).val().length > 2) db.transaction(searchWordLike(searchString), errorDB, successDB);
        });
        document.getElementById('search').focus();


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
        app.createWord(
          result.rows.item(0).gb_word,
          result.rows.item(0).us_word,
          result.rows.item(0).ph_word,        
          result.rows.item(0).ir_word,
          result.rows.item(0).pl_word,
          result.rows.item(0).notes);
      }, errorDB);
    }, errorDB, successDB);},
    
    createWord: function(gb_word, us_word, ph_word, ir_word, pl_word, notes) {
      document.getElementById('pl').style.display = 'none';
      document.getElementById('gb').style.display = 'none';
      document.getElementById('us').style.display = 'none';      
      document.getElementById('ph').style.display = 'none';
      document.getElementById('ir').style.display = 'none';
      document.getElementById('note').style.display = 'none';
      
      document.getElementById('pl').style.display = 'block';
      document.getElementById('pl').firstElementChild.innerHTML = removeHTML(pl_word);
      
      document.getElementById('gb').style.display = 'block';
      document.getElementById('gb').firstElementChild.innerHTML = removeHTML(gb_word);
      
      if (us_word) {
        document.getElementById('us').parentNode.display = 'block';
        document.getElementById('us').firstElementChild.innerHTML = removeHTML(us_word);
      }
      
      if (ph_word) {
        document.getElementById('ph').style.display = 'block';
        document.getElementById('ph').firstElementChild.innerHTML = bracket2html(ph_word);
      }
      
       if (ir_word) {
        document.getElementById('ir').style.display = 'block';
        document.getElementById('ir').firstElementChild.innerHTML = removeHTML(ir_word);
      }
      
      if (notes) {
        document.getElementById('note').style.display = 'block';
        document.getElementById('note').firstElementChild.innerHTML = removeHTML(notes);
      }
    },
    
        
    
    
    receivedEvent: function(id) {
    } // receivedEvent
};
