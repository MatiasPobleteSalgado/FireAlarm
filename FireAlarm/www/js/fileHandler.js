function FileHandler(cont) {
    var _this = this;
    this.controller = cont;
    this.userFileName = "user.json";

    this.saveUserInfo = function (user) {
        console.log(user);

        window.resolveLocalFileSystemURL(cordova.file.applicationStorageDirectory, function (dir) {
            dir.getFile(_this.userFileName, { create: true }, function (file) {
                var logOb = file;
                logOb.createWriter(function (fileWriter) {
                    //fileWriter.seek(fileWriter.length);
                    var blob = new Blob([JSON.stringify(user)], { type: 'text/plain' });
                    fileWriter.write(blob);
                }, function (e) { console.error(e); });
            });
        });
    }

    this.delete = function () {
        window.resolveLocalFileSystemURL(cordova.file.applicationStorageDirectory, function (dir) {
            dir.getFile(_this.userFileName, { create: true }, function (file) {
                file.remove(function () {
                    _this.controller.toast("Session cerrada correctamente");
                }, function (error) {
                    _this.controller.toast("Error cerrando sesion: " + error);
                }, function () {
                    _this.controller.toast("La sesion no existe WTF");
                });
            });
        });
    }


    this.onErrorCreateFile = function () {
        console.log("Error creating file");
    }

    this.onErrorLoadFs = function () {
        console.log("Error opening file system");

    }

    this.checkUserExists = function () {
        $.get(
            cordova.file.applicationStorageDirectory + _this.userFileName,
            {},
            _this.userExists
        ).fail(function () {
            _this.controller.toast("No user Registered, login");
            _this.controller.noUser();
        });
    }

    this.userExists = function (data, status) {
        if (status == "success") {
            var user = JSON.parse(data);
            _this.controller.userExists(user);
        }
        else {
            _this.controller.toast("No user Registered, login");
            _this.controller.noUser();
        }
    }

    return this;
}