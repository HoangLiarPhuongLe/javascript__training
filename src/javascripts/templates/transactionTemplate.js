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
        const isSingleNumber =
            new Date(transaction.date).getDate() >= 10
                ? new Date(transaction.date).getDate()
                : '0' + new Date(transaction.date).getDate();

        return `
        <li class="transaction-detail" data-id="${transaction.id}">
          <div class="transaction-info">
            <div class="datetime">
              <p class="date-text">${isSingleNumber}</p>
              <div class="daymonthyear-note">
                <p class="daymonthyear-text">${transactionDate[2]}, ${transactionDate[0]} ${transactionDate[1]}</p>
                <p class="note-text">${transaction.note ? transaction.note : 'Text Note'}</p>
               </div>
            </div>
            <p class="amount-outflow">-$ ${formatNumber(Math.abs(transaction.outflow))}</p>
          </div>
        </li>
        `;
    };

    static createCategory = (category, transactions, totalOutFlow) => {
        const transactionList = transactions.map((transaction) => TransactionTemplate.createTransaction(transaction));
        const isSingular = transactions.length == 1 ? 'Transaction' : 'Transactions';

        return `
        <li>
          <div class="transaction-category">
            <div class="category-header">
              <div>
                <p class="category-text">${category}</p>
                <p class="quantity-transactions">${transactions.length} ${isSingular}</p>
              </div>
            </div>
            <p class="total-amount-text">-$ ${formatNumber(Math.abs(totalOutFlow))}</p>
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
