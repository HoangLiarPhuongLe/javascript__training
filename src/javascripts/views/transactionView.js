import { validateTransaction } from "../helpers/validationForm";

class TransactionView{
    constructor(){
        this.transactionElement = document.querySelector(".transaction");
        this.transactionBodyElement = document.querySelector(".transaction-body");
        this.overlayElement = document.querySelector(".overlay");
        this.buttonSaveElement = document.querySelector(".btn-save");
    }

    //----- RENDERING -----//
    renderPopup(){
        this.transactionElement.classList.add("transaction-active");
        this.overlayElement.classList.add("overlay-active");
    }

    closePopup(){
        this.transactionElement.classList.remove("transaction-active");
        this.overlayElement.classList.remove("overlay-active");
    }

    resetPopup(){
        const inputs = this.transactionBodyElement.querySelectorAll('input');

        inputs.forEach((input) => {
            input.value = " ";
        })
    }

    //----- EVENT LISTENER -----//
    addEventAddTransaction = (addTransaction) => {
        this.buttonSaveElement?.addEventListener("click", async(e) => {
            e.preventDefault();

            const transaction = {
                id: this.transactionBodyElement.getAttribute("data-id"),
                category: this.transactionBodyElement.category.value,
                date: this.transactionBodyElement.date.value,
                outflow: this.transactionBodyElement.outflow.value,
                note: this.transactionBodyElement.note.value,
            }

            const errors = validateTransaction(transaction);
            const errorElements = document.querySelectorAll(".error");
            
            if(errors.length > 0){
                this.showErrorMessage(errors)
            } else{
                this.clearErrorMessage(errorElements);
                await addTransaction(transaction);
                this.closePopup();
                this.resetPopup();
            }
        })
    }

    showErrorMessage = (errors) =>{
        const errorElements = {
            date: document.querySelector(".error-date"),
            category: document.querySelector(".error-category"),
            outflow: document.querySelector(".error-amount"),
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
