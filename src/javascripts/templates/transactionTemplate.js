import { formatDate, formatNumber } from "../helpers/format"

class TransactionTemplate {
    /**
     * Constructor of TemplateTransaction object
     */
    constructor(){ }

     /**
     * HTML TemplateTransaction for render an Transaction object
     * @param {object} transaction 
     */

    static displayTransaction = (transaction) => {
      const transactionDateTransform = formatDate(transaction.date);
      const transactionDate = transactionDateTransform.split(" ");
      const isIncome = transaction.outflow >= 0;
      const amountSign = isIncome ? '+' : '-';
      const amountClass = isIncome ? 'income' : 'outflow';
   
      return `
        <li class="transaction-detail">
          <div class="transaction-info">
            <div class="datetime">
              <p class="date-text">${new Date(transaction.date).getDate()}</p>
              <div>
                <div class="daymonthyear">
                  <p class="daymonthyear-text">${transactionDate[2]}</p>
                  <p class="daymonthyear-text">${ transactionDate[0]}</p>
                  <p class= "daymonthyear-text">${transactionDate[1]}</p>
                </div>
                <p class="note-text">${transaction.note}</p>
               </div>
            </div>
            <p class="amount-${amountClass}">${amountSign}$ ${formatNumber(
              Math.abs(transaction.outflow)
            )}</p>
          </div>
        </li>
        `;
    }

    static displayCategory = (category, transactions, totalOutFlow) => { 
      const isIncome = totalOutFlow >= 0;
      const totalOutFlowSign = isIncome ? '+' : '-';
      const transaction = transactions.map(transaction => TransactionTemplate.displayTransaction(transaction));

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
            ${transaction.join("")}
          </ul>
        </li>
        <div class="gap"></div>
        `;
    }
}

export default TransactionTemplate;
