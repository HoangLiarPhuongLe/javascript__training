import { MESSAGE,ERROR_MESSAGE } from "../constants/constant";

class LoginView{
    
    constructor(){
        this.loginForm = document.querySelector(".login-form");
        this.buttonElement = document.querySelector(".login-form-button");
    }

    //----- EVENT LISTENER -----//
    addEventLogin = (isRequired, isValidForm, isValidAccount) => {
        this.buttonElement?.addEventListener("click", async(e)=>{
            e.preventDefault();

            const accountInput = {
                email: this.loginForm.email.value,
                password: this.loginForm.password.value,
            }

            const emailInput = document.getElementById("email");
            const emailError = emailInput.nextElementSibling;
            const passwordInput = document.getElementById("password");
            const passwordError = passwordInput.nextElementSibling;
            const buttonSubmit = document.getElementById("buttonSubmitLogin");
            const errorCredentials = buttonSubmit.nextElementSibling;

            if (isRequired(accountInput)) {
                passwordError.textContent = "";

                if(isValidForm(accountInput))
                {
                  emailError.textContent = "";

                  if (isValidAccount(accountInput))
                  {
                    window.location.href = 'home.html';
                  } 
                  else {
                    errorCredentials.classList.add("error-message");
                    errorCredentials.textContent = ERROR_MESSAGE.ERROR_CREDENTIALS;
                  }
                }
                else {
                  emailError.classList.add("error-message");
                  emailError.textContent =  MESSAGE.INVALID_EMAIL;
                }
            }
            else {
              emailError.classList.add("error-message");
              emailError.textContent = MESSAGE.EMAIL_REQUIRED;
              passwordError.classList.add("error-message");
              passwordError.textContent = MESSAGE.PASSWORD_REQUIRED;
            }
            
        })
    }
}

export default LoginView;   
