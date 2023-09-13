class LoginView{
    
    constructor(){
        this.loginForm=document.querySelector(".login-form");
        this.buttonElement=document.querySelector(".login-form-button");
    }

    //----- EVENT LISTENER -----//
    addEventLogin=(checkInput,checkAccount)=>{
        this.buttonElement?.addEventListener("click", async(e)=>{
            e.preventDefault();

            const accountInput={
                email: this.loginForm.email.value,
                password: this.loginForm.password.value,
            }
            if(checkInput(accountInput))
            {
              if (checkAccount(accountInput))
              {
                window.location.href='home.html';
              } 
              else {
                const errorMessage= document.querySelector(".error-message");
                errorMessage.classList.add("active");
                errorMessage.textContent="Email or Password not correct. Please try again !";
              }
            }
            else {}
        })
    }
}

export default LoginView;   