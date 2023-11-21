import { API_BASE_URL } from '../constants/urls';
import Transaction from '../models/transactionModel';
import ApiService from './apiService';

class TransactionService {
    constructor() {
        this.api = new ApiService(API_BASE_URL, '/transaction');
        this.transactionList;
    }

    /**
     * Initializing the Transactions object
     */
    initTransactionList = async () => {
        const data = await this.api.get();
        this.transactionList = this.parseData(data);
    };

    /**
     * Parsing data from JSON object to list of Transaction object
     * @param {JSON} data
     */
    parseData = (data) => {
        return data.map((item) => new Transaction(item));
    };

    /**
     * Get Transaction objects list
     * @returns {array}
     */
    getTransactions() {
        return this.transactionList;
    }

    getTransactionById = async (id) => {
        const data = await this.api.getById(id);
        const transaction = new Transaction(data);
        return transaction;
    };

    /**
     * Add transaction to database.
     * @param {Object} transaction
     */
    addTransaction = async (data) => {
        const transaction = new Transaction(data);
        await this.api.post(transaction);
        this.transactionList.push(transaction);
    };

    /**
     * Edit transaction from database.
     * @param {Object} transaction
     */
    updateTransaction = async (data) => {
        const transaction = new Transaction(data);

        await this.api.put(transaction);
        this.transactionList = this.transactionList.map((item) => {
            if (item.id.toString() === transaction.id) {
                return transaction;
            }
            return item;
        });
    };

    /**
     * Delete transaction from database.
     * @param {Object} transaction
     */
    deleteTransaction = async (id) => {
        await this.api.delete(id);
        const index = this.transactionList.findIndex((item) => item.id == id);

        this.transactionList.splice(index, 1);
    };
}

export default TransactionService;
