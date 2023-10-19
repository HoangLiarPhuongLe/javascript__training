class HomeView {
    constructor() {
        this.transactionListEl = document.querySelector(".transaction-list")
        this.addBtnEl = document.querySelector(".btn-add-transaction");
    }

    //----- EVENT HANDLER -----//
    addEventRenderPopup = (handler) => {
        this.addBtnEl.addEventListener("click", () => {
            handler();
        });
    }
}

export default HomeView;
