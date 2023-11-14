import { validateBudget } from '../helpers/validationForm';
class BudgetView {
    constructor() {
        this.budgetElement = document.querySelector('.budget');
        this.budgetBodyElement = document.querySelector('.budget-body');
        this.overlayElement = document.querySelector('.overlay');
        this.buttonSaveBudgetElement = document.querySelector('.btn-save-budget');
        this.buttonCancelBudgetElement = document.querySelector('.btn-cancel-budget');
        this.inputDayEl = document.getElementById('today');
    }

    //----- RENDERING -----//
    renderBudgetPopup() {
        this.budgetElement.classList.add('budget-active');
        this.overlayElement.classList.add('overlay-active');

        const today = new Date();
        const formattedDate = today.toISOString().split('T')[0];

        this.inputDayEl.value = formattedDate;
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
                this.resetBudgetPopup();
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
}

export default BudgetView;
