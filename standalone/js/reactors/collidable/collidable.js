/* 
 * collidable.js
 * 
 * This class manages a collidable element, it holds a reference and the cached positioning of the element.
 * params: jquery element to wrap.
 */

function Collidable(jObj) {
    this.cachedElement = jObj;
    this.clonedElement = null;
    this.selectorBox = null;
    this.pausedOpen = false;
    this.pos = jObj.offset();
    this.width = jObj.width();
    this.height = jObj.height();
    this.heightValues = [this.pos.top, this.pos.top + this.height];
    this.widthValues = [this.pos.left, this.pos.left + this.width];
}

Collidable.prototype = {
    isColliding: function(collidable) {
        if (this.pausedOpen === true) {
            return true;
        }
        return (this.comparePositions(this.widthValues, collidable.widthValues) && this.comparePositions(this.heightValues, collidable.heightValues));
    },
    comparePositions: function(p1, p2) {
        var r1, r2;
        r1 = p1[0] < p2[0] ? p1 : p2;
        r2 = p1[0] < p2[0] ? p2 : p1;
        return r1[1] > r2[0] || r1[0] === r2[0];
    },
    clearColliding: function() {
        if (this.clonedElement !== null) {
            this.clonedElement.remove();
            this.selectorBox.remove();
            this.clonedElement = null;
            this.selectorBox = null;
            console.log("clearing clone");
        }
        this.pausedOpen = false;
        this.cachedElement.removeClass("clonedElement");
        this.cachedElement.data("lastUpdated", null);
        this.cachedElement.data("added", null);
    },
    runColliding: function(collidable) {

        /****************************************************************************************************************/
        //Here we are going to have to clone the element and actually position it on top of the other one outside the div layout. 
        //At that point we can grow the box, added other things without actually changing the elements in that elements parents.
        //check to see if this is the first time we are colliding
        if (typeof(this.cachedElement.data("added")) !== "undefined" && this.cachedElement.data("added") !== null && this.clonedElement !== null) {
            //if it isn't then mark it's last updated to the same as the pointable
            this.cachedElement.data("lastUpdated", collidable.cachedElement.data("lastUpdated"));
        }
        else {
            //if it's new clone the element and position it
            this.clonedElement = this.cachedElement.clone();
            this.clonedElement.addClass("cloned").css({left: this.pos.left, top: this.pos.top});

            //add the selector box
            this.selectorBox = $("<div class='selectorBox' id='selectorBox'>&nbsp;</div>");
            //position it
            this.selectorBox.css({left: this.pos.left - 5, top: this.pos.top - 5, width: this.width + 10, height: this.height + 10});
            $("body").prepend(this.clonedElement);
            $("body").prepend(this.selectorBox);

            //added the time it's been added from the leap timestamp from the pointable collidable.
            this.cachedElement.data("added", collidable.cachedElement.data("lastUpdated"));
            //hide the cached element since we have the clone now.
            this.cachedElement.addClass("clonedElement");
        }
        //THIS CODE SHOULD BE MOVED TO A SEPARATE CLASS. POSSIBLE SUBCLASS OF COLLIDABLE (div, a) 
        //check the math on how long we have been colliding.
        var updated = this.cachedElement.data("lastUpdated");
        var added = this.cachedElement.data("added");
        if (updated > (added + 1000000)) {
            //we've been hovering for 1 seconds
            //alert("WE HOVERED!");
            if (this.cachedElement.hasClass("click")) {
                 this.selectorBox.addClass("clicked");    
                alertMessage("Clicked: " + this.cachedElement.attr("id"));
                //Click code.
                //this.collidables
                if (typeof(this.cachedElement.attr('href')) !== "undefined") {
                    window.location.href = this.cachedElement.attr('href');
                }
                else {
                    this.cachedElement.click();
                }
               
                //this.clearColliding();
            }
            else if (this.cachedElement.hasClass("context")) {
                alertMessage("Context Menu!: " + this.cachedElement.attr("id"));
                //keep open eveon on pointable out
                this.pausedOpen = true;
            }
        }
        else {
            //grow the box;
            var toAdd = (((updated - added) / 100000) + 5) * 2;
            var toHeight = toAdd * 2;
            this.selectorBox.css({left: this.pos.left - toAdd, top: this.pos.top - toAdd, width: this.width + toHeight, height: this.height + toHeight});
        }
    }

};


