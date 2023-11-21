class LoginController {
    constructor(service, view) {
        this.service = service;
        this.view = view;
    }

    //----- LOGIN CONTROLLER -----//
    /**
     * Initializing Login interface and event handlers
     */
    init = () => {
        this.view.addEventLogin(this.service.isValidAccount);
    };
}

export default LoginController;
