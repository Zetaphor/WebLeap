/* 
 * ScreenProperties.js
 * 
 * This class is a helper class for the window stuff. Some refactoring work could still be done here.
 * 
 * This file is injected into each tab via manifest.json on load complete
 */


function ScreenProperties() {
    this.screenx = 0;
    this.screeny = 0;
    this.windowh = 0;
    this.windoww = 0;
    this.windowOuterh = 0;
    this.windowOuterw = 0;
    this.screenh = 0;
    this.screenw = 0;
    this.xOffset = 0;
    this.yOffset = 460;
    this.absoluteX = 0;
    this.absoluteY = 0;
    this.calculatedY = 0;
    this.xAxis = $("#xAxis");
}

ScreenProperties.prototype = {
    initialize: function() {
        this.screenw = window.screen.width;
        this.screenh = window.screen.height;

        this.screeny = window.screenY;
        //code for x to support the leap being on the left screen.
        this.screenx = window.screenX;
        if (this.screenx < 0) {
            this.screenx = this.screenx + this.screenw;
        }
        this.windoww = $(window).width();
        this.windowh = $(window).height();
        this.windowOuterh = window.outerHeight;
        this.windowOuterw = window.outerWidth;
        //calculate the absolute x (total screen size / 2 (the middle)) - left side of the window;
        this.absoluteX = ((this.screenw / 2) - this.screenx) + this.xOffset;
        //calibrate y's 0;
        
        
        this.absoluteY = (this.screenh - (this.screeny + this.windowOuterh));
        if(this.absoluteY > 0){
            this.calculatedY = (this.absoluteY + this.yOffset) * -1;
        }
        else{
            this.calculatedY = (this.absoluteY + this.yOffset) * -1;
        }
        
    },
    debug: function() {
        $("#screenw").html(this.screenw);
        $("#screenh").html(this.screenh);
        $("#screenx").html(this.screenx);
        $("#screeny").html(this.screeny);
        $("#windoww").html(this.windoww);
        $("#windowh").html(this.windowh);
        $("#windowOuterw").html(this.windowOuterw);
        $("#windowOuterh").html(this.windowOuterh);
        this.placexAxis();
        this.placeyAxis();
    },
    placexAxis: function() {
        this.xAxis.css("left", this.absoluteX + "px");
        //the animate looked cool but was acting a fool sometimes.
//                $("#xAxis").animate({
//                    left: screenProperties.absoluteX
//                }, 500);
    },
    placeyAxis: function() {
        this.xAxis.css("margin-bottom", this.calculatedY + "px");
    }

};


