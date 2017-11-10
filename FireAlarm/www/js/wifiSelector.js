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
		$.post(
			"http://192.168.1.1",
			'{"type": "get_networks"}',
			this.nodeWifiNetResponse,
			"text"
		);
	}

	this.getIP = function(){
		console.log("Getting IP");
		$.post(
			"http://192.168.1.1",
			'{"type": "get_ip"}',
			_this.nodeIPResponse,
			"text"
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
			"http://192.168.1.1",
			JSON.stringify(postData),
			_this.nodeResponse,
			"text"
		);
	}

	this.nodeResponse = function(data, status){
		console.log(data);
		setTimeout(_this.getIP, 3000);
	}

	this.nodeIPResponse = function(data, status){
		console.log(data);
		var ipData = JSON.parse(data);
		_this.nodeIP = ipData.Value;
		setTimeout(_this.controller.wifiReady, 18000);
	}

	this.nodeWifiNetResponse = function(data, status){
		var nets = JSON.parse(data);
		console.log(nets);
		for(indx in nets){
			_this.wifiList.append(
				'<button type="button" class="list-group-item wifiNetBtn" id="net-' + indx +'">' + nets[indx] + '</button>'
			)
		}
		$(".wifiNetBtn").click(_this.selectNetwork);
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