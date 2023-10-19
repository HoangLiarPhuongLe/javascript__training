import Template from "../templates/template";
class HomeView {
    constructor() {
        this.transactionListEl = document.querySelector(".transaction-list")
        this.addBtnEl = document.querySelector(".btn-add-transaction");
    }

     //----- RENDERING -----//
     renderTransactionList(transactions) {
        transactions.forEach(transaction => {
            this.renderTransaction(transaction);
        })
    }

    renderTransaction(transaction) {
        const transactionTemplate = Template.transaction(transaction);
        this.transactionListEl.innerHTML += transactionTemplate;
    }

    //----- EVENT HANDLER -----//
    addEventRenderPopup = (handler) => {
        this.addBtnEl.addEventListener("click", () => {
            handler();
        });
    }
}

export default HomeView;
