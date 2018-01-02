function onPushwooshInitialized(pushNotification) {

	//if you need push token at a later time you can always get it from Pushwoosh plugin
	pushNotification.getPushToken(
		function(token) {
			console.info('push token: ' + token);
		}
	);

	//and HWID if you want to communicate with Pushwoosh API
	pushNotification.getPushwooshHWID(
		function(token) {
			console.info('Pushwoosh HWID: ' + token);
		}
	);

	//settings tags
	pushNotification.setTags({
			tagName: "tagValue",
			intTagName: 10
		},
		function(status) {
			console.info('setTags success: ' + JSON.stringify(status));
		},
		function(status) {
			console.warn('setTags failed');
		}
	);

	pushNotification.getTags(
		function(status) {
			console.info('getTags success: ' + JSON.stringify(status));
		},
		function(status) {
			console.warn('getTags failed');
		}
	);

	//start geo tracking.
	pushNotification.startLocationTracking();
}

function initPushwoosh() {
	var pushNotification = cordova.require("pushwoosh-cordova-plugin.PushNotification");

	//set push notifications handler
	document.addEventListener('push-notification',
		function(event) {
			var message = event.notification.message;
			var userData = event.notification.userdata;

			document.getElementById("pushMessage").innerHTML = message + "<p>";
			document.getElementById("pushData").innerHTML = JSON.stringify(event.notification) + "<p>";

			//dump custom data to the console if it exists
			if (typeof(userData) != "undefined") {
				console.warn('user data: ' + JSON.stringify(userData));
			}
		}
    );

    document.addEventListener('push-receive',
        function (event) {
            var message = event.notification.message;
            var userData = event.notification.userdata;

            document.getElementById("pushMessage").innerHTML = message + "<p>";
            document.getElementById("pushData").innerHTML = JSON.stringify(event.notification) + "<p>";

            //dump custom data to the console if it exists
            if (typeof (userData) != "undefined") {
                console.warn('user data: ' + JSON.stringify(userData));
            }
        }
    );

	//initialize Pushwoosh with projectid: "GOOGLE_PROJECT_ID", appid : "PUSHWOOSH_APP_ID". This will trigger all pending push notifications on start.
    pushNotification.onDeviceReady({
        projectid: "658431314297",
        appid: "6EE6E-9BF27",
        serviceName: ""
    });

	//register for push notifications
	pushNotification.registerDevice(
		function(status) {
			document.getElementById("pushToken").innerHTML = status.pushToken + "<p>";
			onPushwooshInitialized(pushNotification);
		},
		function(status) {
			alert("failed to register: " + status);
			console.warn(JSON.stringify(['failed to register ', status]));
		}
	);
}