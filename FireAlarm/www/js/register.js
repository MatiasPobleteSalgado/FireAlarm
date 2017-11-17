function Register(controller) {
    var _this = this;
    this.controller = controller;
    this.container = $("#registerCont");
    
    this.controller.components["register"] = this.container;

    return this;
}