function Notifications(controller) {
    var _this = this;
    this.controller = controller;
    this.container = $("#notificationCont");

    this.controller.components["notifications"] = this;

    this.show = function () {
        this.container.css("display", "block");
        this.get();
    }

    this.hide = function () {
        this.container.css("display", "none");
    }

    this.get = function () {
        $.post(
            this.controller.cloudServiceAddress,
            { type: "getNotifications", last: -1 },
            this.response
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
        console.log(JSON.stringify(notif));
        cordova.plugins.notification.local.schedule(notif);
        this.notification();
        console.log(notif);

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

console.log("Notifications loaded");