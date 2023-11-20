class Transaction {
    /**
     * Constructor of Transaction object
     * @param {Object} data
     */
    constructor(data) {
        this.id = data.id;
        this.category = data.category;
        this.date = data.date;
        this.note = data.note;
        this.outflow = data.outflow;
    }
}
export default Transaction;
