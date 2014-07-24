/*
 * Background.js
 * 
 * This file is loaded as soon as the plugin/browser is started
 * Handles the single connection to the Node/Leap server and sends rawData events to all tabs
 * Sets the icon status to reflect the current connection state on websocket events
 * Sends the current popup.html settings to every new tab on load completion
 */

/*********HELPER FUNCTIONS********/

function stringToBool(string) { return (string === 'true'); }

function setIconStatus(status) {
    switch(status) {
        case "enabled":
            chrome.browserAction.setIcon({path:"../icon/icon128.png"});
            break;
        case "disabled":
            chrome.browserAction.setIcon({path:"../icon/icon128_disabled.png"});
            break;
        case "disconnected":
            chrome.browserAction.setIcon({path:"../icon/icon128_disconnected.png"});
            break;
        case "connected":
            //chrome.browserAction.setIcon({path:"../icon/icon128_disconnected.png"});  //TODO: Add a connected icon here
            break;
    }
}    

//Returns either the NodeJS URL or the Leap Motion url based on the value in localStorage
function getSocketURL() {
    if (stringToBool(localStorage['node_detection'])) return 'ws://localhost:8082/';
    else return 'ws://localhost:6437/';
}

//Sends an event to webleap.js in all tabs. Used for websocket states
function sendPluginEvent(event, data) {
    var newEvent = {};
    //The key has to be set this way to be serialized, otherwise it gets interpreted literally
    newEvent[event] = data;    
    
    if (event === "rawData") {
        //Only send rawData events to the active tab
        chrome.tabs.getSelected(null, function(tab) {
            chrome.tabs.sendMessage(tab.id, newEvent);
        });
    } else {
        //Send the event to all tabs
        chrome.tabs.getAllInWindow(null, function(tabs){
            for (var i = 0; i < tabs.length; i++) {
                chrome.tabs.sendMessage(tabs[i].id, newEvent);
            }
        });                 
    }
}

//Loads the settings from localStorage and return an object
function loadSettings() {
    var settings = {};
    for (var key in localStorage) {
        settings[key] = stringToBool(localStorage[key]);
    }   
    return settings;
}
/****************************/

/***********INITIALIZATION*************/
var webSocket = null;
if (stringToBool(localStorage['enable_plugin'])) {
    setIconStatus("enabled");
    connect();
} else {
    setIconStatus("disabled");
}
/****************************/

/***********WEBSOCKET*************/
function connect() {
    if (webSocket !== null) disconnect();    
    webSocket = new WebSocket(getSocketURL());
    webSocket.onopen = onConnect;
    webSocket.onclose = onDisconnect;
    webSocket.onmessage = onRawData;
    webSocket.onerror = onError;    
}

function disconnect() {
    webSocket.close();
    webSocket = null;
}

function onConnect(event) {
    setIconStatus("enabled");
    sendPluginEvent("enable", true);
}

function onDisconnect(event) {
    sendPluginEvent("enable", false);    
    setIconStatus("disconnected");
}

function onRawData(event) {
    sendPluginEvent("rawData", event.data);
}

function onError(event) {
    alert("Connection Error: "+event.data);
    sendPluginEvent("enable", false);
    setIconStatus("disconnected");
}
/****************************/

/***********CHROME FUNCTIONS*************/
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo) {
    //A tab has finished loading it's content    
    if (changeInfo.status === 'complete') {
        //If the plugin is enabled
        if (stringToBool(localStorage['enable_plugin'])) {
            //Send the current settings to the tabs content scripts
            chrome.tabs.sendMessage(tabId, loadSettings());
        }
    }
});
/****************************/