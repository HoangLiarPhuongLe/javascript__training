import { API_BASE_URL } from "../constants/urls";
import Transaction from "../models/transactionModel";
import ApiService from "./apiService";

class TransactionService {
    constructor(){
        this.api = new ApiService(API_BASE_URL, '/transaction');
        this.transactionList;
        this.initTransactionList();
    }

    initTransactionList = async () => {
        const data = await this.api.get();
        this.transactionList = this.parseData(data);
    }

    parseData = (data) => {
        return data.map((item) => new Transaction(item));
    }

    getTransactions(){
        return this.transactionList;
    }

    addTransaction = async(data) =>{
        const transaction = new Transaction(data);
        console.log(transaction);
        await this.api.addTransaction(transaction);
    }
}

export default TransactionService;
