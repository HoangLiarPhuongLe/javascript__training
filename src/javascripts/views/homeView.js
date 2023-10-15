class HomeView {
    constructor() {
        this.transactionListEl = document.querySelector(".transaction-list")
        this.addBtnEL = document.querySelector(".btn-add-transaction");
    }

    //----- EVENT HANDLER -----//
    addEventRenderPopup = (handler) => {
        this.addBtnEL.addEventListener("click", () => {
            handler();
        });
    }
}

export default HomeView;
