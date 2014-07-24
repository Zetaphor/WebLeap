/* 
 * PointablesManager.js
 * 
 * This class manages all the points that come in off the JSON
 * params: a Screen properties Object defined in screenProperties.js
 * 
 * This file is injected into each tab via manifest.json on load complete
 */


//Pointable management class
function PointablesManager(screenProperties) {
    this.pointableCount = 0;
    this.activePointableCache = new Array();
    this.stalePointables = null;
    this.screenProperties = screenProperties;
}

PointablesManager.prototype = {
    processPointables: function(pointables) {
        if (typeof(pointables) !== "undefined") {
            this.pointableCount = pointables.length;
            //Add or update new pointables
            var ids = new Array();
            for (var t = 0; t < pointables.length; t++) {
                if (this.updatePointable(pointables[t]) === false) {
                    this.addPointable(pointables[t]);
                }
                ids.push("pointable" + pointables[t].id);
            }
            //remove non active pointables
            var toRemove = new Array();
            for (var i = 0; i < this.activePointableCache.length; i++) {
                if (ids.indexOf(this.activePointableCache[i].attr("id")) === -1) {
                    toRemove.push(this.activePointableCache[i]);
                }
            }
            for (var i = 0; i < toRemove.length; i++) {
                this.destroyPointable(toRemove[i]);
            }
            toRemove = null;
            ids = null;
        }
    },
    addPointable: function(pointable) {
        //build the pointer div
        var id = "pointable" + pointable.id;
        var ref = $("<div class='pointable' id='" + id + "'>&nbsp;</div>");
        //position it
        ref.css("left", pointable.tipPosition[0] + "mm").css("bottom", pointable.tipPosition[1] + "mm");
        //append it to our xAxis div. He lives in the middle. All points live in him.
        this.screenProperties.xAxis.append(ref);
        //If this is the first point and no others are there then give him some sweet power! (a class to identify him);
        if (this.activePointableCache.length === 0) {
            ref.addClass("mainPoint");
        }
        //push him onto our stack of active pointers
        this.activePointableCache.push(ref);
        return;
    },
    updatePointable: function(pointable) {
        //loop through and update the existing pointable based on the id
        for (var i = 0; i < this.activePointableCache.length; i++) {
            if (this.activePointableCache[i].attr("id") === "pointable" + pointable.id) {
                //reposition him
                this.activePointableCache[i].css("left", pointable.tipPosition[0] + "mm").css("bottom", pointable.tipPosition[1] + "mm");
                return true;
            }
            ;
        }
        return false;
    },
    destroyPointable: function(activePointable) {
        //if he is the main point then give the main point to the first point in the active point. 
        //We may want to revist this functionality in the future.
        var newMain = activePointable.hasClass("mainPoint");

        //find out his position in the array
        var index = this.activePointableCache.indexOf(activePointable);
        //remove him from the array
        this.activePointableCache.splice(index, 1);
        //remove him from the DOM
        activePointable.remove();

        if (newMain) {
            if(this.activePointableCache.length > 0){
                this.activePointableCache[0].addClass("mainPoint");
            }
        }
    }
};

