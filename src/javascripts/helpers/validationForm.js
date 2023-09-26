import { REGEX } from "../constants/config";


export const isRequired = (data) => {
    for (const key in data) {
        if (data[key].toString().trim() === "") {
          return false;
        }
    }
    return true;
}

export const isValidForm = ({email, password}) => {
    const isEmailValid = REGEX.EMAIL.test(email);
    const isPasswordValid = REGEX.PASSWORD.test(password); 
    return isEmailValid && isPasswordValid;
}
