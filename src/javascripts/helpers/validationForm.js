import { REGEX } from "../constants/config";
import { MESSAGE } from "../constants/message";

export const validationForm = (data) => {
    const emailError = document.querySelector(".error-email");
    const passwordError = document.querySelector(".error-password");

   isValid = true;

   const fields = [
    {
      name: 'email',
      regex: REGEX.EMAIL,
      requiredMessage: MESSAGE.EMAIL_REQUIRED,
      invalidMessage: MESSAGE.INVALID_EMAIL,
      error: emailError 
    },
    {
      name: 'password',
      regex: REGEX.PASSWORD,
      requiredMessage: MESSAGE.PASSWORD_REQUIRED,
      invalidMessage: MESSAGE.INVALID_PASSWORD,
      error: passwordError
    }
   ]

   for ( const field of fields) {
    const value = data[field.name];
    const isValidField = field.regex.test(value);
    const errorElement = field.error;

    if(value.trim() === ''){
      errorElement.classList.add("error-message");
      errorElement.textContent = field.requiredMessage;
      isValid = false;
    }

    else if(!isValidField){
      errorElement.classList.add("error-message");
      errorElement.textContent = field.invalidMessage;
      isValid = false;
    } 

    else {
      errorElement.classList.remove("error-message");
      errorElement.textContent = "";
    }
  }

  return isValid;

}
