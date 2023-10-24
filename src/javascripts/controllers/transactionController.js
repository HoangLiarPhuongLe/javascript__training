import { ADD_TRANSACTION_MESSAGE} from "../constants/message";

class TransactionController {
    constructor(service, view){
        this.service = service;
        this.view = view;
    }

    init = () => {
        this.initTransactions();
        this.initPopup();
    }

    //----- TRANSACTION CONTROLLER -----//
    /**
     * Initializing the Transaction interface and event handlers
     */
    async initTransactions() {
        await this.service.transactionService.initTransactionList();
        this.view.homeView.addEventRenderPopup(this.addTransaction);
        this.view.homeView.addEventRenderSummary(this.addSummaryTab);
        this.view.homeView.addEventRenderListTransaction(this.addTransactionDetails);
        this.loadListTransactions();
    }

    loadListTransactions = async() => {
        const transactions = this.service.transactionService.getTransactions();
        await this.view.homeView.renderTransactionList(transactions);
    }

    saveTransaction = async(data) => {
        await this.service.transactionService.addTransaction(data);
        this.view.snackbar.showSnackBar('success', ADD_TRANSACTION_MESSAGE.ADD_TRANSACTION_SUCCESS);
        this.loadListTransactions();
    }

    //----- POPUP CONTROLLER -----//
    /**
     * Initializing the Popup interface and event handlers
     */
    async initPopup() {
        this.view.transactionView.addEventAddTransaction(this.saveTransaction);
    }

    addTransaction = () => {
        this.view.transactionView.renderPopup();
    }

    addSummaryTab = () => {
        const transactions = this.service.transactionService.getTransactions();
        this.view.homeView.renderSummaryDetails(transactions);
    }

    addTransactionDetails = () =>{
        this.view.homeView.closeSummaryTab();
    }
}

export default TransactionController;
