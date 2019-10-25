var app = {
  initialize: function() {
    this.bindEvents();
    document.getElementById('button').addEventListener('click', this.onClick);
  }, // end initialize

  bindEvents: function() {
    document.addEventListener('deviceready', this.onDeviceReady, false);
  }, // end bindEvents
    
  onDeviceReady: function() {
  }, // onDeviceReady

  onClick: function(event) {
    var container = document.getElementById('container');
    var button = document.getElementById('button');
    button.innerHTML = 'Pushed';
    alert('pushed');


  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      alert(this.status);
      alert(this.statusText);
      alert(this.responseText);
    }
  };
  xhttp.open("GET", 'https://google.com/', true);
  xhttp.send();

  alert('break');


  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      alert(this.status);
      alert(this.statusText);
      alert(this.responseText);
    }
  };
  xhttp.open("GET", 'spec.html', true);
  xhttp.send();

  },

  dbMessage: function(msg) {
  }, // end dbMessage

  receivedEvent: function(id) {
  } // receivedEvent
};
