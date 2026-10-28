let tasks = [];

let form = document.getElementById("taskForm");
let taskName = document.getElementById("taskName");
let priority = document.getElementById("priority");
let dueDate = document.getElementById("dueDate");
let message = document.getElementById("message");
let taskList = document.getElementById("taskList");
let jsonData = document.getElementById("jsonData");

let today = new Date();
today.setMinutes(today.getMinutes() - today.getTimezoneOffset());
dueDate.min = today.toISOString().split("T")[0];

form.addEventListener("submit", function(event) {
    event.preventDefault();

    let name = taskName.value.trim();
    let level = priority.value;
    let date = dueDate.value;

    if (name === "") {
        message.textContent = "Task name cannot be empty.";
        return;
    }

    if (name.length < 3) {
        message.textContent = "Task name must have at least 3 characters.";
        return;
    }

    if (name.length > 50) {
        message.textContent = "Task name cannot exceed 50 characters.";
        return;
    }

    if (level === "") {
        message.textContent = "Please select a priority.";
        return;
    }

    if (date !== "" && date < dueDate.min) {
        message.textContent = "Due date cannot be in the past.";
        return;
    }

    let task = {
        name: name,
        priority: level,
        dueDate: date,
        completed: false
    };

    tasks.push(task);

    message.style.color = "green";
    message.textContent = "Task added successfully!";

    form.reset();
    dueDate.min = today.toISOString().split("T")[0];

    displayTasks();
});

function displayTasks() {
    taskList.innerHTML = "";

    for (let i = 0; i < tasks.length; i++) {
        let item = document.createElement("div");
        item.className = "task";

        item.textContent =
            tasks[i].name + " | Priority: " +
            tasks[i].priority + " | Due Date: " +
            (tasks[i].dueDate || "Not set");

        taskList.appendChild(item);
    }

    jsonData.textContent = JSON.stringify(tasks, null, 2);
}

displayTasks();