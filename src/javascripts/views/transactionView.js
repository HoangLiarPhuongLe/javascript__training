import { validateTransaction } from '../helpers/validationForm';

class TransactionView {
    constructor() {
        this.transactionElement = document.querySelector('.transaction');
        this.transactionBodyElement = document.querySelector('.transaction-body');
        this.overlayElement = document.querySelector('.overlay');
        this.buttonSaveElement = document.querySelector('.btn-save');
        this.buttonDeleteElement = document.querySelector('.btn-delete');
        this.buttonCancelElement = document.querySelector('.btn-cancel');
    }

    //----- RENDERING -----//
    renderPopup(transactionId, transaction) {
        this.transactionElement.classList.add('transaction-active');
        this.overlayElement.classList.add('overlay-active');

        if (transactionId) {
            this.transactionBodyElement.setAttribute('data-id', transactionId);
            this.transactionBodyElement.querySelector('input[name = "date"]').value = transaction.date;
            this.transactionBodyElement.querySelector('input[name = "category"]').value = transaction.category;
            this.transactionBodyElement.querySelector('input[name = "outflow"]').value = transaction.outflow;
            this.transactionBodyElement.querySelector('input[name = "note"]').value = transaction.note;
        }
    }

    closePopup() {
        this.transactionElement.classList.remove('transaction-active');
        this.overlayElement.classList.remove('overlay-active');
        this.transactionBodyElement.removeAttribute('data-id');
        this.transactionBodyElement.reset();
    }

    resetPopup() {
        const inputs = this.transactionBodyElement.querySelectorAll('input');

        inputs.forEach((input) => {
            input.value = ' ';
        });
    }

    //----- EVENT LISTENER -----//
    addEventCancelPopup = () => {
        this.buttonCancelElement.addEventListener('click', (event) => {
            event.preventDefault();

            const errorElements = document.querySelectorAll('.error');

            this.transactionBodyElement.reset();
            this.transactionElement.classList.remove('transaction-active');
            this.overlayElement.classList.remove('overlay-active');
            this.clearErrorMessage(errorElements);
        });
    };

    addEventAddTransaction = (addTransaction) => {
        this.buttonSaveElement?.addEventListener('click', async (e) => {
            e.preventDefault();

            const transaction = {
                id: this.transactionBodyElement.getAttribute('data-id'),
                category: this.transactionBodyElement.category.value,
                date: this.transactionBodyElement.date.value,
                outflow: parseInt(this.transactionBodyElement.outflow.value),
                note: this.transactionBodyElement.note.value,
            };

            const errors = validateTransaction(transaction);
            const errorElements = document.querySelectorAll('.error');

            if (errors.length > 0) {
                this.showErrorMessage(errors);
            } else {
                await addTransaction(transaction);
                this.resetPopup();
                this.clearErrorMessage(errorElements);
                this.closePopup();
            }
        });
    };

    addEventDeleteTransaction = (deleteTransaction) => {
        this.buttonDeleteElement?.addEventListener('click', async (e) => {
            e.preventDefault();

            const transactionId = this.transactionBodyElement.getAttribute('data-id');

            deleteTransaction(transactionId);
            this.closePopup();
        });
    };

    showErrorMessage = (errors) => {
        const errorElements = {
            date: document.querySelector('.error-date'),
            category: document.querySelector('.error-category'),
            note: document.querySelector('.error-note'),
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

export default TransactionView;
