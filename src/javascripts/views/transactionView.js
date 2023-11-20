import { validateTransaction } from '../helpers/validationForm';

class TransactionView {
    constructor() {
        this.transactionElement = document.querySelector('.transaction');
        this.transactionBodyElement = document.querySelector('.transaction-body');
        this.overlayElement = document.querySelector('.overlay');
        this.buttonSaveElement = document.querySelector('.btn-save');
        this.buttonSaveEditEl = document.querySelector('.btn-save-edit');
        this.buttonDeleteElement = document.querySelector('.btn-delete');
        this.buttonCancelElement = document.querySelector('.btn-cancel');
        this.buttonCancelEditEl = document.querySelector('.btn-cancel-edit');
        this.inputOutflow = document.getElementById('transactionamount');
        this.edittransactionEl = document.querySelector('.edit-transaction');
        this.edittransactionBodyEl = document.querySelector('.edit-transaction-body');
    }

    //----- RENDERING -----//

    /**
     * Display the popup for adding a transaction.
     */
    renderPopup() {
        this.buttonSaveElement.disabled = true;
        this.changeBtnStyle();
        this.transactionElement.classList.add('transaction-active');
        this.overlayElement.classList.add('overlay-active');
    }

    /**
     * Display the popup for editing and deleting a transaction.
     * @param {String} transactionId
     * @param {Object} transaction
     */
    renderEditPopup(transactionId, transaction) {
        this.edittransactionEl.classList.add('edit-transaction-active');
        this.overlayElement.classList.add('overlay-active');

        if (transactionId) {
            this.edittransactionBodyEl.setAttribute('data-id', transactionId);
            this.edittransactionBodyEl.querySelector('input[name = "date"]').value = transaction.date;
            this.edittransactionBodyEl.querySelector('select[name = "category"]').value = transaction.category;
            this.edittransactionBodyEl.querySelector('input[name = "outflow"]').value = transaction.outflow;
            this.edittransactionBodyEl.querySelector('input[name = "note"]').value = transaction.note;
        }
    }

    closePopup() {
        this.transactionElement.classList.remove('transaction-active');
        this.overlayElement.classList.remove('overlay-active');
        this.transactionBodyElement.reset();
    }

    closeEditPopup() {
        this.edittransactionEl.classList.remove('edit-transaction-active');
        this.overlayElement.classList.remove('overlay-active');
        this.edittransactionBodyEl.removeAttribute('data-id');
        this.edittransactionBodyEl.reset();
    }

    //----- EVENT LISTENER -----//

    /**
     * Add event listener for cancel Add Transaction Popup.
     */
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

    /**
     * Add event listener for cancel Edit Transaction Popup.
     */
    addEventCancelEditPopup = () => {
        this.buttonCancelEditEl.addEventListener('click', (event) => {
            event.preventDefault();

            const errorElements = document.querySelectorAll('.error');

            this.edittransactionBodyEl.reset();
            this.edittransactionEl.classList.remove('edit-transaction-active');
            this.overlayElement.classList.remove('overlay-active');
            this.clearErrorMessage(errorElements);
        });
    };

    /**
     * Add event listener for form submission.
     * @param {Function} addTransaction
     */
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
                this.transactionBodyElement.reset();
                this.clearErrorMessage(errorElements);
                this.closePopup();
            }
        });
    };

    /**
     * Add event listener for form submission.
     * @param {Function} editTransaction
     */
    addEventEditTransaction = (editTransaction) => {
        this.buttonSaveEditEl?.addEventListener('click', async (e) => {
            e.preventDefault();

            const transaction = {
                id: this.edittransactionBodyEl.getAttribute('data-id'),
                category: this.edittransactionBodyEl.category.value,
                date: this.edittransactionBodyEl.date.value,
                outflow: parseInt(this.edittransactionBodyEl.outflow.value),
                note: this.edittransactionBodyEl.note.value,
            };

            const errors = validateTransaction(transaction);
            const errorElements = document.querySelectorAll('.error');

            if (errors.length > 0) {
                this.showErrorMessage(errors);
            } else {
                await editTransaction(transaction);
                this.edittransactionBodyEl.reset();
                this.clearErrorMessage(errorElements);
                this.closeEditPopup();
            }
        });
    };

    /**
     * Add event listener for Delete button.
     * @param {Function} deleteTransaction
     */
    addEventDeleteTransaction = (deleteTransaction) => {
        this.buttonDeleteElement?.addEventListener('click', async (e) => {
            e.preventDefault();

            const transactionId = this.edittransactionBodyEl.getAttribute('data-id');

            deleteTransaction(transactionId);
            this.closeEditPopup();
        });
    };

    showErrorMessage = (errors) => {
        const errorElements = {
            date: document.querySelector('.error-date'),
            category: document.querySelector('.error-category'),
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
        this.buttonSaveElement.classList.remove('btn-save-active');
        this.inputOutflow.addEventListener('change', () => {
            if (this.inputOutflow != 0) {
                this.buttonSaveElement.disabled = false;
                this.buttonSaveElement.classList.add('btn-save-active');
            } else {
                this.buttonSaveElement.disabled = true;
            }
        });
    };
}

export default TransactionView;
