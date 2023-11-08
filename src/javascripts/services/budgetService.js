import { API_BASE_URL } from '../constants/urls';
import Budget from '../models/budgetModel';
import ApiService from './apiService';

class BudgetService {
    constructor() {
        this.api = new ApiService(API_BASE_URL, '/budget');
        this.budgetList;
    }

    /**
     * Initializing the Budgets object
     */
    initBudgetList = async () => {
        const data = await this.api.get();
        this.budgetList = this.parseData(data);
    };

    /**
     * Parsing data from JSON object to list of Transaction object
     * @param {JSON} data
     */
    parseData = (data) => {
        return data.map((item) => new Budget(item));
    };

    /**
     * Get Budget objects list
     * @returns {array}
     */
    getBudgets() {
        return this.budgetList;
    }

    addBudget = async (data) => {
        const budget = new Budget(data);
        await this.api.addBudget(budget);
        this.budgetList.push(budget);
    };
}
export default BudgetService;
