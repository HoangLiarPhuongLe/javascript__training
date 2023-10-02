import { MESSAGE, ERROR_MESSAGE } from "../constants/message";
import { validate } from "../helpers/validationForm";

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

            const inputs = validate(accountInput);
            const isValidFields = this.isValidation(inputs);

            const errorCredentials = document.querySelector(".error-credentials");

            if(!isValidFields){
                this.clearErrorMessage(errorCredentials);
            } else if (!isValidAccount(accountInput)){
                this.showErrorMessage(errorCredentials,ERROR_MESSAGE.ERROR_CREDENTIALS);
            } else {
                window.location.href = 'home.html';
            }            
        })
    }

    isValidation = (inputs) => {
        let isValid = true;

        inputs.forEach(input => {
            const inputElement = this.loginForm[input.field];
            const errorElement = inputElement.nextElementSibling;

            if (input.isValid){
                this.clearErrorMessage(errorElement);
            } else {
                this.showErrorMessage(errorElement,input.message);

                isValid = false;
            }
        });
        return isValid;
    }

    showErrorMessage = (error,message) =>{
        error.classList.add("error-message");
        error.textContent = message;
    }

    clearErrorMessage = (error) => {
        error.classList.remove("error-message");
        error.textContent = "";
    }
}

export default LoginView;   
