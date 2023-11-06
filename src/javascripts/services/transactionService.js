import { API_BASE_URL } from "../constants/urls";
import Transaction from "../models/transactionModel";
import ApiService from "./apiService";

class TransactionService {
    constructor(){
        this.api = new ApiService(API_BASE_URL, '/transaction');
        this.transactionList;
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
        this.transactionList = this.transactionList.map((item) => {
            if (item.id.toString() === transaction.id) {
              return transaction;
            }
            return item;
        })
    }

    deleteTransaction = async(id) => {
        await this.api.deleteTransactionById(id);
        const index = this.transactionList.findIndex((item) => item.id == id);

        this.transactionList.splice(index, 1);
    }
}

export default TransactionService;
