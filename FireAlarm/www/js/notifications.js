function Notifications(controller) {
	var _this = this;
	this.controller = controller;
	this.container = $("#notificationCont");
	
	this.controller.components["notifications"] = this.container;

    document.addEventListener('deviceready', function () {
        cordova.plugins.notification.local.schedule({
            id: 1,
            title: "Notification Test",
            message: "Message Text",
        });
    }, false);


	return this;
}