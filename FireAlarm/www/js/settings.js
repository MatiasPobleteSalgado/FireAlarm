function Settings(controller) {
	var _this = this;
	this.controller = controller;
	this.container = $("#settingCont");
	
	this.controller.components["settings"] = this.container;

	this.show = function(){
		this.container.css("display", "block");
	}

	this.hide = function(){
		this.container.css("display", "none");
	}

	return this;
}