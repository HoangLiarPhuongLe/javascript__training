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
        const transactions = this.service.transactionService.getTransactions();
        await this.view.homeView.renderTransactionList(transactions);
        await this.view.homeView.renderSummaryDetails(transactions);
        this.view.homeView.addEventRenderPopup(this.addTransaction);
        this.view.homeView.addEventRenderSummary(this.addSummaryTab);
        this.view.homeView.addEventRenderListTransaction(this.addTransactionDetails);
    }

    saveTransaction = async(data) => {
        await this.service.transactionService.addTransaction(data);
        this.view.snackbar.showSnackBar('succes', ADD_TRANSACTION_MESSAGE.ADD_TRANSACTION_SUCCES);
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
        this.view.homeView.renderSummary();
    }

    addTransactionDetails = () =>{
        this.view.homeView.renderTransactionDetails();
    }
}

export default TransactionController;
