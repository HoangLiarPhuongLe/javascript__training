import BudgetService from './budgetService';
import TransactionService from './transactionService';

class Service {
    constructor() {
        this.transactionService = new TransactionService();
        this.budgetService = new BudgetService();
    }
}

export default Service;
