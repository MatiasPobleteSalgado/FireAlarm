function Account(controller) {
	var _this = this;
	this.controller = controller;
	this.container = $("#accountCont");
	this.userName = $("#userName");
	this.userAddress = $("#userAddress");
	this.userEmail = $("#userEmail");
	
	this.controller.components["account"] = this;

	this.show = function(){
		this.container.css("display", "block");
		this.userName.empty();
		this.userName.append(this.controller.login.user.name);
		//this.userAddress.append(this.controller.login.user[address]);
		this.userEmail.empty();
		this.userEmail.append(this.controller.login.user.eMail);
	}

	this.hide = function(){
		this.container.css("display", "none");
	}

	return this;
}

console.log("Account loaded");