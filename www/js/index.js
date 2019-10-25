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
    $.get('https://google.com', function(data) {alert(data);});
  },

  dbMessage: function(msg) {
  }, // end dbMessage

  receivedEvent: function(id) {
  } // receivedEvent
};
