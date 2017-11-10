function Notifications(controller) {
	var _this = this;
	this.controller = controller;
	this.container = $("#notificationCont");
	
	this.controller.components["notifications"] = this;

	this.show = function(){
		this.container.css("display", "block");
	}

	this.hide = function(){
		this.container.css("display", "none");
	}
	
	return this;
}