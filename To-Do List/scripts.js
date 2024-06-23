// scripts.js
document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('task-input');
    const priorityInput = document.getElementById('priority-input');
    const categoryInput = document.getElementById('category-input');
    const dueDateInput = document.getElementById('due-date-input');
    const addTaskBtn = document.getElementById('add-task-btn');
    const taskList = document.getElementById('task-list');
    const congratsCharacter = document.getElementById('congrats-character');
    const headerImage = document.querySelector('.header-image');

    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    const saveTasks = () => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    };

    const loadTasks = () => {
        tasks.forEach(task => {
            addTaskToDOM(task);
        });
    };

    const addTask = () => {
        const taskText = taskInput.value.trim();
        const taskPriority = priorityInput.value;
        const taskCategory = categoryInput.value.trim();
        const taskDueDate = dueDateInput.value;

        if (taskText === '') {
            alert('Please enter a task.');
            return;
        }

        const task = {
            id: Date.now(),
            text: taskText,
            priority: taskPriority,
            category: taskCategory,
            dueDate: taskDueDate,
            completed: false
        };

        tasks.push(task);
        saveTasks();
        addTaskToDOM(task);

        taskInput.value = '';
        priorityInput.value = '';
        categoryInput.value = '';
        dueDateInput.value = '';
    };

    const addTaskToDOM = (task) => {
        const taskItem = document.createElement('li');

        const taskContent = document.createElement('div');
        taskContent.classList.add('task-text');
        taskContent.textContent = task.text;

        const taskPriorityElem = document.createElement('div');
        taskPriorityElem.classList.add('task-priority');
        taskPriorityElem.textContent = `Priority: ${task.priority}`;

        const taskCategoryElem = document.createElement('div');
        taskCategoryElem.classList.add('task-category');
        taskCategoryElem.textContent = `Category: ${task.category}`;

        const taskDueDateElem = document.createElement('div');
        taskDueDateElem.classList.add('task-due-date');
        taskDueDateElem.textContent = `Due: ${task.dueDate}`;

        const completeBtn = document.createElement('button');
        completeBtn.textContent = 'Complete';
        completeBtn.addEventListener('click', () => {
            task.completed = true;
            taskItem.classList.add('completed');
            saveTasks();
            checkTasksCompletion();
        });

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.addEventListener('click', () => {
            taskItem.style.animation = 'tear-page 0.5s ease forwards';
            setTimeout(() => {
                tasks = tasks.filter(t => t.id !== task.id);
                saveTasks();
                taskItem.remove();
                checkTasksCompletion();
            }, 500);
        });

        taskItem.appendChild(taskContent);
        taskItem.appendChild(taskPriorityElem);
        taskItem.appendChild(taskCategoryElem);
        taskItem.appendChild(taskDueDateElem);
        taskItem.appendChild(completeBtn);
        taskItem.appendChild(deleteBtn);

        taskList.appendChild(taskItem);
    };

    const checkTasksCompletion = () => {
        if (tasks.every(task => task.completed) && tasks.length > 0) {
            congratsCharacter.style.display = 'block';
            setTimeout(() => {
                congratsCharacter.style.display = 'none';
            }, 3000);
        }
    };

    addTaskBtn.addEventListener('click', addTask);

    loadTasks();
    checkTasksCompletion();
});
