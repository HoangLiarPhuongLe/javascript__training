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
        this.view.homeView.addEventRenderSummary(this.addSummaryTab);
        this.view.homeView.addEventRenderListTransaction(this.addTransactionDetails);
        this.view.homeView.addDelegateShowInfo(this.renderTransactionInfo);
    }

    /**
     * Load and display the transaction list.
     */
    loadListTransactions = async () => {
        const transactions = this.service.transactionService.getTransactions();
        await this.view.homeView.renderTransactionList(transactions);
    };

    /**
     * Add a transaction and display the new transaction list.
     * @param {object} transaction
     */
    saveTransaction = async (data) => {
        await this.service.transactionService.addTransaction(data);
        this.view.snackbar.showSnackBar('success', ADD_TRANSACTION_MESSAGE.ADD_TRANSACTION_SUCCESS);

        this.loadListTransactions();
        this.view.homeView.addDelegateShowInfo(this.renderTransactionInfo);
    };

    /**
     * Edit a transaction and display the new transaction list.
     * @param {object} transaction
     */
    editTransaction = async (data) => {
        await this.service.transactionService.updateTransaction(data);
        this.view.snackbar.showSnackBar('success', ADD_TRANSACTION_MESSAGE.UPDATE_TRANSACTION_SUCCESS);

        this.loadListTransactions();
        this.view.homeView.addDelegateShowInfo(this.renderTransactionInfo);
    };

    /**
     * Delete a transaction by ID action.
     * @param {string} transactionId
     */
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
        this.view.transactionView.addEventCancelPopup();
        this.view.transactionView.addEventCancelEditPopup();
        this.view.transactionView.addEventAddTransaction(this.saveTransaction);
        this.view.transactionView.addEventEditTransaction(this.editTransaction);
        this.view.transactionView.addEventDeleteTransaction(this.deleteTransaction);
    }

    /**
     * Show a popup when click add transaction.
     */
    addTransaction = () => {
        this.view.transactionView.renderPopup();
    };

    /**
     * Show a modal for editing and deleting when click a transaction.
     * @param {string} transactionId
     */
    renderTransactionInfo = async (transactionId) => {
        const transaction = await this.service.transactionService.getTransactionById(transactionId);
        this.view.transactionView.renderEditPopup(transactionId, transaction);
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

    /**
     * Load and display the budget list.
     */
    loadListBudgets = async () => {
        const budgets = this.service.budgetService.getBudgets();
        const category = 'Budget';

        await this.view.homeView.renderBudgetList(budgets, category);
    };

    /**
     * Add a budget and display the new budget list.
     * @param {object} budget
     */
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
        this.view.budgetView.addEventCancelBudgetPopup();
        this.view.budgetView.addEventAddBudget(this.saveBudget);
    }

    /**
     * Show a popup when click add budget.
     */
    addBudget = () => {
        this.view.budgetView.renderBudgetPopup();
    };
}

export default TransactionController;
