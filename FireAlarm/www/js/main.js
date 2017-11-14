function DOMController() {
	var _this = this;
	this.document = $(document);
	this.logedOptions = $(".onceLoged");
	this.navWidgets = $(".navigation");
	this.navBar = $("#navBar");
    this.components = {};
    this.cloudServiceAddress = "http://192.168.1.9/FireAlarm/app.php";
    this.nodeMCUAPAddress = "http://192.168.1.1";
    this.fileSys = new FileHandler();


    this.init = function () {
        console.log("asd");
		_this.login         = new Login(_this);
		_this.monitor       = new Monitor(_this);
		_this.settings      = new Settings(_this);
		_this.notifications = new Notifications(_this);
		_this.wifiSelector  = new WifiSelector(_this);
		_this.account       = new Account(_this);
		_this.navWidgets.click(_this.navigate);
		_this.session();
	}

    this.show = function (comp) {
        for (var c in _this.components) {
			_this.components[c].hide();
        }
		_this.components[comp].show();
	}

	this.wifiReady = function(data, status){
		_this.show("account");
	}

    this.onLogin = function () {
        //this.fileSys.saveUserInfo(this.login.user);
        console.log("Login finished");
		_this.show("wifiSelector");
		_this.logedOptions.css("display", "block");
    }

	this.navigate = function(evnt){
		_this.navBar.collapse("toggle");
		_this.show(this.name);
	}

	this.session = function () {
		$.post(
            _this.cloudServiceAddress,
            "type=session",
            function (data, status) {
                if(status == "success") {
                    _this.onSession(JSON.parse(data));
                }
                else {
                    console.log("error: " + data);
                }
            }
        );
	}

	this.onSession = function (data) {
		if (data.type != 'error') {
			if (data.type == 'session') {
	            if (data.value == 1) {
	                _this.logedOptions.css("display", "block");
	                _this.show("wifiSelector");
	            }
	            else {
	                _this.logedOptions.css("display", "none");
	                _this.show("loginCont");
	            }
	        }
	        else {
	        	console.log(data.type + ": " + data.value)
	        }
        }
        else {
            console.log("error: " + data.value);
        }
	}

    //this.init();
	this.document.ready(this.init);
	return this;
}

console.log("Entering closing");