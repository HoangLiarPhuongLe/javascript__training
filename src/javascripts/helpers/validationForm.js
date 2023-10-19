import { REGEX } from "../constants/config";
import { MESSAGE } from "../constants/message";

export const validate = (data) => {
  
  const fieldCheck = [];

  const loginFields = [
    {
      field: 'email',
      regex: REGEX.EMAIL,
      requiredMessage: MESSAGE.EMAIL_REQUIRED,
      invalidMessage: MESSAGE.INVALID_EMAIL
    },
    {
      field: 'password',
      regex: REGEX.PASSWORD,
      requiredMessage: MESSAGE.PASSWORD_REQUIRED,
      invalidMessage: MESSAGE.INVALID_PASSWORD
    }
  ]

  for (const key in data){
    const value = data[key];
    const loginField = loginFields.find((field) => field.field === key)
    const isValid = loginField.regex.test(value);

    if(value.trim() === ''){
      fieldCheck.push({
        field: key,
        isValid: false,
        message: loginField.requiredMessage
      })
    } else if(!isValid){
      fieldCheck.push({
        field: key,
        isValid: false,
        message: loginField.invalidMessage
      })
    } 
  }
  return fieldCheck;
}

export const validateTransaction = (data) => {
  const fieldCheck = [];

  const transactionFields = [
    {
      field: 'category',
      requiredMessage: MESSAGE.CATEGORY_REQUIRED,
    },
    {
      field: 'date',
      requiredMessage: MESSAGE.DATE_REQUIRED,
    },
    {
      field: 'outflow',
      requiredMessage: MESSAGE.AMOUNT_REQUIRED,
    },
    {
      field: 'note',
      requiredMessage: MESSAGE.NOTE_REQUIRED,
    },
  ]

  for(const field of transactionFields){
   
    if (!data[field.field]){
      fieldCheck.push({
        field: field.field,
        message: field.requiredMessage
      })
    } 
  }
  return fieldCheck;
}
