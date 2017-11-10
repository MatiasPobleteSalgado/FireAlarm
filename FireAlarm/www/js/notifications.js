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
			"http://localhost/FireAlarm/app.php",
			{type: "getNotifications", last: 0},
			this.response
		);
	}

	this.response = function(data, code){
		console.log(JSON.parse(data));
	}
	
	return this;
}