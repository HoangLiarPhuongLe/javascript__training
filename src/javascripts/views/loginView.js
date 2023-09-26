import { MESSAGE, ERROR_MESSAGE } from "../constants/message";
import { isRequired, isValidForm } from "../helpers/validationForm";

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

            const emailError = document.querySelector(".error-email");
            const passwordError = document.querySelector(".error-password");
            const errorCredentials = document.querySelector(".error-credentials");

            const errorMessages = [];

            if (!isRequired(accountInput)){
              errorMessages.push(MESSAGE.EMAIL_REQUIRED, MESSAGE.PASSWORD_REQUIRED);
            }
            else if (!isValidForm(accountInput)){
              errorMessages.push(MESSAGE.INVALID_EMAIL);
            }
            else if (!isValidAccount(accountInput)){
              errorMessages.push(ERROR_MESSAGE.ERROR_CREDENTIALS);
            }
            else {
              window.location.href = 'home.html';
            }

            displayErrors(errorMessages);

            function displayErrors(messages) {
              emailError.classList.remove("error-message");
              emailError.textContent = "";
              passwordError.classList.remove("error-message");
              passwordError.textContent = "";
              messages.forEach((message, index) => {
                const element = index === 0 ? emailError : passwordError;
                element.classList.add("error-message");
                element.textContent = message;
              });
            }
        })
    }
}

export default LoginView;   

