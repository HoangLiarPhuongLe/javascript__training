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
        this.loadListTransactions();
        this.view.homeView.addDelegateShowInfo(this.showInfo);
        this.view.homeView.addEventRenderPopup(this.addTransaction);
        this.view.homeView.addEventRenderSummary(this.addSummaryTab);
        this.view.homeView.addEventRenderListTransaction(this.addTransactionDetails);
        
     
    }

    loadListTransactions = async() => {
        const transactions = this.service.transactionService.getTransactions();
        await this.view.homeView.renderTransactionList(transactions);
    }

    saveTransaction = async(data) => {
        if(!data.id){
            await this.service.transactionService.addTransaction(data);
            this.view.snackbar.showSnackBar('success', ADD_TRANSACTION_MESSAGE.ADD_TRANSACTION_SUCCESS);
        }else{
            await this.service.transactionService.updateTransaction(data);
            this.view.snackbar.showSnackBar('success', ADD_TRANSACTION_MESSAGE.UPDATE_TRANSACTION_SUCCESS);
        }
       
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

    showInfo = async (transactionId) => {
        const transaction = await this.service.transactionService.getTransactionById(transactionId);
        this.view.transactionView.renderPopup(transactionId, transaction);
    }

    getTransactionById = (id) => {
        this.service.transactionService.getContactById(id);
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
