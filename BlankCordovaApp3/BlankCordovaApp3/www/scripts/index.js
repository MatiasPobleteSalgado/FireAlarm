// Si quiere una introducción sobre la plantilla En blanco, vea la siguiente documentación:
// http://go.microsoft.com/fwlink/?LinkID=397704
// Para depurar código al cargar la página en cordova-simulate o en dispositivos o emuladores Android: inicie la aplicación, establezca puntos de interrupción 
// y ejecute "window.location.reload()" en la Consola de JavaScript.
/*
(function () {
    "use strict";

    document.addEventListener('deviceready', onDeviceReady.bind(this), false);
    
    function onDeviceReady() {
        
        // Controlar la pausa de Cordova y reanudar eventos
        document.addEventListener('pause', onPause.bind(this), false);
        document.addEventListener('resume', onResume.bind(this), false);

        document.getElementById("dialogAlert").addEventListener("loadstart", dialogAlert);
        console.log(navigator.notification);
        function alertDismissed() {
            // do something
        }

        navigator.notification.alert(
            'You are the winner!',  // message
            alertDismissed,         // callback
            'Game Over',            // title
            'Done'                  // buttonName
        );
        
        document.getElementById("dialogConfirm").addEventListener("loadeddata", dialogConfirm);
        document.getElementById("dialogPrompt").addEventListener("click", dialogPrompt);
        document.getElementById("dialogBeep").addEventListener("click", dialogBeep);

        // TODO: Cordova se ha cargado. Haga aquí las inicializaciones que necesiten Cordova.
        var parentElement = document.getElementById('deviceready');
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');
        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');
    };

    document.addEventListener("deviceready", onDeviceReady, false);

    // device APIs are available
    //
    function onDeviceReady() {
        // Empty
    }

    // alert dialog dismissed
    function alertDismissed() {
        // do something
    }

    // Show a custom alertDismissed
    //
    function showAlert() {
        navigator.notification.alert(
            'You are the winner!',  // message
            alertDismissed,         // callback
            'Game Over',            // title
            'Done'                  // buttonName
        );
    }
    function onPause() {
        // TODO: esta aplicación se ha suspendido. Guarde el estado de la aplicación aquí.
    };

    function onResume() {
        // TODO: esta aplicación se ha reactivado. Restaure el estado de la aplicación aquí.
    };
    // json
    var myJSON = '{ "name":"John", "age":31, "city":"New York" }';
    var myObj = JSON.parse(myJSON);

    function mostrarhora() {
        var f = new Date();
        var cad = f.getHours() + ":" + f.getMinutes() + ":" + f.getSeconds();
        window.status = cad;
        setTimeout("mostrarhora()", 1000);
    }

    function myFunction() {
        setInterval(
            function dialogAlert() {
                var message = myObj.name;
                var title = "ALERT";
                var buttonName = "Alert Button";
                navigator.notification.alert(message, alertCallback, title, buttonName);
                //setTimeOut("dialogAlert()", 1000);
                function alertCallback() {
                    console.log("Alert is Dismissed!");
                }
            }
            ,
            3000);
    }

    
    function dialogAlert() {
        var message = myObj.name;
        var title = "ALERT";
        var buttonName = "Alert Button";
        navigator.notification.alert(message, alertCallback, title, buttonName);
        //setTimeOut("dialogAlert()", 1000);
        function alertCallback() {
            console.log("Alert is Dismissed!");
        }
    };
    function dialogConfirm() {
        var message = "Am I Confirm Dialog?";
        var title = "CONFIRM";
        var buttonLabels = "YES,NO";
        navigator.notification.confirm(message, confirmCallback, title, buttonLabels);

        function confirmCallback(buttonIndex) {
            console.log("You clicked " + buttonIndex + " button!");
        }

    };
    function dialogPrompt() {
        var message = "Am I Prompt Dialog?";
        var title = "PROMPT";
        var buttonLabels = ["YES", "NO"];
        var defaultText = "Default"
        navigator.notification.prompt(message, promptCallback,
            title, buttonLabels, defaultText);

        function promptCallback(result) {
            console.log("You clicked " + result.buttonIndex + " button! \n" +
                "You entered " + result.input1);
        }

    };
    function dialogBeep() {
        var times = 2;
        navigator.notification.beep(times);
    };
})();


document.addEventListener("deviceready", onDeviceReady, false);

// device APIs are available
//
function onDeviceReady() {
    // Empty
}

// alert dialog dismissed
function alertDismissed() {
    // do something
}

// Show a custom alertDismissed
//

var myJSON = '{ "name":"John", "age":31, "ubicacion":"New York" }';
var myObj = JSON.parse(myJSON);

var myVar;
function myFunction() {
    myVar = setInterval(showAlert, 3000);
}

function showAlert() {
    navigator.notification.confirm(
        'Sr(a) ' + myObj.name + ' su casa se esta quemando',           // message
        OK(1),                                            // callback
        'Notificacion',                                               // title
        ['OK','NO']                       // buttonName
    );
}
function myStopFunction() {
    clearInterval(myVar);
}

function OK(buttonIndex) {
    console.log(buttonIndex == '1')
    if ('1' == buttonIndex) {
        navigator.notification.alert(
            'MENSAJE',
            alertDismissed,  //callback
            'TITULO',
            'BOTON'
        );
    }; 
}


/////////////////////////////////////////////////////////
// 2DO PLANO

document.addEventListener('deviceready', function () {
    // cordova.plugins.backgroundMode is now available
}, false);
cordova.plugins.backgroundMode.enable();
// or
//cordova.plugins.backgroundMode.setEnabled(true);

cordova.plugins.backgroundMode.isActive();
cordova.plugins.backgroundMode.on('EVENT', function);
*/

