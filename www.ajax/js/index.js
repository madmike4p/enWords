var app = {
  initialize: function() {
    this.bindEvents();
  }, // end initialize

  bindEvents: function() {
    document.addEventListener('deviceready', this.onDeviceReady, false);
  }, // end bindEvents
    
  onDeviceReady: function() {

  app.message('start', '');
  app.getContent('https://pl.pons.com');
  app.getContent('http://localhost');
  app.getContent('http://127.0.0.1');
  app.getContent('spec.html');
  }, // onDeviceReady

  getContent: function(url) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        app.message(url, this.status);
      }
    };
    xhttp.open("GET", 'https://google.com/', true);
    xhttp.send();
  },

  message: function(url, msg) {
    var ul = document.getElementById('container');
    console.log(ul);

    var li = document.createElement('li');
    var txt = document.createTextNode(url + ' -> ' + msg);

    li.appendChild(txt);
    ul.appendChild(li);
  },

  dbMessage: function(msg) {
  }, // end dbMessage

  receivedEvent: function(id) {
  } // receivedEvent
};
