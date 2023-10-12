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

    async initTransactions(){
        await this.service.transactionService.initTransactionList();
        const transactions = await this.service.transactionService.getTransactions();
        await this.view.homeView.renderTransactionList(transactions);
        this.view.homeView.addEventRenderPopup(this.addTransaction);
    }

    saveTransaction = async(data) => {
        await this.service.transactionService.addTransaction(data);
        this.view.snackbar.showSnackBar('succes', ADD_TRANSACTION_MESSAGE.ADD_TRANSACTION_SUCCES);
    }

    //----- MODAL CONTROLLER -----//
    /**
     * Initializing the Relation interface and event handlers
     */

    async initPopup(){
        this.view.transactionView.addEventAddTransaction(this.saveTransaction);
    }

    addTransaction = () => {
        this.view.transactionView.renderPopup();
    }
}

export default TransactionController;
