function Notifications(controller) {
	var _this = this;
	this.controller = controller;
	this.container = $("#notificationCont");
	
	this.controller.components["notifications"] = this;

	this.show = function(){
		this.container.css("display", "block");
	}

	this.hide = function(){
		this.container.css("display", "none");
	}
	
    return this;

    //// AQUI comienza el caos
    document.addEventListener("deviceready", onDeviceReady, false);

    // Cordova is ready
    //
    function onDeviceReady() {
        // Empty
    }

    // process the confirmation dialog result
    function onConfirm(buttonIndex) {
        //console.log('se selecciono el boton ' + buttonIndex);
        if (1 == buttonIndex) {
            //alert('funciona pls ' + buttonIndex);
            myStopFunction();
            callNumber(103);
        }
        else {
            //alert('no funciono ' + buttonIndex);
            myStopFunction();
        }
    }

    // Show a custom confirmation dialog
    //
    function showConfirm() {
        navigator.notification.confirm(
            'Desea llamar a emergencias',  // message
            onConfirm,              // callback to invoke with index of button pressed
            'CASA EN PELIGRO',            // title
            'EMERGENCIAS, NO'          // buttonLabels
        );
    }
    function myFunction() {
        myVar = setInterval(showConfirm, 3000);
    }

    //CALNUMBER 
    function onSuccess(result) {
        console.log("Success:" + result);
    }

    function onError(result) {
        console.log("Error:" + result);
    }

    function callNumber(number) {
        console.log("Launching Calling Service for number " + number);
        window.plugins.CallNumber.callNumber(onSuccess, onError, number, false);
    }
    function myStopFunction() {
        clearInterval(myVar);
    }






}