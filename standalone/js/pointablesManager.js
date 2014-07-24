/* 
 * PointablesManager.js
 * 
 * This class manages all the points that come in off the JSON
 * params: a Screen properties Object defined in screenProperties.js
 */


//Pointable management class
function PointablesManager(screenProperties, allReactors) {
    this.pointableCount = 0;
    this.activePointableCache = new Array();
    this.stalePointables = null;
    this.screenProperties = screenProperties;
    this.reactors = new Array();
    //make sure the reactors fit the reactor 
    for (var i = 0; i < allReactors.length; i++) {
        if (can(allReactors[i], "react") && can(allReactors[i], "reactAll")) {
            this.reactors.push(allReactors[i]);
        }
        else {
            throw "Reactor not of proper type";
        }
    }
}

PointablesManager.prototype = {
    processPointables: function(obj) {
        var pointables = obj.pointables;
        var timestamp = obj.timestamp;
        if (typeof(pointables) != "undefined") {
            this.pointableCount = pointables.length;
            //Add or update new pointables
            var ids = new Array();
            for (var t = 0; t < pointables.length; t++) {
                if (this.updatePointable(pointables[t],timestamp) == false) {
                    this.addPointable(pointables[t],timestamp);
                }
                ids.push("pointable" + pointables[t].id);
            }
            //remove non active pointables
            var toRemove = new Array();
            for (var i = 0; i < this.activePointableCache.length; i++) {
                if (ids.indexOf(this.activePointableCache[i].attr("id")) == -1) {
                    toRemove.push(this.activePointableCache[i]);
                }
            }
            for (var i = 0; i < toRemove.length; i++) {
                this.destroyPointable(toRemove[i]);
            }
            toRemove = null;
            ids = null;
            for (var i = 0; i < this.reactors.length; i++) {
                this.reactors[i].reactAll(this.activePointableCache);
            }
        }
    },
    addPointable: function(pointable, timestamp) {
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
        ref.data("lastUpdated",timestamp);
        ref.data("added",timestamp);
        
        //push him onto our stack of active pointers
        this.activePointableCache.push(ref);

        //check him for collisions and gestures
        for (var i = 0; i < this.reactors.length; i++) {
            this.reactors[i].react(ref, this.pointableCount);
        }
        return;
    },
    updatePointable: function(pointable, timestamp) {
        //loop through and update the existing pointable based on the id
        for (var i = 0; i < this.activePointableCache.length; i++) {
            if (this.activePointableCache[i].attr("id") == "pointable" + pointable.id) {
                //reposition him
                this.activePointableCache[i].css("left", pointable.tipPosition[0] + "mm").css("bottom", pointable.tipPosition[1] + "mm");
                this.activePointableCache[i].data("lastUpdated",timestamp);
                for (var i = 0; i < this.reactors.length; i++) {
                    this.reactors[i].react(this.activePointableCache[i], this.pointableCount);
                }
                return true;
            };
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
            if (this.activePointableCache.length > 0) {
                this.activePointableCache[0].addClass("mainPoint");
            }
        }
    }
};

function can(obj, methodName)
{
    return ((typeof obj[methodName]) == "function");
}