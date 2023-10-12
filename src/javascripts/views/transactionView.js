import { validateTransaction } from "../helpers/validationForm";

class TransactionView{
    constructor(){
        this.transactionElement = document.querySelector(".transaction");
        this.transactionBodyElement = document.querySelector(".transaction-body");
        this.buttonSaveElement = document.querySelector(".btn-save");
    }

    //----- RENDERING -----//
    renderPopup(){
        this.transactionElement.classList.add("transaction-active");
    }

    closePopup(){
        this.transactionElement.classList.remove("transaction-active");
    }

    //----- EVENT LISTENER -----//
    addEventAddTransaction = (addTransaction) => {
        this.buttonSaveElement?.addEventListener("click", async(e) => {
            e.preventDefault();

            const transaction = {
                category: this.transactionBodyElement.category.value,
                date: this.transactionBodyElement.date.value,
                note: this.transactionBodyElement.note.value,
                outflow: this.transactionBodyElement.outflow.value
            }

            const errors = validateTransaction(transaction);
            const errorElements = document.querySelectorAll(".error-date, .error-category, .error-amount, .error-note");

            if(errors.length>0){
                this.showErrorMessage(errors)
            } else{
                this.clearErrorMessage(errorElements);
                await addTransaction(transaction);
                this.closePopup();
            }
        })
    }

    showErrorMessage = (errors) =>{
        const errorElements = {
            date: document.querySelector(".error-date"),
            category: document.querySelector(".error-category"),
            amount: document.querySelector(".error-amount"),
            note: document.querySelector(".error-note")
        }

        errors.forEach((error) => {
            errorElements[error.field].classList.add("error-message");
            errorElements[error.field].textContent = error.message;
        })
    }

    clearErrorMessage = (errorElements) => {
        errorElements.forEach((errorElement) => {
            errorElement.classList.remove("error-message");
            errorElement.textContent = "";
        })
    }
}

export default TransactionView;
