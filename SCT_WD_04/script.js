// Selectors
const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const taskDatetime = document.getElementById('task-datetime');
const taskList = document.getElementById('task-list');
const editModal = document.getElementById('edit-modal');
const editTaskInput = document.getElementById('edit-task-input');
const editTaskDatetime = document.getElementById('edit-task-datetime');
const saveEditBtn = document.getElementById('save-edit');
const closeModalBtn = document.querySelector('.close');

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
let editIndex = null;

function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function renderTasks() {
    taskList.innerHTML = '';
    tasks.forEach((task, idx) => {
        const li = document.createElement('li');
        li.className = 'task-item' + (task.completed ? ' completed' : '');
        const infoDiv = document.createElement('div');
        infoDiv.className = 'task-info';
        infoDiv.innerHTML = `<span>${task.text}</span><span class="task-date">${task.datetime ? new Date(task.datetime).toLocaleString() : ''}</span>`;
        const actionsDiv = document.createElement('div');
        actionsDiv.className = 'task-actions';
        // Complete button
        const completeBtn = document.createElement('button');
        completeBtn.innerHTML = task.completed ? '✅' : '☑️';
        completeBtn.title = 'Mark as completed';
        completeBtn.onclick = () => {
            tasks[idx].completed = !tasks[idx].completed;
            saveTasks();
            renderTasks();
        };
        // Edit button
        const editBtn = document.createElement('button');
        editBtn.innerHTML = '✏️';
        editBtn.title = 'Edit task';
        editBtn.onclick = () => openEditModal(idx);
        // Delete button
        const deleteBtn = document.createElement('button');
        deleteBtn.innerHTML = '🗑️';
        deleteBtn.title = 'Delete task';
        deleteBtn.onclick = () => {
            if (confirm('Delete this task?')) {
                tasks.splice(idx, 1);
                saveTasks();
                renderTasks();
            }
        };
        actionsDiv.appendChild(completeBtn);
        actionsDiv.appendChild(editBtn);
        actionsDiv.appendChild(deleteBtn);
        li.appendChild(infoDiv);
        li.appendChild(actionsDiv);
        taskList.appendChild(li);
    });
}

taskForm.onsubmit = function(e) {
    e.preventDefault();
    const text = taskInput.value.trim();
    const datetime = taskDatetime.value;
    if (text && datetime) {
        tasks.push({ text, datetime, completed: false });
        saveTasks();
        renderTasks();
        taskInput.value = '';
        taskDatetime.value = '';
    }
};

function openEditModal(idx) {
    editIndex = idx;
    editTaskInput.value = tasks[idx].text;
    editTaskDatetime.value = tasks[idx].datetime;
    editModal.style.display = 'block';
}

saveEditBtn.onclick = function() {
    if (editIndex !== null) {
        const newText = editTaskInput.value.trim();
        const newDatetime = editTaskDatetime.value;
        if (newText && newDatetime) {
            tasks[editIndex].text = newText;
            tasks[editIndex].datetime = newDatetime;
            saveTasks();
            renderTasks();
            closeModal();
        }
    }
};

function closeModal() {
    editModal.style.display = 'none';
    editIndex = null;
}

closeModalBtn.onclick = closeModal;
window.onclick = function(event) {
    if (event.target === editModal) closeModal();
};

// Initial render
renderTasks(); 