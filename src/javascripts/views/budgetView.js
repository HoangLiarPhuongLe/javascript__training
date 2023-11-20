import { validateBudget } from '../helpers/validationForm';
class BudgetView {
    constructor() {
        this.budgetElement = document.querySelector('.budget');
        this.budgetBodyElement = document.querySelector('.budget-body');
        this.overlayElement = document.querySelector('.overlay');
        this.buttonSaveBudgetElement = document.querySelector('.btn-save-budget');
        this.buttonCancelBudgetElement = document.querySelector('.btn-cancel-budget');
        this.inputDayEl = document.getElementById('today');
        this.inputAmount = document.getElementById('budgetamount');
    }

    //----- RENDERING -----//

    /**
     * Display the popup for adding a budget.
     */
    renderBudgetPopup() {
        this.buttonSaveBudgetElement.disabled = true;
        this.budgetElement.classList.add('budget-active');
        this.overlayElement.classList.add('overlay-active');

        const today = new Date();
        const formattedDate = today.toISOString().split('T')[0];

        this.inputDayEl.value = formattedDate;
        this.changeBtnStyle();
    }

    closeBudgetPopup() {
        this.budgetElement.classList.remove('budget-active');
        this.overlayElement.classList.remove('overlay-active');
    }

    resetBudgetPopup() {
        const inputs = this.budgetBodyElement.querySelectorAll('input');

        inputs.forEach((input) => {
            input.value = ' ';
        });
    }

    //----- EVENT LISTENER -----//

    /**
     * Add event listener for cancel budget popup.
     */
    addEventCancelBudgetPopup = () => {
        this.buttonCancelBudgetElement.addEventListener('click', (event) => {
            event.preventDefault();

            const errorElements = document.querySelectorAll('.error-budget');

            this.budgetBodyElement.reset();
            this.budgetElement.classList.remove('budget-active');
            this.overlayElement.classList.remove('overlay-active');
            this.clearErrorMessage(errorElements);
        });
    };

    /**
     * Add event listener for form submission.
     * @param {Function} addBudget
     */
    addEventAddBudget = (addBudget) => {
        this.buttonSaveBudgetElement?.addEventListener('click', async (e) => {
            e.preventDefault();

            const budget = {
                date: this.budgetBodyElement.date.value,
                inflow: parseInt(this.budgetBodyElement.inflow.value),
                note: this.budgetBodyElement.note.value,
            };

            const errors = validateBudget(budget);
            const errorElements = document.querySelectorAll('.error-budget');

            if (errors.length > 0) {
                this.showErrorMessage(errors);
            } else {
                await addBudget(budget);
                this.budgetBodyElement.reset();
                this.clearErrorMessage(errorElements);
                this.closeBudgetPopup();
            }
        });
    };

    showErrorMessage = (errors) => {
        const errorElements = {
            date: document.querySelector('.error-date-budget'),
        };

        errors.forEach((error) => {
            errorElements[error.field].classList.add('error-message');
            errorElements[error.field].textContent = error.message;
        });
    };

    clearErrorMessage = (errorElements) => {
        errorElements.forEach((errorElement) => {
            errorElement.classList.remove('error-message');
        });
    };

    changeBtnStyle = () => {
        this.buttonSaveBudgetElement.classList.remove('btn-save-active');
        this.inputAmount.addEventListener('change', () => {
            if (this.inputAmount != 0) {
                this.buttonSaveBudgetElement.disabled = false;
                this.buttonSaveBudgetElement.classList.add('btn-save-active');
            } else {
                this.buttonSaveBudgetElement.disabled = true;
            }
        });
    };
}

export default BudgetView;
