## Flow Distribution Algorithm

The Flow Distribution Algorithm is a Node.js backend system designed to manage and distribute users to astrologers. This system ensures a fair allocation of users among astrologers and allows for flexible adjustments based on the astrologers' performance status.


## 💻 Technologies Used

* **Node.js:** JavaScript runtime environment for building backend applications.
* **Express.js:** Web framework for Node.js, providing a robust structure for creating RESTful APIs.
* **Swagger:** Documentation tool for APIs, allowing for easy generation of interactive documentation.
* **Lodash:** Utility library for JavaScript, providing common helper functions for manipulation and data management.
* **Nodemon:** Development tool that automatically restarts the server when code changes are detected.

## 🚀  Workflow and Logic

1. **Data Structures:**
   *  **Astrologer:** Represents an astrologer with properties like ID, name, assigned users, and flow status (normal, high, low). 
   *  **User:** Represents a user with ID and name.

2. **Distribution Algorithm:**
   * The system uses a **round-robin approach** with **priority queues** to ensure fair distribution among astrologers.
   * **User Allocation:**
     * When a new user arrives, the system checks if they have a preferred astrologer. If so, the user is assigned to that astrologer.
     * Otherwise, the system assigns users to astrologers in a round-robin fashion, prioritizing astrologers with the lowest number of current users.
   * **Priority Queues:**
     * **Active Astrologers:**  A priority queue for active astrologers, sorted by the number of users they have currently, ensures a balanced distribution.
     * **Top Astrologers:** A separate queue for top-performing astrologers, allowing for adjustments to their flow.

3. **Flow Control:**
   * The system allows for adjusting the flow of top-performing astrologers by manually toggling their status between `normal`, `high`, and `low`.
   * `high` status:  Prioritizes the astrologer, giving them more users.
   * `low` status: Limits the number of users assigned to them. 

4. **API Endpoints:**
   * **`/users`:** Creates a new user (POST request).
   * **`/astrologers`:** Retrieves a list of all astrologers with their current flow status (GET request).
   * **`/astrologers/{astrologerId}/status`:** Toggles the flow status of a specific astrologer (PUT request).

## 📁 Project Structure

```
flow_distribution/     
├── controllers/   
│   ├── flowdistribution.js    
├── routes/
│   └── index.js     
├── models/
│   ├── astro.js  
│   └── user.js      
├── package.json
|__ index.js
|__ swagger.js
|    
```

## 🤖  Example Usage

```javascript
// Example using the API:
// Create a new user
fetch('http://localhost:1000/api/users', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ name: 'New User' }) 
})
.then(response => response.json())
.then(data => console.log(data));

// Get all astrologers
fetch('http://localhost:1000/api/astrologers')
.then(response => response.json())
.then(data => console.log(data));

// Toggle the flow status of an astrologer
fetch(`http://localhost:1000/api/astrologers/${astrologerId}/status`, {
  method: 'PUT',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ flowStatus: 'high' }) 
})
.then(response => response.json())
.then(data => console.log(data));
```

## 📚  Documentation

The project utilizes Swagger to generate interactive API documentation. The documentation is accessible at `http://localhost:1000/api-docs`. It provides detailed information about each API endpoint, including request and response parameters.

## 💪 Getting Started

1.  **Clone the Repository:**

    ```bash
    git clone https://github.com/Mayank561/System-design-using-Queue.git
    cd Astrologers
    ```

2. **Install Dependencies:**
   ```bash
   npm install
   ```

3. **Start the Server:**
   ```bash
   npm start
   ```

4. **Access the API:**
   The API is available at `http://localhost:1000`. You can use tools like Postman or curl to test the endpoints.

