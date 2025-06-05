const userDataContainer = document.getElementById('userDataContainer');
const errorMessageDiv = document.getElementById('errorMessage');
const reloadButton = document.getElementById('reloadData');

const API_URL = 'https://jsonplaceholder.typicode.com/users';

// Function to display error messages
function displayError(message) {
    errorMessageDiv.textContent = message;
    errorMessageDiv.style.display = 'block'; // Show the error message
    userDataContainer.innerHTML = ''; // Clear user data if there's an error
}

// Function to clear error messages
function clearError() {
    errorMessageDiv.textContent = '';
    errorMessageDiv.style.display = 'none'; // Hide the error message
}

// Function to fetch and display user data
async function fetchAndDisplayUsers() {
    clearError(); // Clear any previous errors
    userDataContainer.innerHTML = '<p>Loading user data...</p>'; // Show loading message

    try {
        // 2. Use JS fetch to request data from https://jsonplaceholder.typicode.com/users
        const response = await fetch(API_URL);

        // 5. Handle errors with catch block (and check for HTTP errors)
        if (!response.ok) {
            // If response.ok is false, it means an HTTP error occurred (e.g., 404, 500)
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        // 3. Parse the JSON response
        const users = await response.json();

        // Clear loading message
        userDataContainer.innerHTML = '';

        // 4. Loop through users and display their name, email, and address on the page
        if (users.length === 0) {
            userDataContainer.innerHTML = '<p>No user data found.</p>';
            return;
        }

        users.forEach(user => {
            const userCard = document.createElement('div');
            userCard.classList.add('user-card');

            // Format address nicely
            const address = `${user.address.street}, ${user.address.suite}, ${user.address.city}, ${user.address.zipcode}`;

            userCard.innerHTML = `
                <h3>${user.name}</h3>
                <p><strong>Email:</strong> ${user.email}</p>
                <p><strong>Address:</strong> ${address}</p>
                <p><strong>Phone:</strong> ${user.phone}</p>
                <p><strong>Website:</strong> <a href="http://${user.website}" target="_blank">${user.website}</a></p>
                <p><strong>Company:</strong> ${user.company.name}</p>
            `;
            userDataContainer.appendChild(userCard);
        });

    } catch (error) {
        // 5. Handle errors with catch block
        console.error('Error fetching user data:', error);
        displayError(`Failed to load user data. Please try again. Error: ${error.message}`);
    }
}

// Initial fetch when the page loads
fetchAndDisplayUsers();

// Add event listener to the reload button
reloadButton.addEventListener('click', fetchAndDisplayUsers);

// 7. Test network error handling by disabling internet.
// You can manually disable your internet connection in your system settings
// or browser developer tools (e.g., Network tab -> Offline checkbox)
// and then click the "Reload Data" button to see the error message.