/*
document.addEventListener('deviceready', function () {
    // cordova.plugins.notification.local is now available
}, false);

var date = new Date();

cordova.plugins.notification.local.schedule({
    id: 1,
    title: "Message Title",
    message: "Message Text",
    firstAt: date, // firstAt and at properties must be an IETF-compliant RFC 2822 timestamp
    every: "week", // this also could be minutes i.e. 25 (int)
    sound: "file://sounds/reminder.mp3",
    icon: "http://icons.com/?cal_id=1",
    data: { meetingId: "123#fg8" }
});

cordova.plugins.notification.local.on("click", function (notification) {
    joinMeeting(notification.data.meetingId);
});


document.addEventListener('deviceready', function () {
    // Schedule notification for tomorrow to remember about the meeting
    cordova.plugins.notificación.local.horario({
        texto: "¡ Despierta! ",
        sonido: " file: //sounds/alert.caf ",
        cada: 30  // cada 30 minutos 
    });
}, false);


document.addEventListener("deviceready", onDeviceReady, false);
function onDeviceReady() {
    console.log(navigator.notification);
}

function onConfirm(buttonIndex) {
    alert('You selected button ' + buttonIndex);
}

navigator.notification.confirm(
    'You are the winner!', // message
    onConfirm,            // callback to invoke with index of button pressed
    'Game Over',           // title
    ['Restart', 'Exit']     // buttonLabels
);
*/
///////////


document.addEventListener("deviceready", onDeviceReady, false)
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
        'Decea llamar a emergencias',  // message
        onConfirm,              // callback to invoke with index of button pressed
        'CASA EN PELIGRO',            // title
        'EMERGENCIAS, NO'          // buttonLabels
    );
}
function myFunction(){
    myVar = setInterval(showConfirm, 3000);
}

//CALL NUMBER 
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

//NOTIFICACION LOCAL
document.addEventListener('deviceready', function () {
    console.log(cordova.plugins.notification.local.launchDetails);
    /*
    cordova.plugins.notification.local.schedule({
        title: 'Design team meeting',
        trigger: { every: {minute: 1 , count:5 }},

    });
    */
    cordova.plugins.notification.local.schedule({
        title: 'My first notification',
        text: 'Thats pretty easy...',
        foreground: true
});
}, false);

