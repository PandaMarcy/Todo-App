document.addEventListener("DOMContentLoaded", loadTasks);

function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach(task => renderTask(task.text, task.color, task.completed));
}

function saveTasks() {
  const tasks = Array.from(document.querySelectorAll("#taskList li")).map(task => ({
    text: task.querySelector("span").textContent,
    color: task.style.backgroundColor,
    completed: task.classList.contains("completed")
  }));
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function addTask() {
  const taskInput = document.getElementById("taskInput");
  const taskColor = document.getElementById("taskColor").value;
  const taskText = taskInput.value.trim();

  if (taskText) {
    renderTask(taskText, taskColor, false);
    saveTasks();
    taskInput.value = "";
  }
}

function renderTask(text, color, completed) {
  const taskList = document.getElementById("taskList");
  const taskItem = document.createElement("li");
  taskItem.style.backgroundColor = color;
  taskItem.classList.toggle("completed", completed);
  
  taskItem.innerHTML = `
    <span onclick="toggleTask(this)">${text}</span>
    <div>
      <button class="edit" onclick="editTask(this)">Edit</button>
      <button class="delete" onclick="deleteTask(this)">Delete</button>
    </div>
  `;
  
  if (completed) {
    taskItem.querySelector("span").style.textDecoration = "line-through";
  }
  
  taskList.appendChild(taskItem);
}

function deleteTask(button) {
  button.parentElement.parentElement.remove();
  saveTasks();
}

function editTask(button) {
  const taskItem = button.parentElement.parentElement;
  const taskText = taskItem.querySelector("span").textContent;
  const newText = prompt("Edit Task:", taskText);
  if (newText !== null && newText.trim() !== "") {
    taskItem.querySelector("span").textContent = newText.trim();
    saveTasks();
  }
}

function toggleTask(span) {
  const taskItem = span.parentElement;
  taskItem.classList.toggle("completed");
  span.style.textDecoration = taskItem.classList.contains("completed") ? "line-through" : "none";
  saveTasks();
}
