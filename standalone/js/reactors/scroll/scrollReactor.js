/* 
 * scrollReactor.js
 * 
 * Each reactor must have two methods, react and reactAll. React takes on pointable representation, reactAll takes all the available pointables.
 * 
 * This class manages all three finger scrolling.
 * 
 * params: pointables.
 */


function ScrollReactor() {
    this.scolling = false;
    this.lastPointable = null;
}

ScrollReactor.prototype = {
    react: function(pointable, numpointables) {
        //write code for one pointable, this gets called when the pointable is added or moved.

    },
    reactAll: function(pointables) {
        //This gets called later when all the pointables have been added.
        if (pointables.length > 2) {
            if (this.scrolling) {
                for (var i = 0; i < pointables.length; i++) {
                    if (pointables[i].hasClass("mainPoint")) {
                        $(document).trigger("leapMove", pointables[i]);
                        this.lastPointable = pointables[i];
                        break;
                    }
                }
            }
            else {
                for (var i = 0; i < pointables.length; i++) {
                    if (pointables[i].hasClass("mainPoint")) {
                        $(document).trigger("leapStart", pointables[i]);
                        this.lastPointable = pointables[i];
                        break;
                    }
                }
                this.scrolling = true;
            }
        }
        else {
            if (this.scrolling) {
                this.scrolling = false;
                console.log("leap stop");
                $(document).trigger("leapEnd", this.lastPointable);
            }
        }
    }
};


