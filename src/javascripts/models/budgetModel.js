class Budget {
    constructor(data) {
        this.id = data.id;
        this.date = data.date;
        this.note = data.note;
        this.inflow = data.inflow;
        this.category = 'Budget';
    }
}
export default Budget;
