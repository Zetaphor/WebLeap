(function($) {
    $.fn.leap = function(options) {

        //Adding some default options, in this case just the leap default web socket url.
        var settings = $.extend({
            socketUrl: 'ws://localhost:6437/',
            displayRaw: false,
            success: function(){},
            rawData: function(){}
        }, options);

        //instantiate a new leap object;
        var leap = new LeapMotion(settings);
        //connect to the web socket
        leap.connect(options);

        //loop through the elements passed in (this does nothing since it's just the document right now.
        return this.each(function()
        {

            var elem = $(this);

        });
    };

    function LeapMotion(options) {
        this.options = options;
        this.ws = null;
    }

    LeapMotion.prototype = {
        connect: function() {
            //Moz socket support
            if ((typeof(WebSocket) == 'undefined') &&
                    (typeof(MozWebSocket) != 'undefined')) {
                WebSocket = MozWebSocket;
            }
            ;
            this.ws = new WebSocket(this.options.socketUrl);
            this.ws.onopen = this.options.success;
            if(this.options.displayRaw == true){
            this.ws.onmessage = this.options.rawData;
            }
            this.ws.onclose = this.onClose;
        },
        onClose: function(event){
                this.ws = null;
                document.getElementById("connection").innerHTML = "WebSocket connection closed";
    }
    };

})(jQuery);

