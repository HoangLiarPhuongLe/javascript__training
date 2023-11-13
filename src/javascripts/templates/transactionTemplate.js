import { formatDate, formatNumber } from '../helpers/format';

class TransactionTemplate {
    /**
     * Constructor of TemplateTransaction object
     */
    constructor() {}

    /**
     * HTML TemplateTransaction for render an Transaction object
     * @param {object} transaction
     */
    static createTransaction = (transaction) => {
        const transactionDateTransform = formatDate(transaction.date);
        const transactionDate = transactionDateTransform.split(' ');
        const isIncome = transaction.outflow >= 0;
        const amountSign = isIncome ? '+' : '-';
        const amountClass = isIncome ? 'income' : 'outflow';

        return `
        <li class="transaction-detail" data-id="${transaction.id}">
          <div class="transaction-info">
            <div class="datetime">
              <p class="date-text">${new Date(transaction.date).getDate()}</p>
              <div class="daymonthyear-note">
                <p class="daymonthyear-text">${transactionDate[2]} ${transactionDate[0]} ${transactionDate[1]}</p>
                <p class="note-text">${transaction.note}</p>
               </div>
            </div>
            <p class="amount-${amountClass}">${amountSign}$ ${formatNumber(Math.abs(transaction.outflow))}</p>
          </div>
        </li>
        `;
    };

    static createCategory = (category, transactions, totalOutFlow) => {
        const isIncome = totalOutFlow >= 0;
        const totalOutFlowSign = isIncome ? '+' : '-';
        const transactionList = transactions.map((transaction) => TransactionTemplate.createTransaction(transaction));

        return `
        <li>
          <div class="transaction-category">
            <div class="category-header">
              <div>
                <p class="category-text">${category}</p>
                <p class="quantity-transactions">${transactions.length} Transactions</p>
              </div>
            </div>
            <p class="total-amount-text">${totalOutFlowSign}$ ${formatNumber(Math.abs(totalOutFlow))}</p>
          </div>
          <ul class="transaction-list">
            ${transactionList.join('')}
          </ul>
        </li>
        <div class="gap"></div>
        `;
    };
}

export default TransactionTemplate;
