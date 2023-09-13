import { API_BASE_URL } from "../constants/urls";
import Account from "../models/accountModel";
import ApiService from "./apiService";

class AccountService{
    constructor(){
        this.api= new ApiService(API_BASE_URL,'/accounts');
        this.initAccountList();
    }

    initAccountList= async()=>{
        const data= await this.api.get();
        this.accountList= this.parseData(data);
    };

    /**
    * Parse the data array to array of Account object.
    * @param {Array} data 
    * @returns {Array} array of Account object.
    */
    parseData=(data)=>{
        return data.map((account)=> new Account(account));
    }

    checkInput=({email,password})=>{
        // Regular expression for email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        // Regular expression for password validation (at least 8 characters)
        const passwordRegex = /^.{8,}$/;
         
        const isEmailValid= emailRegex.test(email);
        const isPasswordValid= passwordRegex.test(password);
 
        return isEmailValid && isPasswordValid;
    }

    /**
    * Method to check if the provided account credentials are valid.
    * @param {Object} - An object containing account credentials (email and password).
    * @returns {Boolean} True if the account is valid, otherwise false.
    */
    checkAccount=({email,password})=>{
        const validAccount = this.accountList.some((item)=>item.email == email && item.password==password)
        return validAccount;
    }
}

export default AccountService;