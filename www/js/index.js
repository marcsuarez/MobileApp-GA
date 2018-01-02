/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

function initPushwoosh() {
    var pushwoosh = cordova.require("pushwoosh-cordova-plugin.PushNotification");
  
    // Should be called before pushwoosh.onDeviceReady
    document.addEventListener('push-notification', function(event) {
      var notification = event.notification;
      // handle push open here
    });
    
    // Initialize Pushwoosh. This will trigger all pending push notifications on start.
    pushwoosh.onDeviceReady({
      appid: "6EE6E-9BF27",
      projectid: "658431314297",
      serviceName: ""
    });
}

pushwoosh.registerDevice(
    function(status) {
      var pushToken = status.pushToken;
        // handle successful registration here
    },
    function(status) {
      // handle registration error here
    }
);

// should be called before pushwoosh.onDeviceReady
document.addEventListener('push-notification', function(event) {
    var notification = event.notification;
    // handle push open here
});

var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
        initPushwoosh();
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};