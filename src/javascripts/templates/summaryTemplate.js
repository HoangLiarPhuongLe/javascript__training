import { formatNumber } from "../helpers/format"

class SummaryTemplate {
     /**
     * Constructor of TemplateSummary object
     */
     constructor(){ }

     /**
     * HTML TemplateSummary for render an Summary object
     * @param {object} summary 
     */
    static createBalance = (inflow, outflow) => {
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

export default SummaryTemplate;
