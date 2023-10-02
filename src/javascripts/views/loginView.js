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
                errorCredentials.classList.remove("error-message");
                errorCredentials.textContent = "";
            }
            else if (!isValidAccount(accountInput)){
                errorCredentials.classList.add("error-message");
                errorCredentials.textContent = ERROR_MESSAGE.ERROR_CREDENTIALS;
            }
            else {
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
                errorElement.classList.remove("erro-message");
                errorElement.textContent = "";
            }
            else{
                errorElement.classList.add("error-message");
                errorElement.textContent = input.message;

                isValid = false;
            }
        });
        return isValid;
    }
}

export default LoginView;   
