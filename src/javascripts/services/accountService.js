import { API_BASE_URL } from "../constants/urls";
import Account from "../models/accountModel";
import ApiService from "./apiService";
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

    /**
    * Method to check if the provided account credentials are valid.
    * @param {Object} - An object containing account credentials (email and password).
    * @returns {Boolean} True if the account is valid, otherwise false.
    */
    isValidAccount = ({email, password}) => {
        const isAccountValid = this.accountList.some((item) => item.email === email && item.password === password)
        return isAccountValid;
    }
}

export default AccountService;
