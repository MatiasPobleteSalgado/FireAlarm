function Notifications(controller) {
	var _this = this;
	this.controller = controller;
    this.container = $("#notificationCont");
	
    this.controller.components["notifications"] = this;

	this.show = function(){
		this.container.css("display", "block");
		this.get();
	}

	this.hide = function(){
		this.container.css("display", "none");
	}

	this.get = function(){
        $.post(
            this.controller.cloudServiceAddress,
			{type: "getNotifications", last: -1},
			this.response
		);
	}

    this.response = function (data, code){
        var events = JSON.parse(data);
        var notif = [];
        for (e in events) {
            var newNot = {};
            newNot.id = parseInt(events[e].code) + 1;
            newNot.text = events[e].sens;
            newNot.title = events[e].date;

            notif.push(newNot);
        }
        console.log(JSON.stringify(notif));
        cordova.plugins.notification.local.schedule(notif);
        console.log(notif);

	}
	
	return this;
}

console.log("Notifications loaded");