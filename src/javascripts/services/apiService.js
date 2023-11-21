class ApiService {
    constructor(baseUrl, path) {
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

    async getById(id) {
        const response = await fetch(`${this.baseUrl}${this.path}/${id}`);

        const data = response.json();

        return data;
    }

    async post(payload) {
        // Log the JSON representation of the transaction object
        console.log('JSON:', JSON.stringify(payload));

        try {
            // Make a POST request to the API endpoint with the transaction object as the request body
            const response = await fetch(`${this.baseUrl}${this.path}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            // Parse the response as JSON
            const data = await response.json();

            // Return the parsed JSON data
            return data;
        } catch (error) {
            console.error('Error adding payload:', error);
            throw new Error('Failed to add payload.');
        }
    }

    async put(payload) {
        // Log the JSON representation of the transaction object
        console.log('JSON:', JSON.stringify(payload));

        try {
            // Make a POST request to the API endpoint with the transaction object as the request body
            const response = await fetch(`${this.baseUrl}${this.path}/${payload.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            // Parse the response as JSON
            const data = await response.json();

            // Return the parsed JSON data
            return data;
        } catch (error) {
            console.error('Error editing payload:', error);
            throw new Error('Failed to edit payload.');
        }
    }

    async delete(id) {
        await fetch(`${this.baseUrl}${this.path}/${id}`, {
            method: 'DELETE',
        });
    }
}

export default ApiService;
