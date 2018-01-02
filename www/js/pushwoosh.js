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