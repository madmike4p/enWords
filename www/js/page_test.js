var app = {

    initialize: function() {
        this.bindEvents();
    }, // end initialize

    bindEvents: function() {

       document.addEventListener('deviceready', this.onDeviceReady, false);
    }, // end bindEvents
    
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
        
        alert(books[1][1][1].pl + '\n' + books[1][1][1].en);
    }, // onDeviceReady

    receivedEvent: function(id) {
    } // receivedEvent
};
