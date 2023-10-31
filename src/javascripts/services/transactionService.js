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

    getTransactionById = async(id) => {
        const data = await this.api.getTransactionById(id);
        const transaction = new Transaction(data);
        return transaction;
    }

    addTransaction = async(data) => {
        const transaction = new Transaction(data);
        await this.api.addTransaction(transaction);
        this.transactionList.push(transaction);
    }

    updateTransaction = async(data) => {
        const transaction = new Transaction(data);
        await this.api.updateTransaction(transaction);
    }
}

export default TransactionService;
