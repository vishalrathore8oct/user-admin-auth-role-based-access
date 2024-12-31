
console.log("User Admin Dashboard JS Loaded");

const taskContainer = document.querySelector('.task-container');
const fetchTasksButton = document.getElementById('user-tasks-button');
const fetchAdminTasksButton = document.getElementById('admin-tasks-button');


const fetchTasks = async () => {

    try {
        const response = await fetch('http://localhost:8080/api/task/user', {
            method: 'GET',
            credentials: 'include'
        });
    
        const data = await response.json();
        console.log(data);
    
        taskContainer.innerHTML = '';
    
        data.tasks.forEach(task => {
    
            const taskCard = document.createElement('div');
            taskCard.classList.add('task-card');
    
    
            const taskTitle = document.createElement('h3');
            taskTitle.textContent = `Title: ${task.title}`;
    
            const taskDescription = document.createElement('p');
            taskDescription.innerHTML = `<strong>Description:</strong> ${task.description}`;
    
            taskCard.appendChild(taskTitle);
            taskCard.appendChild(taskDescription);
    
            taskContainer.appendChild(taskCard);
        });
    } catch (error) {
        console.error('Error fetching user tasks:', error);
    }
}


const fetchAdminTasks = async () => {

    try {
        const response = await fetch('http://localhost:8080/api/task/admin', {
            method: 'GET',
            credentials: 'include'
        });
    
        const data = await response.json();
        console.log(data);
    
        taskContainer.innerHTML = '';
    
        data.tasks.forEach(task => {
    
            const taskCard = document.createElement('div');
            taskCard.classList.add('task-card');
    
    
            const taskTitle = document.createElement('h3');
            taskTitle.textContent = `Title: ${task.title}`;
    
            const taskDescription = document.createElement('p');
            taskDescription.innerHTML = `<strong>Description:</strong> ${task.description}`;
    
            taskCard.appendChild(taskTitle);
            taskCard.appendChild(taskDescription);
    
            taskContainer.appendChild(taskCard);
        });
    } catch (error) {
        console.error('Error fetching admin tasks:', error);
        alert('You are not authorized to view Admin this page');
    }
}




fetchTasksButton.addEventListener('click', fetchTasks);

fetchAdminTasksButton.addEventListener('click', fetchAdminTasks);