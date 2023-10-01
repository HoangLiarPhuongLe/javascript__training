import { MESSAGE, ERROR_MESSAGE } from "../constants/message";
import { validationForm } from "../helpers/validationForm";

class LoginView{
    
    constructor(){
        this.loginForm = document.querySelector(".login-form");
        this.buttonElement = document.querySelector(".login-form-button");
    }

    //----- EVENT LISTENER -----//
    addEventLogin = (isValidAccount) => {
        this.buttonElement?.addEventListener("click", async(e)=>{
            e.preventDefault();

            const accountInput = {
                email: this.loginForm.email.value,
                password: this.loginForm.password.value,
            }

            const errorCredentials = document.querySelector(".error-credentials");

            if(validationForm(accountInput)){
                if(isValidAccount(accountInput)){
                    window.location.href = 'home.html';
                }
                else{
                    errorCredentials.classList.add("error-message");
                    errorCredentials.textContent = ERROR_MESSAGE.ERROR_CREDENTIALS;
                }
            }
            else{
                errorCredentials.classList.remove("error-message");
                errorCredentials.textContent = "";
            }

        })
    }
}

export default LoginView;   

