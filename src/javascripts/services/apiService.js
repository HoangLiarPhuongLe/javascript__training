class ApiService{
    constructor(baseUrl, path){
        this.baseUrl = baseUrl;
        this.path = path;
    }
    
    async get() {
        try {
          const response = await fetch(`${this.baseUrl}${this.path}`);
          if (!response.ok) {
            throw new Error('Network response was not ok');
        }
          return await response.json();
        } catch (error) {
          console.error('Error:', error);
          throw error;
        }
    }

    async getTransactionById(id) {
      const response = await fetch(`${this.baseUrl}${this.path}/${id}`);

      const data = response.json();
      
      return data;
    }

    async addTransaction(transaction) {
      // Log the JSON representation of the transaction object
      console.log("JSON:", JSON.stringify(transaction));
    
      try {
        // Make a POST request to the API endpoint with the transaction object as the request body
        const response = await fetch(`${this.baseUrl}${this.path}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(transaction),
        });
    
        // Parse the response as JSON
        const data = await response.json();
        
        // Return the parsed JSON data
        return data;
      } catch (error) {
        console.error("Error adding transaction:", error);
        throw new Error("Failed to add transaction.");
      }
    } 

    async updateTransaction(transaction) {
      // Log the JSON representation of the transaction object
      console.log("JSON:", JSON.stringify(transaction));
    
      try {
        // Make a POST request to the API endpoint with the transaction object as the request body
        const response = await fetch(`${this.baseUrl}${this.path}/${transaction.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(transaction),
        });
    
        // Parse the response as JSON
        const data = await response.json();
        
        // Return the parsed JSON data
        return data;
      } catch (error) {
        console.error("Error adding transaction:", error);
        throw new Error("Failed to add transaction.");
      }
    } 

    async deleteTransactionById (id) {
      await fetch(`${this.baseUrl}${this.path}/${id}`,
      {
        method: "DELETE",
      })
    }
}

export default ApiService;
