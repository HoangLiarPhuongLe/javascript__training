import BudgetView from './budgetView';
import HomeView from './homeView';
import SnackBarView from './snackBarView';
import TransactionView from './transactionView';

class View {
    constructor() {
        this.homeView = new HomeView();
        this.transactionView = new TransactionView();
        this.budgetView = new BudgetView();
        this.snackbar = new SnackBarView();
    }
}

export default View;
