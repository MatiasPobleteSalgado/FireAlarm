function WifiSelector(controller) {
	var _this = this;
	this.controller = controller;
	this.container  = $("#wifiCont");
	this.wifiList   = $("#wifiList");
	this.wifiForm   = $("#wifiForm");
	this.selectedNet = $("#selectedNet");
	this.selectedNetID = null;
	this.nodeIP = null;

	this.getNetworks = function(){
		console.log("Sending request");
		/*
		$.ajax({
			url: "http://192.168.1.1",
			data: {"type": "get_networks"},
			type: 'POST',
			crossDomain: true,
			dataType: 'json',
			success: this.nodeWifiNetResponse,
			error: function() { alert('Failed!'); }
		});
		*/
		
		$.post(
			"http://localhost/nodeSim",
			{"type": "get_networks"},
			_this.nodeWifiNetResponse,
			"json"
		);

	}

	this.selectNetwork = function(evnt){
		_this.wifiList.css("display", "none");
		_this.wifiForm.css("display", "block");
		_this.selectedNet.append("Conectarse a " + this.innerHTML);
		_this.selectedNetID = this.innerHTML;
	}

	this.sendNetworkData = function(evnt){
		evnt.preventDefault();
		var formData = _this.wifiForm.serializeArray();
		var postData = {};

		for(indx in formData){
			postData[formData[indx].name] = formData[indx].value;
		}

		postData["ssid"] = _this.selectedNetID;
		console.log(postData);
		$.post(
			"http://localhost/fireAlarm/nodeSim.php",
			postData,
			_this.nodeResponse
		);
	}

	this.nodeIPResponse = function(data, status){
		var ipData = JSON.parse(data);
		_this.nodeIP = ipData.ip;
	}

	this.nodeWifiNetResponse = function(data, status){
		var nets = JSON.parse(data);
		for(indx in nets){
			this.wifiList.append(
				'<button type="button" class="list-group-item wifiNetBtn" id="net-' + indx +'">' + post[indx] + '</button>'
			)
		}
		$(".wifiNetBtn").click(this.selectNetwork);
	}

	this.wifiForm.on("submit", this.sendNetworkData);
	this.controller.components["wifiSelector"] = this;

	this.show = function(){
		this.container.css("display", "block");
	}

	this.hide = function(){
		this.container.css("display", "none");
	}

	return this;
}