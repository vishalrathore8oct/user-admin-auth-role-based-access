document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }

    const signupForm = document.getElementById('signup-form');
    if (signupForm) {
        signupForm.addEventListener('submit', handleSignup);
    }

    const userTasksContainer = document.getElementById('user-tasks');
    if (userTasksContainer) {
        fetchUserTasks();
    }

    const adminTasksContainer = document.getElementById('admin-tasks');
    if (adminTasksContainer) {
        fetchAdminTasks();
    }
});

function handleLogin(event) {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    fetch('http://localhost:8080/api/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            setCookie('token', data.token, 1); 
            const tokenPayload = parseJwt(data.token); 
            if (tokenPayload.role === 'admin') {
                window.location.href = 'admin-dashboard.html';
            } else {
                window.location.href = 'user-dashboard.html';
            }
        } else {
            alert(data.message);
        }
    })
    .catch(error => {
        console.error('Error during login:', error);
        alert(error.message);
    });
}

function handleSignup(event) {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    fetch('http://localhost:8080/api/auth/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email, password })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert(data.message);
            window.location.href = 'index.html';
        } else {
            alert(data.message);
        }
    })
    .catch(error => {
        console.error('Error during signup:', error);
        alert(error.message);
    });
}

function fetchUserTasks() {
    const token = getCookie('token');
    fetch('http://localhost:8080/api/task/user', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
    .then(response => response.json())
    .then(data => {
        displayTasks('user-tasks', data.tasks);
        console.log(data);
        
    })
    .catch(error => {
        console.error('Error fetching user tasks:', error);
        alert(error.message);
    });
}

function fetchAdminTasks() {
    const token = getCookie('token');
    fetch('http://localhost:8080/api/task/admin', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        displayTasks('admin-tasks', data.tasks);
    })
    .catch(error => {
        console.error('Error fetching admin tasks:', error);
    });
}

function displayTasks(containerId, tasks) {
    const container = document.getElementById(containerId);
    container.innerHTML = '';
    tasks.forEach(task => {
        const taskElement = document.createElement('div');
        taskElement.textContent = task.title;
        container.appendChild(taskElement);
    });
}

function parseJwt(token) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}

function setCookie(name, value, days) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = "expires=" + date.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}