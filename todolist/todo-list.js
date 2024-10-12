// Function to format date to MM-DD-YYYY
function formatDate(dateString) {
    const date = new Date(dateString);
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const day = String(date.getDate()).padStart(2, '0');
    const year = date.getFullYear();
    return `${month}-${day}-${year}`;
}

// Function to add a task
function addTask(taskText, dueDateText) {
    const taskList = document.getElementById("taskList");

    // Format the due date
    const formattedDueDate = formatDate(dueDateText);

    // Create a new list item
    const taskItem = document.createElement("li");
    taskItem.className = "task-item"; // Add a class for styling

    // Create task text and due date
    taskItem.innerHTML = `
        <span class="task-text">${taskText}</span>
        <span class="due-date">${formattedDueDate}</span>
    `;

    // Append the new task to the list
    taskList.appendChild(taskItem);
}

// Sample tasks
const sampleTasks = [
    { text: "Finish homework", dueDate: "2024-10-05" },
    { text: "Go grocery shopping", dueDate: "2024-10-10" },
    { text: "Clean the house", dueDate: "2024-10-12" },
    { text: "Walk the dog", dueDate: "2024-10-08" }
];

// Function to create sample task buttons
function createSampleTasks() {
    const sampleContainer = document.createElement('div');
    sampleContainer.className = "sample-tasks"; // Class for styling

    sampleTasks.forEach(task => {
        const button = document.createElement("button");
        button.className = "sample-task-button"; // Class for styling
        button.innerText = `${task.text} (Due: ${formatDate(task.dueDate)})`;

        // Event listener to add task on button click
        button.addEventListener("click", () => {
            addTask(task.text, task.dueDate);
        });

        sampleContainer.appendChild(button);
    });

    document.body.insertBefore(sampleContainer, document.getElementById("taskList")); // Insert before the task list
}

// Call the function to create sample tasks on page load
window.onload = () => {
    createSampleTasks();
};

// Event listener for the add task button
document.getElementById("addTaskButton").addEventListener("click", () => {
    const taskInput = document.getElementById("taskInput");
    const dueDateInput = document.getElementById("dueDateInput");

    if (taskInput.value.trim() === "" || dueDateInput.value.trim() === "") {
        alert("Please enter both a task and a due date.");
        return;
    }

    addTask(taskInput.value, dueDateInput.value);
    taskInput.value = ""; 
    dueDateInput.value = ""; 
});

// Optional: Allow pressing Enter to add a task
document.getElementById("taskInput").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        const taskInput = document.getElementById("taskInput");
        const dueDateInput = document.getElementById("dueDateInput");
        if (taskInput.value.trim() === "" || dueDateInput.value.trim() === "") {
            alert("Please enter both a task and a due date.");
            return;
        }
        addTask(taskInput.value, dueDateInput.value);
        taskInput.value = ""; 
        dueDateInput.value = ""; 
    }
});