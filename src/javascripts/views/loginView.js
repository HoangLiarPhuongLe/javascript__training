import { DATA } from "../constants/config";
import { ERROR_MESSAGE } from "../constants/message";
import { validate } from "../helpers/validationForm";
import { localStorageService } from "../services/localStorageService";

class LoginView{
    
    constructor(){
        this.loginForm = document.querySelector(".login-form");
        this.buttonSubmitElement = document.querySelector(".login-form-button");
    }

    //----- EVENT LISTENER -----//
    addEventLogin = (isValidAccount) => {
        this.buttonSubmitElement?.addEventListener("click", async(e)=>{
            e.preventDefault();

            const accountInput = {
                email: this.loginForm.email.value,
                password: this.loginForm.password.value,
            }

            const errors = validate(accountInput);

            const errorCredentials = document.querySelector(".error-credentials");
            const errorElements = document.querySelectorAll(".error-email, .error-password");
           
            if(errors.length > 0){
                this.showErrorMessage(errors);
            } else {
                this.clearErrorMessage(errorElements);
                if(!isValidAccount(accountInput)){
                    errorCredentials.classList.add("error-message");
                    errorCredentials.textContent = ERROR_MESSAGE.ERROR_CREDENTIALS;
                } else {
                    window.location.href = 'home.html';
                    this.saveEmailToLocalStorage(accountInput.email);
                }
            }
        })
    }

    showErrorMessage = (errors) =>{
        const errorElements = {
            email: document.querySelector(".error-email"),
            password: document.querySelector(".error-password"),
        }

        errors.forEach((error) => {
            errorElements[error.field].classList.add("error-message");
            errorElements[error.field].textContent = error.message;
        })
    }

    clearErrorMessage = (errorElements) => {
        errorElements.forEach((errorElement) => {
            errorElement.classList.remove("error-message");
            errorElement.textContent = "";
        })
    }

    saveEmailToLocalStorage = (email) => {
        localStorageService.saveLocalStorage(DATA.ACCOUNT, email);
    }
}

export default LoginView;   
