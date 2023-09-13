class LoginController{
    constructor(service,view){
        this.service=service;
        this.view=view;
    }

    init=()=>{
        this.view.addEventLogin(this.service.checkInput,this.service.checkAccount);
    }
}

export default LoginController;