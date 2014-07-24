/* 
 * collidableSection.js
 * 
 * This class manages all child collidable elements, it holds a reference and the cached positioning of each element.
 * 
 * params: Collidables.
 */


function CollidableSection(collidable) {
    this.collidable = collidable;
    this.collidables = new Array();
}

CollidableSection.prototype = {
    findColliding: function(collidable, isMain) {
        var collidingWith = new Array();
        //mark old colliders as outdated
        if (isMain) {
            //check all collidables with new collidable
            for (var i = 0; i < this.collidables.length; i++) {
                //check to see if each collides with out new collidable
                //log("checking with" + collidable.cachedElement.attr("id"));
                //alertMessage("TEST" + this.collidables[i].isColliding(collidable));
                if (this.collidables[i].isColliding(collidable)) {
                    //stick it on an array and return it.
                    collidingWith.push(this.collidables[i]);
                    //mark it as colliding and remove the outdated mark (if it even has one(hover));
                    this.collidables[i].cachedElement.addClass("colliding").removeClass("outdatedCollidable");
                    this.collidables[i].runColliding(collidable);   
                    
                    //break because we only want to allow one collidable selected at a time. This still allows for more since it's an array. To add support for more comment out the break.
                    break;
                }
                else {

                }
            }
        }
        //return list for stuff
        return collidingWith;
    },
    clearCollidables: function() {
        this.collidables = new Array();
    },
    addCollidable: function(collidable) {
        this.collidables.push(collidable);
    },
    isColliding: function(collidable) {
        return this.collidable.isColliding(collidable);
    }
};


