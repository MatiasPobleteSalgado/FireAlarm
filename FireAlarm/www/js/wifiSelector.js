function WifiSelector(controller) {
    var _this = this;
    this.controller = controller;
    this.container = $("#wifiCont");
    this.wifiList = $("#wifiList");
    this.wifiForm = $("#wifiForm");
    this.selectedNet = $("#selectedNet");
    this.nodeConnectedBtn = $("#nodeConnectedBtn");
    this.selectedNetID = null;
    this.nodeIP = null;
    this.ipThread = null

    this.getNetworks = function () {
        _this.nodeConnectedBtn.css("display", "none");
        $.post(
            "http://192.168.1.1",
            '{"type": "get_networks"}',
            _this.nodeWifiNetResponse,
            "text"
        );
    }

    this.getIP = function () {
        console.log("Getting IP");
        $.post(
            "http://192.168.1.1",
            '{"type": "get_ip"}',
            _this.nodeIPResponse,
            "text"
        );
    }

    this.selectNetwork = function (evnt) {
        _this.wifiList.css("display", "none");
        _this.wifiForm.css("display", "block");
        _this.selectedNet.append("Conectarse a " + this.innerHTML);
        _this.selectedNetID = this.innerHTML;
    }

    this.sendNetworkData = function (evnt) {
        evnt.preventDefault();
        var formData = _this.wifiForm.serializeArray();
        var postData = {};

        for (indx in formData) {
            postData[formData[indx].name] = formData[indx].value;
        }

        postData["ssid"] = _this.selectedNetID;
        console.log(postData);
        $.post(
            "http://192.168.1.1",
            JSON.stringify(postData),
            _this.nodeCredResponse,
            "text"
        );
    }

    this.finishConfig = function () {
        console.log("Finishing");
        $.post(
            "http://192.168.1.1",
            '{"type": "finish_config"}',
            _this.controller.wifiReady,
            "text"
        );
    }

    this.nodeCredResponse = function (data, status) {
        var response = JSON.parse(data);
        if (response.type !== "Error") {
            _this.ipThread = setTimeout(_this.getIP, 1500);
        }
        else {
            clearTimeout(_this.ipThread)
        }
    }

    this.nodeIPResponse = function (data, status) {
        console.log(data);
        var ipData = JSON.parse(data);
        if (ipData.type === "ip") {
            _this.nodeIP = ipData.value;
            _this.finishConfig();
        }
        else {
            _this.getIP();
        }
    }

    this.nodeWifiNetResponse = function (data, status) {
        _this.wifiList.css("display", "block");
        var nets = JSON.parse(data);
        console.log(nets);
        for (indx in nets) {
            _this.wifiList.append(
                '<button type="button" class="list-group-item wifiNetBtn" id="net-' + indx + '">' + nets[indx] + '</button>'
            )
        }
        $(".wifiNetBtn").click(_this.selectNetwork);
    }

    this.show = function () {
        console.log("asd");
		_this.container.css("display", "block");
	}

	this.hide = function(){
		_this.container.css("display", "none");
    }

    this.wifiForm.on("submit", this.sendNetworkData);
    this.nodeConnectedBtn.click(this.getNetworks);
    this.controller.components["wifiSelector"] = this;

    return this;
}