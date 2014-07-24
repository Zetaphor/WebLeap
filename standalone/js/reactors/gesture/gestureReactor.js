/* 
 * gestureReactor.js
 * 
 * Each reactor must have two methods, react and reactAll. React takes on pointable representation, reactAll takes all the available pointables.
 * 
 * This class manages all gesturing, it holds a reference and the cached positioning of each element.
 * All reactor
 * params: pointables.
 */


function GestureReactor() {

}

GestureReactor.prototype = {
    react: function(pointable, numPointables) {

    },
    reactAll: function(pointables){
         var numPointables = pointables.length;
         if (numPointables === 1) {
                    if (recordGesture) { //Stop recording a gesture
                        recordGesture = false;                        
                        ctx.closePath();
                        $("#canvas").css('z-index', -1);
                        if (_points.length >= 10) {
                            var result = _r.Recognize(_points);
                            var accuracy = Math.round(result.Score*100);
                            if (accuracy >= accuracyThreshold) {
                                $("#gestureShape").text("Gesture Recognition: "+ result.Name);
                                gestureEvent(result.Name);
                            } else {
                                $("#gestureShape").text("Gesture Recognition: "+ result.Name +"<br />Accuracy not within acceptable limits, please try again.");
                            }
                            $("#gestureAccuracy").text("Accuracy: "+accuracy + "%");
                        }
                        _points = [];
                        ctx.clearRect(0,0,canvas.width,canvas.height);                        
                    }
                    //console.log("One pointable");
                } else if (numPointables === 2) {
//                    console.log("Two pointable");
//                    console.log("X: "+position.left+" Y: "+position.top);
                    var position = $(".mainPoint").offset();
                    if (!recordGesture) { //Start recording a gesture
                        recordGesture = true;
                        _points = [];
                        $("#canvas").css('z-index', 10);
                        ctx.beginPath();
                        ctx.strokeStyle = "#bae1ff";
                        ctx.lineCap = "round";
                        ctx.lineJoin = "round";
                        ctx.lineWidth = 6;
                        oldX = position.left;
                        oldY = position.top;
                    } else { //Continue recording a gesture
                        if (oldX - position.left < pointThreshold && oldX - position.left > -pointThreshold) return;
                        if (oldY - position.top < pointThreshold && oldY - position.top > -pointThreshold) return;
                        if (oldX !== 0 && oldY !== 0) ctx.moveTo(oldX,oldY); //Browser bug? Sometimes these values reset
                        oldX = position.left;
                        oldY = position.top;
                        ctx.lineTo(oldX,oldY);
                        ctx.stroke();
                        _points[_points.length] = new Point(oldX,oldY);                        
                    }
                } else if (numPointables === 3) {
                   // console.log("Three pointable");
                }
    }
};


