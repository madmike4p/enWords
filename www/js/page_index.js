var app = {

    initialize: function() {
        this.bindEvents();
    }, // end initialize

    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
        countRecords("Total records in db: ?");
    }, // end bindEvents
    
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    }, // onDeviceReady

    dbMessage: function(msg) {
      document.getElementById("divMsg").innerHTML = msg;
    }, // end dbMessage

    receivedEvent: function(id) {
    } // receivedEvent
};
