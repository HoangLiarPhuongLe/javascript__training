import { formatDate, formatNumber } from "../helpers/helpers"

class Template {
    /**
     * Constructor of Template object
     */
    constructor(){ }

     /**
     * HTML Template for render an Transaction object
     * @param {object} transaction 
     */

    static displayTransaction = (transaction) => {
      const transactionDateTransform = formatDate(transaction.date);
      const transactionDate = transactionDateTransform.split(" ");
      const isIncome = transaction.outflow >= 0;
      const amountSign = isIncome ? '+' : '-';
      const amountClass = isIncome ? 'income' : 'outflow';
   
      return `
        <div class="transaction-detail">
          <div class="transaction-info">
            <div class="datetime">
              <p class="date-text">${new Date(transaction.date).getDate()}</p>
              <div>
                <div class="daymonthyear">
                  <p class="daymonthyear-text">${transactionDate[2]},</p>
                  <p class="daymonthyear-text">${ transactionDate[0]}</p>
                  <p class= "daymonthyear-text">${transactionDate[1]}</p>
                </div>
                <p class="note-text">${transaction.note}</p>
               </div>
            </div>
            <p class="amount-${amountClass}">${amountSign}$ ${formatNumber(
              Math.abs(transaction.outflow),
            )}</p>
          </div>
        </div>
        `;
    }

    static displayCategory = (category, transactions, totalOutFlow) => { 
      const isIncome = totalOutFlow >= 0;
      const totalOutFlowSign = isIncome ? '+' : '-';

      return `
        <li>
          <div class="transaction-category">
            <div class="category-header">
              <img src="assets/images/dollaricon.svg"/>
              <div>
                <p class="category-text">${category}</p>
                <p class="quantity-transactions">${transactions.length} Transactions</p>
              </div>
            </div>
            <p class="total-amount-text">${totalOutFlowSign}$ ${formatNumber(Math.abs(totalOutFlow))}</p>
          </div>
          <ul class="transaction-list">
            ${transactions.map(transaction => Template.displayTransaction(transaction))}
          </ul>
        </li>
        <div class="gap"></div>
        `;
    }

    static displayBalance = (inflow, outflow) => {
      return `
        <div class="inflow">
          <p class="flow-text">Inflow</p>
          <span class="amount-income">+ ${formatNumber(inflow)}</span>
        </div>
        <div class="outflow">
          <p class="flow-text">Outflow</p>
          <span class="amount-outflow">${formatNumber(outflow)}</span>
        </div>
        <div class="balance">
          <span class="amount">${formatNumber(inflow + outflow)}</span>
        </div>
        `;
   }
}

export default Template;
