import { formatDate, formatNumber } from '../helpers/format';

class BudgetTemplate {
    /**
     * Constructor of TemplateBudget object
     */
    constructor() {}

    /**
     * HTML TemplateBudget for render an Budget object
     * @param {object} budget
     */
    static createBudget = (budget) => {
        const budgetDateTransform = formatDate(budget.date);
        const budgetDate = budgetDateTransform.split(' ');

        return `
          <li class="transaction-detail">
            <div class="transaction-info">
              <div class="datetime">
                <p class="date-text">${new Date(budget.date).getDate()}</p>
                <div class="daymonthyear-note">
                  <p class="daymonthyear-text">${budgetDate[2]} ${budgetDate[0]} ${budgetDate[1]}</p>
                  <p class="note-text">${budget.note ? budget.note : 'Text Note'}</p>
                </div>
              </div>
              <p class="amount-income">+$ ${formatNumber(Math.abs(budget.inflow))}</p>
            </div>
          </li>
          `;
    };

    static createBudgetCategory = (category, budgets, totalInFlow) => {
        const budgetList = budgets.map((budget) => BudgetTemplate.createBudget(budget));

        return `
            <div class="transaction-category">
              <div class="category-header">
                <div>
                  <p class="category-text">${category}</p>
                  <p class="quantity-transactions">${budgets.length} Transactions</p>
                </div>
              </div>
              <p class="total-amount-text">+$ ${formatNumber(Math.abs(totalInFlow))}</p>
            </div>
            <ul class="transaction-list">
              ${budgetList.join('')}
            </ul>
          `;
    };
}
export default BudgetTemplate;
