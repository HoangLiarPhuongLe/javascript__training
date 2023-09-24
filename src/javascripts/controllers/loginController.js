class LoginController{
    constructor(service, view){
        this.service = service;
        this.view = view;
    }

    init = () => {
        this.view.addEventLogin(this.service.isRequired, this.service.isValidForm, this.service.isValidAccount);
    }
}

export default LoginController;
