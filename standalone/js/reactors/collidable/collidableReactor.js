/* 
 * collidableReactor.js
 * 
 * Each reactor must have two methods, react and reactAll. React takes on pointable representation, reactAll takes all the available pointables.
 * 
 * This class manages all collidable elements, it holds a reference and the cached positioning of each element.
 * All reactor
 * params: Collidables.
 */


function CollidableReactor() {
    this.sections = new Array();
    this.masterCollidablesList = new Array();
    this.collidingWith = new Array();
    this.previouslyColliding = new Array();
}

CollidableReactor.prototype = {
    initializeSections: function() {
        var self = this;
        $(".s").each(function() {
            self.addSection(new CollidableSection(new Collidable($(this))));
        });
    },
    react: function(ref, numPointables) {

        var collidable = new Collidable(ref);

        //mark old colliders as outdated
        //if(isMain){
        $(".colliding").addClass("outdatedCollidable");
        //check all collidables with new collidable
        if (numPointables === 1) {
            for (var i = 0; i < this.sections.length; i++) {
                //find the section this collidable is in
                if (this.sections[i].isColliding(collidable)) {
                    //stick it on an array and return it.
                    // set the collidable list to the array to return;
                    this.collidingWith = this.sections[i].findColliding(collidable, ref.hasClass("mainPoint"));
                    //break because we have already found the section, it might also be in the next section but we don't care because it should be in both;
                    break;
                }
                else {
                    //alertMessage("colliding with no one");
                }
            }
        }
       

        //unmark all other outdated collidables
        $(".outdatedCollidable").removeClass("colliding");

        if (this.previouslyColliding.length > this.collidingWith.length) {
            for (var i = 0; i < this.previouslyColliding.length; i++) {
                if (this.collidingWith.indexOf(this.previouslyColliding[i]) === -1) {
                    this.previouslyColliding[i].clearColliding();
                }
            }
        }
        this.previouslyColliding = this.collidingWith;

        return this.collidingWith;
    },
    reactAll: function(pointables) {
        if(pointables.length !== 1){
             this.collidingWith.length = 0;
            $(".cloned").remove();
            $(".selectorBox").remove();
            $(".clonedElement").removeClass("clonedElement");
        }
    },
    clearCollidables: function() {
        for (var i = 0; i < this.sections.length; i++) {
            this.sections[i].clearCollidables();
        }
        this.masterCollidablesList.length = 0;
    },
    addCollidable: function(collidable) {
        for (var i = 0; i < this.sections.length; i++) {
            //find the section that this is colliding with
            if (this.sections[i].isColliding(collidable)) {
                //add to our section
                this.sections[i].addCollidable(collidable);
                //don't break because if it is on the edge we want to register it with both sections;
            }
        }

        this.masterCollidablesList.push(collidable);
    },
    addSection: function(section) {
        this.sections.push(section);
    }

};


