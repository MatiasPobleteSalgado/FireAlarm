function Notifications(controller) {
	var _this = this;
	this.controller = controller;
	this.container = $("#notificationCont");
	
    this.controller.components["notifications"] = this;

    //console.log(cordova.plugins.notification.local.launchDetails);

	this.show = function(){
		this.container.css("display", "block");
		this.get();
	}

	this.hide = function(){
		this.container.css("display", "none");
	}

	this.get = function(){
		$.post(
			"http://192.168.1.101/FireAlarm/app.php",
			{type: "getNotifications", last: -1},
			this.response
		);
	}

	this.response = function(data, code){
        console.log(JSON.parse(data));

        var events = JSON.parse(data);
        for (e in events) {
            cordova.plugins.notification.local.schedule({
                title: events[e].date,
                text: events[e].sensorData,
                foreground: true
            });
        }
	}
	
	return this;
}