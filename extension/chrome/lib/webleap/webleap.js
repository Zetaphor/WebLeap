/*
 * Webleap.js
 * 
 * This file is injected into each tab via manifest.json on load complete
 * Processes the raw data from the websocket to display the dots
 * Detects the custom meta tag in a page, and parses the tag parameters into an object
 */

var json_output = null;
var pointTable = null;
var pointablesManager = null;

var screenProperties = null;
var oldX = window.screenX;
var oldY = window.screenY;

var moveTimer = null;

var pluginEnabled = false;
var customTag = false;
var customTagOptions = {};

//Inject required tags
$('body').prepend('<div id="xAxis"></div><div id="yAxis"></div>');

//Inject debug display
$('body').prepend('<table border="1" id="windowInfo"><tr><td>Screen W:<span id="screenw"></span> </td></tr><tr><td>Screen H:<span id="screenh"></span></td></tr><tr><td>Screen X:<span id="screenx"></span> </td></tr><tr><td>Screen Y:<span id="screeny"></span></td></tr><tr><td>Window W:<span id="windoww"></span></td></tr><tr><td>Window H:<span id="windowh"></span></td></tr><tr><td>Outer W:<span id="windowOuterw"></span></td></tr><tr><td>Outer H:<span id="windowOuterh"></span></td></tr></table><table border="1" id="pointsTable"></table></div><div id="json"><p>JSON Output</p><div id="json_output"></div>');    

//Recieved message from background.js or popup.js
chrome.extension.onMessage.addListener(function(request) {
    //We are receiving raw data from the Leap/Node websocket
    if (request.rawData !== undefined) {
        rawData(request.rawData);
    }
    else { //We're receiving a settings change
        $.each(request, function(setting, value) {
            switch(setting) {
                case "enable_plugin":
                    if (value) {
                        enablePlugin();
                    } else {
                        disablePlugin();
                    }
                    break;
                case "node_detection": break; //This setting is not used here, ignore it
                default: //We're receiving a toggle state for a display setting
                    if (value) {
                        $("#"+setting).css("display","block");
                    } else {
                        $("#"+setting).css("display","none");
                    }                    
                    break;
            }
        });
    }
});

//Populate the plugin variables
function enablePlugin() {   
    //Cache the output elements
    json_output = $("#json_output");
    pointTable = $("#pointsTable");

    //Instantiate a new screen properties object
    screenProperties = new ScreenProperties();

    //getWindowProperties
    populateWindowProperties();
    $(window).on('resize', populateWindowProperties);
    
    checkMove();    
    
    pointablesManager = new PointablesManager(screenProperties);        
    
    pluginEnabled = true;    
}

//Hide all display options and reset all variables
function disablePlugin() {
    pluginEnabled = false;    
    $("#connection").css("display", "none");
    $("#windowInfo").css("display", "none");
    $("#pointsTable").css("display", "none");
    $("#json").css("display", "none");
    window.clearTimeout(moveTimer);
    pointablesManager = null;
    pointTable = null;
    screenProperties = null;
    oldX = window.screenX;
    oldY = window.screenY;
}

//Process the raw data from the websocket
function rawData(data) {
    if (pluginEnabled) {
        var obj = JSON.parse(data);
        //DEBUG OUTPUT
        var str = JSON.stringify(obj, undefined, 2);
        json_output.html('<pre>' + str + '</pre>');
        pointTable.empty();
        processPointables(obj.pointables);
        //END DEBUG CODE
        pointablesManager.processPointables(obj.pointables);        
    }
}

function checkMove() {
    if (oldX !== window.screenX || oldY !== window.screenY) {
        screenProperties.initialize();
        screenProperties.debug();
        oldX = window.screenX;
        oldY = window.screenY;
    }
    moveTimer = window.setTimeout(checkMove, 500);
}

//Runs on resize and move of the window
function populateWindowProperties() {
    screenProperties.initialize();
    screenProperties.debug();
}

//Debug function to output pointable stuff    
function processPointables(pointables) {
    //Loop through our pointables
    if (typeof(pointables) !== "undefined") {
        for (var i = 0; i < pointables.length; i++) {
            pointTable.append("<tr><td>x:" + pointables[i].tipPosition[0] + " y:" + pointables[i].tipPosition[1] + " z:" + pointables[i].tipPosition[2] + "</td></tr>");
        }
    };
}

$(document).ready(function() {
    //Metatag example: <meta name="LeapMotion" content="enable_custom_gestures, another_value=false">
    if ($('meta[name=LeapMotion]').length >= 1) { //The custom metatag is present in the document
        customTag = true;
        //Load metatag options into an array, stripping spaces
        var tagOptions = $('meta[name=LeapMotion]').attr('content').replace(/\s/g, '').split(",");
        //Iterate through each option in the content tag
        for (var i = 0; i < tagOptions.length; i++) {
            if (tagOptions[i].indexOf("=") !== -1) { //Option provided a value
                var option = tagOptions[i].split("=");
                //Convert the string to a boolean
                customTagOptions[option[0]] = (option[1] === "true") ? true : false;
            } else { //No value provided, default is true
                customTagOptions[tagOptions[i]] = true;
            }
        }
    }
});