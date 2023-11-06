import wait from "../helpers/wait";

class SnackBarView {
    constructor(){
        this.snackbarElement = document.querySelector(".snackbar");
        this.snackbarMessageElement = this.snackbarElement.querySelector(".snackbar-message");
    }

    //----- RENDERING -----//
    showSnackBar = async (type, message) => {
        this.snackbarElement.classList.add(`snackbar-${type}`);
        this.snackbarMessageElement.innerHTML = message;

        await wait(10);
        this.snackbarElement.classList.add("snackbar-show");

        await wait(3000);
        this.snackbarElement.classList.remove("snackbar-show");
        this.snackbarElement.classList.remove(`snackbar-${type}`);
    }
}

export default SnackBarView
