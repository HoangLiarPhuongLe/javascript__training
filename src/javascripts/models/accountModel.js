class Account {
    /**
   * Constructor of Account object
   * @param {Object} data
   */
  constructor(data){
    this.id= data.id;
    this.email= data.email;
    this.password= data.password;
  }
}

export default Account;