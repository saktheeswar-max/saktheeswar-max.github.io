document.addEventListener('DOMContentLoaded', () => {
    // Get references to DOM elements
    const taskInput = document.getElementById('taskInput');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const taskList = document.getElementById('taskList');

    // Function to add a new task
    function addTask() {
        const taskText = taskInput.value.trim(); // Get input value and remove whitespace

        if (taskText === "") {
            alert("Please enter a task!"); // Prevent adding empty tasks
            return;
        }

        // Create new list item (li) for the task
        const listItem = document.createElement('li');
        listItem.textContent = taskText;

        // Create a remove button for the task
        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Remove';
        removeBtn.classList.add('remove-btn'); // Add a class for potential styling if needed

        // Event listener for marking task complete (click on the text)
        listItem.addEventListener('click', () => {
            listItem.classList.toggle('completed'); // Toggle the 'completed' class
        });

        // Event listener for removing the task
        removeBtn.addEventListener('click', (event) => {
            event.stopPropagation(); // Prevent listItem's click event from firing when removing
            taskList.removeChild(listItem); // Remove the entire list item
        });

        // Append the remove button to the list item
        listItem.appendChild(removeBtn);

        // Append the new list item to the task list
        taskList.appendChild(listItem);

        // Clear the input field after adding the task
        taskInput.value = '';
        taskInput.focus(); // Keep focus on the input for quick entry
    }

    // Event listener for "Add Task" button click
    addTaskBtn.addEventListener('click', addTask);

    // Event listener for 'Enter' key press in the input field
    taskInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            addTask();
        }
    });
});