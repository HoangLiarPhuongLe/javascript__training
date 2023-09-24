import { API_BASE_URL } from "../constants/urls";
import Account from "../models/accountModel";
import ApiService from "./apiService";
import { REGEX } from "../constants/constant";

class AccountService{
    constructor(){
        this.api = new ApiService(API_BASE_URL, '/accounts');
        this.accountList;
        this.initAccountList();
    }

    initAccountList = async () => {
        const data = await this.api.get();
        this.accountList = this.parseData(data);
    };

    /**
    * Parse the data array to array of Account object.
    * @param {Array} data 
    * @returns {Array} array of Account object.
    */
    parseData = (data) => {
        return data.map((account) => new Account(account));
    }

    isRequired = (data) => {
        for (const key in data) {
            if (data[key].toString().trim() === "") {
              return false;
            }
        }
        
        return true;
    }

    isValidForm = ({email, password}) => {
       
        const isEmailValid = REGEX.EMAIL.test(email);
        const isPasswordValid = REGEX.PASSWORD.test(password);

 
        return isEmailValid && isPasswordValid;
    }

    /**
    * Method to check if the provided account credentials are valid.
    * @param {Object} - An object containing account credentials (email and password).
    * @returns {Boolean} True if the account is valid, otherwise false.
    */
    isValidAccount = ({email, password}) => {
        const validAccount = this.accountList.some((item) => item.email === email && item.password === password)
        return validAccount;
    }
}

export default AccountService;
