function Monitor(controller) {
	var _this = this;
	this.controller = controller;
	this.container = $("#monitorCont");
	this.sensorList = $("#sensorList");
	this.controller.components["monitor"] = this;
	this.intervalID = null;
	this.started = false;

	this.sensorCallback = function(data, status){
		console.log(data);
		_this.sensorList.empty();
		//var sensors = JSON.parse(data);

		/* for the real data _this.sensorList.append("<li>" + JSON.parse(data)["Value"] + "</li>"); */
		_this.sensorList.append("<li>" + data + "</li>");
		/* // for multiple sensors
		for (indx in sensors){
			_this.sensorList.append(
				"<li>" + sensors[indx]["name"] + "   " sensors[indx]["value"] + </li>"
			);
		}
		*/
	}

	this.getSensorData = function(){
		console.log("Getting data");
		$.post(
			"http://localhost/FireAlarm/nodeSim.php",
			{"mcu_action": "get_adc"},
			_this.sensorCallback
		);
	}

	this._start = function(){
		console.log("Monitor started");
		this.intervalID = setInterval(this.getSensorData, 500);
		this.started = true
	}

	this._stop = function(){
		console.log("Monitor stoped");
		clearInterval(this.intervalID);
		this.started = false
	}

	this.show = function(){
		this.container.css("display", "block");
		if(!this.started){
			this._start();
		}
	}

	this.hide = function(){
		this.container.css("display", "none");
		if(this.started){
			this._stop();
		}
	}

	return this;
}