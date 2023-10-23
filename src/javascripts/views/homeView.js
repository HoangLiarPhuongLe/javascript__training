import Template from "../templates/template";

class HomeView {
    constructor() {
        this.categoryListEl = document.querySelector(".category-list");
        this.addBtnEl = document.querySelector(".btn-add-transaction");
        this.summaryTabEl = document.querySelector(".summary");
        this.showTransactionsTabBtnEl = document.querySelector(".transaction-details-button");
        this.showSummaryTabBtnEl = document.querySelector(".summary-button");
    }

     //----- RENDERING -----//
     renderTransactionList(transactions) {
        this.categoryListEl.innerHTML = " ";
        
        // Create an object to store transactions by category
        const transactionByCategory = {};

        // Browse through all transactions
        for (const transaction of transactions) {
            // Get the category of the current transaction
            const category = transaction.category;
            
            // If the category does not exist in the `transactionByCategory` object, create a new one
            if (!transactionByCategory[category]) {
                transactionByCategory[category] = [];
            }

            // Add the current transaction to the list of transactions of the corresponding category
            transactionByCategory[category].push(transaction);
        }

        // Browse through categories and render corresponding transactions
        for (const category in transactionByCategory) {
            const transactions = transactionByCategory[category];
            
            const totalOutFlow = transactions.reduce((total, transaction) => total + transaction.outflow, 0);

            this.renderCategory(category, transactions, totalOutFlow);
        }
    }

    renderSummaryDetails(transactions) {
        const total = transactions.reduce((totalTransactions, transaction) => totalTransactions + transaction.outflow, 0);
           
        const inflow = 10000000;

        this.renderSummaryTab(inflow, total);

        this.closeTransactionsList();
    }

    renderCategory(category, transactions, totalOutFlow) {
       const categoryTemplate = Template.displayCategory(category, transactions, totalOutFlow);
       this.categoryListEl.innerHTML += categoryTemplate;
    }

    closeTransactionsList() {
        this.categoryListEl.classList.remove("category-list-active");
        this.summaryTabEl.classList.add("summary-active");
        this.categoryListEl.classList.add("category-list-hidden");
    }

    closeSummaryTab(){
        this.categoryListEl.classList.add("category-list-active");
        this.summaryTabEl.classList.remove("summary-active");
        this.summaryTabEl.classList.add("summary-hidden");
    }

    renderSummaryTab(inflow, outflow){
        const summaryTemplate = Template.displayBalance(inflow, outflow);
        this.summaryTabEl.innerHTML = summaryTemplate;
    }

    //----- EVENT HANDLER -----//
    addEventRenderPopup = (handler) => {
        this.addBtnEl.addEventListener("click", () => {
            handler();
        });
    }

    addEventRenderSummary = (handler) => {
        this.showSummaryTabBtnEl.addEventListener("click", () => {
            handler();
        });
    }

    addEventRenderListTransaction = (handler) => {
        this.showTransactionsTabBtnEl.addEventListener("click", () => {
            handler();
        });
    }
}

export default HomeView;
