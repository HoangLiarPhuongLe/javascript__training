import { ADD_BUDGET_MESSAGE, ADD_TRANSACTION_MESSAGE, DELETE_TRANSACTION_MESSAGE } from '../constants/message';

class TransactionController {
    constructor(service, view) {
        this.service = service;
        this.view = view;
    }

    init = () => {
        this.initTransactions();
        this.initPopup();
        this.initBudget();
        this.initPopupBudget();
    };

    //----- TRANSACTION CONTROLLER -----//
    /**
     * Initializing the Transaction interface and event handlers
     */
    async initTransactions() {
        await this.service.transactionService.initTransactionList();
        this.loadListTransactions();
        this.view.homeView.addEventRenderPopup(this.addTransaction);
        this.view.homeView.addEventRenderListTransaction(this.addTransactionDetails);
        this.view.homeView.addDelegateShowInfo(this.renderTransactionInfo);
        this.view.homeView.addEventRenderSummary(this.addSummaryTab);
    }

    loadListTransactions = async () => {
        const transactions = this.service.transactionService.getTransactions();
        await this.view.homeView.renderTransactionList(transactions);
    };

    saveTransaction = async (data) => {
        if (!data.id) {
            await this.service.transactionService.addTransaction(data);
            this.view.snackbar.showSnackBar('success', ADD_TRANSACTION_MESSAGE.ADD_TRANSACTION_SUCCESS);
        } else {
            await this.service.transactionService.updateTransaction(data);
            this.view.snackbar.showSnackBar('success', ADD_TRANSACTION_MESSAGE.UPDATE_TRANSACTION_SUCCESS);
        }

        this.loadListTransactions();
        this.view.homeView.addDelegateShowInfo(this.renderTransactionInfo);
    };

    deleteTransaction = async (transactionId) => {
        if (transactionId) {
            await this.service.transactionService.deleteTransaction(transactionId);
            this.view.snackbar.showSnackBar('success', DELETE_TRANSACTION_MESSAGE.DELETE_TRANSACTION_SUCCESS);
        } else {
            this.view.snackbar.showSnackBar('warning', DELETE_TRANSACTION_MESSAGE.DELETE_TRANSACTION_FAIL);
        }

        this.loadListTransactions();
        this.view.homeView.addDelegateShowInfo(this.renderTransactionInfo);
    };

    //----- POPUP CONTROLLER -----//
    /**
     * Initializing the Popup interface and event handlers
     */
    async initPopup() {
        this.view.transactionView.addEventAddTransaction(this.saveTransaction);
        this.view.transactionView.addEventDeleteTransaction(this.deleteTransaction);
    }

    addTransaction = () => {
        this.view.transactionView.renderPopup();
    };

    renderTransactionInfo = async (transactionId) => {
        const transaction = await this.service.transactionService.getTransactionById(transactionId);
        this.view.transactionView.renderPopup(transactionId, transaction);
    };

    getTransactionById = (id) => {
        this.service.transactionService.getContactById(id);
    };

    addSummaryTab = () => {
        const transactions = this.service.transactionService.getTransactions();
        const budgets = this.service.budgetService.getBudgets();

        this.view.homeView.renderSummaryDetails(transactions, budgets);
    };

    addTransactionDetails = () => {
        this.view.homeView.closeSummaryTab();
    };

    //----- BUDGET CONTROLLER -----//
    /**
     * Initializing the Budget interface and event handlers
     */
    async initBudget() {
        await this.service.budgetService.initBudgetList();
        this.loadListBudgets();
        this.view.homeView.addEventRenderBudgetPopup(this.addBudget);
    }

    loadListBudgets = async () => {
        const budgets = this.service.budgetService.getBudgets();
        const category = 'Budget';

        await this.view.homeView.renderBudgetList(budgets, category);
    };

    saveBudget = async (budget) => {
        await this.service.budgetService.addBudget(budget);
        this.view.snackbar.showSnackBar('success', ADD_BUDGET_MESSAGE.ADD_BUDGET_SUCCESS);
        this.loadListBudgets();
        this.view.homeView.addDelegateShowInfo(this.renderTransactionInfo);
    };

    //----- POPUP BUDGET CONTROLLER -----//
    /**
     * Initializing the Popup interface and event handlers
     */
    async initPopupBudget() {
        this.view.budgetView.addEventAddBudget(this.saveBudget);
    }

    addBudget = () => {
        this.view.budgetView.renderBudgetPopup();
    };
}

export default TransactionController;
