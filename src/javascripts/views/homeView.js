import TransactionTemplate from '../templates/transactionTemplate';
import SummaryTemplate from '../templates/summaryTemplate';
import BudgetTemplate from '../templates/budgetTemplate';

class HomeView {
    constructor() {
        this.categoryListEl = document.querySelector('.category-list');
        this.addBtnEl = document.querySelector('.btn-add-transaction');
        this.summaryTabEl = document.querySelector('.summary');
        this.showTransactionsTabBtnEl = document.querySelector('.transaction-details-button');
        this.showSummaryTabBtnEl = document.querySelector('.summary-button');
        this.addBudgetBtnEl = document.querySelector('.btn-add-budget');
        this.budgetListEl = document.querySelector('.budget-list');
    }

    //----- RENDERING -----//
    renderTransactionList(transactions) {
        this.categoryListEl.innerHTML = ' ';

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
        const total = transactions.reduce(
            (totalTransactions, transaction) => totalTransactions + transaction.outflow,
            0,
        );

        const inflow = 10000000;

        this.renderSummaryTab(inflow, total);

        this.closeTransactionsList();
        this.closeBudgetList();
    }

    renderCategory(category, transactions, totalOutFlow) {
        const categoryTemplate = TransactionTemplate.createCategory(category, transactions, totalOutFlow);

        this.categoryListEl.innerHTML += categoryTemplate;
    }

    closeTransactionsList() {
        this.categoryListEl.classList.remove('category-list-active');
        this.summaryTabEl.classList.add('summary-active');
        this.categoryListEl.classList.add('category-list-hidden');
    }

    closeSummaryTab() {
        this.categoryListEl.classList.add('category-list-active');
        this.summaryTabEl.classList.remove('summary-active');
        this.summaryTabEl.classList.add('summary-hidden');
        this.budgetListEl.classList.add('category-list-active');
    }

    renderSummaryTab(inflow, outflow) {
        const summaryTemplate = SummaryTemplate.createBalance(inflow, outflow);

        this.summaryTabEl.innerHTML = summaryTemplate;
    }

    renderBudgetList(budgets, category) {
        this.budgetListEl.innerHTML = ' ';
        const filteredBudgets = budgets.filter((budget) => budget.category === category);

        const totalInFlow = filteredBudgets.reduce((total, filteredBudget) => total + filteredBudget.inflow, 0);

        this.renderBudgetCategory(category, filteredBudgets, totalInFlow);
    }

    renderBudgetCategory(category, budgets, totalInFlow) {
        const budgetCateagoryTemplate = BudgetTemplate.createBudgetCategory(category, budgets, totalInFlow);

        this.budgetListEl.innerHTML = budgetCateagoryTemplate;
    }

    closeBudgetList() {
        this.budgetListEl.classList.add('category-list-hidden');
        this.budgetListEl.classList.remove('category-list-active');
    }

    //----- EVENT HANDLER -----//
    addDelegateShowInfo = (renderTransactionInfo) => {
        this.transactionListEl = this.categoryListEl.querySelector('.transaction-list');
        this.transactionListEl.addEventListener('click', (event) => {
            const transactionDetailEl = event.target.closest('.transaction-detail');
            const transactionId = transactionDetailEl.getAttribute('data-id');

            renderTransactionInfo(transactionId);
        });
    };

    addEventRenderPopup = (handler) => {
        this.addBtnEl.addEventListener('click', () => {
            handler();
        });
    };

    addEventRenderBudgetPopup = (handler) => {
        this.addBudgetBtnEl.addEventListener('click', () => {
            handler();
        });
    };

    addEventRenderSummary = (handler) => {
        this.showSummaryTabBtnEl.addEventListener('click', () => {
            handler();
        });
    };

    addEventRenderListTransaction = (handler) => {
        this.showTransactionsTabBtnEl.addEventListener('click', () => {
            handler();
        });
    };
}

export default HomeView;
