function Notifications(controller) {
    var _this = this;
    this.controller = controller;
    this.container = $("#notificationCont");
    this.lastNotification = 0;
    this.threadID = null;

    this.controller.components["notifications"] = this;

    this.show = function () {
        this.container.css("display", "block");
    }

    this.hide = function () {
        this.container.css("display", "none");
    }

    this.start = function () {
        cordova.plugins.backgroundMode.enable();
        _this.threadID = setInterval(_this.get, 5000);
    }

    this.get = function () {
        console.log("Pidiendo");
        console.log(_this.lastNotification);
        $.post(
            _this.controller.cloudServiceAddress,
            { type: "getNotifications", last: _this.lastNotification},
            _this.response
        );
    }

    this.response = function (data, code) {
        var events = JSON.parse(data);
        var notif = [];
        for (e in events) {
            var newNot = {};
            newNot.id = parseInt(events[e].code) + 1;
            newNot.text = events[e].sens;
            newNot.title = events[e].date;

            notif.push(newNot);
        }
        if (notif.length > 0) {
            cordova.plugins.notification.local.schedule(notif);
            console.log(parseInt(events[events.length - 1].code));
            _this.lastNotification = parseInt(events[events.length - 1].code);
        }
        this.notification();
    }
    // Aqui comienza la otra notificacion

    this.onBtnConfirm = function (buttonIndex) {
        if (1 == buttonIndex) {
            callNumber(103);                    //funcion que contiene el callNumber
        }
    }

    // Show a confirmation dialog
    this.notification = function () {
        navigator.notification.confirm(
            'Decea llamar a emergencias',  // message
            this.onBtnConfirm,              // callback to invoke with index of button pressed
            'CASA EN PELIGRO',            // title
            'EMERGENCIAS, NO'          // buttonLabels
        );
    }

    //CALL NUMBER 
    this.onSuccess = function (result) {
        console.log("Success:" + result);
    }

    this.onError = function (result) {
        console.log("Error:" + result);
    }

    this.call = function (number) {
        console.log("Launching Calling Service for number " + number);
        window.plugins.CallNumber.callNumber(this.onSuccess, this.onError, number, false);
    }

    return this;
}