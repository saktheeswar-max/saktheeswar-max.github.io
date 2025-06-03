document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');

    const nameError = document.getElementById('nameError');
    const emailError = document.getElementById('emailError');
    const messageError = document.getElementById('messageError');
    const successMessage = document.getElementById('successMessage');

    // Function to show error messages
    function showError(element, message) {
        element.textContent = message;
        element.style.display = 'block'; // Make the error message visible
    }

    // Function to hide error messages
    function hideError(element) {
        element.textContent = '';
        element.style.display = 'none'; // Hide the error message
    }

    // Function to validate name (non-empty)
    function validateName() {
        const nameValue = nameInput.value.trim();
        if (nameValue === '') {
            showError(nameError, 'Name is required.');
            return false;
        } else {
            hideError(nameError);
            return true;
        }
    }

    // Function to validate email (non-empty and valid format using regex)
    function validateEmail() {
        const emailValue = emailInput.value.trim();
        // Regex for a common email format validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (emailValue === '') {
            showError(emailError, 'Email is required.');
            return false;
        } else if (!emailRegex.test(emailValue)) {
            showError(emailError, 'Please enter a valid email address.');
            return false;
        } else {
            hideError(emailError);
            return true;
        }
    }

    // Function to validate message (non-empty)
    function validateMessage() {
        const messageValue = messageInput.value.trim();
        if (messageValue === '') {
            showError(messageError, 'Message is required.');
            return false;
        } else {
            hideError(messageError);
            return true;
        }
    }

    // Add event listeners for real-time validation (optional but good for UX)
    nameInput.addEventListener('input', validateName);
    emailInput.addEventListener('input', validateEmail);
    messageInput.addEventListener('input', validateMessage);


    // Handle form submission
    contactForm.addEventListener('submit', function(event) {
        // Prevent default form submission
        event.preventDefault();

        // Perform all validations
        const isNameValid = validateName();
        const isEmailValid = validateEmail();
        const isMessageValid = validateMessage();

        // If all fields are valid, proceed
        if (isNameValid && isEmailValid && isMessageValid) {
            // 6. Show success message on valid submission (no actual sending).
            hideError(nameError);
            hideError(emailError);
            hideError(messageError);
            successMessage.textContent = 'Form submitted successfully! (No actual sending)';
            successMessage.style.display = 'block';

            // Optional: Clear the form after a successful submission
            contactForm.reset();

            // Hide success message after a few seconds
            setTimeout(() => {
                successMessage.style.display = 'none';
            }, 5000); // Hide after 5 seconds
        } else {
            // If any validation fails, hide success message if it was visible
            successMessage.style.display = 'none';
        }
    });
});
