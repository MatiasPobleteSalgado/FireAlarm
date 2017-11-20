function WifiSelector(controller) {
    var _this = this;
    this.controller = controller;
    this.container = $("#wifiCont");
    this.connectScreen = $("#connectScreen");
    this.netSelectorScreen = $("#netSelectorScreen");
    this.wifiList = $("#wifiList");
    this.wifiForm = $("#wifiForm");
    this.selectedNet = $("#selectedNet");
    this.nodeConnectedBtn = $("#nodeConnectedBtn");
    this.retryScanBtn = $("#retryScanBtn");
    this.selectedNetID = null;
    this.nodeIP = null;

    this.checkMCUNet = function () {
        $.post(
            _this.controller.nodeMCUAPAddress,
            '{"type": "checkNet"}',
            _this.nodeCkeck,
            "text"
        );
    }

    this.nodeCkeck = function (data, status) {
        if (status == "success") {
            var msg = JSON.parse(data);
            if (msg.type == "message") {
                if (msg.value == "MCU Device") {
                    _this.getNetworks();
                }
                return false;
            }
            return false;
        }
        return false;
    }

    this.getNetworks = function () {
        _this.connectScreen.css("display", "none");
        $.post(
            _this.controller.nodeMCUAPAddress,
            '{"type": "get_networks"}',
            _this.nodeWifiNetResponse,
            "text"
        );
    }

    this.getIP = function () {
        console.log("Getting IP");
        $.post(
            _this.controller.nodeMCUAPAddress,
            '{"type": "get_ip"}',
            _this.nodeIPResponse,
            "text"
        );
    }

    this.selectNetwork = function (evnt) {
        _this.netSelectorScreen.css("display", "none");
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
        $.post(
            _this.controller.nodeMCUAPAddress,
            JSON.stringify(postData),
            _this.nodeCredResponse,
            "text"
        );
    }

    this.finishConfig = function () {
        console.log("Finishing");
        $.post(
            _this.controller.nodeMCUAPAddress,
            '{"type": "finish_config"}',
            _this.controller.wifiReady,
            "text"
        );
    }

    this.sendUserData = function () {
        $.post(
            _this.controller.nodeMCUAPAddress,
            JSON.stringify(_this.controller.login.user),
            _this.finishConfig,
            "text"
        );
    }

    this.nodeCredResponse = function (data, status) {
        if (status == "success") {
            var response = JSON.parse(data);
            if (response.type != "Error") {
                setTimeout(_this.getIP, 3000);
            }
        }
    }

    this.nodeIPResponse = function (data, status) {
        if (status == "success") {
            var ipData = JSON.parse(data);
            if (ipData.type === "ip") {
                _this.nodeIP = ipData.value;
                _this.sendUserData();
            }
            else {
                setTimeout(_this.getIP, 1500);
            }
        }
        else {
            setTimeout(_this.getIP, 1500);
        }
    }

    this.nodeWifiNetResponse = function (data, status) {
        _this.netSelectorScreen.css("display", "block");
        var nets = JSON.parse(data);
        _this.wifiList.empty();      
        for (indx in nets) {
            _this.wifiList.append(
                '<button type="button" class="list-group-item wifiNetBtn" id="net-' + indx + '">' + nets[indx] + '</button>'
            )
        }
        $(".wifiNetBtn").click(_this.selectNetwork);
    }

    this.show = function () {
		_this.container.css("display", "block");
	}

	this.hide = function(){
		_this.container.css("display", "none");
    }

    this.wifiForm.on("submit", this.sendNetworkData);
    this.nodeConnectedBtn.click(this.checkMCUNet);
    this.retryScanBtn.click(this.checkMCUNet);
    this.controller.components["wifiSelector"] = this;
   
    return this;
}

console.log("WifiSelector loaded");