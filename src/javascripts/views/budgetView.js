class BudgetView {
    constructor() {
        this.budgetElement = document.querySelector('.budget');
        this.budgetBodyElement = document.querySelector('.budget-body');
        this.overlayElement = document.querySelector('.overlay');
        this.buttonSaveBudgetElement = document.querySelector('.btn-save-budget');
    }

    //----- RENDERING -----//
    renderBudgetPopup() {
        this.budgetElement.classList.add('budget-active');
        this.overlayElement.classList.add('overlay-active');
    }

    //----- EVENT LISTENER -----//
    addEventAddBudget = (addBudget) => {
        this.buttonSaveBudgetElement?.addEventListener('click', async (e) => {
            e.preventDefault();

            const budget = {
                date: this.budgetBodyElement.date.value,
                inflow: parseInt(this.budgetBodyElement.inflow.value),
                note: this.budgetBodyElement.note.value,
            };

            await addBudget(budget);
        });
    };
}

export default BudgetView;
