import Template from "../templates/template";
class HomeView {
    constructor() {
        this.categoryEl = document.querySelector(".category-list");
        this.addBtnEl = document.querySelector(".btn-add-transaction");
        this.summaryEl = document.querySelector(".summary");
        this.showTransactionsBtnEl = document.querySelector(".transaction-title-text");
        this.showSummaryBtnEl = document.querySelector(".summary-text");
    }

     //----- RENDERING -----//
     renderTransactionList(transactions) {
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
        console.log(transactions);

        const totalOutFlow = () => {
            let outflow = 0;
            transactions.forEach(transaction => {
                outflow += transaction.outflow;
            });

            return outflow;
        }

        this.renderCategory(category, transactions, totalOutFlow());
    }
}

    renderSummaryDetails(transactions) {
        const total = () => {
            let totalTransactions = 0;
            transactions.forEach(transaction => {
                totalTransactions += transaction.outflow;
            });

            return totalTransactions;
        }

        const inflow = 10000000;

        this.renderSummaryTab(inflow, total());
    }

    renderCategory(category, transactions, totalOutFlow) {
       const categoryTemplate = Template.category(category, transactions, totalOutFlow);
       this.categoryEl.innerHTML += categoryTemplate;
    }

    renderTransactionDetails(){
        this.categoryEl.classList.add("category-list-active");
        this.summaryEl.classList.remove("summary-active");
        this.summaryEl.classList.add("summary-hidden");
    }

    renderSummary() {
        this.categoryEl.classList.add("category-list-hidden");
        this.categoryEl.classList.remove("category-list-active")
        this.summaryEl.classList.add("summary-active");
    }

    renderSummaryTab(inflow, outflow){
        const summaryTemplate = Template.balance(inflow, outflow);
        this.summaryEl.innerHTML = summaryTemplate;
    }

    //----- EVENT HANDLER -----//
    addEventRenderPopup = (handler) => {
        this.addBtnEl.addEventListener("click", () => {
            handler();
        });
    }

    addEventRenderSummary = (handler) => {
        this.showSummaryBtnEl.addEventListener("click", () => {
            handler();
        });
    }

    addEventRenderListTransaction = (handler) => {
        this.showTransactionsBtnEl.addEventListener("click", () => {
            handler();
        });
    }
}

export default HomeView;
