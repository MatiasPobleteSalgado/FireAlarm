function Account(controller) {
	var _this = this;
	this.controller = controller;
	this.container = $("#accountCont");
	
	this.controller.components["account"] = this.container;

	this.show = function(){
		this.container.css("display", "block");
	}

	this.hide = function(){
		this.container.css("display", "none");
	}

	return this;
}