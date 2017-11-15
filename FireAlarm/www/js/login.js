console.log("entering");
function Login(controller) {
	var _this = this;
	this.controller = controller;
	this.container = $("#loginCont");
	this.form = $("#loginForm");
	this.user = null;

	this.send = function(evnt){
        evnt.preventDefault();
		$.post(
			_this.controller.cloudServiceAddress,
			_this.form.serialize(),
			_this.response
		);
	}

    this.response = function (data, status) {
        if (status != "success") {
            _this.error(data);
            return;
        }
        else {
            var data = JSON.parse(data);
            if ("error" in data) {
                _this.error(data["error"]);
                return;
            }
            _this.user = data;
            _this.controller.onLogin();
        }
	}

    this.error = function (error) {
        this.controller.toast("Error: " + error);
	}

	this.form.on("submit", this.send);
	this.controller.components["login"] = this;

	this.show = function(){
		this.container.css("display", "block");
	}

	this.hide = function(){
		this.container.css("display", "none");
    }

	return this;
}

console.log("Login loaded...");