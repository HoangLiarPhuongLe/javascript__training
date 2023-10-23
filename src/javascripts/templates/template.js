import { formatNumber } from "../helpers/helpers"

class Template {
    /**
     * Constructor of Template object
     */
    constructor(){ }

     /**
     * HTML Template for render an Transaction object
     * @param {object} transaction 
     */

    static transaction = (transaction) => `
        <div class="transaction-detail">
          <div class="transaction-info">
            <div class="datetime">
              <p class="date-text">${new Date(transaction.date).getDate()}</p>
              <div>
                <div class="daymonthyear">
                  <p class="daymonthyear-text">${new Date(transaction.date).toLocaleDateString('en-US', { weekday: 'long' })},</p>
                  <p class="daymonthyear-text">${ new Date(transaction.date).toLocaleDateString('en-US', { month: 'long' })}</p>
                  <p class= "daymonthyear-text">${new Date(transaction.date).getFullYear()}</p>
                </div>
                <p class="note-text">${transaction.note}</p>
               </div>
            </div>
            <p class="amount-${transaction.outflow > 0 ? 'income' : 'outflow'}">${transaction.outflow >= 0 ? '+' : '-'}$ ${formatNumber(
              Math.abs(transaction.outflow),
            )}</p>
          </div>
        </div>
        `;
    static category = (category, transactions, totalOutFlow) => `
      <li>
        <div class="transaction-category">
          <div class="category-header">
            <img src="assets/images/dollaricon.svg"/>
            <div>
              <p class="category-text">${category}</p>
              <p class="quantity-transactions">${transactions.length} Transactions</p>
            </div>
          </div>
          <p class="total-amount-text">${
            totalOutFlow >= 0 ? '+' : '-'
          }$ ${formatNumber(Math.abs(totalOutFlow))}</p>
        </div>
        <ul class="transaction-list">
          ${transactions.map(transaction => Template.transaction(transaction))}
        </ul>
      </li>
      <div class="gap"></div>
      `;

    static balance = (inflow, outflow) => `
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

export default Template;
