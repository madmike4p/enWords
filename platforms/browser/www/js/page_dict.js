function searchWordLike(param) {
  param = coma2pl(param);
  
  return function (tx) {
      
      tx.executeSql("select id, gb_word, ir_word, ph_word, pl_word, notes from words where gb_word like ?", [param], function(tx1, result) {	 
        var tab = [];
 
        for (var x = 0; x < result.rows.length; x++) {
          var line = '<a href="#" data-id="{id}" class="enWord w3-tag w3-text-white w3-round w3-blue-grey w3-center">{word}</a>';
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
          
          var line = '<a href="#" data-id="{id}" class="enWord w3-tag w3-text-white w3-round w3-red w3-center">{word}</a>';
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

        $("#search-1").on("input", function(){
          document.getElementById("wordsEN").innerHTML = '';
          document.getElementById("wordsPL").innerHTML = '';
          var searchString = '%' + $(this).val() + '%';
          if ($(this).val().length > 2) db.transaction(searchWordLike(searchString), errorDB, successDB);
        });
        document.getElementById('search-1').focus();


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
      var ul = document.getElementById('word');
      while (ul.firstChild) ul.removeChild(ul.firstChild);
        
      node = document.createElement('li');
      text = document.createTextNode(pl_word);
      node.appendChild(text);
      node.className = 'li_pl_word';
      ul.appendChild(node); 
        
      var node = document.createElement('li');
      var text = document.createTextNode(gb_word);
      node.appendChild(text);
      node.className = 'li_gb_word';
      ul.appendChild(node);
      
      if (us_word.length > 0) {
        var node = document.createElement('li');
        var text = document.createTextNode(us_word);
        node.appendChild(text);
        node.className = 'li_us_word';
        ul.appendChild(node);
      }  
      


    
      if (ph_word.length > 0 ) {
        var line = ph_word;
        line = line.replace(/\(ə\)/g, ':ə:');
        var tab = line.split(':');

        node = document.createElement('li');
        node.className = 'li_ph_word';
          
        tab.forEach(function (item) {
          if (item != 'ə') {
            text = document.createTextNode(item);
          } else {
            text = document.createElement('span');
            text.className = 'super';
            schwa = document.createTextNode('ə');
            text.appendChild(schwa);
          }
            
          node.appendChild(text);
        });
        ul.appendChild(node);
      }
        
      if (ir_word.length > 0) {
        var node = document.createElement('li');
        var text = document.createTextNode(ir_word);
        node.appendChild(text);
        node.className = 'li_ir_word';
        ul.appendChild(node);
      }        
      
    },
    
    receivedEvent: function(id) {
    } // receivedEvent
};
