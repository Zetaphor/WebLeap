/*
 * Popup.js
 * 
 * This is the javascript file that controls the settings changes for popup.html, the plugins view file
 * Loads the popup.html settings from localStorage when opened
 * Sends setting changes to all tabs when checkboxes change in popup.html
 * Sets the icon state via background.js when the plugin is enabled/disabled
 * Disconnects and reconnects the websocket when the Node/Leap socket URL is toggled
 */

var defaultSettings = {
    //Toggle plugin activating on page
    enable_plugin: false,
    
    //Connect to NodeJS detection server
    node_detection: true,
    
    //Display screen/viewport status
    windowInfo: false,
    
    //Display pointables data
    pointsTable: false,
    
    //Display raw JSON data
    json: false
};

/*********HELPER FUNCTIONS********/
function stringToBool(string) { return (string === 'true'); }
/****************************/

/*********SETTINGS FUNCTIONS********/
//Send a setting change to all tabs
function sendSettingChange(setting, value) {
    if (setting === "enable_plugin") {
        if (value) {
            //Set the icon status and connect the websocket via background.js
            chrome.extension.getBackgroundPage().setIconStatus("enabled");
            chrome.extension.getBackgroundPage().connect();            
        } else {
            //Set the icon status and disconnect the websocket via background.js
            chrome.extension.getBackgroundPage().setIconStatus("disabled");
            chrome.extension.getBackgroundPage().disconnect();                        
        }
    } else if (setting === "node_detection") {
        //Disconnect and reconnect the websocket via background.js
        chrome.extension.getBackgroundPage().disconnect();
        chrome.extension.getBackgroundPage().connect();
    }
    
    var newSetting = {};
    //The key has to be set this way to be serialized, otherwise it gets interpreted literally
    newSetting[setting] = value;    
    chrome.tabs.getAllInWindow(null, function(tabs){
        for (var i = 0; i < tabs.length; i++) {
            chrome.tabs.sendMessage(tabs[i].id, newSetting);
        }
    });    
}

//Load the settings from localStorage and set the checkbox values in popup.html
function loadSettings() {
    if (localStorage['windowInfo'] === undefined) { //No settings exist
        localStorage.clear(); //Just to be sure no stale settings are left
        //Populate the  localStorage table with the detault settings
        $.each(defaultSettings, function(key, value) { localStorage[key] = value; });
    } else {
        //Load the settings from localStorage and set the checkboxes
        for (var key in localStorage) {
            $("#"+key).prop('checked', stringToBool(localStorage[key]));
        }
    }
}
/****************************/

$(document).ready(function() { 
    loadSettings();
    
    //Checkbox setting was changed, update localStorage and send the change to injected scripts
    $('.setting').change(function() {
        var setting = $(this).attr("id");
        var value = $(this).prop('checked');
        localStorage[setting] = value;
        sendSettingChange(setting, value);
    });
});