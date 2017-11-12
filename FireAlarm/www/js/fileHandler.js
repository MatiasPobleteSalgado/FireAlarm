function FileHandler() {
    var _this = this;
    this.userFileName = "user.json";

    this.saveUserInfo = function (user) {
        console.log("Here");
        window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function (fs) {
            console.log('file system open: ' + fs.name);
            fs.root.getFile(_this.userFileName, { create: true }, function (file) {
                file.createWriter(
                    function (fileWriter) {
                        fileWriter.write(JSON.stringify(user));
                    }
                );
            }, _this.onErrorCreateFile);

        }, _this.onErrorLoadFs);
    }

    this.onErrorCreateFile = function () {
        console.log("Error creating file");
    }

    this.onErrorLoadFs = function () {
        console.log("Error opening file system");

    }

    this.checkUserExist = function () {
        return false;
    }

    return this;
}