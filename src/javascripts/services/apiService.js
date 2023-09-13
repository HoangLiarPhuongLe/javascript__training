class ApiService{
    constructor(baseUrl,path){
        this.baseUrl=baseUrl;
        this.path= path;
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
}

export default ApiService;