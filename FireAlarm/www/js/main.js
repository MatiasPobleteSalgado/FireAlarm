function DOMController() {
	var _this = this;
	this.document = $(document);
	this.logedOptions = $(".onceLoged");
	this.navWidgets = $(".navigation");
	this.navBar = $("#navBar");
    this.quitBtn = $("#quitBtn");
    this.components = {};
    this.cloudServiceAddress = "http://192.168.1.9/FireAlarm/app.php";
    this.nodeMCUAPAddress = "http://192.168.1.1";

    this.init = function () {
		_this.login         = new Login(_this);
		_this.monitor       = new Monitor(_this);
		_this.settings      = new Settings(_this);
        _this.notifications = new Notifications(_this);
		_this.wifiSelector  = new WifiSelector(_this);
		_this.account       = new Account(_this);
        _this.fileSys       = new FileHandler(_this);
        _this.navWidgets.click(_this.navigate);
        _this.quitBtn.click(_this.quit);
        _this.fileSys.checkUserExists();
		//_this.session();
	}

    this.show = function (comp) {
        for (var c in _this.components) {
			_this.components[c].hide();
        }
		_this.components[comp].show();
	}

    this.wifiReady = function (data, status) {
        _this.login.user.nodeIP = _this.wifiSelector.nodeIP;
        _this.logedOptions.css("display", "block");
        _this.fileSys.saveUserInfo(_this.login.user);
        _this.notifications.start();
		_this.show("account");
	}

    this.onLogin = function () {
        this.fileSys.saveUserInfo(this.login.user);
        _this.notifications.start();
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

    this.userExists = function (user) {
        _this.login.user = user;
        _this.wifiSelector.nodeIP = user.nodeIP;
        if ("nodeIP" in user) {
            _this.toast("User Registered and Node Syncronized");
            _this.show("account");
            _this.logedOptions.css("display", "block");
            _this.notifications.start();
        }
        else {
            _this.show("wifiSelector");
        }
        //_this.logedOptions.css("display", "block");
    }

    this.noUser = function () {
        _this.show("login");
    }

    this.toast = function (msg) {
        window.plugins.toast.showWithOptions(
            {
                message: msg,
                duration: "short", // which is 2000 ms. "long" is 4000. Or specify the nr of ms yourself.
                position: "bottom",
                addPixelsY: -40  // added a negative value to move it up a bit (default 0)
            }
        );
        console.log(msg);
    }

    this.quit = function () {
        //_this.toast("Quit")
        _this.fileSys.delete();
        setTimeout(function () { location.reload(); }, 1500); 
    }

    //this.init();
	this.document.ready(this.init);
	return this;
}

function onLoad() {
    document.addEventListener(
        "deviceready",
        function () {
            app = new DOMController();
            document.addEventListener(
                "pause",
                function () {
                    cordova.plugins.backgroundMode.enable();
                    window.powerManagement.setReleaseOnPause(false, function () {
                        console.log('Set successfully');
                    }, function () {
                        console.log('Failed to set');
                    });
                    window.powerManagement.dim(function () {
                        console.log('Wakelock acquired');
                    }, function () {
                        console.log('Failed to acquire wakelock');
                    });
                },
                true
            );

            document.addEventListener(
                "resume",
                function () {
                    cordova.plugins.backgroundMode.disable();
                    console.log("resume");
                    window.powerManagement.release(function () {
                        console.log('Wakelock released');
                    }, function () {
                        console.log('Failed to release wakelock');
                    });
                },
                true
            );

        },
        true
    );
}