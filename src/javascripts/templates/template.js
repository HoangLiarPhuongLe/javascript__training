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
        <li class="transaction-detail" data-id="${transaction.id}">
          <div class="transaction-info">
            <div class="transaction-category">
              <img src="assets/images/dollaricon.svg"/>
              <p class="category-text">${transaction.category}</p>
            </div>
            <p class="total-amount-text">-$ ${transaction.outflow}</p>
          </div>
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
            <p class="amount-text">-$ ${transaction.outflow}</p>
          </div>
        </li>
        `;
}

export default Template;
