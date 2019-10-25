var app = {

    initialize: function() {
        this.bindEvents();
    }, // end initialize

    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    }, // end bindEvents
    
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
        db.transaction(createDB, errorDB, successDB);
        
        countRecords("Total records in db: ?");
    }, // onDeviceReady

    dbMessage: function(msg) {
      document.getElementById("divMsg").innerHTML = msg;
    }, // end dbMessage

    receivedEvent: function(id) {
    } // receivedEvent
};
