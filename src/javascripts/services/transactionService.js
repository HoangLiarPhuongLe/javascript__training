import { API_BASE_URL } from "../constants/urls";
import Transaction from "../models/transactionModel";
import ApiService from "./apiService";

class TransactionService {
    constructor(){
        this.api = new ApiService(API_BASE_URL, '/transaction');
        this.transactionList;
        this.initTransactionList();
    }

    /**
     * Initializing the Transactions object
     */
    initTransactionList = async () => {
        const data = await this.api.get();
        this.transactionList = this.parseData(data);
    }
    
    /**
     * Parsing data from JSON object to list of Transaction object
     * @param {JSON} data
     */
    parseData = (data) => {
        return data.map((item) => new Transaction(item));
    }

    /**
     * Get Transaction objects list
     * @returns {array}
     */
    getTransactions() {
        return this.transactionList;
    }

    addTransaction = async(data) => {
        const transaction = new Transaction(data);
        console.log(transaction);
        await this.api.addTransaction(transaction);
    }
}

export default TransactionService;
